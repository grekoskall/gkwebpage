import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useGetNotesQuery } from "./notesApiSlice"
import { memo } from "react"

const Note = ({noteId}) => {
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })
    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long'})
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long'})

        const change = () => navigate(`/dashboard/notes/${noteId}`)

        return (
            <tr>
                <td>{created}</td>
                <td>{updated}</td>
                <td>{note.title}</td>
                <td>{note.name}</td>

                <td>
                    <button onClick={change}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote