import {
  base64Decode,
  decodeIfValueIsBase64,
  determineIfSecretIsEncoded,
  decodeObject,
  determineIfSecretObjectIsEncoded,
} from '../../../src/secrets-manager/lib/lib/base64Decode'

import {
  encodedBase64Value,
  decodedBase64Value,
  keyOfTargetSecret,
  encodedObject,
  decodedObjectWhenOnlyOnePropertyShouldBeDecoded,
  decodedObjectWhenAllPropertiesShouldBeDecoded,
  propertiesToDecodeSingleProperty,
  propertiesToDecodeAllProperties,
} from '../test-data/secretsManager'

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Secrets Manager - Base64 Decoding', () => {
  test('Decoding a single value returns the proper value', () => {
    const decodedValue = base64Decode(encodedBase64Value)
    expect(decodedValue).toBe(decodedBase64Value)
  })
  test('Decoding a single value using a wildcard', () => {
    const decodedValue = decodeIfValueIsBase64(keyOfTargetSecret, encodedBase64Value, '*')
    expect(decodedValue).toBe(decodedBase64Value)
  })
  test('Decoding a single value from the properties to decode list', () => {
    const decodedValue = decodeIfValueIsBase64(keyOfTargetSecret, encodedBase64Value, {
      [keyOfTargetSecret]: true,
    })
    expect(decodedValue).toBe(decodedBase64Value)
  })
  test('If a value exists on the secret, but is not specified in the properties to decode, it is returned as is', () => {
    const returnedValue = decodeIfValueIsBase64(keyOfTargetSecret, encodedBase64Value, {
      decodeSomeValue: true,
    })
    expect(returnedValue).toBe(encodedBase64Value)
  })
  test('If told the value is Base64, it is returned decoded', () => {
    const decodedValue = determineIfSecretIsEncoded(encodedBase64Value, true)
    expect(decodedValue).toBe(decodedBase64Value)
  })
  test('If told the value is not Base64, it is returned as is', () => {
    const decodedValue = determineIfSecretIsEncoded(encodedBase64Value)
    expect(decodedValue).toBe(encodedBase64Value)
  })
  test('Properly decoding the entire object when none of the values should be decoded', () => {
    const attemptedDecodedObject = decodeObject(encodedObject)
    expect(attemptedDecodedObject).toStrictEqual(encodedObject)
  })
  test('Properly decoding the object when only one of the values should be decoded', () => {
    const attemptedDecodedObject = decodeObject(encodedObject, propertiesToDecodeSingleProperty)
    expect(attemptedDecodedObject).toStrictEqual(decodedObjectWhenOnlyOnePropertyShouldBeDecoded)
  })
  test('Properly decoding the entire object when all of the values should be decoded', () => {
    const attemptedDecodedObject = decodeObject(encodedObject, propertiesToDecodeAllProperties)
    expect(attemptedDecodedObject).toStrictEqual(decodedObjectWhenAllPropertiesShouldBeDecoded)
  })
  test('Full run through - base64', () => {
    const attemptedDecodedObject = determineIfSecretObjectIsEncoded(
      encodedObject,
      true,
      propertiesToDecodeAllProperties
    )
    expect(attemptedDecodedObject).toStrictEqual(decodedObjectWhenAllPropertiesShouldBeDecoded)
  })
  test('Full run through - not base64', () => {
    const attemptedDecodedObject = determineIfSecretObjectIsEncoded(encodedObject, false)
    expect(attemptedDecodedObject).toStrictEqual(encodedObject)
  })
})
