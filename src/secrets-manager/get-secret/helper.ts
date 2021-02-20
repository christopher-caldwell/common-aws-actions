import { checkIfObjectHasLength } from '@/utils'

/**
 * Takes an encoded value, returns decoded
 * @param encodedValue Base64 encoded value
 */
export const base64Decode = (encodedValue: string): string => {
  return Buffer.from(encodedValue, 'base64').toString('utf-8') // eslint-disable-line new-cap
}

/**
 * Will decode properties if the key is present in the base64 map, or if using a wild card
 * @param keyOfProperty
 * @param valueOfProperty Value that may or may not be base64
 * @param propertiesToDecode A map of object properties that are decoded. Leave blank for none, `'*'` for all
 */
export const decodeIfValueIsBase64 = (
  keyOfProperty: string,
  valueOfProperty: string,
  propertiesToDecode?: Record<string, boolean> | string
): string => {
  const isUsingWildcard = typeof propertiesToDecode === 'string' && propertiesToDecode === '*'
  if (isUsingWildcard) {
    return base64Decode(valueOfProperty)
  }
  if (typeof propertiesToDecode !== 'string' && propertiesToDecode && propertiesToDecode[keyOfProperty]) {
    return base64Decode(valueOfProperty)
  }
  return valueOfProperty
}

/**
 * Decodes an encoded object. All properties must be encoded
 * @param encodedObject
 * @param propertiesToDecode A map of object properties that are decoded. Leave blank for none, `'*'` for all
 */
export const decodeObject = <T>(encodedObject: T, propertiesToDecode?: Record<string, boolean> | string): T => {
  const decodedObject: Record<string, string> = {}
  const objMap = Object.entries(encodedObject)
  objMap.forEach(entry => {
    const key = entry[0]
    const value = entry[1]
    decodedObject[key] = decodeIfValueIsBase64(key, value, propertiesToDecode)
  })
  return (decodedObject as unknown) as T
}

/**
 * Decodes secret if applicable, returns the secret as a normal string
 */
export const determineIfSecretIsEncoded = (secretValue: string, isBase64Encoded?: boolean): string => {
  if (isBase64Encoded) {
    return base64Decode(secretValue)
  }
  return secretValue
}

/**
 * If applicable, will decode the entire secret object from `base64` to `utf-8`
 */
export const determineIfSecretObjectIsEncoded = <T>(
  secretObject: T,
  propertiesToDecode?: Record<string, boolean>
): T => {
  const isBase64Encoded = checkIfObjectHasLength(propertiesToDecode)
  return isBase64Encoded ? decodeObject<T>(secretObject, propertiesToDecode) : secretObject
}
