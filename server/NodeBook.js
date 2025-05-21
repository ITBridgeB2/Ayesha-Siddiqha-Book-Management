import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root', // Update with your MySQL password
  database: 'library',
};

// GET all books
app.get('/books', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM books ORDER BY created_at DESC');
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET one book
app.get('/books/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    await connection.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});
//Get genres
app.get('/genres', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT DISTINCT genre FROM books');
    await connection.end();

    const genres = rows.map(row => row.genre);
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Step 1: Get the genre of the current book
    const [genreRows] = await connection.execute('SELECT genre FROM books WHERE id = ?', [req.params.id]);
    if (genreRows.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Book not found' });
    }

    const genre = genreRows[0].genre;

    // Step 2: Get books with the same genre excluding the current book
    const [relatedBooks] = await connection.execute('SELECT id, title FROM books WHERE genre = ? AND id != ?', [genre, req.params.id]);
    await connection.end();

    res.json(relatedBooks);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// POST new book
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)',
      [title, author, genre, publication_year]
    );
    const [book] = await connection.execute('SELECT * FROM books WHERE id = ?', [result.insertId]);
    await connection.end();
    res.status(201).json(book[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update book
app.put('/books/:id', async (req, res) => {
  const { title, author, genre, publication_year } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?',
      [title, author, genre, publication_year, req.params.id]
    );
    if (result.affectedRows === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Book not found' });
    }
    const [book] = await connection.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    await connection.end();
    res.json(book[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE book
app.delete('/books/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    await connection.end();
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
