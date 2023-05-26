import React from 'react'
import { useState, useEffect } from 'react'
import { useAddNewNameMutation } from './namesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'
import useAuth from '../../hooks/useAuth'

const NAME = /^[A-z]{3,20}$/
const PWD = /^[A-z0-9!@#$%]{4,12}$/

const NewNameForm = () => {
    const [addNewName, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNameMutation()
    const {isAdmin} = useAuth()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Persona"])

    // Verification of info
    useEffect(() => {
        setValidName(NAME.test(name))
    }, [name])

    useEffect(() => {
        setValidPassword(PWD.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPassword('')
            setRoles([])
            navigate('/dashboard/names')
        }
    }, [isSuccess, navigate])

    if (!isAdmin) {
        return <p>Access Denied</p>
    }

    // Handlers
    const handleNameChange = e => setName(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleRoleChange = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    // Save
    const canSave = [roles.length, validName, validPassword].every(Boolean) && !isLoading

    const onSaveNameClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewName({ name, password, roles})
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}>
                    {role}
                </option>
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !validName ? 'invalid' : ''
    const validPwdClass = !validPassword ? 'invalid' : ''
    const validRolesClass = !Boolean(roles.length) ? 'invalid' : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form onSubmit={onSaveNameClicked}>
                <div>
                    <h2>New Name</h2>
                    <div>
                        <button title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label htmlFor="name">
                    Name: <span>[3-20 letters]</span>
                </label>
                <input 
                    className={`${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={handleNameChange}
                />

                <label htmlFor="password">
                    Password: <span>[4-12 chars]</span>
                </label>
                <input 
                    className={`${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <label htmlFor="roles">
                    Assigned Roles:
                </label>
                <select
                    id="roles"
                    name="roles"
                    className={`${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={handleRoleChange}
                >
                    {options}
                </select>
            </form>
        </>
    )

    return content
}


export default NewNameForm