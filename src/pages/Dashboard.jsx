import Search from "components/search/Search";
import TweetList from "components/tweets/TweetList";

export default function Dashboard() {
  return (
    <>
      <Search createTweet="" />
      <TweetList data="" deleteMutation="" updateMutation="" />
    </>
  );
}
