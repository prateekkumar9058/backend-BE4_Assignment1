const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/book.model");

const app = express();

app.use(express.json());

initializeDatabase();

// Question 1 and Question 2
app.post("/books", async (req, res) => {
  const newBook = req.body;
  try {
    const book = new Book(newBook);
    const savedBook = await book.save();
    res.status(200).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add a book" });
  }
});

// Question 3
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books." });
  }
});

// Question 4
app.get("/books/:title", async (req, res) => {
  try {
    const book = await Book.find({ title: req.params.title });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books." });
  }
});

// Question 5
app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.authorName });
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books." });
  }
});

// Question 6
app.get("/books/genres/:genreName", async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genreName });
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books." });
  }
});

// Question 7
app.get("/books/releaseYear/:publishedYear", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: req.params.publishedYear });
    if (books != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books." });
  }
});

// Question 8
app.post("/books/id/:bookId", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the books." });
  }
});

// Question 9
app.post("/books/bookTitle/:title", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book does not exists" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the books." });
  }
});

// Question 10
app.delete("/books/id/:bookId", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the books." });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
