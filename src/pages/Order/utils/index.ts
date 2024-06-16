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

const regexDistance = async (data: string) => {
  // const response = await axios.get(
  //   `https://www.google.com/maps/dir/16.0540029,+108.2090995/52%20Nguy%E1%BB%85n%20S%C6%A1n%2C%20Ho%C3%A0%20C%C6%B0%E1%BB%9Dng%20Nam%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%2C%20Vi%E1%BB%87t%20Nam`
  // )
  // const data = JSON.stringify(response.data).substring(0, 40000)
  const regex = /(\d+\.\d+ km)/g
  const results = []
  let match
  // Sử dụng vòng lặp để tìm tất cả các kết quả phù hợp
  while ((match = regex.exec(data)) !== null) {
    results.push(match[1])
  }

  // In ra kết quả
  console.log(results) // Output: ["6.6 km", "6.6 km", "3.7 km"]
}

export {
  getAdvanceMoney,
  getFees,
  handleRemoveSpecialCharactersContent,
  regexPhoneNumber,
  regexLocation,
  regexDistance
}
