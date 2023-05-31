import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import style from "../../config/tailwindClasses";

const NewNoteForm = ({ names }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [nameId, setNameId] = useState(names[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setNameId("");
      navigate("/dashboard/notes");
    }
  }, [isSuccess, navigate]);

  // Handlers
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleNameIdChange = (e) => setNameId(e.target.value);

  const canSave = [title, text, nameId].every(Boolean) && !isLoading;
  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ name: nameId, title, text });
    }
  };

  const options = names.map((name) => {
    return (
      <option key={name.id} value={name.id}>
        {name.name}
      </option>
    );
  });

  // Validation Classes
  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "invalid" : "";
  const validTextClass = !text ? "invalid" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form onSubmit={onSaveNoteClicked} className="mb-4">
        <div className="flex flex-row place-content-center mb-4">
          <h2 className={`text-center text-3xl ${style.insideAccent} ${style.insideAccentDark}`}>New Note</h2>
          <div className={`text-right pt-1 ${style.plainTextDark}`}>
            <button
              className={`ml-4 mr-4 text-2xl ${
                canSave ? "hover:text-green-700" : ""
              }`}
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col ${style.plainTextDark}`}>
          <label className="text-xl mt-2" htmlFor="title">
            Title:
          </label>
          <input
            className={`${validTitleClass} border-gray-400 border-2`}
            id="title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleTitleChange}
          />

          <label className="text-xl mt-4" htmlFor="text">
            Text:
          </label>
          <textarea
            className={`${validTextClass} border-gray-400 border-2`}
            id="text"
            name="text"
            value={text}
            onChange={handleTextChange}
          />

          <label className="text-xl mt-4" htmlFor="name">
            Assigned To:
          </label>
          <select
            className="border-gray-400 border-2 dark:text-black"
            id="name"
            name="name"
            value={nameId}
            onChange={handleNameIdChange}
          >
            {options}
          </select>
        </div>
      </form>
    </>
  );
  return content;
};

export default NewNoteForm;
