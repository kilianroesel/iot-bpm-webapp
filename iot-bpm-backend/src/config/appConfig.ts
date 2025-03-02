import { CorsOptions } from "cors";

const environment = process.env.ENVIRONMENT || "";
const port = Number(process.env.PORT) || 3000;

const corsOptions: CorsOptions  = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const appConfig = {
    environment,
    port,
    corsOptions
}