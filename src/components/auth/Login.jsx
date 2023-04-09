import { useState } from "react";

import {
  rdSetIsSignin,
  rdSetUsername,
  rdSetToken,
} from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { signup, login } from "../../api";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let config = { username, password };
    if (isSignUp) {
      config = {
        ...config,
        name,
        email,
        url,
      };
    }
    try {
      // 토큰과 username을 redux에 저장한다.
      // 'All Tweets'페이지로 이동한다.
      const { data } = isSignUp ? await signup(config) : await login(config);
      dispatch(rdSetIsSignin(true));
      dispatch(rdSetUsername(data.username));
      dispatch(rdSetToken(data.token));
    } catch (e) {
      // 실패 알림을 표시한다.
      console.log(e);
    }
    navigate("/");
  };
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* username */}
      <Input
        type="text"
        placeholder="username"
        id="username"
        value={username}
        changeValue={setUsername}
      />
      {/* password */}
      <Input
        type="password"
        placeholder="*************"
        id="password"
        value={password}
        changeValue={setPassword}
      />
      {isSignUp && (
        <>
          {/* Name */}
          <Input
            type="text"
            placeholder="name"
            id="name"
            value={name}
            changeValue={setName}
          />
          {/* Email */}
          <Input
            type="email"
            placeholder="email"
            id="email"
            value={email}
            changeValue={setEmail}
          />
          {/* Profile Image URL */}
          <Input
            type="text"
            placeholder="Profile Image URL"
            id="url"
            value={url}
            changeValue={setUrl}
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
          onClick={handleSubmit}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
}
