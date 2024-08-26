const environment = process.env.ENVIRONMENT || "";
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "127.0.0.1";

export const appConfig = {
    environment,
    port,
    host
}