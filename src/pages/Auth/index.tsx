import SignIn from './Login'
import Register from './Register'
import useLogin from './state'

function Auth() {
    const { isLoginScreen } = useLogin()

    return (
        <>
            {isLoginScreen ? <SignIn /> : <Register />}
        </>
    )
}

export default Auth
