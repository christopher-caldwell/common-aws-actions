export interface ResponderConfig {
  corsUrl: string
  httpMethod: string
}

/**
 * Creates headers for proxy response
 */
const createHeaders = (corsUrl = '*', httpMethod = 'GET,POST,PUT,DELETE'): Record<string, string> => ({
  'Access-Control-Allow-Origin': corsUrl,
  'Access-Control-Allow-Methods': `${httpMethod},OPTIONS`,
  'Content-Type': 'application/json',
})

/**
 * Handles responses for Lambda functions
 */
export class Responder {
  headers: Record<string, string>

  constructor(config: ResponderConfig) {
    this.headers = createHeaders(config.corsUrl, config.httpMethod)
  }

  /**
   * Return this method to end Lambda execution, and return a response
   */
  respond<T>(body: T, statusCode: number): ResponseBody {
    return {
      headers: this.headers,
      statusCode,
      body: JSON.stringify(body),
    }
  }
}

export interface ResponseBody {
  headers: Record<string, string>
  statusCode: number
  body: string
}
