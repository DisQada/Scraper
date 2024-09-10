/**
 * Removes the quotes from a string.
 * @param {string} str - The string to remove the quotes from.
 * @returns {string} The string without the quotes.
 */
export function removeQuotes(str) {
  if (str[0] === '"' || str[0] === "'") return str.slice(1, -1)
  return str
}
