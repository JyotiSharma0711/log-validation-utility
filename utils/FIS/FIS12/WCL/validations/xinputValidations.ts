import { getValue, setValue } from '../../../../../shared/dao'

interface XinputHead {
  descriptor: {
    name: string
  }
  index: {
    min: number
    cur: number
    max: number
  }
  headings: string[]
}

interface XinputForm {
  id: string
  mime_type?: string
  url?: string
  resubmit?: boolean
  multiple_sumbissions?: boolean
}

interface XinputFormResponse {
  status: string
  submission_id: string
}

interface Xinput {
  head?: XinputHead
  form?: XinputForm
  form_response?: XinputFormResponse
  required?: boolean
}

// Define valid headings for each flow and sequence
const VALID_HEADINGS: { [key: string]: { [key: string]: string[] } } = {
  SEARCH: {
    ON_SEARCH: ['BANK_STATEMENT_AND_GST_RETURNS', 'BUSINESS_AND_FINANCIAL_DOCUMENTS'],
    ON_SEARCH_1: ['BANK_STATEMENT_AND_GST_RETURNS', 'BUSINESS_AND_FINANCIAL_DOCUMENTS']
  },
  SELECT: {
    ON_SELECT: ['INDIVIDUAL_KYC', 'BUSINESS_KYC'],
    ON_SELECT_1: ['INDIVIDUAL_KYC', 'BUSINESS_KYC']
  },
  INIT: {
    ON_INIT: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN'],
    ON_INIT_1: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN'],
    ON_INIT_2: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN']
  },
  WCL_CREDIT_LINE_ASSIGNMENT: {
    ON_SEARCH: ['BANK_STATEMENT_AND_GST_RETURNS', 'BUSINESS_AND_FINANCIAL_DOCUMENTS'],
    ON_SEARCH_1: ['BANK_STATEMENT_AND_GST_RETURNS', 'BUSINESS_AND_FINANCIAL_DOCUMENTS'],
    ON_SELECT: ['INDIVIDUAL_KYC', 'BUSINESS_KYC'],
    ON_SELECT_1: ['INDIVIDUAL_KYC', 'BUSINESS_KYC'],
    ON_INIT: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN'],
    ON_INIT_1: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN'],
    ON_INIT_2: ['ACCOUNT_INFORMATION', 'ENACH', 'ESIGN']
  }
}

// Define expected index values for each sequence
const EXPECTED_INDICES: { [key: string]: { [key: string]: { min: number; cur: number; max: number } } } = {
  SEARCH: {
    ON_SEARCH: { min: 0, cur: 0, max: 1 },
    ON_SEARCH_1: { min: 0, cur: 1, max: 1 }
  },
  SELECT: {
    ON_SELECT: { min: 0, cur: 0, max: 1 },
    ON_SELECT_1: { min: 0, cur: 1, max: 1 }
  },
  INIT: {
    ON_INIT: { min: 0, cur: 0, max: 2 },
    ON_INIT_1: { min: 0, cur: 1, max: 2 },
    ON_INIT_2: { min: 0, cur: 2, max: 2 }
  },
  WCL_CREDIT_LINE_ASSIGNMENT: {
    ON_SEARCH: { min: 0, cur: 0, max: 1 },
    ON_SEARCH_1: { min: 0, cur: 1, max: 1 },
    ON_SELECT: { min: 0, cur: 0, max: 1 },
    ON_SELECT_1: { min: 0, cur: 1, max: 1 },
    ON_INIT: { min: 0, cur: 0, max: 2 },
    ON_INIT_1: { min: 0, cur: 1, max: 2 },
    ON_INIT_2: { min: 0, cur: 2, max: 2 }
  }
}

export const validateXinput = (xinput: Xinput, flow: string, sequence: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  const flowUpper = flow.toUpperCase()
  const sequenceUpper = sequence.toUpperCase()

  // Define sequences where xinput should not be present
  const noXinputSequences = [
    'SEARCH',
    'SELECT',
    'INIT',
    'ON_SEARCH_2',
    'ON_SELECT_2'
  ]

  // Handle cases where xinput should not be present
  if (noXinputSequences.includes(sequenceUpper)) {
    if (xinput) {
      errors.push(`Xinput should not be present in ${sequenceUpper}`)
    }
    return { isValid: errors.length === 0, errors }
  }

  // Validate xinput presence for all other sequences
  if (!xinput) {
    errors.push('Xinput is required')
    return { isValid: false, errors }
  }

  // Validate form response in action calls
  if (sequenceUpper.startsWith('SEARCH_') || sequenceUpper.startsWith('SELECT_') || sequenceUpper.startsWith('INIT_')) {
    if (!xinput.form_response) {
      errors.push('Form response is required in action calls')
    } else {
      if (!xinput.form_response.status) {
        errors.push('Form response status is required')
      } else {
        // Allow different status values based on sequence
        const validStatuses = ['SUCCESS', 'PENDING', 'APPROVED', 'CONSENT_CREATED']
        if (!validStatuses.includes(xinput.form_response.status)) {
          errors.push(`Form response status must be one of: ${validStatuses.join(', ')}`)
        }
      }
      if (!xinput.form_response.submission_id) {
        errors.push('Form submission ID is required')
      }
    }

    // Validate form ID matches the one from previous on_action call
    if (!xinput.form?.id) {
      errors.push('Form ID is required in action calls')
    } else {
      const previousSequence = getPreviousSequence(sequenceUpper)
      const storedFormId = getValue(`${previousSequence.toLowerCase()}_form_id`)
      if (!storedFormId) {
        errors.push(`No form ID found from ${previousSequence}`)
      } else if (xinput.form.id !== storedFormId) {
        errors.push(`Form ID must match the one provided in ${previousSequence}: ${storedFormId}`)
      }
    }
  }

  // Validate form in on_action calls
  if (sequenceUpper.startsWith('ON_')) {
    if (!xinput.form) {
      errors.push('Form is required in on_action calls')
    } else {
      if (!xinput.form.id) {
        errors.push('Form ID is required')
      }
      if (!xinput.form.mime_type) {
        errors.push('Form mime_type is required')
      } else if (!['text/html', 'application/html'].includes(xinput.form.mime_type)) {
        errors.push('Form mime_type must be either text/html or application/html')
      }
      if (!xinput.form.url) {
        errors.push('Form URL is required')
      }

      // Store form ID for next sequence
      setValue(`${sequenceUpper.toLowerCase()}_form_id`, xinput.form.id)
    }

    // Validate head in on_action calls
    if (!xinput.head) {
      errors.push('Head is required in on_action calls')
    } else {
      if (!xinput.head.descriptor?.name) {
        errors.push('Head descriptor name is required')
      }

      // Validate index
      if (!xinput.head.index) {
        errors.push('Head index is required')
      } else {
        const { min, cur, max } = xinput.head.index
        if (typeof min !== 'number' || typeof cur !== 'number' || typeof max !== 'number') {
          errors.push('Index min, cur, and max must be numbers')
        } else {
          // Get expected index values for this sequence
          const expectedIndex = EXPECTED_INDICES[flowUpper]?.[sequenceUpper]
          if (expectedIndex) {
            if (min !== expectedIndex.min) {
              errors.push(`Index min should be ${expectedIndex.min} for ${sequenceUpper}`)
            }
            if (cur !== expectedIndex.cur) {
              errors.push(`Index cur should be ${expectedIndex.cur} for ${sequenceUpper}`)
            }
            if (max !== expectedIndex.max) {
              errors.push(`Index max should be ${expectedIndex.max} for ${sequenceUpper}`)
            }
          }
        }
      }

      // Validate headings
      if (!xinput.head.headings || !Array.isArray(xinput.head.headings)) {
        errors.push('Head headings array is required')
      } else {
        const validHeadings = VALID_HEADINGS[flowUpper]?.[sequenceUpper] || VALID_HEADINGS.WCL_CREDIT_LINE_ASSIGNMENT[sequenceUpper]
        if (!validHeadings) {
          errors.push(`No valid headings defined for flow ${flowUpper} and sequence ${sequenceUpper}`)
        } else {
          for (const heading of xinput.head.headings) {
            if (!validHeadings.includes(heading)) {
              errors.push(`Invalid heading: ${heading}. Must be one of: ${validHeadings.join(', ')}`)
            }
          }
        }
      }
    }
  }

  return { isValid: errors.length === 0, errors }
}

function getPreviousSequence(sequence: string): string {
  const sequenceMap: { [key: string]: string } = {
    'SEARCH_1': 'ON_SEARCH',
    'SEARCH_2': 'ON_SEARCH_1',
    'SELECT_1': 'ON_SELECT',
    'SELECT_2': 'ON_SELECT_1',
    'INIT_1': 'ON_INIT',
    'INIT_2': 'ON_INIT_1',
    'INIT_3': 'ON_INIT_2'
  }
  return sequenceMap[sequence] || ''
} 