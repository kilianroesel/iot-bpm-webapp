import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";

winston.loggers.add("systemLogger", {
  level: logLevel,
  defaultMeta: {
    category: "system",
  },
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

winston.loggers.add("httpLogger", {
    level: logLevel,
    defaultMeta: {
        category: "http",
    },
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});
