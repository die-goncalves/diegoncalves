export function time(content: string) {
  const wordsPerMinute = 200
  const regex = /\w+/g
  const codeBlockRegex = /`{3}[\w\W]*?`{3}/gm
  const totalWords = content.match(regex)?.length ?? 0
  const totalCodeBlocks = content.match(codeBlockRegex)

  const wordsInCodeBlocks =
    totalCodeBlocks?.reduce((accumulator, currentValue) => {
      const wordCount = currentValue.match(regex)?.length ?? 0
      return accumulator + wordCount
    }, 0) ?? 0

  const time = Math.ceil((totalWords - wordsInCodeBlocks) / wordsPerMinute)

  return time
}
