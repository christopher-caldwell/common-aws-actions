[DynamoDB](./README.md#wrappers) **/** Batch Write

# Batch Write

Performs batch operations into Dynamo.

These can be either `put` or `delete` requests. Max is a batch of 20, your array will be chopped into chunks of 20 operations, and those chunks will be executed in parallel.

## Usage

```ts
import { batchWrite, IndividualBatchArg } from '@ihm-software/music-lab.common-aws-actions'

const operations: IndividualBatchArg[] = [
  {
    operationType: 'put',
    recordInformation: {
      someCoolStuff: 123,
    },
  },
  {
    operationType: 'put',
    recordInformation: {
      someCoolStuff: 1234,
    },
  },
]

// Will batch write 2 records to Dynamo
const responseFromDynamo = await batchWrite('table-name', operations)
```

## Arguments

| Name              | Type                  |     Required?      | Description                                                                                                          |
| ----------------- | --------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `tableName`       | `string`              | :white_check_mark: | The name of your DynamoDB table                                                                                      |
| `operations`      | `Record<string, any>` | :white_check_mark: | Any valid Dynamo item. Must include the partition key of the table.                                                  |
| `shouldLogParams` | `boolean`             |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |

## Interfaces

### IndividualBatchArg

| Name                | Type                                                                   |     Required?      | Description                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------- | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  |
| `operationType`     | `put                                                    |      delete` | :white_check_mark: | The type of op you are performing in this item                                                                                                                                                       |
| `recordInformation` | `Record<string, any>` / [DeleteRequest](#deleterequest)                | :white_check_mark: | What is being done to the table. This can either be a delete request, where the key is the only thing provided, or the record information for a put, meaning the record you wish to put into Dynamo. |
| `shouldLogParams`   | `boolean`                                                              |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected                                                                                 |

### DeleteRequest

| Name  | Type                     |     Required?      | Description                                    |
| ----- | ------------------------ | :----------------: | ---------------------------------------------- |
| `Key` | `Record<string, string>` | :white_check_mark: | The primary key of the item you want to delete |
