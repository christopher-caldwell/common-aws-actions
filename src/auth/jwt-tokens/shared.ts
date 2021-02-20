import { extractSecretOutOfSecrets, ExtractSecretArgs } from '@/secrets-manager/'

/**
 * Will return the mock key if present, otherwise returns Secrets Manager signing key
 */
export const handlePotentialMockKey = async (
  secretsManagerParams: ExtractSecretArgs,
  mockSigningKey?: string
): Promise<string> => {
  if (mockSigningKey) return mockSigningKey

  return extractSecretOutOfSecrets(secretsManagerParams)
}

export default handlePotentialMockKey
