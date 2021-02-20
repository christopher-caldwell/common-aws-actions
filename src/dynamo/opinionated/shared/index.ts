export const partitionKeyName = process.env.PARTITION_KEY_NAME as string
export const rangeKeyName = process.env.RANGE_KEY_NAME as string
export const tableName = process.env.TABLE_NAME as string

export const validateEnv = (): void => {
  if (!partitionKeyName || !rangeKeyName || !tableName) {
    throw new Error(`Environment variables are not properly configured.
    Expected:
      PARTITION_KEY_NAME: ${process.env.PARTITION_KEY_NAME}
      RANGE_KEY_NAME: ${process.env.RANGE_KEY_NAME}
      TABLE_NAME: ${process.env.TABLE_NAME}
    `)
  }
}
