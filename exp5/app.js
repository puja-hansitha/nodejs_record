const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  res.send(`
    <h1>Session Tracking</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Enter username" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.send(`
    <h2>Login Successful!</h2>
    <p>Welcome, ${req.session.username}</p>
    <a href="/transaction">Make Transaction</a><br>
    <a href="/history">View Transaction History</a><br>
    <a href="/logout">Logout</a>
  `);
});

app.get("/transaction", (req, res) => {
  if (!req.session.username) {
    return res.send("Please login first.");
  }
  res.send(`
    <h2>Transaction</h2>
    <form action="/transaction" method="POST">
      <input type="text" name="transaction" placeholder="Enter transaction" required>
      <button type="submit">Save Transaction</button>
    </form>
  `);
});

app.post("/transaction", (req, res) => {
  if (!req.session.username) {
    return res.send("Please login first.");
  }
  if (!req.session.transactions) {
    req.session.transactions = [];
  }
  req.session.transactions.push(req.body.transaction);
  res.send(`
    <h2>Transaction Saved!</h2>
    <a href="/transaction">Add Another Transaction</a><br>
    <a href="/history">View Transaction History</a>
  `);
});

app.get("/history", (req, res) => {
  if (!req.session.username) {
    return res.send("Please login first.");
  }
  const transactions = req.session.transactions || [];
  res.send(`
    <h2>Transaction History</h2>
    <p>User: ${req.session.username}</p>
    <ul>
      ${transactions.map(t => `<li>${t}</li>`).join("")}
    </ul>
    <a href="/">Home</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send(`
    <h2>Logged out successfully!</h2>
    <a href="/">Login again</a>
  `);
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
