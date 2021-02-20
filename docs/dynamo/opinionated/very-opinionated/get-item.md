[DynamoDB](../../README.md#wrappers) **/** [Opinionated](../README.md) **/** [Very Opinionated](../README.md#very-opinionated) **/** Get Item

# Opinionated Get Item

A wrapper around `get` in which you only need to pass the values of the partition key and range key.

I have not needed to `get` with only a partition key, so the range key is required. Submit a PR if you find the need to have it be optional.

## Usage

```ts
import { getItem, Key } from '@caldwell619/common-aws-actions'

const itemIAmLookingFor = await get('partitionKeyValue', 'rangeKeyValue')
```

## Arguments

| Name                  | Type      |     Required?      | Description                                                                                                          |
| --------------------- | --------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `partitionSearchTerm` | `string`  | :white_check_mark: | The value of the partition key you are searching for                                                                 |
| `rangeSearchTerm`     | `string`  | :white_check_mark: | The value of the range key you are searching for                                                                     |
| `shouldLogParams`     | `boolean` |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |
