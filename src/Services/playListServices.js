import * as request from "src/utils/httpRequest";

export const album = async (id) => {
  try {
    const res = await request.get("detailplaylist?", {
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {}
};
