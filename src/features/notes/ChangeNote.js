import React from 'react'
import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetNamesQuery } from '../names/namesApiSlice'
import useAuth from '../../hooks/useAuth'
import PacmanLoader from 'react-spinners/PacmanLoader'


const ChangeNote = () => {
    const { id } = useParams()
    const { name, isAdmin, isVip } = useAuth()
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })
    const { names } = useGetNamesQuery("namesList", {
        selectFromResult: ({ data }) => ({
            names: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !names?.length) {
        return <PacmanLoader color={"#FFF"} />
    }

    if (!isAdmin && !isVip) {
        if (note.name !== name) {
            return <p className="errmsg">Access Denied</p>
        }
    }

    const content = <EditNoteForm note={note} names={names} />


    return content
}

export default ChangeNote