import axios from "axios";

export default axios.create({
  baseURL: "http://104.248.0.49/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});
