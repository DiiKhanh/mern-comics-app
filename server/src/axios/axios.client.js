import axios from 'axios';

// handle response axios when request to api comics
const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'identify'
    }
  });
  return response.data;
};

export default { get };