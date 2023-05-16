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
    const data = fs.readFileSync("./db/db.json");
    res.json(JSON.parse(data));
    });



app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));

    const addNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    notes.push(addNote);
    fs.writeFileSync("db/db.json",  JSON.stringify(notes));
    res.json(addNote)
    })
      
  
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });