import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faHomeLg,
} from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import style from "../config/tailwindClasses";

const DASH = /^\/dashboard(\/)?$/;
const NOTES = /^\/dashboard\/notes(\/)?$/;
const NAMES = /^\/dashboard\/names(\/)?$/;

const DashHeader = () => {
  const { isAdmin, isVip } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dashboard/notes/new");
  const onNewNameClicked = () => navigate("/dashboard/names/new");
  const onNotesClicked = () => navigate("/dashboard/notes");
  const onNamesClicked = () => navigate("/dashboard/names");

  let dashClass = null;
  if (!DASH.test(pathname) && !NOTES.test(pathname) && !NAMES.test(pathname)) {
    dashClass = "unique";
  }

  let newNoteButton = null;
  if (NOTES.test(pathname)) {
    newNoteButton = (
      <button title="New Note" onClick={onNewNoteClicked} className="hover:text-yellow-600" >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newNameButton = null;
  if (isAdmin) {
    if (NAMES.test(pathname)) {
      newNameButton = (
        <button title="New Name" onClick={onNewNameClicked} className="hover:text-yellow-600">
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      );
    }
  }

  let namesButton = null;
  if (isAdmin || isVip) {
    if (!NAMES.test(pathname) && pathname.includes("/dashboard")) {
      namesButton = (
        <button title="Names" onClick={onNamesClicked} className="hover:text-emerald-600">
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES.test(pathname) && pathname.includes("/dashboard")) {
    notesButton = (
      <button title="Notes" onClick={onNotesClicked} className="hover:text-emerald-600">
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button title="Logout" onClick={sendLogout} className="hover:text-red-400">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newNameButton}
        {notesButton}
        {namesButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header>
        <div className={`${dashClass} mt-4   pt-4`}>
          <h1 className={`${style.headerClass} ${style.headerClassDark} underline `}>
            <Link to="/dashboard" className="hover:text-blue-500">
              <FontAwesomeIcon icon={faHomeLg} className="mr-1"/>
              PersonaNotes
            </Link>
          </h1>
          <nav className={`flex flex-row gap-4 text-3xl justify-end ${style.navBtn} ${style.navBtnDark}`}>
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  );
  return content;
};

export default DashHeader;
