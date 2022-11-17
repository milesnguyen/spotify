import * as request from "src/utils/httpRequest";

export const songs = async (id) => {
  try {
    const res = await request.get("song?", {
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {}
};
