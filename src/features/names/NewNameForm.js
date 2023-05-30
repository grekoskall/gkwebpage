import React from "react";
import { useState, useEffect } from "react";
import { useAddNewNameMutation } from "./namesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";

const NAME = /^[A-z]{3,20}$/;
const PWD = /^[A-z0-9!@#$%]{4,12}$/;

const NewNameForm = () => {
  const [addNewName, { isLoading, isSuccess, isError, error }] =
    useAddNewNameMutation();
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Persona"]);

  // Verification of info
  useEffect(() => {
    setValidName(NAME.test(name));
  }, [name]);

  useEffect(() => {
    setValidPassword(PWD.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setPassword("");
      setRoles([]);
      navigate("/dashboard/names");
    }
  }, [isSuccess, navigate]);

  if (!isAdmin) {
    return <p>Access Denied</p>;
  }

  // Handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // Save
  const canSave =
    [roles.length, validName, validPassword].every(Boolean) && !isLoading;

  const onSaveNameClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewName({ name, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !validName ? "invalid" : "";
  const validPwdClass = !validPassword ? "invalid" : "";
  const validRolesClass = !Boolean(roles.length) ? "invalid" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form onSubmit={onSaveNameClicked}>
        <div className="flex flex-row place-content-center mb-4">
          <h2 className="text-center text-3xl text-purple-900">New Name</h2>
          <div className="text-right pt-1">
            <button
              title="Save"
              className={`ml-4 mr-4 text-2xl ${
                canSave ? "hover:text-green-700" : ""
              }`}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xl mt-4" htmlFor="name">
            Name: <span className="text-lg text-gray-500">[3-20 letters]</span>
          </label>
          <input
            className={`${validNameClass}`}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
          />

          <label className="text-xl mt-4" htmlFor="password">
            Password: <span className="text-lg text-gray-500">[4-12 chars]</span>
          </label>
          <input
            className={`${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <label className="text-xl mt-4" htmlFor="roles">Assigned Roles:</label>
          <select
            id="roles"
            name="roles"
            className={`${validRolesClass}`}
            multiple={true}
            size="3"
            value={roles}
            onChange={handleRoleChange}
          >
            {options}
          </select>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewNameForm;
