import * as request from "src/utils/httpRequest";

export const home = async (id = "1") => {
  try {
    const res = await request.get(`home?page=${id}`, {
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {}
};
