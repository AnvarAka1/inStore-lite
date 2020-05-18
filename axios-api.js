import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.in-study.uz/"
});

export default instance;
// "dev": "cross-env NODE_OPTIONS='--inspect' next",
