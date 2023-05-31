import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import useAuth from '../../hooks/useAuth'
import style from '../../config/tailwindClasses'

const NotesList = () => {
    const { name, isAdmin, isVip } = useAuth()
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    if (isLoading) content = <p>Loading</p>
    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isAdmin || isVip) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].name === name)
        }

        const table = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <table className='table-auto text-center min-w-full mb-4 mt-8 text-xl'>
                <thead className={`${style.accentTextDark}`}>
                    <tr>
                        <th scope="col">Created</th>
                        <th scope="col">Updated</th>
                        <th scope="col">Title</th>
                        <th scope="col">From</th>
                        <th scope="col">Change</th>
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

export default NotesList