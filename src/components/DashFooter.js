import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import style from "../config/tailwindClasses";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { name, status } = useAuth();
  const onGoHomeClicked = () => navigate("/dashboard");

  let goHomeButton = null;
  if (pathname !== "/dashboard") {
    goHomeButton = (
      <div className="basis-1/12 text-right">
        <button title="Home" onClick={onGoHomeClicked} className={`${style.homeBtn} ${style.homeBtnDark}`}>
          <FontAwesomeIcon icon={faHomeLg} />
        </button>
      </div>
    );
  }

  const content = (
    <footer className="mt-auto mb-10 text-center gap-4 flex flex-row place-content-center text-l">
      {goHomeButton}
      <div className={`${goHomeButton === null ? '' : 'basis-11/12 place-self-center'} ${style.plainTextDark}`}>
              <p className="whitespace-nowrap">
                  <span className={`font-bold ${style.insideAccent} ${style.insideAccentDark}`}>Current Name: </span>{name}
                  </p>
              <p>
              <span className={`font-bold ${style.insideAccent} ${style.insideAccentDark}`}>Status: </span>{status}</p>
      </div>
    </footer>
  );
  return content;
};

export default DashFooter;
