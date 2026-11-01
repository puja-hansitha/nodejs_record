import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return <h2>Welcome to Student Management System</h2>;
}

function Registration() {
  return (
    <div>
      <h2>Student Registration</h2>
      <input placeholder="Student Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button>Register</button>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Student Login</h2>
      <input placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button>Login</button>
    </div>
  );
}

function About() {
  return <h2>About: This system manages student information.</h2>;
}

function Contact() {
  return <h2>Contact: Puja K5</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <h1>Student Management System</h1>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/register">Registration</Link>
        {" | "}
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/about">About</Link>
        {" | "}
        <Link to="/contact">Contact</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
