import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalstorage"
import useSocket from "./useSocket"
import { clearAllCookies } from "utils";

const useAuth = () => {
    const navigation = useNavigate();
    const { clearLocalStorage } = useLocalStorage()
    const { disConnect } = useSocket()

    const logOut = () => {
        clearLocalStorage()
        disConnect()
        clearAllCookies()
        navigation('/signin');
    }

    return {
        logOut
    }
}

export default useAuth