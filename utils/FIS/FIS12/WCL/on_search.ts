import { logger } from '../../../../shared/logger'
import { setValue, getValue } from '../../../../shared/dao'
import constants from '../../../../constants'
import { validateSchema, isObjectEmpty, checkFISContext } from '../../../../utils'
import { validateTransactionIdConsistency, validateMessageIdPair } from './commonValidations'
import { validateXinput } from './validations/xinputValidations'

export const checkon_searchWCL = (data: any, msgIdSet: any, flow: string, sequence: string) => {
  const errorObj: any = {}
  try {
    if (!data || isObjectEmpty(data)) {
      return { [constants.ON_SEARCH]: 'JSON cannot be empty' }
    }

    console.log("flow ---", flow)
    console.log("sequence ---", sequence)

    if (
      !data.message ||
      !data.context ||
      !data.message.catalog ||
      isObjectEmpty(data.message) ||
      isObjectEmpty(data.message.catalog)
    ) {
      errorObj['missingFields'] = '/context, /message, /catalog or /message/catalog is missing or empty'
      return Object.keys(errorObj).length > 0 && errorObj
    }

    const schemaValidation = validateSchema('FIS_WCL', constants.ON_SEARCH, data)
    const contextRes: any = checkFISContext(data.context, constants.ON_SEARCH)
    
    // Add transaction ID consistency check
    const transactionIdConsistency = validateTransactionIdConsistency(data.context)
    Object.assign(errorObj, transactionIdConsistency)
    
    // Add message ID pair validation - this is an on_action call
    const messageIdPair = validateMessageIdPair(data.context, constants.ON_SEARCH, true)
    Object.assign(errorObj, messageIdPair)
    
    setValue(`${constants.ON_SEARCH}_context`, data.context)
    msgIdSet.add(data.context.message_id)

    if (!contextRes?.valid) {
      Object.assign(errorObj, contextRes.ERRORS)
    }

    if (schemaValidation !== 'error') {
      Object.assign(errorObj, schemaValidation)
    }

    const { message } = data
    const catalog = message.catalog

    // Validate catalog descriptor
    if (!catalog.descriptor?.name) {
      errorObj['catalog.descriptor'] = 'Catalog descriptor name is required'
    }

    // Validate providers
    if (!catalog.providers || !Array.isArray(catalog.providers) || catalog.providers.length === 0) {
      errorObj['catalog.providers'] = 'Providers array is required and cannot be empty'
    } else {
      const provider = catalog.providers[0]

      // Validate provider descriptor
      if (!provider.descriptor?.name) {
        errorObj['provider.descriptor'] = 'Provider descriptor name is required'
      }

      // Validate provider categories
      if (!provider.categories || !Array.isArray(provider.categories) || provider.categories.length === 0) {
        errorObj['provider.categories'] = 'Provider categories array is required and cannot be empty'
      } else {
        const category = provider.categories[0]
        if (category.descriptor?.code !== 'WORKING_CAPITAL_LOAN') {
          errorObj['provider.categories.code'] = 'Category code must be WORKING_CAPITAL_LOAN'
        }
        
        // Store category ID for consistency check
        if (category.id) {
          setValue('category_id', category.id)
        }
      }

      // Validate items
      if (!provider.items || !Array.isArray(provider.items) || provider.items.length === 0) {
        errorObj['provider.items'] = 'Items array is required and cannot be empty'
      } else {
        const item = provider.items[0]

        // Validate item descriptor
        if (!item.descriptor?.name || !item.descriptor?.code) {
          errorObj['item.descriptor'] = 'Item descriptor name and code are required'
        } else if (item.descriptor.code !== 'LOAN') {
          errorObj['item.descriptor.code'] = "Item descriptor code must be 'LOAN' in on_search"
        }

        // Validate item category_ids
        if (!item.category_ids || !Array.isArray(item.category_ids) || item.category_ids.length === 0) {
          errorObj['item.category_ids'] = 'Item category_ids array is required and cannot be empty'
        } else {
          // Check category_id consistency with stored value
          const storedCategoryId = getValue('category_id')
          if (storedCategoryId && !item.category_ids.includes(storedCategoryId)) {
            errorObj['item.category_ids.consistency'] = `Category ID mismatch: expected ${storedCategoryId}, found ${item.category_ids.join(', ')}`
          }
        }

        // Validate xinput using the new validation function
        const xinputValidation = validateXinput(item.xinput, flow, sequence)
        if (!xinputValidation.isValid) {
          Object.assign(errorObj, { 'item.xinput': xinputValidation.errors })
        }

        // Validate parent_item_id in search_2
        if (sequence === 'on_search_2') {
          if (!item.parent_item_id) {
            errorObj['item.parent_item_id'] = 'Parent item ID is required in on_search_2'
          } else {
            const storedItemId = getValue('item_id')
            if (storedItemId && item.parent_item_id !== storedItemId) {
              errorObj['item.parent_item_id.consistency'] = `Parent item ID mismatch: expected ${storedItemId}, found ${item.parent_item_id}`
            }
          }

          // Validate fulfillment_ids match with provider fulfillments
          if (!item.fulfillment_ids || !Array.isArray(item.fulfillment_ids) || item.fulfillment_ids.length === 0) {
            errorObj['item.fulfillment_ids'] = 'Fulfillment IDs array is required in on_search_2'
          } else if (provider.fulfillments) {
            const fulfillmentIds = provider.fulfillments.map((f: any) => f.id)
            for (const fulfillmentId of item.fulfillment_ids) {
              if (!fulfillmentIds.includes(fulfillmentId)) {
                errorObj[`item.fulfillment_ids.${fulfillmentId}`] = `Fulfillment ID ${fulfillmentId} does not match any provider fulfillment ID`
              }
            }
          }
        }

        // Store item ID for consistency check
        if (item.id) {
          setValue('item_id', item.id)
        }
      }

      // Validate fulfillments in search_2
      if (sequence === 'on_search_2') {
        if (!provider.fulfillments || !Array.isArray(provider.fulfillments) || provider.fulfillments.length === 0) {
          errorObj['provider.fulfillments'] = 'Provider fulfillments array is required and cannot be empty in on_search_2'
        } else {
          for (let i = 0; i < provider.fulfillments.length; i++) {
            const fulfillment = provider.fulfillments[i]
            if (!fulfillment.id) {
              errorObj[`provider.fulfillments[${i}].id`] = 'Fulfillment ID is required'
            }
            if (!fulfillment.customer?.person?.name) {
              errorObj[`provider.fulfillments[${i}].customer.person.name`] = 'Customer name is required'
            }
            if (i === 0) { // Primary applicant
              if (!fulfillment.customer?.person?.dob) {
                errorObj[`provider.fulfillments[${i}].customer.person.dob`] = 'Customer date of birth is required'
              }
              if (!fulfillment.customer?.person?.gender) {
                errorObj[`provider.fulfillments[${i}].customer.person.gender`] = 'Customer gender is required'
              }
              if (!fulfillment.customer?.person?.creds || !Array.isArray(fulfillment.customer.person.creds) || fulfillment.customer.person.creds.length === 0) {
                errorObj[`provider.fulfillments[${i}].customer.person.creds`] = 'Customer credentials array is required and cannot be empty'
              }
            }
          }
        }
      }

      // Validate tags
      if (!provider.tags || !Array.isArray(provider.tags)) {
        errorObj['provider.tags'] = 'Provider tags array is required'
      } else {
        // Validate contact info tag
        const contactInfoTag = provider.tags.find((tag: any) => tag.descriptor?.code === 'CONTACT_INFO')
        if (!contactInfoTag || !contactInfoTag.list) {
          errorObj['provider.tags.CONTACT_INFO'] = 'CONTACT_INFO tag with list is required'
        } else {
          const requiredContactFields = [
            'GRO_NAME',
            'GRO_EMAIL',
            'GRO_CONTACT_NUMBER',
            'CUSTOMER_SUPPORT_LINK',
            'CUSTOMER_SUPPORT_CONTACT_NUMBER',
            'CUSTOMER_SUPPORT_EMAIL'
          ]
          for (const field of requiredContactFields) {
            const fieldItem = contactInfoTag.list.find((item: any) => item.descriptor?.code === field)
            if (!fieldItem?.value) {
              errorObj[`provider.tags.CONTACT_INFO.${field}`] = `${field} value is required`
            }
          }
        }

        // Validate LSP info tag
        const lspInfoTag = provider.tags.find((tag: any) => tag.descriptor?.code === 'LSP_INFO')
        if (!lspInfoTag || !lspInfoTag.list) {
          errorObj['provider.tags.LSP_INFO'] = 'LSP_INFO tag with list is required'
        } else {
          const requiredLspFields = [
            'LSP_NAME',
            'LSP_EMAIL',
            'LSP_CONTACT_NUMBER',
            'LSP_ADDRESS'
          ]
          for (const field of requiredLspFields) {
            const fieldItem = lspInfoTag.list.find((item: any) => item.descriptor?.code === field)
            if (!fieldItem?.value) {
              errorObj[`provider.tags.LSP_INFO.${field}`] = `${field} value is required`
            }
          }
        }
      }
    }

    // Validate BPP terms at catalog level
    if (!catalog.tags || !Array.isArray(catalog.tags)) {
      errorObj['catalog.tags'] = 'Catalog tags array is required'
    } else {
      const bppTermsTag = catalog.tags.find((tag: any) => tag.descriptor?.code === 'BPP_TERMS')
      // Make BPP_TERMS optional
      if (bppTermsTag && bppTermsTag.list) {
        const requiredTerms = [
          'BUYER_FINDER_FEES_TYPE',
          'BUYER_FINDER_FEES_PERCENTAGE',
          'SETTLEMENT_WINDOW',
          'SETTLEMENT_BASIS',
          'MANDATORY_ARBITRATION',
          'COURT_JURISDICTION',
          'STATIC_TERMS',
          'OFFLINE_CONTRACT'
        ]
        for (const term of requiredTerms) {
          const termItem = bppTermsTag.list.find((item: any) => item.descriptor?.code === term)
          if (!termItem?.value) {
            errorObj[`catalog.tags.BPP_TERMS.${term}`] = `${term} value is required`
          }
        }
      }
    }

    return Object.keys(errorObj).length > 0 && errorObj
  } catch (error: any) {
    logger.error(`Error in checkOnSearchWCL: ${error.message}`)
    return { error: error.message }
  }
}
