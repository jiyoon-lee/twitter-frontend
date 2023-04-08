import TweetCard from "components/tweet/TweetCard";

export default function TweetList({ data, deleteMutation, updateMutation }) {
  return (
    <main className=" overflow-auto py-5">
      <ul>
        {data &&
          data.map((tweet) => (
            <TweetCard
              tweet={tweet}
              key={tweet.id}
              handleDeleteTweet={deleteMutation}
              handleUpdateTweet={updateMutation}
            />
          ))}
      </ul>
    </main>
  );
}
