import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import PacmanLoader from "react-spinners/PacmanLoader"


const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const [refresh, {
        isUninitialized, isLoading, isSuccess, isError, error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('Refresh Token Verification')
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) {
                verifyRefreshToken()
            }
        }

        return () => effectRan.current = true // Clean-up function

        // eslint-disable-next-line
    }, [])

    let content
    if (!persist) {
        console.log('No Persist')
        content = <Outlet />
    } else if (isLoading) {
        console.log('Loading')
        content = <PacmanLoader color={"#FFF"} />
    } else if (isError) {
        console.log('Error')
        content = (
            <p>
                {`${error.data?.message} - `}
                <Link to="/login">Back to Login</Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log('Success')
        content = <Outlet />
    } else if (token && isUninitialized) {
        console.log('Uninitialized')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin