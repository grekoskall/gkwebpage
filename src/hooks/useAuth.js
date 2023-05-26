import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isVip = false
    let status = "Persona"

    if (token) {
        const decoded = jwtDecode(token)
        const { name, roles } = decoded.NameInfo

        isAdmin = roles.includes('Admin')
        isVip = roles.includes('Vip')

        if (isAdmin) {
            status = "Admin"
        }
        if (isVip) {
            status = "Vip"
        }

        return {
            name,
            roles,
            status,
            isAdmin,
            isVip
        }
    }

    return {
        name: '',
        roles: [],
        isAdmin,
        isVip,
        status
    }
}

export default useAuth