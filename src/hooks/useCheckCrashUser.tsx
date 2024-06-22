import { useEffect } from 'react'
import { LOCAL_STORAGE } from 'shared/enum'
import useApp from 'state/useApp'
import useAuth from './useAuth'
import useLocalStorage from './useLocalstorage'
import { getUserByPhone } from 'api/user.api'

function useCheckCrashUser() {
    const { logOut } = useAuth()
    const { getLocalStorage } = useLocalStorage()
    const { getIsCheckCrash } = useApp()

    const crashUser = async () => {
        const isCheckCrash = getIsCheckCrash()

        if (isCheckCrash) {
            const userLocal = JSON.parse(getLocalStorage(LOCAL_STORAGE.USER_INFO) || 'null');

            if (userLocal) {
                try {
                    const { data: user } = await getUserByPhone(userLocal.phone)

                    if (!user || (user && (user as any[]).length === 0)) {
                        return logOut()
                    }                      
                } catch (error) {}

            }          
        }
    }

    useEffect(() => {
        // Tạo một hàm async để gọi trong setInterval
        const callCrashUser = async () => {
            await crashUser();
        };

        // Thiết lập interval và lưu lại ID của nó
        const intervalId = setInterval(() => {
            callCrashUser();
        }, 10000);

        // Dọn dẹp interval khi component unmount
        return () => clearInterval(intervalId);
    }, [])
}

export default useCheckCrashUser
