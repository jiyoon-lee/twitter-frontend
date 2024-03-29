import { GrClose } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";

import {
  useDeleteTweetMutation,
  useUpdateTweetMutation,
} from "features/tweet/tweetSlice";

export default function Tweet({ tweet }) {
  const { id, createdAt, name, text, username, url } = tweet;
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);
  const [deleteTweet, { isLoading }] = useDeleteTweetMutation();
  const [updateTweet] = useUpdateTweetMutation();

  return (
    <li className="flex p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section>
        <img src={url} alt="profile img" className=" rounded-full" />
      </section>
      {isEdit && (
        <form
          className="grow"
          onSubmit={(e) => {
            e.preventDefault();
            updateTweet({ ...tweet, text: newText });
            setIsEdit(false);
          }}
        >
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              value={newText}
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => {
                setNewText(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      )}
      {!isEdit && (
        <section className="grow">
          <div>
            {name}
            {username}
            {createdAt}
          </div>
          <div>{text}</div>
        </section>
      )}
      <section className="flex flex-col">
        {isLoading || (
          <button
            onClick={() => {
              deleteTweet(id);
            }}
          >
            <GrClose />
          </button>
        )}
        <button
          onClick={() => {
            setIsEdit((prev) => !prev);
          }}
        >
          <AiOutlineEdit />
        </button>
      </section>
    </li>
  );
}
