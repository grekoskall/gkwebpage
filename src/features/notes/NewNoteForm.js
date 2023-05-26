import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ names }) => {
    const [addNewNote, {
        isLoading, isSuccess, isError, error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [nameId, setNameId] = useState(names[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setNameId('')
            navigate('/dashboard/notes')
        }
    }, [isSuccess, navigate])

    // Handlers
    const handleTitleChange = e => setTitle(e.target.value)
    const handleTextChange = e => setText(e.target.value)
    const handleNameIdChange = e => setNameId(e.target.value)

    const canSave = [title, text, nameId].every(Boolean) && !isLoading
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ name: nameId, title, text })
        }
    }

    const options = names.map(name => {
        return (
            <option
                key={name.id}
                value={name.id}
            >
                {name.name}
            </option>
        )
    })

    // Validation Classes
    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "invalid" : ''
    const validTextClass = !text ? "invalid" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form onSubmit={onSaveNoteClicked}>
                <div>
                    <h2>New Note</h2>
                    <div>
                        <button
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label htmlFor="title">
                    Title:
                </label>
                <input
                    className={`${validTitleClass}`}
                    id="title"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleTitleChange}
                />

                <label htmlFor="text">
                    Text:
                </label>
                <textarea 
                    className={`${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={handleTextChange}
                />
        
                <label htmlFor="name">
                    Assigned To:
                </label>
                <select
                    id="name"
                    name="name"
                    value={nameId}
                    onChange={handleNameIdChange}
                >
                    {options}
                </select>

            </form>
        </>
    )
    return content
}

export default NewNoteForm