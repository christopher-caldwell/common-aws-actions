import { DocumentClient } from 'aws-sdk/clients/dynamodb'

interface Options {
  endpoint?: string
}

const options: Options = {}

// This is set by SAM, or manually by a consumer using some other means of containerization
// indicating meaning that Lambdas are being ran from inside a Docker container.
if (process.env.AWS_SAM_LOCAL || process.env.SERVERLESS_USE_CONTAINER) {
  options.endpoint = 'http://host.docker.internal:8000'
} else if (process.env.STAGE === 'local') {
  // Connect to dynamo through local host
  options.endpoint = 'http://localhost:8000'
}

// If the user has set this variable, it trumps all others
if (process.env.DYNAMO_ENDPOINT) {
  options.endpoint = process.env.DYNAMO_ENDPOINT
}

export const DocClient = new DocumentClient(options)

export * from './interfaces'

const actionTypeItemMap: Record<string, string> = {
  Delete: 'Key',
  Put: 'Item',
  Update: 'Key',
  ConditionCheck: 'Key',
}

/**
 * Determines the name for the argument given to Dynamo
 */
export const determineNameOfActionItem = (actionType: string): string => actionTypeItemMap[actionType]
