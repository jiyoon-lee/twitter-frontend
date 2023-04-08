import axios from "./utils/axios";

export const getTweets = async () => {
  try {
    const res = await axios.get("/tweets");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createTweet = (config) => {
  return axios.post("/tweets", config);
};

export const deleteTweet = (tweetId) => {
  return axios.delete(`/tweets/${tweetId}`);
};

export const updateTweet = ({ tweetId, text }) => {
  return axios.put(`/tweets/${tweetId}`, {
    text,
  });
};

export const signin = async (config) => {
  try {
    const response = await axios.post("/auth/login", config);
    localStorage("auth", response.data.token);
  } catch (e) {
    console.log(e);
  }
};

export const signup = (config) => {
  try {
    return axios.post("/auth/signup", config).then((res) => {
      console.log(res);
    });
  } catch (e) {
    console.log(e);
  }
};
