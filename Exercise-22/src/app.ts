const express = require("express");
import "express-async-errors";
import dataRoutes from "./routes/data";
import authRoutes from "./routes/auth";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(initCorsMiddleware());

app.use("/data", dataRoutes);
app.use("/auth", authRoutes);

export default app;
