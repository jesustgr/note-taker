const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// returns notes page
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "public" ,'notes.html')); 
})

// renders all notes
app.get('/api/notes',(req, res)=>{
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        res.json(output);
    });
});

// returns homepage
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public',"index.html"));
});

// sends new note to the database
app.post('/api/notes',(req,res)=>{
    let newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        output.push(newNote);

        fs.writeFile('./db/db.json',JSON.stringify(output),(error)=>{
            error ? console.error('error updating the data') : console.log("success");
        });
    });
    res.json(newNote);
});

// deletes note from database
app.delete('/api/notes/:id',(req,res)=>{
    let userId = req.params.id;
    let indexToDelete;
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.log("error reading file to delete") : console.log('success reading file');
        var dataArr = JSON.parse(data);
        for (let i=0;i<dataArr.length;i++){
            if (dataArr[i].id === userId){
                indexToDelete = i;
            }
        }
        dataArr.splice(indexToDelete, 1);
        dataArr = JSON.stringify(dataArr);
        fs.writeFile('./db/db.json', dataArr ,(error)=>{
            error ? console.log('error write new file after deletion') : console.log("success writing new file");
        });
    });
});

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );