import * as request from "src/utils/httpRequest";

/**
 * It's a function that makes a GET request to the endpoint `home?page=` and returns the response
 * data.
 * @param [id] - the page number
 * @returns The response from the API.
 */
export const home = async (id = "") => {
  try {
    const res = await request.get(`home?page=${id}`, {
      params: {},
    });
    return res.data;
  } catch (error) {}
};
