import { FIS12InvoiceLoanSequence, FIS12PersonalLoanSequesnce,FIS12PurchaseFinance, WORKING_CAPITAL_LOAN  } from "./index";

export const invoiceBasedLoanSequence = [
    FIS12InvoiceLoanSequence.SEARCH,
    FIS12InvoiceLoanSequence.ON_SEARCH,
    FIS12InvoiceLoanSequence.SELECT,
    FIS12InvoiceLoanSequence.ON_SELECT,
    FIS12InvoiceLoanSequence.INIT,
    FIS12InvoiceLoanSequence.ON_INIT,
    FIS12InvoiceLoanSequence.CONFIRM,
    FIS12InvoiceLoanSequence.ON_CONFIRM,
    FIS12InvoiceLoanSequence.UPDATE,
    FIS12InvoiceLoanSequence.ON_UPDATE,
    FIS12InvoiceLoanSequence.STATUS,
    FIS12InvoiceLoanSequence.ON_STATUS,
  ];
  
export const personalLoanSequence = [
    FIS12PersonalLoanSequesnce.SEARCH,
    FIS12PersonalLoanSequesnce.ON_SEARCH,
    FIS12PersonalLoanSequesnce.SELECT,
    FIS12PersonalLoanSequesnce.ON_SELECT,
    FIS12PersonalLoanSequesnce.INIT,
    FIS12PersonalLoanSequesnce.ON_INIT,
    FIS12PersonalLoanSequesnce.CONFIRM,
    FIS12PersonalLoanSequesnce.ON_CONFIRM,
    FIS12PersonalLoanSequesnce.UPDATE,
    FIS12PersonalLoanSequesnce.ON_UPDATE,
    FIS12PersonalLoanSequesnce.STATUS,
    FIS12PersonalLoanSequesnce.ON_STATUS,
  ];
  
export const purchaseFinanceSequence = [
    FIS12PurchaseFinance.SEARCH,
    FIS12PurchaseFinance.ON_SEARCH,
    FIS12PurchaseFinance.SELECT,
    FIS12PurchaseFinance.ON_SELECT,
    FIS12PurchaseFinance.INIT,
    FIS12PurchaseFinance.ON_INIT,
    FIS12PurchaseFinance.CONFIRM,
    FIS12PurchaseFinance.ON_CONFIRM,
    FIS12PurchaseFinance.UPDATE,
    FIS12PurchaseFinance.ON_UPDATE,
    FIS12PurchaseFinance.STATUS,
    FIS12PurchaseFinance.ON_STATUS,
  ];
  
export const workingCapitalLoanSequence = [
    WORKING_CAPITAL_LOAN.SEARCH,
    WORKING_CAPITAL_LOAN.ON_SEARCH,
    WORKING_CAPITAL_LOAN.SELECT,
    WORKING_CAPITAL_LOAN.ON_SELECT,
    WORKING_CAPITAL_LOAN.INIT,
    WORKING_CAPITAL_LOAN.ON_INIT,
    WORKING_CAPITAL_LOAN.CONFIRM,
    WORKING_CAPITAL_LOAN.ON_CONFIRM,
    WORKING_CAPITAL_LOAN.ON_STATUS,
  ];
  