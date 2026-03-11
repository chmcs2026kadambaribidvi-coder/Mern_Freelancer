import express from "express";
import dotenv from "dotenv";
import dns from "node:dns";
import { connectDB } from "./config/db.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import cors from "cors";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());



dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 3000;

app.use("/freelancers", freelancerRoutes);


app.get("/", (req, res) => {
  res.redirect("/freelancers");
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
