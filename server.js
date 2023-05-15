const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
app.use((express.json()));

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to read notes from file." });
      }
  
      res.json(JSON.parse(data)); 
    });
  });
  
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });