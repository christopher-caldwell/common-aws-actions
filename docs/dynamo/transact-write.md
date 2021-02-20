[DynamoDB](./README.md#wrappers) **/** Transact Write

# Transact Write

Performs a series of transactional operations. Either all are successful, or none are.

This is useful for changing primary keys. You cannot update a primary key, it has to be deleted and replaced. This allows you to do so with the peace of mind that you will not lose your original object without replacing it successfully.

## Usage

```ts
import { transactWrite, Operation } from '@caldwell619/common-aws-actions'

const operations: Operation[] = [
  {
    operationType: 'delete',
    tableName: '',
    recordInformation: {
      partition: 'original@email.com',
      range: '1',
    },
  },
  {
    operationType: 'put',
    tableName: '',
    recordInformation: {
      partition: 'new@email.com',
      range: '1',
    },
  },
]

/**
 * In this example, a user has changed their email, which you are using  as a partition key.
 *
 * This deletes their old profile, and replaces it with the new email.
 */
const responseFromDynamo = await transactWrite(operations)
```

## Arguments

| Name              | Type                      |     Required?      | Description                                                                                                          |
| ----------------- | ------------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `operations`      | [Operation[]](#operation) | :white_check_mark: | A list of transactional operations                                                                                   |
| `shouldLogParams` | `boolean`                 |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |

## Interfaces

### Operation

| Name                | Type                  |     Required?      | Description                                                                                                                                                                                                                                          |
| ------------------- | --------------------- | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------ | ---------------------------------------------- |
| `operationType`     | `put                  |       delete       | update                                                                                                                                                                                                                                               | conditionCheck` | :white_check_mark: | The type of op you are performing in this item |
| `tableName`         | `string`              | :white_check_mark: | Dynamo table being used for **this operation**                                                                                                                                                                                                       |
| `recordInformation` | `Record<string, any>` | :white_check_mark: | What is being done to the table. This can either be a delete request, where the key is the only thing provided, or the record information for a put, meaning the record you wish to put into Dynamo.                                                 |
| `otherParams`       | `Record<string, any>` |        :x:         | Transact operations have many options. This object will be spread and given to the SDK if you need further customization. See the full reference [here](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html). |
