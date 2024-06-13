export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function regexPhoneNumber(inputString: string) {
  const phonePattern = /\d{10,11}/ // Biểu thức chính quy để tìm số điện thoại có độ dài từ 10 đến 11 chữ số

  const phoneNumber = inputString?.match(phonePattern)

  if (phoneNumber) {
    return phoneNumber[0]
  } else {
    return null
  }
}

export function regexLocation(inputString: string) {
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
