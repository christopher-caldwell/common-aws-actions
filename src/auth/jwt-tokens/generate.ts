import { sign } from 'jsonwebtoken'

import { ExtractSecretArgs } from '@/secrets-manager/get-secret/interfaces'

import { handlePotentialMockKey } from './shared'

/**
 * Creates and signs a JWT token
 */
export const generateToken = <Payload extends string | object>(
  payload: Payload,
  expiresIn: string | number,
  signingKey: string
): string => {
  const token = sign(payload, signingKey, { expiresIn })
  return token
}

export const generateTokenWithSecretsManager = async <Payload extends string | object>(
  secretsManagerParams: ExtractSecretArgs,
  payloadToEncode: Payload,
  expiresIn: string | number,
  mockSigningKey?: string
): Promise<string> => {
  const signingKey = await handlePotentialMockKey(secretsManagerParams, mockSigningKey)

  if (typeof signingKey !== 'string') throw new Error('Signing key is not a string')

  const token = generateToken(payloadToEncode, expiresIn, signingKey)
  return token
}
