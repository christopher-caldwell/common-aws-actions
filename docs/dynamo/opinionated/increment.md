[DynamoDB](../README.md#wrappers) **/** [Opinionated](./README.md) **/** Increment

# Opinionated Increment

A wrapper around `query`

## Usage

```ts
import { simpleIncrementItemProperty, IncrementValueArgs } from '@caldwell619/common-aws-actions'

const options: IncrementValueArgs = {
  propertyToUpdate: 'count',
  primaryKey: {
    partition: '123',
    range: '123',
  },
}

// Count will be one more than it used to be.
const response = await simpleIncrementItemProperty('table-name', options)
```

## Arguments

| Name              | Type                                      |     Required?      | Description                                          |
| ----------------- | ----------------------------------------- | :----------------: | ---------------------------------------------------- |
| `tableName`       | `string`                                  | :white_check_mark: | The value of the partition key you are searching for |
| `config`          | [IncrementValueArgs](#incrementvalueargs) | :white_check_mark: | The config to increment                              |
| `shouldLogParams` | `boolean`                                 |        :x:         | If present, params will be logged.                   |

## IncrementValueArgs

| Name                 | Type                     |     Required?      | Description                                                   |
| -------------------- | ------------------------ | :----------------: | ------------------------------------------------------------- |
| `propertyToUpdate`   | `string`                 | :white_check_mark: | The property you are incrementing                             |
| `primaryKey`         | `Record<string, string>` | :white_check_mark: | The primary key of the item you are incrementing              |
| `numberToIncreaseBy` | `number`                 | :x: | The amount you are increasing the original by. Default is `1` |
