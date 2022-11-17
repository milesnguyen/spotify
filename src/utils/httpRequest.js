import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://apizingmp3.herokuapp.com/api/",
});

export const get = async (path, option = {}) => {
  const response = await httpRequest.get(path, option);

  return response.data;
};
export default httpRequest;
