import axios from 'axios';
const API_ENDPOINT = 'http://localhost:3000/voterapp/';

export const getData = async (dispatch) => {
  const url = API_ENDPOINT + 'getVoteResult';
  const res = await axios.get(url);
  res.data.length > 0 && dispatch({ type: "setData", payload: res.data[0] });
};

export const postData = async (data) => {
  const postUrl = API_ENDPOINT + "updateVotes"
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  await axios.post(postUrl, JSON.stringify(data), options).then(response => {
    if (String(response.statusCode).startsWith(20)) {
      console.log("Successfully posted the data to DB")
    }
  })
    .catch(error => {
      console.log("Failed to post data to DB:", error);
    });
}