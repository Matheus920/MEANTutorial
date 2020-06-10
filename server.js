const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3000;

// Config files
app.use(bodyParser.json());
app.use(cors());

var db = require('./config/db');
console.log(`DB connecting in ${db.url}`)
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var Student = require('./models/student');

app.get('/api/students', (req, res) => {
    Student.find((err, students) => {
        if(err) res.send(err);
        res.json(students);
    });
});

app.get('/api/students/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if(err) res.send(err);
        res.json(student);
    })
});

app.get('/api/students/search/:name', (req, res) => {
    Student.find({name: {$regex: req.params.name, $options: 'i'}}, (err, students) => {
        if(err) res.send(err);
        res.json(students);
    })
});

app.post('/api/students/', (req, res) => {
    var student = new Student();
    student.name = req.body.name;
    student.save((err) => {
        if(err) res.send(err);
        res.json(student);
    });
});

app.patch('/api/students/:id', (req, res) => {
    Student.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, student) => {
        if(err) res.send(err);
        res.json(student);
    });
});

app.delete('/api/students/:student_id', (req, res) => {
    Student.deleteOne({
        _id: req.params.student_id
    }, (err, bear) => {
        if(err) res.send(err);
        res.json({message: 'Student successfully deleted!'});
    });
});

app.listen(port, () => { console.log(`Server listening in ${port}`) });