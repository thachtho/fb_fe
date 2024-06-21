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
import { LOCAL_STORAGE } from "shared/constant";
import { ILogin } from "shared/interface";
import useApp from "state/useApp";
import useSocket from "hooks/useSocket";

const SignIn = () => {
  const navigation = useNavigate();
  const { setUserInfo } = useApp();
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
      navigation(`/`);
    } catch (error: any) {
      const statusCode = error?.response?.data?.statusCode 
      
      if (statusCode === 401) {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!')
      }
    }
  }

  useEffect(() => {
    if (storeExitUser) {
      navigation('/');
    }
  }, [])


  return (
    <>
      {
        // !storedValue ? <>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex justify-center items-center">
            <div className="flex flex-wrap items-center">
              <div className="hidden w-full xl:block xl:w-1/2">
                <div className="py-17.5 px-26 text-center">
                  <Link className="mb-5.5 inline-block" to="/">
                    <img className="hidden dark:block" src={Logo} alt="Logo" />
                    <img className="dark:hidden" src={LogoDark} alt="Logo" />
                  </Link>

                </div>
              </div>

              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
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
                          {...register("password", { required: true, maxLength: 20, minLength: 4 })}
                          type="password"
                          placeholder="Nhập mật khẩu"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
             
                      </div>
                      {errors.password ? validator(errors) : ''}
                    </div>
                    

                    <div className="mb-5">
                      <input
                        type="submit"
                        value="Đăng nhập"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 bg-emerald-600"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        // </> : <></> 
      }
    </>
  );
};

export default SignIn;