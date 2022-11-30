import * as request from "src/utils/httpRequest";

export const home = async (id = "") => {
  try {
    const res = await request.get(`home?page=${id}`, {
      params: {},
    });
    return res.data;
  } catch (error) {}
};
