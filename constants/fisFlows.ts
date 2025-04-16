import { FIS13HealthSequence, FisApiSequence, FisWCLApiSequence } from './index'

export const healthSequence = [
  FIS13HealthSequence.SEARCH_1,
  FIS13HealthSequence.ON_SEARCH_1,
  FIS13HealthSequence.SEARCH_2,
  FIS13HealthSequence.ON_SEARCH_2,
  FIS13HealthSequence.SELECT,
  FIS13HealthSequence.ON_SELECT,
  FIS13HealthSequence.INIT_1,
  FIS13HealthSequence.ON_INIT_1,
  FIS13HealthSequence.INIT_2,
  FIS13HealthSequence.ON_INIT_2,
  FIS13HealthSequence.CONFIRM,
  FIS13HealthSequence.ON_CONFIRM,
]

export const marineSequence = [
  FIS13HealthSequence.SEARCH_1,
  FIS13HealthSequence.ON_SEARCH_1,
  FIS13HealthSequence.SELECT_1,
  FIS13HealthSequence.ON_SELECT_1,
  FIS13HealthSequence.SELECT_2,
  FIS13HealthSequence.ON_SELECT_2,
  FIS13HealthSequence.INIT,
  FIS13HealthSequence.ON_INIT,
  FIS13HealthSequence.CONFIRM,
  FIS13HealthSequence.ON_CONFIRM,
]

export const motorSequence = [
  FIS13HealthSequence.SEARCH_1,
  FIS13HealthSequence.ON_SEARCH_1,
  FIS13HealthSequence.SEARCH_2,
  FIS13HealthSequence.ON_SEARCH_2,
  FIS13HealthSequence.SELECT_1,
  FIS13HealthSequence.ON_SELECT_1,
  FIS13HealthSequence.SELECT_2,
  FIS13HealthSequence.ON_SELECT_2,
  FIS13HealthSequence.SELECT_3,
  FIS13HealthSequence.ON_SELECT_3,
  FIS13HealthSequence.INIT_1,
  FIS13HealthSequence.ON_INIT_1,
  FIS13HealthSequence.INIT_2,
  FIS13HealthSequence.ON_INIT_2,
  FIS13HealthSequence.CONFIRM,
  FIS13HealthSequence.ON_CONFIRM,
]

export const lifeSequenceWithMedical = [
  FIS13HealthSequence.SEARCH_1,
  FIS13HealthSequence.ON_SEARCH_1,
  FIS13HealthSequence.SEARCH_2,
  FIS13HealthSequence.ON_SEARCH_2,
  FIS13HealthSequence.SEARCH_3,
  FIS13HealthSequence.ON_SEARCH_3,
  FIS13HealthSequence.SELECT,
  FIS13HealthSequence.ON_SELECT,
  FIS13HealthSequence.INIT_1,
  FIS13HealthSequence.ON_INIT_1,
  FIS13HealthSequence.INIT_2,
  FIS13HealthSequence.ON_INIT_2,
  FIS13HealthSequence.INIT_3,
  FIS13HealthSequence.ON_INIT_3,
  FIS13HealthSequence.INIT_4,
  FIS13HealthSequence.ON_INIT_4,
  FIS13HealthSequence.CONFIRM,
  FIS13HealthSequence.ON_CONFIRM,
]

export const lifeSequenceWithoutMedical = [
  FIS13HealthSequence.SEARCH_1,
  FIS13HealthSequence.ON_SEARCH_1,
  FIS13HealthSequence.SEARCH_2,
  FIS13HealthSequence.ON_SEARCH_2,
  FIS13HealthSequence.SEARCH_3,
  FIS13HealthSequence.ON_SEARCH_3,
  FIS13HealthSequence.SELECT,
  FIS13HealthSequence.ON_SELECT,
  FIS13HealthSequence.INIT_1,
  FIS13HealthSequence.ON_INIT_1,
  FIS13HealthSequence.INIT_2,
  FIS13HealthSequence.ON_INIT_2,
  FIS13HealthSequence.INIT_3,
  FIS13HealthSequence.ON_INIT_3,
  FIS13HealthSequence.INIT_4,
  FIS13HealthSequence.ON_INIT_4,
  FIS13HealthSequence.CONFIRM,
  FIS13HealthSequence.ON_CONFIRM,
]

