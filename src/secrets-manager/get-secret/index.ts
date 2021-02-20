import SecretsManager from 'aws-sdk/clients/secretsmanager'

import { SecretsParams, ExtractSecretArgs } from './interfaces'
import { determineIfSecretIsEncoded, determineIfSecretObjectIsEncoded } from './helper'

const secretsManager = new SecretsManager()

/**
 * Fetches a secret from Secrets Manager
 * @param .propertiesToDecode `object?` Map of properties within your secret that need to be decoded.
 * Leave blank for none, `'*'` for all
 */
export const getSecret = async <T = Record<string, string>>(secretsParams: SecretsParams<T>): Promise<T> => {
  const { mockSecret, SecretId, propertiesToDecode } = secretsParams

  if (mockSecret) return mockSecret as T

  const { SecretString } = await secretsManager.getSecretValue({ SecretId }).promise()
  const secretValue: T = SecretString && JSON.parse(SecretString)
  return determineIfSecretObjectIsEncoded<T>(secretValue, propertiesToDecode)
}

export const extractSecretOutOfSecrets = async (secretsParams: ExtractSecretArgs): Promise<string> => {
  const { keyOfTargetSecret, isBase64Encoded } = secretsParams
  const secret = await getSecret(secretsParams)
  const targetSecret = secret[keyOfTargetSecret]
  return determineIfSecretIsEncoded(targetSecret, isBase64Encoded)
}

export { SecretsParams, ExtractSecretArgs }
