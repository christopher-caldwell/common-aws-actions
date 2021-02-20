import { SecretsParams } from '../../../src/secrets-manager/lib/lib/getSecretValueInterface'

export const keyOfTargetSecret = 'key'
export const expectedValueOfSecret = 'secret'
export const secretId = '123'
export const decodedBase64Value = 'decoded'
export const encodedBase64Value = 'ZGVjb2RlZA=='

export const fetchedSecret = {
  [keyOfTargetSecret]: expectedValueOfSecret,
  encodedBase64Value,
}

export const secretsRequestWithMockArgs: SecretsParams = {
  SecretId: secretId,
  mockSecret: fetchedSecret,
}

export const secretsRequestWithTargetSecretArgs: SecretsParams = {
  SecretId: secretId,
  keyOfTargetSecret,
}

export const secretsRequestWithoutTargetSecretArgs: SecretsParams = {
  SecretId: secretId,
}

export const secretsRequestBase64Args: SecretsParams = {
  SecretId: secretId,
  isBase64Encoded: true,
  propertiesToDecode: {
    encodedBase64Value: true,
  },
}

export const secretsRequestBase64ArgsAndTargetProperty: SecretsParams = {
  SecretId: secretId,
  keyOfTargetSecret: 'encodedBase64Value',
  isBase64Encoded: true,
  propertiesToDecode: {
    encodedBase64Value: true,
  },
}

export const improperlyConfiguredKeyOfTargetSecret: SecretsParams = {
  SecretId: secretId,
  keyOfTargetSecret: "SOME_KEY_THAT_DOESN'T_EXITS",
}

export const encodedObject = {
  someValue: encodedBase64Value,
  someOtherValue: encodedBase64Value,
}
export const propertiesToDecodeSingleProperty = {
  someValue: true,
}
export const propertiesToDecodeAllProperties = {
  someValue: true,
  someOtherValue: true,
}
export const decodedObjectWhenOnlyOnePropertyShouldBeDecoded = {
  someValue: decodedBase64Value,
  someOtherValue: encodedBase64Value,
}
export const decodedObjectWhenAllPropertiesShouldBeDecoded = {
  someValue: decodedBase64Value,
  someOtherValue: decodedBase64Value,
}
