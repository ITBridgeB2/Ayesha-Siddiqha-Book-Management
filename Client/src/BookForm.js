import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookForm({ editMode = false }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      axios.get(`http://localhost:5000/books/${id}`).then((res) => setBook(res.data));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author) return alert('Title and Author are required');

    if (editMode) {
      await axios.put(`http://localhost:5000/books/${id}`, book);
    } else {
      await axios.post('http://localhost:5000/books', book);
    }
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>{editMode ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-input"
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="form-input"
        />
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="form-input"
        />
        <input
          type="number"
          name="publication_year"
          value={book.publication_year}
          onChange={handleChange}
          placeholder="Publication Year"
          className="form-input"
        />
        <button type="submit" className="submit-btn">{editMode ? 'Update' : 'Add'} Book</button>
      </form>

      <style jsx>{`
        .form-container {
          width: 100%;
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .book-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 16px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4caf50;
        }

        .submit-btn {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background-color: #4caf50;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #388e3c;
        }

        @media (max-width: 600px) {
          .form-container {
            padding: 15px;
            margin: 20px;
          }

          h2 {
            font-size: 20px;
          }

          .form-input {
            font-size: 14px;
          }

          .submit-btn {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}







































