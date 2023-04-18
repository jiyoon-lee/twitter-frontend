import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "features/auth/authSlice";
import { useCreateTweetMutation } from "features/tweet/tweetSlice";

export default function Search() {
  const username = useSelector(selectCurrentUsername);
  const [text, setText] = useState("");
  const [createTweet, { isLoading }] = useCreateTweetMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    createTweet({
      username,
      name: "jiyoon",
      text: "jiyoon",
    });
    setText("");
  };

  let content;
  if (isLoading) content = <p>Loading...</p>;
  else
    content = (
      <form onSubmit={handleSubmit}>
        {/* {isLoading} */}
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <BsFillImageFill className="text-xl" />
          </button>
          <textarea
            id="chat"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <IoSend className="text-xl" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    );
  return content;
}
