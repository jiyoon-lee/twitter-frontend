import Tweet from "components/tweet/Tweet";
import { useGetTweetsQuery } from "features/tweet/tweetSlice";

export default function TweetList() {
  const {
    data: tweets,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetTweetsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <main className=" overflow-auto py-5">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {tweets &&
              tweets.map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
          </ul>
        )}
      </main>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
}
