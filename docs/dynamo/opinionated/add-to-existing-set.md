[DynamoDB](../README.md#wrappers) **/** [Opinionated](./README.md) **/** Add to Existing Set

# Add to Existing Set

Adds entries to an existing array inside of a record

The property storing the array must be at the root level of the record. This function will add the item given to the end of that existing array.

## Usage

```ts
import { addToItemSet, AddToSetArgs } from '@caldwell619/common-aws-actions'

const args: AddToSetArgs = {
  propertyToUpdate: 'items',
  primaryKey: {
    partition: '123',
    range: '456',
  },
  itemToAdd: {
    name: 'Carrot',
    price: 123,
  },
}

// Will update the key items to include the new `Carrot` item with price `123`
// The response will vary based on your `returnValues` input.
const responseFromDynamo = await addToItemSet('table-name', operations)
```

## Arguments

| Name              | Type                          |     Required?      | Description                                                                                                          |
| ----------------- | ----------------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `tableName`       | `string`                      | :white_check_mark: | The name of your DynamoDB table                                                                                      |
| `args`            | [AddToSetArgs](#addtosetargs) | :white_check_mark: | The arguments used to add the item to the existing set.                                                              |
| `shouldLogParams` | `boolean`                     |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |

## AddToSetArgs

| Name               | Type                                              |     Required?      | Description                                                                                                                                                                              |
| ------------------ | ------------------------------------------------- | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `propertyToUpdate` | `string`                                          | :white_check_mark: | The name of the property inside the record that is being updated                                                                                                                         |
| `primaryKey`       | `Record<string, any>`                             | :white_check_mark: | The key of the item you are updating                                                                                                                                                     |
| `itemToAdd`        | `string` / `boolean` / `number` / `null` / `AttributeMap` | :white_check_mark: | The item being added to the existing set                                                                                                                                                 |
| `returnValues`     | `string`                                          |        :x:         | A [Dynamo option](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-ReturnValues) which influences the return value of the call. |
