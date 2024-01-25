import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import { setCredentials } from "features/auth/authSlice";
import {
  useLoginMutation,
  useSignupMutation,
} from "features/auth/authApiSlice";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isSignin, setIsSignin] = useState(true);
  const [login, { isLoading }] = useLoginMutation();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
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
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const aa = await signup({
        username: form.username,
        password: form.password,
        name: form.name,
        email: form.email,
        url: form.url,
      });
      console.log(aa);
      setIsSignin(true);
      setForm({
        username: "",
        password: "",
        name: "",
        email: "",
        url: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({
        username: form.username,
        password: form.password,
      });
      dispatch(setCredentials({ ...userData }));
      setForm({
        username: "",
        password: "",
        name: "",
        email: "",
        url: "",
      });
      navigate("/");
    } catch (err) {
      console.log("catch", err);
      if (!err?.originalState) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalState === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalState === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        onSubmit={isSignin ? handleLogin : handleSignup}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* username */}
        <input {...register("username", { required: true, maxLength: 2 })} />
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
        {isSignin || (
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
            id="default-checkbox"
            type="checkbox"
            value={isSignin}
            onChange={() => {
              setIsSignin((prev) => !prev);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Create a new account?
          </label>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
  return content;
}
