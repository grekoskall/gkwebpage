import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import PacmanLoader from "react-spinners/PacmanLoader";
import { faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../config/tailwindClasses";

const Login = () => {
  const nameRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [persist, setPersist] = usePersist();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ name, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setName("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Response");
      } else if (err.status === 400) {
        setErrMsg("Missing information");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleNameInput = (e) => setName(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handlePersist = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";
  if (isLoading) {
    return <PacmanLoader color={"#FFF"} />;
  }

  const content = (
    <section className="flex flex-col min-h-screen">
      <header className="mt-4">
        <h1 className={`${style.headerClass} ${style.headerClassDark}`}>
          Persona Login
        </h1>
      </header>
      <main className={`mb-8 ${style.plainTextDark}`} >
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit} className=" p-2 flex flex-col ">
          <div className="m-2 p-2 flex flex-row place-content-left">
            <div className="mr-3 first-letter:text-3xl text-2xl">
              <label htmlFor="name" className={`${style.accentTextDark}`}>
                Name:
              </label>
            </div>
            <div className="place-self-center">
              <input
                type="text"
                id="name"
                ref={nameRef}
                value={name}
                onChange={handleNameInput}
                autoComplete="off"
                required
                className={`${style.loginName} ${style.loginDark}`}
              />
            </div>
          </div>

          <div className="m-2 p-2 flex flex-row-reverse place-content-right">
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              className={`${style.loginPass} ${style.loginDark}`}
            />
            <div className="text-2xl mr-3 first-letter:text-3xl">
              <label className={`${style.accentTextDark}`} htmlFor="password">Password:</label>
            </div>
          </div>

          <div className="flex flex-row m-3 p-3 place-content-center">
            <div className="pl-10 mr-3 text-2xl">
              <button className={`${style.loginIn} ${style.loginInDark}`}>
                Sign In
              </button>
            </div>

            <div className="text-xl place-self-center">
                <label htmlFor="persist" className={`mr-3 whitespace-nowrap ${style.accentTextDark}`}>
                <input
                  type="checkbox"
                  id="persist"
                  onChange={handlePersist}
                  checked={persist}
                  className={`${style.checkbox} ${style.checkboxDark}`}
                />
                Trust This Device
              </label>
            </div>
          </div>
        </form>
        <div className="pt-2">
          <p className="text-center text-lg">
            Some Names you can use to Login:</p>
            <div className="flex flex-col gap-4 pt-2">
              <table>
                <thead className={`border-2 ${style.table} ${style.tableDark}`}>
                  <tr className="text-left">
                    <th scope="col" className={`border-b-2 border-r-2 ${style.table} ${style.tableDark} ${style.accentTextDark}`}>Name</th>
                    <th scope="col" className={`border-b-2 ${style.table} ${style.tableDark} ${style.accentTextDark}`}>Role</th>
                  </tr>
                </thead>
                <tbody className={`border-2 ${style.table} ${style.tableDark}`}>
                  <tr>
                    <td className={`border-r-2 ${style.table} ${style.tableDark}`}>Ladd Russo</td>
                    <td>Persona</td>
                  </tr>
                  <tr>
                    <td className={`border-r-2 ${style.table} ${style.tableDark}`}>Firo Prochainezo</td>
                    <td>Vip</td>
                  </tr>
                  <tr>
                    <td className={`border-r-2 ${style.table} ${style.tableDark}`}>Chane Laforet</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td className={`border-r-2 ${style.table} ${style.tableDark}`}>Felix Walken</td>
                    <td>Persona</td>
                  </tr>
                </tbody>
              </table>
            </div>
           <p className="text-center text-lg mt-3"> Password is the same as the Full Name.
          </p>
        </div>
      </main>
      <footer className="mt-auto mb-4 pb-4 text-xl font-bold text-center">
        <Link
          to="/"
          className={`${style.homepage} ${style.homepageDark}`}
        >
          <FontAwesomeIcon icon={faHomeLg} className="pr-2" />
          Homepage
        </Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
