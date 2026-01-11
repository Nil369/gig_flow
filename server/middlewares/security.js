import rateLimit from "express-rate-limit";

export const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:5174",
  "http://localhost:5174/",
  "http://localhost:5000",
  "http://localhost:5000/",
  "http://localhost:5050",
  "http://localhost:5050/",
  /\.akashhalder\.in$/,
  /\.akashhalder\.in\/$/,
  "https://akashhalder.in/",
  "https://www.akashhalder.in/",
];

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2500, // Limit each IP to 2500 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});