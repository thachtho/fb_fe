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

function regexPhoneNumber(inputString: string) {
  const phonePattern = /\d{10,11}/ // Biểu thức chính quy để tìm số điện thoại có độ dài từ 10 đến 11 chữ số

  const phoneNumber = inputString?.match(phonePattern)

  if (phoneNumber) {
    return phoneNumber[0]
  } else {
    return null
  }
}

function regexLocation(inputString: string) {
  inputString = inputString.replace(/<\/?[^>]+(>|$)/g, '')
  const regexs = [/^(.+?) đi/, /^(.+?) di/, /(.*?)(?=\s*[gG][iI][aA][oO])/]
  let startingLocation = ''

  for (const regex of regexs) {
    const match = inputString.match(regex)

    if (match && match[1]) {
      startingLocation = match[1].trim()
      startingLocation = startingLocation.replace(/^[nN][hH][ậâaă]?[nN]\s*/, '')
      break
    }
  }

  return startingLocation.length ? `${startingLocation}, TP. Đà Nẵng` : null
}

export {
  getAdvanceMoney,
  getFees,
  handleRemoveSpecialCharactersContent,
  regexPhoneNumber,
  regexLocation
}
