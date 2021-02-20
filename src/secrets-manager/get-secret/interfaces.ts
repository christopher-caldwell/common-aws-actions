export interface SecretsParams<T = Record<string, string>> {
  SecretId: string
  keyOfTargetSecret?: string
  mockSecret?: T
  /** The keys, if any, that are base64 encoded inside of the Secret */
  propertiesToDecode?: Record<string, boolean>
}

export interface ExtractSecretArgs {
  SecretId: string
  keyOfTargetSecret: string
  isBase64Encoded?: boolean
}
