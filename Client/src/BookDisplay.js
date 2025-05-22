import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookDisplay() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    navigate('/');
  };

  return (
    <div className="book-display-container">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>
      <p className="book-year"><strong>Published Year:</strong> {book.publication_year}</p>

      <div className="buttons-container">
        <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>

      <style jsx>{`
        .book-display-container {
          width: 100%;
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .book-title {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
        }

        .book-author, .book-genre, .book-year {
          font-size: 18px;
          margin: 8px 0;
          color: #555;
        }

        .buttons-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .edit-btn, .delete-btn {
          padding: 10px 16px;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .edit-btn {
          background-color: #4caf50;
          color: white;
        }

        .edit-btn:hover {
          background-color: #388e3c;
        }

        .delete-btn {
          background-color: #e53935;
          color: white;
        }

        .delete-btn:hover {
          background-color: #b71c1c;
        }

        @media (max-width: 600px) {
          .book-display-container {
            padding: 15px;
            margin: 20px;
          }

          .book-title {
            font-size: 24px;
          }

          .book-author, .book-genre, .book-year {
            font-size: 16px;
          }

          .buttons-container {
            flex-direction: column;
            gap: 10px;
          }

          .edit-btn, .delete-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}






























