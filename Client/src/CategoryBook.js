import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';  // Import Link here
import axios from 'axios';

export default function CategoryBooks() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/genre/${genre}`)
      .then(res => setBooks(res.data));
  }, [genre]);

  return (
    <div>
      <h2>Books in {genre} category</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link> {/* Link is now correctly imported */}
          </li>
        ))}
      </ul>
    </div>
  );
}


























