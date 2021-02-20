/**
 * Capitalizes a word
 */
export const capitalizeWord = (wordToCapitalize: string): string => {
  const firstLetterCapitalized = wordToCapitalize[0].toUpperCase()
  const restOfWordLowerCased = wordToCapitalize.substr(1).toLowerCase()
  return firstLetterCapitalized + restOfWordLowerCased
}

export const checkIfObjectHasLength = <T = Record<string, unknown>>(objectToCompare?: T): boolean =>
  objectToCompare ? !!Object.keys(objectToCompare).length : false