export const renewSequence = [
  FIS13HealthSequence.ON_CONFIRM,
  FIS13HealthSequence.ON_UPDATE_1,
  FIS13HealthSequence.ON_STATUS,
  FIS13HealthSequence.ON_UPDATE_2,
]

export const claimSequence = [
  FIS13HealthSequence.ON_CONFIRM,
  FIS13HealthSequence.ON_UPDATE_1,
  FIS13HealthSequence.ON_UPDATE_2,
  FIS13HealthSequence.ON_STATUS,
  FIS13HealthSequence.ON_UPDATE_3,
]

export const cancelSequence = [
  FIS13HealthSequence.ON_CONFIRM,
  FIS13HealthSequence.CANCEL,
  FIS13HealthSequence.ON_CANCEL,
  FIS13HealthSequence.ON_UPDATE,
]

export const personalSequence = [
  FisApiSequence.SEARCH,
  FisApiSequence.ON_SEARCH,
  FisApiSequence.SELECT_1,
  FisApiSequence.ON_SELECT_1,
  FisApiSequence.SELECT_2,
  FisApiSequence.ON_SELECT_2,
  FisApiSequence.ON_STATUS_EKYC,
  FisApiSequence.SELECT_3,
  FisApiSequence.ON_SELECT_3,
  FisApiSequence.INIT_1,
  FisApiSequence.ON_INIT_1,
  FisApiSequence.INIT_2,
  FisApiSequence.ON_INIT_2,
  FisApiSequence.ON_STATUS_ENACH,
  FisApiSequence.INIT_3,
  FisApiSequence.ON_INIT_3,
  FisApiSequence.ON_STATUS_ESIGN,
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
  FisApiSequence.ON_UPDATE_UNSOLICATED,
  FisApiSequence.UPDATE,
  FisApiSequence.ON_UPDATE,
]

export const personalWithoutMonitoringSequence = [
  FisApiSequence.SEARCH,
  FisApiSequence.ON_SEARCH,
  FisApiSequence.SELECT_1,
  FisApiSequence.ON_SELECT_1,
  FisApiSequence.SELECT_2,
  FisApiSequence.ON_SELECT_2,
  FisApiSequence.ON_STATUS_EKYC,
  FisApiSequence.SELECT_3,
  FisApiSequence.ON_SELECT_3,
  FisApiSequence.INIT_1,
  FisApiSequence.ON_INIT_1,
  FisApiSequence.INIT_2,
  FisApiSequence.ON_INIT_2,
  FisApiSequence.ON_STATUS_ENACH,
  FisApiSequence.INIT_3,
  FisApiSequence.ON_INIT_3,
  FisApiSequence.ON_STATUS_ESIGN,
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
]

export const personalWithoutMonitoringAndAggregatorSequence = [
  FisApiSequence.SEARCH,
  FisApiSequence.ON_SEARCH,
  FisApiSequence.SELECT_1,
  FisApiSequence.ON_SELECT_1,
  FisApiSequence.SELECT_2,
  FisApiSequence.ON_SELECT_2,
  FisApiSequence.ON_STATUS_EKYC,
  FisApiSequence.INIT_1,
  FisApiSequence.ON_INIT_1,
  FisApiSequence.INIT_2,
  FisApiSequence.ON_INIT_2,
  FisApiSequence.ON_STATUS_ENACH,
  FisApiSequence.INIT_3,
  FisApiSequence.ON_INIT_3,
  FisApiSequence.ON_STATUS_ESIGN,
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
]

export const personalForclosureSequence = [
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
  FisApiSequence.UPDATE,
  FisApiSequence.ON_UPDATE,
  FisApiSequence.ON_UPDATE_UNSOLICATED,
]

