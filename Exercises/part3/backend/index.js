const express = require('express'); 
const morgan = require('morgan'); 
const app = express(); 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.use(express.static('build'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type')); 
app.get('/api/persons', (req, res) => {
    res.json(persons); 
})

app.get('/info', (req, res) => {
    const response = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
    res.send(response); 
})

app.get('/api/persons/:id', (req, res, next) => {
    const chosen = persons.find(person => person.id === Number(req.params.id)); 
    if (!chosen) {
        next();
    }
    res.json(chosen); 
    
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.number) {
        return res.status(404).json({ error: 'Missing number data' }); 
    }

    const nameAlreadyIncluded = persons.filter(person => person.name === req.body.name); 

    if (nameAlreadyIncluded.length > 0) {
        return res.status(404).json({ error: 'name must be unique' }); 
    }

    const newPerson = {}; 
    newPerson.id = Math.random(); 
    newPerson.name = req.body.name; 
    newPerson.number = req.body.number;

    persons.push(newPerson); 
    morgan.token('type', function (req) { return JSON.stringify(req.body) })


    res.json(newPerson);
    
})

app.delete('/api/persons/:id', (req, res, next) => {
    const newArr = persons.filter(person => person.id !== Number(req.params.id)); 
    persons = newArr; 
    res.json(persons); 
})

app.use((req, res) => {
    res.status(404).json({error: 'not found, sorry'}); 
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running in port: ${PORT}`)
})
