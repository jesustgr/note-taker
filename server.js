const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// returns homepage
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public',"index.html"));
});

// returns notes page
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "public" ,'notes.html')); 
})