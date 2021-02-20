[DynamoDB](../README.md) **/** Opinionated

# Opinionated Wrappers

These functions move further into abstraction away from the raw SDK.

- [Add to Existing Set](./add-to-existing-set.md)
- [Batch](./batch.md)
- [Increment](./increment.md)
- [Update](./update.md)
## Very Opinionated  

These functions are abstractions around the abstractions. They all assume the same thing, that you have set the env variables to what they expect.

The following are needed in the env to the proper values for these to work properly:

- `PARTITION_KEY_NAME` 
- `RANGE_KEY_NAME`
- `TABLE_NAME`

### Available Functions

- [Get Item](./very-opinionated/get-item.md)
- [Put Item](./very-opinionated/put-item.md)
- [Query](./very-opinionated/query.md)
