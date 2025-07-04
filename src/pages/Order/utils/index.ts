import { danang } from 'city/danang'
import { IDistance } from 'shared/interface';
import { getDistance } from 'geolib';

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

const getAddress = (content: string) => {
  for (const district of danang.district) {
    const data = getStreet(district.street, content)

    if (data) {
      const fullData = `${data}, ${district.name}, ${danang.name}, Việt Nam`
      return fullData
    }
  }

  return null
}

const getStreet = (streets: string[], content: string) => {
  for (const street of streets) {
    const lowerCaseStr = content.toLowerCase()
    const lowerCaseSubStr = street.toLowerCase()
    const data = lowerCaseStr.includes(lowerCaseSubStr)

    if (data) {
      return street
    }
  }

  return null
}

function calculateDistance(locationA: IDistance, locationB: IDistance) {
    const distance = getDistance(
      locationA,
      locationB
    );

    return distance ? parseFloat((distance / 1000).toFixed(1)) : null;
}

export {
  getAdvanceMoney,
  getFees,
  handleRemoveSpecialCharactersContent,
  regexPhoneNumber,
  getAddress,
  calculateDistance
}