export const personalPrePartSequence = [
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
  FisApiSequence.UPDATE,
  FisApiSequence.ON_UPDATE,
  FisApiSequence.ON_UPDATE_UNSOLICATED,
]

export const personalMissedEmiSequence = [
  FisApiSequence.CONFIRM,
  FisApiSequence.ON_CONFIRM,
  FisApiSequence.UPDATE,
  FisApiSequence.ON_UPDATE,
  FisApiSequence.ON_UPDATE_UNSOLICATED,
]

export const wclCreditLineAssignmentSequence = [
  FisWCLApiSequence.SEARCH,
  FisWCLApiSequence.ON_SEARCH,
  FisWCLApiSequence.SEARCH_1,
  FisWCLApiSequence.ON_SEARCH_1,
  FisWCLApiSequence.SEARCH_2,
  FisWCLApiSequence.ON_SEARCH_2,
  FisWCLApiSequence.SELECT,
  FisWCLApiSequence.ON_SELECT,
  FisWCLApiSequence.ON_STATUS_KYC,
  FisWCLApiSequence.SELECT_1,
  FisWCLApiSequence.ON_SELECT_1,
  FisWCLApiSequence.SELECT_2,
  FisWCLApiSequence.ON_SELECT_2,
  FisWCLApiSequence.SELECT_3,
  FisWCLApiSequence.ON_SELECT_3,
  FisWCLApiSequence.ON_STATUS_EKYC,
  FisWCLApiSequence.INIT,
  FisWCLApiSequence.ON_INIT,
  FisWCLApiSequence.INIT_1,
  FisWCLApiSequence.ON_INIT_1,
  FisWCLApiSequence.ON_STATUS_EMANDATE,
  FisWCLApiSequence.INIT_2,
  FisWCLApiSequence.ON_INIT_2,
  FisWCLApiSequence.ON_STATUS_ESIGN,
  FisWCLApiSequence.INIT_3,
  FisWCLApiSequence.ON_INIT_3,
  FisWCLApiSequence.CONFIRM,
  FisWCLApiSequence.ON_CONFIRM
]

export const wclCreditLineDrawdownSequence = [
  FisWCLApiSequence.INIT,
  FisWCLApiSequence.ON_INIT,
  FisWCLApiSequence.INIT_1,
  FisWCLApiSequence.ON_INIT_2,
  FisWCLApiSequence.CONFIRM,
  FisWCLApiSequence.ON_CONFIRM,
  FisWCLApiSequence.ON_UPDATE,
  FisWCLApiSequence.ON_UPDATE_BASE_TRANSACTION
]

export const wclMissedEmiPaymentSequence = [
  FisWCLApiSequence.UPDATE,
  FisWCLApiSequence.ON_UPDATE_EMI_DETAIL,
  FisWCLApiSequence.ON_UPDATE_PAYMENT_STATUS,
  FisWCLApiSequence.ON_UPDATE_BASE_TRANSACTION
]

export const wclPrePartPaymentSequence = [
  FisWCLApiSequence.UPDATE,
  FisWCLApiSequence.ON_UPDATE_PRE_PART_PAYMENT,
  FisWCLApiSequence.ON_UPDATE_PAYMENT_STATUS,
  FisWCLApiSequence.ON_UPDATE_BASE_TRANSACTION
]

export const wclDrawdownForeclosureSequence = [
  FisWCLApiSequence.UPDATE,
  FisWCLApiSequence.ON_UPDATE_FORECLOSURE_DETAIL,
  FisWCLApiSequence.ON_UPDATE_PAYMENT_STATUS,
  FisWCLApiSequence.ON_UPDATE_BASE_TRANSACTION
]

export const wclCreditLineCancellationSequence = [
  FisWCLApiSequence.CANCEL,
  FisWCLApiSequence.ON_CANCEL,
  FisWCLApiSequence.ON_UPDATE
]