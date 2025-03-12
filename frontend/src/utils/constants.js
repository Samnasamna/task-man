import dotenv from "dotenv"
dotenv.config()

export const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`