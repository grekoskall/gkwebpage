import { Link } from "react-router-dom";
import React from 'react'

const Main = () => {
    const content = (
        <section>
            <header>
                <h1>
                    Welcome to <span>my page!</span>
                </h1>
            </header>
            <main>
                <p>
                    This is a personal page for recreational purposes. Feel free to explore!
                </p>
                <address>
                    Gregory Kallinikos<br />
                    Greece, Athens<br />
                </address>
            </main>
            <footer>
                <Link to="/login">Login with a custom Name</Link>
            </footer>
        </section>
    )

    return content
}

export default Main