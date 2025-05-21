import { logger } from '../../../../shared/logger';
import constants from '../../../../constants';
import { validateSchema, isObjectEmpty, checkFISContext } from '../../../../utils';
import { validateTransactionIdConsistency, validateMessageIdPair } from './commonValidations';
import { getValue, setValue } from '../../../../shared/dao';
import { validateXinput } from './validations/xinputValidations';

export const checksearchWCL = (data: any, msgIdSet: any, flow: string, sequence: string) => {
  const errorObj: any = {};

  try {
    if (!data || isObjectEmpty(data)) {
      return { [constants.SEARCH]: 'JSON cannot be empty' };
    }

    console.log('flow', flow, sequence)

    if (
      !data.message ||
      !data.context ||
      !data.message.intent ||
      isObjectEmpty(data.message) ||
      isObjectEmpty(data.message.intent)
    ) {
      errorObj['missingFields'] = '/context, /message, /intent or /message/intent is missing or empty';
      return Object.keys(errorObj).length > 0 && errorObj;
    }

    const schemaValidation = validateSchema('FIS_WCL', constants.SEARCH, data);
    const contextRes: any = checkFISContext(data.context, constants.SEARCH);
    
    // Add transaction ID consistency check
    const transactionIdConsistency = validateTransactionIdConsistency(data.context);
    Object.assign(errorObj, transactionIdConsistency);
    
    // Add message ID pair validation
    const messageIdPair = validateMessageIdPair(data.context, constants.SEARCH, false);
    Object.assign(errorObj, messageIdPair);
    
    // Save message ID to check for uniqueness
    msgIdSet.add(data.context.message_id);
    
    if (!contextRes?.valid) {
      Object.assign(errorObj, contextRes.ERRORS);
    }

    if (schemaValidation !== 'error') {
      Object.assign(errorObj, schemaValidation);
    }

    const { context, message } = data;
    const intent = message.intent;

    // Validate context
    if (context.domain !== 'ONDC:FIS12') {
      errorObj['context.domain'] = 'Domain must be ONDC:FIS12';
    }

    if (context.action !== 'search') {
      errorObj['context.action'] = 'Action must be search';
    }

    // Validate intent
    if (!intent.category?.descriptor?.code) {
      errorObj['intent.category'] = 'Category descriptor code is required';
    } else if (intent.category.descriptor.code !== 'WORKING_CAPITAL_LOAN') {
      errorObj['intent.category.code'] = 'Category code must be WORKING_CAPITAL_LOAN';
    }

    // Validate BAP terms in tags
    if (sequence === "search"){
    if (!intent.tags || !Array.isArray(intent.tags)) {
      errorObj['intent.tags'] = 'Intent tags array is required';
    } else {
      const bapTermsTag = intent.tags.find((tag: any) => tag.descriptor?.code === 'BAP_TERMS');
      if (!bapTermsTag || !bapTermsTag.list) {
        errorObj['intent.tags.BAP_TERMS'] = 'BAP_TERMS tag with list is required';
      } else {
        // Validate required BAP terms fields
        const requiredTerms = [
          'BUYER_FINDER_FEES_TYPE',
          'BUYER_FINDER_FEES_PERCENTAGE',
          'DELAY_INTEREST',
          'STATIC_TERMS',
          'OFFLINE_CONTRACT'
        ];
        
        for (const term of requiredTerms) {
          const termItem = bapTermsTag.list.find((item: any) => item.descriptor?.code === term);
          if (!termItem?.value) {
            errorObj[`intent.tags.BAP_TERMS.${term}`] = `${term} value is required`;
          }
        }
      }
    }

    // Store BAP terms for consistency check in subsequent calls
    if (intent.tags) {
      const bapTermsTag = intent.tags.find((tag: any) => tag.descriptor?.code === 'BAP_TERMS');
      if (bapTermsTag?.list) {
        setValue('bap_terms', bapTermsTag.list);
      }
    }
  }

    // Validate provider details in search_1 and search_2
    if (sequence === 'search_1' || sequence === 'search_2') {
      if (!intent.provider) {
        errorObj['intent.provider'] = 'Provider details are required';
      } else {
        if (!intent.provider.id) {
          errorObj['intent.provider.id'] = 'Provider ID is required';
        }
        
      const bapTermsTag = intent.provider.tags.find((tag: any) => tag.descriptor?.code === 'BAP_TERMS');
      if (!bapTermsTag || !bapTermsTag.list) {
        errorObj['intent.tags.BAP_TERMS'] = 'BAP_TERMS tag with list is required';
      } else {
        // Validate required BAP terms fields
        const requiredTerms = [
          'BUYER_FINDER_FEES_TYPE',
          'BUYER_FINDER_FEES_PERCENTAGE',
          'DELAY_INTEREST',
          'STATIC_TERMS',
          'OFFLINE_CONTRACT'
        ];
        
        for (const term of requiredTerms) {
          const termItem = bapTermsTag.list.find((item: any) => item.descriptor?.code === term);
          if (!termItem?.value) {
            errorObj[`intent.tags.BAP_TERMS.${term}`] = `${term} value is required`;
          }
        }
      }

        // Validate items in search_1 and search_2
        if (!intent.provider.items || !Array.isArray(intent.provider.items) || intent.provider.items.length === 0) {
          errorObj['intent.provider.items'] = 'Provider items array is required and cannot be empty';
        } else {
          const item = intent.provider.items[0];
          if (!item.id) {
            errorObj['intent.provider.items.id'] = 'Item ID is required';
          }
          
          // Validate xinput in search_1 and search_2
          const xinputValidation = validateXinput(item.xinput, flow, sequence);
          if (!xinputValidation.isValid) {
            Object.assign(errorObj, { 'item.xinput': xinputValidation.errors });
          }
        }
      }
    }

    // Validate customer details in search_2
    if (sequence === 'search_2') {
      if (!intent.provider?.fulfillments || !Array.isArray(intent.provider.fulfillments) || intent.provider.fulfillments.length === 0) {
        errorObj['intent.provider.fulfillments'] = 'Provider fulfillments array is required and cannot be empty';
      } else {
        const fulfillment = intent.provider.fulfillments[0];
        if (!fulfillment.customer?.person?.name) {
          errorObj['intent.provider.fulfillments.customer.person.name'] = 'Customer name is required';
        }
        if (!fulfillment.customer?.person?.dob) {
          errorObj['intent.provider.fulfillments.customer.person.dob'] = 'Customer date of birth is required';
        }
        if (!fulfillment.customer?.person?.gender) {
          errorObj['intent.provider.fulfillments.customer.person.gender'] = 'Customer gender is required';
        }
        if (!fulfillment.customer?.person?.creds || !Array.isArray(fulfillment.customer.person.creds) || fulfillment.customer.person.creds.length === 0) {
          errorObj['intent.provider.fulfillments.customer.person.creds'] = 'Customer credentials array is required and cannot be empty';
        } else {
          const cred = fulfillment.customer.person.creds[0];
          if (!cred.id) {
            errorObj['intent.provider.fulfillments.customer.person.creds.id'] = 'Credential ID is required';
          }
          if (!cred.type) {
            errorObj['intent.provider.fulfillments.customer.person.creds.type'] = 'Credential type is required';
          }
        }
        if (!fulfillment.customer?.contact?.email) {
          errorObj['intent.provider.fulfillments.customer.contact.email'] = 'Customer email is required';
        }
        if (!fulfillment.customer?.contact?.phone) {
          errorObj['intent.provider.fulfillments.customer.contact.phone'] = 'Customer phone is required';
        }
      }
    }

    // Validate BAP terms consistency across calls
    if (sequence !== 'search') {
      const storedBapTerms = getValue('bap_terms');
      if (storedBapTerms && intent.tags) {
        const bapTermsTag = intent.tags.find((tag: any) => tag.descriptor?.code === 'BAP_TERMS');
        if (bapTermsTag?.list) {
          for (const storedTerm of storedBapTerms) {
            const currentTerm = bapTermsTag.list.find((item: any) => item.descriptor?.code === storedTerm.descriptor?.code);
            if (!currentTerm || currentTerm.value !== storedTerm.value) {
              errorObj[`intent.tags.BAP_TERMS.${storedTerm.descriptor?.code}.consistency`] = 
                `BAP term ${storedTerm.descriptor?.code} value mismatch: expected ${storedTerm.value}, found ${currentTerm?.value}`;
            }
          }
        }
      }
    }

    return Object.keys(errorObj).length > 0 && errorObj;
  } catch (error: any) {
    logger.error(`Error in checkSearchWCL: ${error.message}`);
    return { error: error.message };
  }
}