import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { login } from "../../../api/auth.api";
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';


import { login } from "api/auth.api";
import useLocalStorage from "hooks/useLocalstorage";
import useValidator from "hooks/useValidator";
import { ILogin } from "shared/interface";
import useApp from "state/useApp";
import useSocket from "hooks/useSocket";
import { LOCAL_STORAGE } from "shared/enum";
import useLogin from "../state";

const SignIn = () => {
  const { setIsLoginScreen } = useLogin()
  const navigation = useNavigate();
  const { setUserInfo, setIsCheckCrash } = useApp();
  const { validator } = useValidator()
  const { getLocalStorage, setLocalStorage } = useLocalStorage()
  const { connect } = useSocket()
  const storeExitUser = getLocalStorage(LOCAL_STORAGE.USER_INFO)

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const { data: loginResponse } = await login(data)

      const userInfo = {
        refreshToken: loginResponse?.refresh_token,
        phone: data.phone
      }
      setLocalStorage(LOCAL_STORAGE.USER_INFO, JSON.stringify(userInfo))
      setUserInfo(userInfo);
      connect();
      setIsCheckCrash(true)
      navigation(`/`);
    } catch (error: any) {
      const statusCode = error?.response?.data?.statusCode 
      
      if (statusCode === 403) {
        return toast.error(error?.response?.data?.message, {
          autoClose: 5000
        })
      }

      return toast.error('Lỗi hệ thống!', {
        autoClose: 500
      })
    }
  }

  useEffect(() => {
    if (storeExitUser) {
      navigation('/');
    }
  }, [])

  const redirectRegister = () => {
    setIsLoginScreen(false)
  }


  return (
    <>
      {
          <div className="bg-white mt-20">
            <div>

              <div className="">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="text-center mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Đăng nhập
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <input
                          {...register("phone", { required: true, maxLength: 11, minLength: 10 })}
                          type="text"
                          placeholder="Nhập số điện thoại"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
           
                      </div>
                      {errors.phone ? validator(errors) : ''}
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <input
                          {...register("password", { required: true, maxLength: 20, minLength: 1 })}
                          type="password"
                          placeholder="Nhập mật khẩu"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
             
                      </div>
                      {errors.password ? validator(errors) : ''}
                    </div>
                    

                    <div className="mb-5 flex flex-col justify-center items-center">
                      <input
                        type="submit"
                        value="Đăng nhập"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 bg-emerald-600"
                      />
                      <span className="mt-5 text-blue-600 cursor-pointer" onClick={() => redirectRegister()}>Đăng ký</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default SignIn;