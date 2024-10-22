import axios from "axios";
import "dotenv/config";

const clickUpBaseURL = process.env.CLICKUP_BASE_URL;

const api = axios.create({
    baseURL: clickUpBaseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: process.env.CLICKUP_API_TOKEN,
    },
});

export { api };
