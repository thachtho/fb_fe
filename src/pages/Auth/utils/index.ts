const isValidVietnamPhoneNumber = (phone: string): boolean => {
    const vietnamPhoneNumberRegex = /^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return vietnamPhoneNumberRegex.test(phone);
}

export {
    isValidVietnamPhoneNumber
}