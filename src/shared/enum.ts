export enum LOCAL_STORAGE  {
    ORDER_SAVE = 'orderSave',
    USER_INFO = 'userInfo'
}

const notRequired = () => {
    return `không được để trống!.`
}

const notTooShort = () => {
    return `quá ngắn!.`
}

const notTooLong = () => {
    return `quá dài!.`
}

export const messageErrorValidate = {
    nickname: {
        required: `NickName ${notRequired()}`,
        maxLength: `NickName ${notTooLong()}`,
        minLength: `NickName ${notTooShort()}`
    },
    password: {
        required: `Password ${notRequired()}`,
        maxLength: `Password ${notTooLong()}`,
        minLength: `Password ${notTooShort()}`
    },
    fullname: {
        required: `Họ và tên ${notRequired()}`,
        maxLength: `Họ và tên ${notTooLong()}`,
        minLength: `Họ và tên ${notTooShort()}`
    },
    className: {
        required: `Tên lớp ${notRequired()}`,
        maxLength: `Tên lớp ${notTooLong()}`,
        minLength: `Tên lớp ${notTooShort()}`
    },
    teacherId: {
        required: `Giáo viên ${notRequired()}`,
        maxLength: `Giáo viên ${notTooLong()}`,
        minLength: `Giáo viên ${notTooShort()}`,
        min: `Giáo viên không được để trống`
    },
    phone: {
        required: `Số điện thoại ${notRequired()}`,
        maxLength: `Số điện thoại ${notTooLong()}`,
        minLength: `Số điện thoại ${notTooShort()}`,
        min: `Số điện thoại không được để trống`
    }

}
