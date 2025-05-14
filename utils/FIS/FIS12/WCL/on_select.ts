import { logger } from '../../../../shared/logger'
import constants from '../../../../constants'
import { validateSchema, isObjectEmpty, checkFISContext } from '../../../../utils'
import { validateTransactionIdConsistency, validateMessageIdPair } from './commonValidations'
import { validateXinput } from './validations/xinputValidations'

export const checkon_selectWCL = (data: any, msgIdSet: any, flow: string, sequence: string) => {
  const errorObj: any = {}
  try {
    if (!data || isObjectEmpty(data)) {
      return { [constants.ON_SELECT]: 'JSON cannot be empty' }
    }

    console.log("flow ---", flow)
    console.log("sequence ---", sequence)

    if (
      !data.message ||
      !data.context ||
      !data.message.order ||
      isObjectEmpty(data.message) ||
      isObjectEmpty(data.message.order)
    ) {
      errorObj['missingFields'] = '/context, /message, /order or /message/order is missing or empty'
      return Object.keys(errorObj).length > 0 && errorObj
    }

    const schemaValidation = validateSchema('FIS_WCL', constants.ON_SELECT, data)
    const contextRes: any = checkFISContext(data.context, constants.ON_SELECT)
    
    // Add transaction ID consistency check
    const transactionIdConsistency = validateTransactionIdConsistency(data.context)
    Object.assign(errorObj, transactionIdConsistency)
    
    // Add message ID pair validation - this is an on_action call
    const messageIdPair = validateMessageIdPair(data.context, constants.ON_SELECT, true)
    Object.assign(errorObj, messageIdPair)
    
    // Save message ID to check for uniqueness
    msgIdSet.add(data.context.message_id)

    if (!contextRes?.valid) {
      Object.assign(errorObj, contextRes.ERRORS)
    }

    if (schemaValidation !== 'error') {
      Object.assign(errorObj, schemaValidation)
    }

    const { message } = data
    const order = message.order

    // Validate items
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
      errorObj['order.items'] = 'Items array is required and cannot be empty'
    } else {
      const item = order.items[0]
      if (!item.id) {
        errorObj['order.items.id'] = 'Item ID is required'
      }

      // Validate xinput
      const xinputValidation = validateXinput(item.xinput, flow, sequence)
      if (!xinputValidation.isValid) {
        Object.assign(errorObj, { 'item.xinput': xinputValidation.errors })
      }
    }

    return Object.keys(errorObj).length > 0 && errorObj
  } catch (error: any) {
    logger.error(`Error in checkOnSelectWCL: ${error.message}`)
    return { error: error.message }
  }
}
