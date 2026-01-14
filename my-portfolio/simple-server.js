import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("✅ GET / - Server is responding!");
  res.json({ message: "Server is working!" });
});

app.post("/contact", (req, res) => {
  console.log("✅ POST /contact - Received:", req.body);
  res.json({ 
    code: 200, 
    status: "Message received (test mode - no email sent)",
    data: req.body 
  });
});

app.listen(PORT, () => {
  console.log("\n========================================");
  console.log("🚀 TEST SERVER RUNNING ON PORT 5000");
  console.log("========================================");
  console.log("Now try your form at http://localhost:5173");
  console.log("You should see logs appear below:\n");
});