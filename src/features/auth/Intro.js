import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Intro = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
  const { name, isAdmin, isVip } = useAuth();
  const content = (
    <section className="flex flex-col gap-4">
      <p className="text-right text-sm text-gray-600">{today}</p>
      <h1 className="text-center text-2xl">Hello, {name}!</h1>
      <div className="grid text-center sm:grid-rows-2 sm:grid-cols-2 mt-4 gap-x-4 gap-y-10 mb-8">
        <p className="sm:text-right sm:mr-4 whitespace-nowrap">
          <Link to="/dashboard/notes" className="border-2 p-3 m-1 rounded-full border-blue-900 hover:bg-gray-200 hover:border-emerald-600 ">Check the Notes</Link>
        </p>
        <p className="sm:ml-2 whitespace-nowrap sm:text-left">
          <Link to="/dashboard/notes/new" className="border-2 p-3 m-1 rounded-full border-blue-900 hover:bg-gray-200 hover:border-yellow-500">Add new Note</Link>
        </p>
        {(isAdmin || isVip) && (
          <p className="sm:text-right whitespace-nowrap">
            <Link to="/dashboard/names" className="border-2 p-3 m-1 rounded-full border-blue-900 hover:bg-gray-200 hover:border-emerald-600">Inspect the Names</Link>
          </p>
        )}
        {isAdmin && (
          <p className="whitespace-nowrap sm:text-left">
            <Link to="/dashboard/names/new" className="border-2 p-3 m-1 rounded-full border-blue-900 hover:bg-gray-200 hover:border-yellow-500">Add new Name</Link>
          </p>
        )}
      </div>
    </section>
  );

  return content;
};

export default Intro;
