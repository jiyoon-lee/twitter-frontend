import Tweet from "components/tweet/Tweet";
import { tweetApi } from "app/tweet";

export default function TweetList() {
  const { data, isLoading } = tweetApi.useGetTweetsQuery();
  return (
    <main className=" overflow-auto py-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data &&
            data.map((tweet) => (
              <Tweet
                tweet={tweet}
                key={tweet.id}
                handleDeleteTweet=""
                handleUpdateTweet=""
              />
            ))}
        </ul>
      )}
    </main>
  );
}
