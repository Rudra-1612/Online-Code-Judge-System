const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let submissions = [];

// Run code API
app.post("/run", (req, res) => {
  const { code } = req.body;

  fs.writeFileSync("code.js", code);

  exec("node code.js", (error, stdout, stderr) => {
    if (error) return res.json({ error: stderr });

    res.json({ output: stdout });
  });
});

// Submit solution
app.post("/submit", (req, res) => {
  const { name, score } = req.body;

  submissions.push({ name, score });
  res.json({ message: "Submitted!" });
});

// Leaderboard
app.get("/leaderboard", (req, res) => {
  const sorted = submissions.sort((a, b) => b.score - a.score);
  res.json(sorted);
});

app.listen(5000, () => console.log("Server running"));