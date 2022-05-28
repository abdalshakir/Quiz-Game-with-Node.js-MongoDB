import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('short'));

mongoose.connect('mongodb://localhost:27017/Quiz',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(client => {
    console.log("MongoDB Connected Successfully")
}).catch(err => {
    console.log("Error ---> " + err)
})

const queSchema = new mongoose.Schema({
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    correctAnswer: String
})
const questions = mongoose.model('Questions', queSchema);

app.post('/admin', (req, res) => {
    console.log(req.body)
    if (!req.body.question || !req.body.optionA || !req.body.optionB || !req.body.optionC || !req.body.correctAnswer) {
        res.status(400).send("All fields are required");
    } else {
        questions.create(req.body).then((response) => {
            res.status(201).send("Question Added Successfully")
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
});

app.get('/questions', (req, res) => {
    questions.find({}).then((response) => {
        res.send(response)
        console.log(response)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}..`)
})