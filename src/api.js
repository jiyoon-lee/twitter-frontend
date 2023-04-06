import axios from "axios";

export const getTweets = () => {
  return axios
    .get("http://localhost:8080/tweets")
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

export const createTweet = (config) => {
  return axios.post("http://localhost:8080/tweets", config);
};

export const deleteTweet = (tweetId) => {
  return axios.delete(`http://localhost:8080/tweets/${tweetId}`);
};

export const updateTweet = ({ tweetId, text }) => {
  return axios.put(`http://localhost:8080/tweets/${tweetId}`, {
    text,
  });
};
