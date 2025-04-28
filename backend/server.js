import express from "express";
import authUserRoutes from "./routes/auth.user.route.js";
import authAdminRoutes from "./routes/auth.admin.route.js";
import userRoutes from "./routes/user.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import { isAdmin } from "./middleware/isAdmin.js";
import adminRoutes from "./routes/admin.route.js"

const app = express();
const PORT = envVars.PORT || 5000; // Default to 5000 if no PORT is defined in envVars
app.use(express.json());
app.use(cookieParser()); 


app.use("/api/v1/auth/user", authUserRoutes);
app.use("/api/v1/auth/admin", authAdminRoutes);
app.use("/api/v1/dashboard",protectRoute, userRoutes);
app.use("/api/v1/admin/dashboard",protectRoute,isAdmin, adminRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`); // Log the actual port
  connectDB(); // Connect to the database
});
