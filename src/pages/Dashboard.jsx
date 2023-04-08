import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTweets, createTweet, deleteTweet, updateTweet } from "api";
import Search from "search/Search";
import TweetList from "components/tweets/TweetList";
import Loading from "components/spinner/Loading";

export default function Dashboard() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: getTweets,
  });

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
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Search createTweet={createMutation.mutate} />
          <TweetList
            data={data}
            deleteMutation={deleteMutation.mutate}
            updateMutation={updateMutation.mutate}
          />
        </>
      )}
    </>
  );
}
