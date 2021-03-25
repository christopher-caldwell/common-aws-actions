export interface SpecificErrorConstructor {
  statusCode?: number
  name?: string
  message: string
}

/** Extends the vanilla Error class to include a status code */
export class SpecificError extends Error {
  statusCode: number | undefined
  constructor(initializers: SpecificErrorConstructor) {
    super()
    this.statusCode = initializers.statusCode
    this.name = initializers.name || 'Error'
    this.message = initializers.message
  }
}

export interface CommonAwsActionsError extends Error {
  statusCode?: number
}
