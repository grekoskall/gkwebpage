import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import PacmanLoader from "react-spinners/PacmanLoader";
import { faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <h1 className="m-6 text-center text-3xl font-bold first-letter:text-4xl text-blue-900">
          Persona Login
        </h1>
      </header>
      <main className="mb-8">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit} className=" p-2 flex flex-col ">
          <div className="m-2 p-2 flex flex-row place-content-left">
            <div className="mr-3 first-letter:text-3xl">
              <label htmlFor="name" className="text-2xl">
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
                className="border-l-2 border-r-4 border-b-4 border-solid rounded-full rounded-ss-none border-purple-300 bg-violet-100 focus:border-purple-700 focus:ring-0"
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
              className="border-l-2 border-r-4 rounded-br-none rounded-full border-b-4 border-solid border-purple-300 bg-violet-100 focus:border-purple-700 focus:ring-0"
            />
            <div className="text-2xl mr-3 first-letter:text-3xl">
              <label htmlFor="password">Password:</label>
            </div>
          </div>

          <div className="flex flex-row m-3 p-3 place-content-center">
            <div className="pl-10 mr-3 text-2xl">
              <button className="rounded whitespace-nowrap border-2 border-solid border-violet-400 p-2 bg-purple-600 hover:border-violet-500 hover:bg-purple-500 text-white">
                Sign In
              </button>
            </div>

            <div className="text-xl place-self-center">
              <label htmlFor="persist" className="mr-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={handlePersist}
                  checked={persist}
                  className="m-1 form-checkbox rounded text-green-700"
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
                <thead className="border-2 border-violet-200">
                  <tr className="text-left">
                    <th scope="col" className="border-b-2 border-r-2 border-violet-200">Name</th>
                    <th scope="col" className="border-b-2 border-violet-200">Role</th>
                  </tr>
                </thead>
                <tbody className="border-2 border-violet-200">
                  <tr>
                    <td className="border-r-2 border-violet-200">Ladd Russo</td>
                    <td>Persona</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-violet-200">Firo Prochainezo</td>
                    <td>Vip</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-violet-200">Chane Laforet</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-violet-200">Felix Walken</td>
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
          className="text-blue-900 border-2 p-2 rounded-lg border-blue-600 hover:border-blue-800 hover:bg-violet-100"
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
