export function sanitizeText(text: string): string {
  return text.replace(/\n|\t|\r/g, '')
}
