[DynamoDB](../README.md#wrappers) **/** [Opinionated](./README.md) **/** Batch Write

# Batch Write

Performs operations in batches of 20. You can pass an array of any length, and it will write or delete all of them.

## Usage

```ts
import { handleBatchWrite } from '@ihm-software/music-lab.common-aws-actions'

const itemsToWrite = [
  {
    name: 'Apple',
    price: 21,
  },
  {
    name: 'Carrot',
    price: 123,
  },
]

await handleBatchWrite(itemsToWrite, 'table-name', 'put')
```

## Arguments

| Name            | Type                  |     Required?      | Description                                                                                                                |
| --------------- | --------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------------- |
| `baseData`      | `Record<string, any>` | :white_check_mark: | The items or operations that will be batched                                                                               |
| `tableName`     | `string`              | :white_check_mark: | The name of the table.                                                                                                     |
| `operationType` | `put` / `delete`      |        :x:         | The type of operation being done. Default is `put`. If `delete`, `baseData` must be the primary key of the item to delete. |
