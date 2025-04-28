import express from "express";
import authUserRoutes from "./routes/auth.user.route.js";
import authAdminRoutes from "./routes/auth.admin.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = envVars.PORT;

app.use(express.json());
app.use("/api/v1/auth/user", authUserRoutes);
app.use("/api/v1/auth/admin", authAdminRoutes);

app.listen(PORT, () => {
  console.log("Server start at 5000");
  connectDB();
});
