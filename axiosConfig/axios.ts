import axios from "axios";

export default axios.create({
  baseURL: "http://104.248.0.49/api/v1",
  auth: {
    username: process.env.NEXT_PUBLIC_CLIENT_ID,
    password: process.env.NEXT_PUBLIC_SECRET
  }
});
