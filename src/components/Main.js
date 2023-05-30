import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Main = () => {
  const content = (
    <section className="flex flex-col min-h-screen">
      <header className="mt-4 mb-4">
        <h1 className="dark:text-white text-3xl font-bold text-center m-6  text-blue-900 first-letter:text-4xl">
          Welcome to <span className="whitespace-nowrap">my Page!</span>
        </h1>
      </header>
      <main className="flex flex-col gap-4 text-center m-2 text-xl">
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
            <span className="rounded-full bg-purple-600 m-5 p-4 inline-block text-white hover:bg-purple-500 hover:border-double hover:border-2 hover:border-slate-900 border-2 border-solid border-slate-800">
              <span className="whitespace-nowrap">Login with</span> a  <span className="whitespace-nowrap">custom Name</span>
            </span>
          </Link>
        </div>
      </main>
      <footer className="mt-auto flex flex-row-reverse gap-4">
        <address className="mt-3 mb-3 mr-3 text-sm">
          Gregory Kallinikos
          <br />
          Greece, Athens
          <br />
        </address>
        <div className="p-2 place-self-center text-3xl text-blue-800">
          <a href="https://www.linkedin.com/in/greg-kall/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <div className="p-2 place-self-center text-3xl ">
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
