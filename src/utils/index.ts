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
