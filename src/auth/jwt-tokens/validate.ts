import { verify } from 'jsonwebtoken'

import { ExtractSecretArgs } from '@/secrets-manager/get-secret/interfaces'

import { handlePotentialMockKey } from './shared'
/**
 * Verifies the validity of a JWT, and returns the signed payload
 */
export const validateToken = <ContentOfToken>(givenToken: string, signingKey: string): string | ContentOfToken => {
  const tokenData = verify(givenToken, signingKey)
  return tokenData as ContentOfToken | string
}

/** Verifies the validity of a JWT with a key stored in Secrets Manager */
export const validateTokenWithSecretsManager = async <ContentOfToken>(
  secretsManagerParams: ExtractSecretArgs,
  givenToken: string,
  mockSigningKey?: string
): Promise<string | ContentOfToken> => {
  const signingKey = await handlePotentialMockKey(secretsManagerParams, mockSigningKey)

  if (typeof signingKey !== 'string') throw new Error('Signing key is not a string')

  const decodedPayload = validateToken<ContentOfToken>(givenToken, signingKey)
  return decodedPayload
}
