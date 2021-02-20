[DynamoDB](../../README.md#wrappers) **/** [Opinionated](../README.md) **/** [Very Opinionated](../README.md#very-opinionated) **/** Put Item
# Opinionated Put Item

A wrapper around `basicPutItem`. This uses the environment variables for the key names, so you only need to provide the item to store.

Optionally, you can provide the designated partition key and range key values, which will overwrite the keys in the provided item.

## Usage

```ts
import { putItem } from '@ihm-software/music-lab.common-aws-actions'

const anythingYouWantToStore = {
    partition: '123',
    range: '123',
    price: 123
}

const response = await putItem(anythingYouWantToStore)
```

## Arguments

| Name              | Type                                      |     Required?      | Description                                          |
| ----------------- | ----------------------------------------- | :----------------: | ---------------------------------------------------- |
| `itemToStore`       | `Record<string, any>`                                  | :white_check_mark: | The item you are going to write to Dynamo |
| `partitionKeyValue`          | `string` | :x: | The value to override the partition key of the stored item. **Must include both** this, and the `rangeKeyValue` |
| `rangeKeyValue` | `string`                                 |        :x:         | The value to override the range key of the stored item. **Must include both** this, and the `partitionKeyValue` |


## Overwriting Keys

In the following example, we are overwriting the keys inside of `anythingYouWantToStore`.

This can be useful when at the time of creating the object, the value of the keys may not be available.

```ts
import { putItem } from '@ihm-software/music-lab.common-aws-actions'

const anythingYouWantToStore = {
    partition: '123',
    range: '123',
    price: 123
}

const { partition, range } = fetchSomeThingINeedForKeys() 

const response = await putItem(anythingYouWantToStore, partition, range)
```

The alternative would be to override yourself.

```ts
const anythingYouWantToStore = {
    partition: '123',
    range: '123',
    price: 123
}

const objectIWillActuallyUse = {
  ...anythingYouWantToStore,
  partition: '234',
  range: '456'
}

const response = await putItem(objectIWillActuallyUse)
```