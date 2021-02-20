[Secrets Manager](./README.md#wrappers) / Get Secret

# Get Secret

Gets the metadata of an object stored in an S3 bucket

## Usage

```ts
import { getSecret, SecretsParams } from '@caldwell619/common-aws-actions/dist/secrets-manager/get-secret'

interface ExpectedSecret {
  key: string
}

const params: SecretsParams = {
  SecretId: '',
}

const { key } = await getSecret<ExpectedSecret>(params)
```

## Arguments

| Name            | Type                            |     Required?      | Description                      |
| --------------- | ------------------------------- | :----------------: | -------------------------------- |
| `secretsParams` | [SecretsParams](#secretsparams) | :white_check_mark: | Args needed to return the secret |

## Variance

There are lots of options when it comes to using this function.

### Extracting a Single Secret

This can be used when you only need one secret out of the lot. The argument is a little different, it uses [ExtractSecretArgs](#extractsecretargs)

```ts
import {
  extractSecretOutOfSecrets,
  ExtractSecretArgs,
} from '@caldwell619/common-aws-actions/dist/secrets-manager/get-secret'

const params: SecretsParams = {
  SecretId: '',
  keyOfTargetSecret: 'key',
}

const key = await extractSecretOutOfSecrets<ExpectedSecret>(params)
```

### Base64 Decoding

Often Secrets are encoded in base64 for a minor security bump. At the very least it makes it harder for primitive scripts to intercept plain text keys.

You can provide a map of the keys in the targeted secret that need to be decoded before returning the Secret.

```ts
const params: SecretsParams = {
  SecretId: '',
  propertiesToDecode: {
    key: true,
  },
}

// `key` will be decoded before being returned. All others will be untouched
const { key } = await extractSecretOutOfSecrets<ExpectedSecret>(params)
```

### Using a Mock Secret for Local Development

This is useful for local development where you don't need to hit Secrets Manager, thus having to pay for it's usage.

Instead you can return a shared mock that be used for development.

```ts
const params: SecretsParams = {
  SecretId: '',
  mockSecret: {
    key: '123',
  },
}

// This will not reach out to Secrets Manager, and return your mockSecret.
const { key } = await getSecret<ExpectedSecret>(params)
```

## Interfaces

### SecretsParams

| Name                 | Type                      |     Required?      | Description                                                   |
| -------------------- | ------------------------- | :----------------: | ------------------------------------------------------------- |
| `SecretId`           | `string`                  | :white_check_mark: | The ID of the Secret in AWS                                   |
| `mockSecret`         | `T`                       |        :x:         | If provided, this exact object will be returned as the Secret |
| `propertiesToDecode` | `Record<string, boolean>` |        :x:         | A map of properties that need to be decoded before returning  |

### ExtractSecretArgs

| Name                | Type      |     Required?      | Description                                                          |
| ------------------- | --------- | :----------------: | -------------------------------------------------------------------- |
| `SecretId`          | `string`  | :white_check_mark: | The ID of the Secret in AWS                                          |
| `keyOfTargetSecret` | `string`  |        :x:         | If provided, this specific key will be returned                      |
| `isBase64Encoded`   | `boolean` |        :x:         | If provided, this specific key will be decoded before it is returned |
