import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import style from "../config/tailwindClasses";

const Main = () => {
  const content = (
    <section className="flex flex-col min-h-screen">
      <header className="mt-4 mb-4">
        <h1 className={`${style.headerClass} ${style.headerClassDark}`}>
          Welcome to <span className="whitespace-nowrap">my Page!</span>
        </h1>
      </header>
      <main className={`flex flex-col gap-4 text-center m-2 text-xl ${style.plainTextDark}`}>
        <div>
          <p>This is a personal page for recreational purposes.</p>
        </div>
        <div>
          <p>
            <q>Feel free to explore!</q>
          </p>
        </div>
        <div className="p-5">
          <Link to="/login">
            <span className={`${style.loginButton} ${style.loginButtonDark}`}>
              <span className="whitespace-nowrap">Login with</span> a  <span className="whitespace-nowrap">custom Name</span>
            </span>
          </Link>
        </div>
      </main>
      <footer className="mt-auto flex flex-row-reverse gap-4">
        <address className={`mt-3 mb-3 mr-3 text-sm ${style.plainTextDark}`}>
          Gregory Kallinikos
          <br />
          Greece, Athens
          <br />
        </address>
        <div className={`p-2 place-self-center text-3xl text-blue-800 ${style.accentTextDark}`}>
          <a href="https://www.linkedin.com/in/greg-kall/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <div className={`p-2 place-self-center text-3xl ${style.plainTextDark}`}>
          <a href="https://github.com/grekoskall">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </footer>
    </section>
  );

  return content;
};

export default Main;
