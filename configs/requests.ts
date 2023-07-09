import axios from "axios";

const base = process.env.NEXT_PUBLIC_BASE_URL;
export default axios.create({ baseURL: base, timeout: 10000 });
