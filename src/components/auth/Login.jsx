import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    url: "",
  });

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* username */}
      <Input
        type="text"
        placeholder="username"
        id="username"
        value={form.username}
        changeValue={changeForm}
      />
      {/* password */}
      <Input
        type="password"
        placeholder="*************"
        id="password"
        value={form.password}
        changeValue={changeForm}
      />
      {isSignUp && (
        <>
          {/* Name */}
          <Input
            type="text"
            placeholder="name"
            id="name"
            value={form.name}
            changeValue={changeForm}
          />
          {/* Email */}
          <Input
            type="email"
            placeholder="email"
            id="email"
            value={form.email}
            changeValue={changeForm}
          />
          {/* Profile Image URL */}
          <Input
            type="text"
            placeholder="Profile Image URL"
            id="url"
            value={form.url}
            changeValue={changeForm}
          />
        </>
      )}
      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          value={isSignUp}
          onChange={() => {
            setIsSignUp((prev) => !prev);
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Create a new account?
        </label>
      </div>
      <div className="flex items-center justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {}}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
}