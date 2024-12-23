const express = require('express');
const mongoose = require('mongoose'); // to interact with MongoDB
const app = express();
const port = 5001;
const cors = require('cors');

app.use(express.json());
app.use(cors());

// connect to mongoDB
mongoose.connect('mongodb+srv://Ahmed:4815162342@cluster0.o3tt3.mongodb.net/flashcardDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


// mongodb+srv://Ahmed:<db_password>@cluster0.o3tt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  .then(() => console.log('Connected to MongoDB')) // confirm connection success
  .catch(err => console.error('Error connecting to MongoDB:', err.message)); // handle connection errors

// define the flashcard schemas
const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },

});

const flashcardSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // optional desription
  cards: [flashcardSchema], // array of flashcards
});

// create models for flashcard sets
const FlashcardSet = mongoose.model('FlashcardSet', flashcardSetSchema);

// routes

// create a new flashcard set
app.post('/api/sets', async (req, res) => {
  try {
    const newSet = new FlashcardSet(req.body); // create a new flashcard set
    const savedSet = await newSet.save(); // save to the database
    res.status(201).json(savedSet); // return the saved set
  } 
  catch (err) {
    console.error('Error saving flashcard set:', err.message);
    res.status(400).json({ error: err.message }); // handles errors
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// get all flashcard sets
app.get('/api/sets', async (req, res) => {
  try {
    const sets = await FlashcardSet.find(); // retrieve all sets
    res.json(sets); // return the sets as a json response
  } catch (err) {
    console.error('Error retrieving flashcard sets:', err); // log the error for debugging
    res.status(500).json({ error: err.message }); // handle errors
  }
});

// gets a single flashcard set by id
app.get('/api/sets/:id', async (req, res) => {
  try {
    const set = await FlashcardSet.findById(req.params.id); // find set by id
    if (!set) return res.status(404).json({ error: 'Set not found' }); // handle not found
    res.json(set);
  } catch (err) {
    console.error('Error retrieving flashcard set:', err); // log the error for debugging
    res.status(500).json({ error: err.message }); // handle errors
  }
});


// update a flashcard set by id
app.put('/api/sets/:id', async (req, res) => {
  try {
    const updatedSet = await FlashcardSet.findByIdAndUpdate(req.params.id, req.body, { new: true }); // update and return new

    res.json(updatedSet);
  } catch (err) {
    res.status(400).json({ error: err.message }); // handle errors
  }
});

// delete a flashcard set by id
app.delete('/api/sets/:id', async (req, res) => {
  try {
    await FlashcardSet.findByIdAndDelete(req.params.id); // delete by id
    res.json({ message: 'Flashcard set deleted successfully' }); // confirm deletion
  } 
  catch (err) {
    res.status(500).json({ error: err.message }); // handle errors
  }
});
// end of connecting to mongo

// Start the server
app.listen(port, () => {

  console.log(`Backend server running on http://localhost:${port}`);
});
