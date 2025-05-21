import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'library',
};

// Helper function to handle database queries
const query = async (sql, params = []) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    await connection.end();
  }
};

// API Endpoints

// Create a new book
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  try {
    const result = await query(
      'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)',
      [title, author, genre, publication_year]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      author,
      genre,
      publication_year,
      created_at: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Retrieve all books
app.get('/books', async (req, res) => {
  try {
    const books = await query('SELECT * FROM books');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Retrieve a book by ID
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const books = await query('SELECT * FROM books WHERE id = ?', [id]);
    if (books.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(books[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_year } = req.body;

  try {
    const result = await query(
      'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?',
      [title, author, genre, publication_year, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({
      id,
      title,
      author,
      genre,
      publication_year,
      created_at: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get books by category (genre)
// app.get('/books/:category', async (req, res) => {
//   const { category } = req.params;
//   try {
//     const books = await query('SELECT * FROM books WHERE genre = ?', [category]);
//     if (books.length === 0) {
//       return res.status(404).json({ error: 'No books found in this category' });
//     }
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });
app.get('/books/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const books = await query('SELECT * FROM books WHERE genre = ?', [category]);
    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found in this category' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});


// Get all unique genres
app.get('/genres', async (req, res) => {
  try {
    const genres = await query('SELECT DISTINCT genre FROM books');
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
