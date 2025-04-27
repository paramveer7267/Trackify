import express from "express"
import authUserRoutes from "./routes/auth.user.route.js"
import authAdminRoutes from "./routes/auth.admin.route.js"
const app = express();

app.use("/api/v1/auth/user",authUserRoutes)
app.use("/api/v1/auth/admin",authAdminRoutes)


app.listen(5000, () =>{
  console.log("Server start at 5000")
})