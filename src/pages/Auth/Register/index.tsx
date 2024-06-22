import { useState } from "react"
import { isValidVietnamPhoneNumber } from "../utils"
import { createUser } from "api/user.api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useLogin from "../state"

interface IOption {
    phone: string | null,
    password: string | null,
    rePassword: string | null
}

interface IError extends IOption{}
type OptionKey = 'phone' | 'password' | 'rePassword'

function Register() {
    const { setIsLoginScreen } = useLogin()
    const [option, setOption] = useState<IOption | null>(null)
    const [error, setError] = useState<IError | null>(null)

    const handleSubmit = async () => {
        const isValidate = validate();

        if (isValidate) {
            try {
                await createUser({
                    phone: option?.phone as string,
                    password: option?.password as string
                })

                toast('Đăng ký thành công!', {
                    autoClose: 1000
                })
                setIsLoginScreen(true)
            } catch (error: any) {
                toast(error?.response?.data?.message, {
                    autoClose: 1000
                })
            }
        }
    }

    const redirectLogin = () => {
        setIsLoginScreen(true)
    }

    const onChange = (value: string, key: OptionKey, func: Function) => {
        setError((error: any) => {
            return {
                ...error,
                [key]: ''
            }
        })
        func((pre: any) => {
            return {
                ...pre, [key]: value
            }
        })
    }

    const validate = () => {
        if (!option?.phone || option?.phone.length ===0) {
            onChange('Số điện thoại không được bỏ trống!', 'phone', setError)

            return;
        }

        if (!isValidVietnamPhoneNumber(option?.phone)) {
            onChange('Số điện thoại không đúng định dạng!', 'phone', setError)

            return;
        }

        if (!option?.password || option?.password.length === 0) {
            onChange('Mật khẩu không được bỏ trống!', 'password', setError)

            return;
        }

        if (option?.password && option?.password.length > 20) {
            onChange('Mật khẩu quá dài !', 'password', setError)

            return;
        }

        if (!option?.rePassword || option?.rePassword.length === 0) {
            onChange('Mật khẩu nhập lại không được bỏ trống!', 'rePassword', setError)

            return;
        }

        if (option?.rePassword && option?.rePassword.length > 20) {
            onChange('Mật khẩu nhập lại quá dài !', 'rePassword', setError)

            return;
        }

        if ((option?.password && option?.rePassword) && (option?.password !== option?.rePassword)) {
            onChange('Mật khẩu không khớp !', 'password', setError)

            return;
        }

        return true
    }

    return (
        <div className="bg-white mt-20">
            <div>
                <div className="">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="text-center mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Đăng ký
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Số điện thoại
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => onChange(e.target.value, 'phone', setOption)}
                                />
                
                            </div>
                            {error?.phone ? <ErrorMessage message={error?.phone} /> : ''}
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => onChange(e.target.value, 'password', setOption)}
                                />
                    
                            </div>
                            {error?.password ? <ErrorMessage message={error?.password} /> : ''}
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Nhập lại mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e) => onChange(e.target.value, 'rePassword', setOption)}
                                />
                    
                            </div>
                            {error?.rePassword ? <ErrorMessage message={error?.rePassword} /> : ''}
                        </div>
                        

                        <div className="mb-5 flex flex-col justify-center items-center"  onClick={() => handleSubmit()}>
                            <span
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 bg-emerald-600 text-center"
                               
                            >Đăng ký</span>
                            <span className="mt-5 text-blue-600 cursor-pointer text-center" onClick={() => redirectLogin()}>Đăng nhập</span>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ErrorMessage = ({ message }: { message: string }) => {
    return <span className="text-meta-1 text-red-600"><i>{message}</i></span>
}
export default Register
