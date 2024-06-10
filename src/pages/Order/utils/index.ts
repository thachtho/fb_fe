const handleRemoveSpecialCharactersContent = (content: string) => {
  return content.replace(/<br\s*class="html-br">/g, ', ')
}

const getFees = (content: string) => {
  const regex = /(?:phí|phi|Phi|Phí|PHI|PHÍ)\s+(\d+)/i
  const regex1 = /[Pp](\d+)/

  return getValueByRgex(content, regex) || getValueByRgex(content, regex1)
}

const getAdvanceMoney = (content: string) => {
  const regex = /(?:ứng|ưng|ung|Ứng|UNG|ỨNG)\s+(\d+)/i
  const regex1 = /[Uu](\d+)/

  return getValueByRgex(content, regex) || getValueByRgex(content, regex1)
}

const getValueByRgex = (content: string, regex: RegExp) => {
  const match = content.match(regex)
  if (match) {
    return match[1]
  }

  return null
}

export { getAdvanceMoney, getFees, handleRemoveSpecialCharactersContent }
