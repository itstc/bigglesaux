const ENDPOINT_URL = `${process.env.BACKEND_URL || "http://localhost"}:${process.env.BACKEND_PORT || "3000"}`;
export const GET_ITEMS = `${process.env.MODE === "PROD" ? ENDPOINT_URL : "/api"}/items`; 

export default {
  GET_ITEMS
}
