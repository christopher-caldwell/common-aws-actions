# DynamoDB

Dynamo is a bit of pain to setup. These helpers aim to reduce the amount of boilerplate you need to have in order to be a consumer of the tool.

## Setup

Each Dynamo helpers uses a shared instance of the [Document Client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html). 

Dynamo has a quirky way of keeping track of data types inside of your records. If you went to access them how you normally would a JSON object, it would likely return undefined, as your data is structured in a way you might not expect.

## Local Usage

By default, the Dynamo helpers use the environment variables to properly direct your calls. The code for that is [here](../../src/dynamo/shared/index.ts)

If your env of `STAGE` says local, calls will be directed to `http://localhost:8000`, which is the default bridge for DynamoDB's Docker image.

If you are using SAM or if the env of `SERVERLESS_USE_CONTAINER`, it will direct it at the internal networking bridge of Docker, `http://host.docker.internal:8000`.

Finally, you can set your own endpoint using `DYNAMO_ENDPOINT`. This takes precedence over previous endpoint determinations.

## Wrappers

There are a set of simple wrapper around the various Dynamo functions that are designed to eliminate setting up the Dynamo instance with redundant code. 

These expose basically the same functionality as the SDK, without having to instantiate the instance each time.

- [Batch Write](./batch-write.md)
- [Delete Item](./delete-item.md)
- [Get Item](./get-item.md)
- [Put Item](./put-item.md)
- [Query](./query.md)
- [Transact Write](./transact-write.md)
- [Update Item](./update-item.md)

## Opinionated

If you want an abstraction where you don't have to deal with much, there are a set of opinionated functions that can help with common use cases.

See the [opinionated wrappers](./opinionated/README.md)
