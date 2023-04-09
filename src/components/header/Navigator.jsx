import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigator() {
  const isSignin = useSelector((state) => state.auth.isSignin);
  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isActive
                ? " text-red-600 font-black"
                : isPending
                ? " text-gray-400"
                : ""
            }
          >
            All Tweets
          </NavLink>
        </li>
        {isSignin && (
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive
                  ? " text-red-600 font-black"
                  : isPending
                  ? " text-gray-400"
                  : ""
              }
            >
              My Tweets
            </NavLink>
          </li>
        )}
        {!isSignin && (
          <li>
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isActive
                  ? " text-red-600 font-black"
                  : isPending
                  ? " text-gray-400"
                  : ""
              }
            >
              LOGIN
            </NavLink>
          </li>
        )}
        {isSignin && (
          <li>
            <button>LOGOUT</button>
          </li>
        )}
      </ul>
    </div>
  );
}
