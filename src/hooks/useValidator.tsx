import { FieldErrors } from "react-hook-form"
import { messageErrorValidate } from "shared/enum";
import { ILogin } from "shared/interface";
type Filed = "phone" | "password";

const useValidator = () => {
    const validator = (filed: FieldErrors<ILogin>) => {
        const keyName = Object.keys(filed)[0] as Filed
        const dataMessage = messageErrorValidate[keyName]
        const type = filed[keyName]?.type as 'maxLength' | 'required'
        const message = dataMessage[type]
  
        return <span className="text-meta-1 text-red-600"><i>{message}</i></span>
    }    

    return {
        validator
    }
}

export default useValidator

