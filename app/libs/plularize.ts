export const pluralize = (amount: number, word: string) => {
  return `${amount} ${amount > 1 ? `${word}s` : word}`;
}
