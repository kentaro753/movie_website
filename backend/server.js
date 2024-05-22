// server.js
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable All CORS Requests
app.use(cors());
app.use(express.json());
// const insertUser = db.prepare(
//     'INSERT INTO users (name, password) VALUES (?, ?)'
//     ,(err) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//         } else {
//             console.log('Initial data inserted successfully.');
//         }
//     }
// );

// Route to fetch all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
});
// Get favorite
app.get("/favorite", (req, res) => {
    const {userid} = req.query;
    db.all("SELECT * FROM favorite WHERE userid = ?",[userid], async (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows);
      }
    });
  });
// Login
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  db.get("SELECT * FROM users WHERE name = ?", [name], async (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (!row) {
      res.json({ validation: false, error: "User not found" });
      return;
    }

    try {
      if (password == row.password) {
        res.json({ validation: true, userid: row.id });
      } else {
        res.json({ validation: false, error: "Incorrect password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});
app.post("/signup", (req, res) => {
  const { name, password } = req.body;

  try {
    // Băm mật khẩu
    db.run(
      "INSERT INTO users (name, password) VALUES (?, ?)",
      [name, password],
      async (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          res
            .status(500)
            .json({ error: "Internal server error", success: false });
        } else {
          console.log("User registered successfully.");
          res.json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
});
// check favorite
app.get("/checkFavorite", (req, res) => {
    const { userid, slug } = req.query;
    db.get("SELECT * FROM favorite WHERE userid = ? AND slug = ?", [userid, slug], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
  
      if (row) {
        // Phim đã được lưu bởi người dùng
        res.json({ saved: true });
      } else {
        // Phim chưa được lưu bởi người dùng
        res.json({ saved: false });
      }
    });
  });
//Lưu phim
app.post("/addfav", (req, res) => {
  const { userid, slug, name, thumb_url } = req.body;
  const key = userid + "_" + slug;
  try {

    db.run(
      "INSERT INTO favorite (key, userid, slug, name, thumb_url) VALUES (?, ?, ?, ?, ?)",
      [key, userid, slug, name, thumb_url],
      async (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          res
            .status(500)
            .json({ error: "Internal server error", success: false });
        } else {
          console.log("Add favorite successfully.");
          res.json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
});
// Xóa phim yêu thích
app.delete("/deletefav", (req, res) => {
    const { userid, slug } = req.query;
    try {
      db.run(
        "DELETE FROM favorite WHERE userid = ? AND slug = ?",
        [userid, slug],
        async (err) => {
          if (err) {
            console.error("Error deleting data:", err);
            res.status(500).json({ error: "Internal server error", success: false });
          } else {
            console.log("Delete favorite successfully.");
            res.json({ success: true });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", success: false });
    }
  });
//Thêm history
app.post("/addhis", (req, res) => {
  const { userid, slug_phim, slug_tap} = req.body;
  try {

    db.run(
      "INSERT INTO history (userid, slug_phim, slug_tap) VALUES (?, ?, ?)",
      [userid, slug_phim, slug_tap],
      async (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          res
            .status(500)
            .json({ error: "Internal server error", success: false });
        } else {
          console.log("Add history successfully.");
          res.json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
});
// check history
app.get("/checkHistory", (req, res) => {
  const { userid, slug_phim, slug_tap } = req.query;
  db.get("SELECT * FROM history WHERE userid = ? AND slug_phim = ? AND slug_tap = ?", [userid, slug_phim, slug_tap], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (row) {
      // Phim đã từng xem bởi người dùng
      res.json({ watched: true });
    } else {
      // Phim chưa từng xem bởi người dùng
      res.json({ watched: false });
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
