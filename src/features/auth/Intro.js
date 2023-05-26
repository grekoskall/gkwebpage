import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Intro = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short'}).format(date)
    const { name, isAdmin, isVip } = useAuth()
    const content = (
        <section>
            <p>{today}</p>
            <h1>Hello {name}!</h1>
            <p><Link to="/dashboard/notes">Check the Notes</Link></p>
            <p><Link to="/dashboard/notes/new">Add new Note</Link></p>
            {(isAdmin || isVip) && <p><Link to="/dashboard/names">Inspect the Names</Link></p>}
            {(isAdmin) && <p><Link to="/dashboard/names/new">Add new Name</Link></p>}


        </section>
    )
    
    return content
}

export default Intro