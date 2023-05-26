import React from 'react'
import { useParams } from 'react-router-dom'
import EditNameForm from './EditNameForm'
import useAuth from '../../hooks/useAuth'
import { useGetNamesQuery } from './namesApiSlice'
import { PacmanLoader } from 'react-spinners'

const ChangeName = () => {
    const { id } = useParams()
    const { isAdmin } = useAuth()
    const { name } = useGetNamesQuery("namesList", {
        selectFromResult: ({ data }) => ({
            name: data?.entities[id]
        }),
    })

    if (!isAdmin) {
        return (
            <p>
                Access Denied
            </p>
        )
    }
    if (!name) {
        return <PacmanLoader color={"#FFF"} />
    }

    const content = <EditNameForm name={name} /> 
    return content
}

export default ChangeName