import React from 'react'
import { useGetNamesQuery } from './namesApiSlice'
import Name from './Name'
import style from '../../config/tailwindClasses'
import useAuth from '../../hooks/useAuth'

const NamesList = () => {
    const {
        data: names,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNamesQuery('namesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const { isAdmin, isVip } = useAuth()

    let content

    if (isLoading) content = <p>Loading...</p>
    if (isError) {
        content = <p>{error?.data?.message}</p>
    }
    if (!isAdmin && !isVip) {
        return <p>Access Denied</p>
    }
    if (isSuccess) {
        const { ids } = names
        const table = ids?.length && ids.map(nameId => <Name key={nameId} nameId={nameId} />)

        content = (
            <table className='table-auto text-center min-w-full mb-4 mt-8 text-xl'>
                <thead className={`${style.accentTextDark}`}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Roles</th>
                        {(isAdmin) && <th scope="col">Change</th>}
                    </tr>
                </thead>
                <tbody className={`${style.plainTextDark}`}>
                    {table}
                </tbody>
            </table>
        )
    }
    return content
}

export default NamesList