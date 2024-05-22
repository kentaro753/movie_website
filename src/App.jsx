import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Animated from "./components/Animated";
import TvShow from "./components/TvShow";
import Search from "./components/Search";
import MovieInfo from "./components/MovieInfo";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import Favorite from "./components/Favorite";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PlayVideo from "./components/PlayVideo";
import SQL from "sql.js";
function App() {
  //useEffect(() => {
  // Create or open the database
  // const db = new SQL.Database();

  // Run your schema creation SQL
  // const schema = `
  //   CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL,
  //     email TEXT NOT NULL UNIQUE,
  //     password TEXT NOT NULL
  //   )
  // `;
  // db.run(schema);

  // You can perform other database operations here
  // For example, inserting data:
  // const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  // db.run(insertQuery, ["John Doe", "john@example.com", "password"]);
  // const insertQuery =
  //   "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  // db.run(insertQuery, ["oan", "toan@example.com", "1234"]);
  // Close the database connection when component unmounts
  //   return () => {
  //     db.close();
  //   };
  // }, []); // Run this effect only once on component mount
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/phim-le" element={<Movies />} />
        <Route path="/phim-bo" element={<Series />} />
        <Route path="/hoat-hinh" element={<Animated />} />
        <Route path="/tv-shows" element={<TvShow />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users" element={<Users />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movieinfo/:slug" element={<MovieInfo />} />
        <Route path="/movieinfo/:slug/:EpSlug" element={<PlayVideo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Sidebar />
    </Router>
  );
}

export default App;
