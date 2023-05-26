import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import PacmanLoader from "react-spinners/PacmanLoader"

const Login = () => {
  const nameRef = useRef()
  const errRef = useRef()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()
  const [persist, setPersist] = usePersist()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [name, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ name, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setName('')
      setPassword('')
      navigate('/dashboard')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Response')
      } else if (err.status === 400) {
        setErrMsg('Missing information')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleNameInput = (e) => setName(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handlePersist = () => setPersist(prev => !prev)

  const errClass = errMsg ?  "errmsg" : "offscreen"
  if (isLoading) {
    return <PacmanLoader color={"#FFF"} />
  }

  const content = (
    <section>
      <header>
        <h1>Persona Login</h1>
      </header>
      <main>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            ref={nameRef}
            value={name}
            onChange={handleNameInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />

          <button>Sign In</button>

          <label htmlFor="persist">
            <input 
              type="checkbox"
              id="persist"
              onChange={handlePersist}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
        <div>
          <p>
            Some Names you can use to login:
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Ladd Russo</td>
              <td>Persona</td>
            </tr>
            <tr>
              <td>Firo Prochainezo</td>
              <td>Vip</td>
            </tr>
            <tr>
              <td>Chane Laforet</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>Felix Walken</td>
              <td>Persona</td>
            </tr>
            </tbody>
          </table>
            Password is the same as the full name.
          </p>
        </div>
      </main>
      <footer>
        <Link to="/">Homepage</Link>
      </footer>
    </section>

  )

  return content
}

export default Login