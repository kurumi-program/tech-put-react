import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  }),
  options,
);
