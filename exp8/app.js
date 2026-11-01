const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const secretKey = "student123";

let students = [
  { id: 1, name: "Puja", age: 18 },
  { id: 2, name: "Ravi", age: 19 }
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username: username }, secretKey, { expiresIn: "1h" });
    res.json({ token: token });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Token required");
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).send("Token format must be 'Bearer <token>'");
  }
  const jwtToken = parts[1];
  try {
    const decoded = jwt.verify(jwtToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
}

app.get("/students", verifyToken, (req, res) => {
  res.json(students);
});

app.post("/students", verifyToken, (req, res) => {
  const { id, name, age } = req.body;
  if (!id || !name || !age) {
    return res.status(400).send("Missing student details");
  }
  students.push({ id, name, age });
  res.status(201).send("Student added successfully");
});

app.put("/students/:id", verifyToken, (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (student) {
    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    res.send("Student updated successfully");
  } else {
    res.status(404).send("Student not found");
  }
});

app.delete("/students/:id", verifyToken, (req, res) => {
  const initialLength = students.length;
  students = students.filter(s => s.id != req.params.id);
  if (students.length < initialLength) {
    res.send("Student deleted successfully");
  } else {
    res.status(404).send("Student not found");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
