console.log('Writing our first express app');

const path = require('path');
const express = require('express');
const app = express();
// const path = require("path");
const port = 80;
const fs = require('fs');

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For Serving Static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('veiw engine', 'pug'); // Set the template engine as the pug
app.set('views', path.join(__dirname, 'views')) // set the view directory

// EDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely";
    const params = {'title': 'PubG is the best game', 'content': con};
    res.status(200).render('index.pug', params);
});


//Our pug demo endpoint
// app.get("/demo", (req, res)=>{
//     res.status(200).render('demo', {title:'Hey Chintu', message: 'Hello there and thanks for telling me how to use pug!'})
// });

// app.get("/", (req, res)=>{
//     res.send("This is home page, in get request");
// })
// app.get("/about", (req, res)=>{
//     res.status(300).send('This is about page, in get request');
// })

// app.post("/about", (req, res)=>{
//     res.status(200).send("This is about page in post request");
// })

// app.post("/this", (req, res)=>{
//     res.status(404).send("This page is not found");
// })

app.post('/', (req, res)=>{

    // console.log(req.body);
    name = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    more = req.body.more;
    let outputToWrite = `The name of client ${name}, Age: ${age} years old, Address: ${address} and More about him/her: ${more}`;
    fs.writeFileSync('output.txt', outputToWrite);
    const params = {'message': 'Your form hase been submitted successfully'};
    res.status(200).render('index.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`This app is successfuly run on port ${port}`);
});