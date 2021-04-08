import axios from "axios";

export default axios.create({
  baseURL: "https://interviews.busara.io/api/v1"
});
