import { store } from "../../app/store"
import { notesApiSlice } from "../notes/notesApiSlice"
import { namesApiSlice } from "../names/namesApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(namesApiSlice.util.prefetch('getNames', 'namesList', { force: true }))
    }, [])

    return <Outlet />
}

export default Prefetch