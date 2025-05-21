import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then(res => setBook(res.data));
  }, [id]);

  const deleteBook = async () => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    navigate('/');
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.publication_year}</p>
      <div style={{ marginTop: '16px' }}>
        <Link to={`/books/${id}/edit`} style={{ marginRight: '10px', backgroundColor: '#f59e0b', color: '#fff', padding: '8px 12px', borderRadius: '4px', textDecoration: 'none' }}>Edit</Link>
        <button onClick={deleteBook} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px' }}>Delete</button>
      </div>
    </div>
  );
}
