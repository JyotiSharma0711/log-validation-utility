import { FIS12InvoiceLoanSequence } from '../../../constants/index'
import _ from 'lodash'
import { isObjectEmpty } from '../../index'
import { validateSchema } from '../../index'
import { logger } from '../../../shared/logger'
import { CompareTimeStamps } from 'utils/RSF/rsfHelpers'

const checkFISsearch = (data: any) => {
  const fisObj: any = {}

  if (!data || isObjectEmpty(data)) {
    return { [FIS12InvoiceLoanSequence.SEARCH]: 'JSON cannot be empty' }
  }

  try {
    const errorObj: any = data
    logger.info(`Validating Schema for ${FIS12InvoiceLoanSequence.SEARCH} API`)
    const vs = validateSchema('fis', FIS12InvoiceLoanSequence.SEARCH, errorObj)
    if (vs != 'error') {
      Object.assign(fisObj, vs)
    }
    try {
    } catch (error: any) {
      logger.error(
        `!!Error occurred while performing schema validation for /${FIS12InvoiceLoanSequence.SEARCH}, ${error.stack}`,
      )
    }
    errorObj.message.orderbook.orders.forEach((order: any) => {
      CompareTimeStamps({
        CreatedAt: order.created_at,
        contextTimeStamp: errorObj.context.timestamp,
        UpdatedAt: order.updated_at,
        issueReportObj: fisObj,
      })
    })
    return fisObj
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      logger.info(`!!File not found for /${FIS12InvoiceLoanSequence.SEARCH} API!`)
    } else {
      logger.error(`!!Some error occurred while checking /${FIS12InvoiceLoanSequence.SEARCH} API`, err)
    }
  }
}

export default checkFISsearch