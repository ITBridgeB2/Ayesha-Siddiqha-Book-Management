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






























// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function BookDisplay() {
//   const { id } = useParams();
//   const [book, setBook] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/books/${id}`).then((res) => setBook(res.data));
//   }, [id]);

//   const handleDelete = async () => {
//     await axios.delete(`http://localhost:5000/books/${id}`);
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>{book.title}</h2>
//       <p>Author: {book.author}</p>
//       <p>Genre: {book.genre}</p>
//       <p>Published Year: {book.publication_year}</p>
//       <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }














































// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function BookDisplay() {
//   const [book, setBook] = useState(null);
//   const [books, setCategories] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Fetch book details
//   useEffect(() => {
//     axios.get(`http://localhost:5000/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   // Fetch categories/genres
//   useEffect(() => {
//     axios.get(`http://localhost:5000/books/${id}`).then(res => setCategories(res.data));
//   }, [id]);

//   const deleteBook = async () => {
//     await axios.delete(`http://localhost:5000/books/${id}`);
//     navigate('/');
//   };

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div className="book-details">
//       <style>{`
//         .book-details {
//           max-width: 600px;
//           margin: 40px auto;
//           padding: 24px;
//           background-color: #ffffff;
//           border: 1px solid #e0e0e0;
//           border-radius: 8px;
//           font-family: Arial, sans-serif;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//         }

//         .book-details h2 {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 16px;
//           color: #222;
//         }

//         .book-details p {
//           font-size: 16px;
//           margin-bottom: 12px;
//           color: #444;
//         }

//         .book-details strong {
//           color: #111;
//         }

//         .actions {
//           margin-top: 20px;
//         }

//         .edit-btn,
//         .delete-btn {
//           display: inline-block;
//           padding: 10px 16px;
//           font-size: 14px;
//           font-weight: 600;
//           border: none;
//           border-radius: 6px;
//           text-decoration: none;
//           color: white;
//           cursor: pointer;
//         }

//         .edit-btn {
//           background-color: #f59e0b;
//           margin-right: 12px;
//         }

//         .edit-btn:hover {
//           background-color: #d97706;
//         }

//         .delete-btn {
//           background-color: #ef4444;
//         }

//         .delete-btn:hover {
//           background-color: #dc2626;
//         }

//         .categories {
//           margin-top: 20px;
//         }

//         .category-link {
//           margin-right: 12px;
//           text-decoration: none;
//           color: #1e40af;
//         }

//         .category-link:hover {
//           text-decoration: underline;
//         }
//       `}</style>

//       <h2>{book.title}</h2>
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Genre:</strong> {book.genre}</p>
//       <p><strong>Year:</strong> {book.publication_year}</p>
      
//       {/* <div className="categories">
//         <strong>Related Categories:</strong>
//         {categories.length > 0 ? (
//           categories.map(category => (
//             <Link key={category.id} to={`/category/${category.id}`} className="category-link">
//               {category.name}
//             </Link>
//           ))
//         ) : (
//           <p>No related categories found.</p>
//         )}
//       </div> */}
//       {/* <div className="categories">
//   <strong>Related Genres:</strong>
//   {books.length > 0 ? (
//          books.map((books, index) => (
//       <Link
//         key={index}
//         to={`/category/${books.genre}`}
//         className="category-link"
//       >
//         {books.genre}
//       </Link>
//     ))
//   ) : (
//     <p>No related genres found.</p>
//   )}
// </div> */}


//       <div className="actions">
//         <Link to={`/books/${id}/edit`} className="edit-btn">Edit</Link>
//         <button onClick={deleteBook} className="delete-btn">Delete</button>
//       </div>
//     </div>
//   );
// }























// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function BookDisplay() {
//   const [book, setBook] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   const deleteBook = async () => {
//     await axios.delete(`http://localhost:5000/books/${id}`);
//     navigate('/');
//   };

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div className="book-details">
//       <style>{`
//         .book-details {
//           max-width: 600px;
//           margin: 40px auto;
//           padding: 24px;
//           background-color: #ffffff;
//           border: 1px solid #e0e0e0;
//           border-radius: 8px;
//           font-family: Arial, sans-serif;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//         }

//         .book-details h2 {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 16px;
//           color: #222;
//         }

//         .book-details p {
//           font-size: 16px;
//           margin-bottom: 12px;
//           color: #444;
//         }

//         .book-details strong {
//           color: #111;
//         }

//         .actions {
//           margin-top: 20px;
//         }

//         .edit-btn,
//         .delete-btn {
//           display: inline-block;
//           padding: 10px 16px;
//           font-size: 14px;
//           font-weight: 600;
//           border: none;
//           border-radius: 6px;
//           text-decoration: none;
//           color: white;
//           cursor: pointer;
//         }

//         .edit-btn {
//           background-color: #f59e0b;
//           margin-right: 12px;
//         }

//         .edit-btn:hover {
//           background-color: #d97706;
//         }

//         .delete-btn {
//           background-color: #ef4444;
//         }

//         .delete-btn:hover {
//           background-color: #dc2626;
//         }
//       `}</style>

//       <h2>{book.title}</h2>
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Genre:</strong> {book.genre}</p>
//       <p><strong>Year:</strong> {book.publication_year}</p>
//       <div className="actions">
//         <Link to={`/books/${id}/edit`} className="edit-btn">Edit</Link>
//         <button onClick={deleteBook} className="delete-btn">Delete</button>
//       </div>
//     </div>
//   );
// }





























// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function BookDetails() {
//   const [book, setBook] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   const deleteBook = async () => {
//     await axios.delete(`http://localhost:5000/books/${id}`);
//     navigate('/');
//   };

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div className="space-y-2">
//       <h2 className="text-2xl font-bold">{book.title}</h2>
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Genre:</strong> {book.genre}</p>
//       <p><strong>Year:</strong> {book.publication_year}</p>
//       <p>
//         <Link to={`/books/${id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</Link>
//         <button onClick={deleteBook} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
//       </p>
//     </div>
//   );
// }
