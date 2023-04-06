import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import logo from "assets/brand-logo.png";
import { useState } from "react";
import { RiMessage3Line } from "react-icons/ri";
import { getTweets, createTweet, deleteTweet, updateTweet } from "api";
import TweetCard from "components/tweet/TweetCard";

export default function Dashboard() {
  const [text, setText] = useState("");
  // Access the client
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newTweet) => createTweet(newTweet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: getTweets,
  });

  const handleCreateTweet = (e) => {
    e.preventDefault();
    createMutation.mutate({
      text,
      username: "jiyoon3421",
      name: "jiyoon",
      url: "https://picsum.photos/200/200",
    });
    setText("");
  };

  return (
    <>
      <div className=" bg-white rounded-xl p-5 w-1/2 y-3/4">
        <header className="flex justify-between items-center">
          <section className="flex items-center">
            <img src={logo} alt="brand logo" className=" w-20" />
            <h1 className=" text-5xl font-black">Twitter</h1>
          </section>
          <nav>
            <button>로그인</button>
          </nav>
        </header>
        <section className="my-5">
          <form onSubmit={handleCreateTweet}>
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiMessage3Line className=" text-2xl" />
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                POST
              </button>
            </div>
          </form>
        </section>
        <main className=" overflow-auto">
          <ul>
            {data &&
              data.map((tweet) => (
                <TweetCard
                  tweet={tweet}
                  key={tweet.id}
                  handleDeleteTweet={deleteMutation.mutate}
                  handleUpdateTweet={updateMutation.mutate}
                />
              ))}
          </ul>
        </main>
      </div>
    </>
  );
}
