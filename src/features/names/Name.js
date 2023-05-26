import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useGetNamesQuery } from "./namesApiSlice"
import { memo } from "react"

const Name = ({nameId}) => {
    const { name } = useGetNamesQuery("namesList", {
        selectFromResult: ({ data }) => ({
            name: data?.entities[nameId]
        }),
    })
    const navigate = useNavigate()
    const { isAdmin } = useAuth()


    if (name) {
        
        const change = () => navigate(`/dashboard/names/${nameId}`)
        const roles = name.roles.toString().replaceAll(',', ', ')

        const status = name.active ? '' : 'inactive'

        return (
            <tr>
                <td className={`${status}`}>{name.name}</td>
                <td className={`${status}`}>{roles}</td>
                {(isAdmin) && <td className={`${status}`}>
                    <button onClick={change}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>}
            </tr>
        )
    } else return null;
}

const memoizedName = memo(Name)
export default memoizedName