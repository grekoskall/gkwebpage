import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNodeMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, names }) => {
  const { isAdmin, isVip } = useAuth();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNodeMutation();

  const navigate = useNavigate();

  // Define States
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [nameId, setNameId] = useState(note.name);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setNameId("");
      navigate("/dashboard/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // Handlers
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleNameIdChange = (e) => setNameId(e.target.value);

  const canSave = [title, text, nameId].every(Boolean) && !isLoading;
  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({
        id: note.id,
        name: nameId,
        title,
        text,
      });
    }
  };
  const onDeleteNoteClicked = async () => {
    await deleteNote({
      id: note.id,
    });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = names.map((name) => {
    return (
      <option key={name.id} value={name.id}>
        {name.name}
      </option>
    );
  });

  // Validation Classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "invalid" : "";
  const validTextClass = !text ? "invalid" : "";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isAdmin || isVip) {
    deleteButton = (
      <button
        className="text-2xl hover:text-red-500"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  // Content to return
  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-row place-content-center mb-4">
          <h2 className="text-center text-3xl text-purple-900">Edit Note: </h2>
          <div className="text-right pt-1">
            <button
              className={`ml-4 mr-4 text-2xl ${
                canSave ? "hover:text-green-700" : ""
              }`}
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-start-1 col-span-4 text-center">
            <label className="text-xl" htmlFor="title">
              Title:{" "}
            </label>
            <input
              className={`${validTitleClass} w-min text-center`}
              id="title"
              name="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={handleTitleChange}
              maxLength="40"
              size="42"
            />
          </div>

          <div className="col-start-2 col-span-2 text-center">
            <div className="flex flex-col">
              <lable className="text-xl" htmlFor="text">
                Text:
              </lable>
              <textarea
                className={`${validTextClass} h-auto`}
                id="text"
                name="text"
                value={text}
                onChange={handleTextChange}
                rows="8"
              />
            </div>
          </div>

          <div className="col-start-auto col-span-1 ml-4">
            <div className="text-center mb-4">
              <label className="whitespace-nowrap text-xl" htmlFor="name">
                Assigned To:
              </label>
              <select
                id="name"
                name="name"
                value={nameId}
                onChange={handleNameIdChange}
              >
                {options}
              </select>
            </div>
            <div className="mb-2">
              <p>
                Created:
                <br />
                <span className="text-sm text-gray-600">{created}</span>
              </p>
            </div>
            <div>
              <p>
                Updated:
                <br />
                <span className="text-sm text-gray-600">{updated}</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
