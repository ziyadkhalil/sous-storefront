import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://dummyjson.com",
});
