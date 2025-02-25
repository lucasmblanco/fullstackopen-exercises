require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Note = require('./models/note')
const Person = require('./models/person')


const PORT = process.env.PORT

let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]



app.use(express.static('build'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const url = process.env.MONGODB_URI;

// mongoose.set('strictQuery', false)

// mongoose.connect(url)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.error('Error connecting to MongoDB:', error));




app.get('/api/persons', (req, res) => {
  try {
    Person.find({}).then(result => {
      res.json(result)
    })
  } catch (error) {
    console.log(error)
  }
})

app.get('/info', (req, res) => {
  const response = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
  res.send(response)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const personBody = req.body

  if (personBody.number === undefined) {
    return res.status(404).json({ error: 'Missing number data' })
  }

  const newPerson = new Person({
    name: personBody.name,
    number: personBody.number
  })

  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => res.status(400).json({ error: error.message }))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const personNumber = {
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, personNumber, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)



// const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running in port: ${PORT}`)
})
