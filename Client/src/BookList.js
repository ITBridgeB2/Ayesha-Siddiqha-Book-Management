import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => setBooks(res.data))
      .catch(() => setError('Failed to load books. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    } catch {
      alert('Error deleting the book. Try again.');
    }
  };

  const genres = ['All', ...Array.from(new Set(books.map(book => book.genre)))];

  const filteredBooks = books.filter(book =>
    (selectedCategory === 'All' || book.genre === selectedCategory) &&
    (
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="booklist-container">
      <div className="form-wrapper">
        <form className="booklist-form">
          <div className="booklist-form-group flex-container">
            <div className="booklist-form-group-item">
              <label htmlFor="search" className="booklist-label">Search by Title:</label>
              <input
                type="text"
                id="search"
                placeholder="Enter title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="booklist-input"
              />
            </div>

            <div className="booklist-form-group-item">
              <label htmlFor="category" className="booklist-label">Select Genre:</label>
              <select
                id="category"
                className="booklist-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="booklist-form-group">
            <Link to="/add" className="booklist-add-button">Add Book 📘</Link>
          </div>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading-message">Loading books...</div>
      ) : (
        <ul className="booklist-items">
          {filteredBooks.length === 0 ? (
            <li className="no-books">No books found for your filters.</li>
          ) : (
            filteredBooks.map(book => (
              <li key={book.id} className="booklist-item">
                <div className="book-info">
                  <h2 className="booklist-title">
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                  </h2>
                  <p className="booklist-author">{book.author}</p>
                </div>
                {/* <div className="booklist-actions">
                  <Link to={`/books/${book.id}`} className="booklist-view">View 📗</Link>
                  <button onClick={() => deleteBook(book.id)} className="booklist-delete">Delete 📕</button>
                </div> */}
              </li>
            ))
          )}
        </ul>
      )}

      <style jsx>{`
        .booklist-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          font-family: Arial, sans-serif;
        }

        .form-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .booklist-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
        }

        .flex-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
        }

        .booklist-form-group-item {
          flex: 1;
          min-width: 250px;
        }

        .booklist-label {
          font-weight: bold;
          margin-bottom: 6px;
          font-size: 15px;
          color: #333;
          text-align: center;
        }

        .booklist-input,
        .booklist-select {
          padding: 10px;
          width: 100%;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .booklist-add-button {
          margin-top: 8px;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          font-size: 14px;
          transition: background-color 0.3s;
        }

        .booklist-add-button:hover {
          background-color: #388e3c;
        }

        .error-message {
          background-color: #ffe6e6;
          color: #c62828;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-weight: bold;
        }

        .loading-message {
          text-align: center;
          font-size: 16px;
          color: #555;
          margin-top: 20px;
        }

        .booklist-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .booklist-item {
          width: 100%;
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
          text-align: left;
        }

        .book-info {
          margin-bottom: 10px;
        }

        .booklist-title {
          font-size: 20px;
          margin: 0 0 8px;
          color: #1e88e5;
        }

        .booklist-title a {
          text-decoration: none;
          color: inherit;
        }

        .booklist-title a:hover {
          color: #43a047;
        }

        .booklist-author {
          font-size: 15px;
          color: #555;
          margin: 0;
        }

        .booklist-actions {
          display: flex;
          justify-content: flex-start;
          gap: 12px;
        }

        .booklist-view,
        .booklist-delete {
          padding: 8px 14px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .booklist-view {
          background-color: #1e88e5;
          color: white;
        }

        .booklist-view:hover {
          background-color: #1565c0;
        }

        .booklist-delete {
          background-color: #e53935;
          color: white;
        }

        .booklist-delete:hover {
          background-color: #b71c1c;
        }

        .no-books {
          text-align: center;
          padding: 20px;
          font-size: 16px;
          color: #777;
        }

        @media (max-width: 600px) {
          .flex-container {
            flex-direction: column;
            align-items: center;
          }

          .booklist-form-group-item {
            width: 100%;
          }

          .booklist-input,
          .booklist-select {
            width: 90%;
          }

          .booklist-actions {
            flex-direction: column;
            align-items: flex-start;
          }

          .booklist-view,
          .booklist-delete {
            width: 100%;
            text-align: center;
          }

          .booklist-add-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}












































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function BookList() {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/books')
//       .then(res => setBooks(res.data))
//       .catch(() => setError('Failed to load books. Please try again.'))
//       .finally(() => setLoading(false));
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/books/${id}`);
//       setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
//     } catch {
//       alert('Error deleting the book. Try again.');
//     }
//   };

//   const genres = ['All', ...Array.from(new Set(books.map(book => book.genre)))];

//   const filteredBooks = books.filter(book =>
//     (selectedCategory === 'All' || book.genre === selectedCategory) &&
//     (
//       book.title.toLowerCase().includes(search.toLowerCase()) ||
//       book.genre.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="booklist-container">
//       <form className="booklist-form">
//         <div className="booklist-form-group">
//           <label htmlFor="search" className="booklist-label">Search by Title or Genre:</label>
//           <input
//             type="text"
//             id="search"
//             placeholder="Enter title or genre..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="booklist-input"
//           />
//         </div>

//         <div className="booklist-form-group">
//           <label htmlFor="category" className="booklist-label">Select Genre:</label>
//           <select
//             id="category"
//             className="booklist-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {genres.map(genre => (
//               <option key={genre} value={genre}>{genre}</option>
//             ))}
//           </select>
//         </div>

//         <div className="booklist-form-group">
//           <Link to="/add" className="booklist-add-button">Add Book 📘</Link>
//         </div>
//       </form>

//       {error && <div className="error-message">{error}</div>}
//       {loading ? (
//         <div className="loading-message">Loading books...</div>
//       ) : (
//         <ul className="booklist-items">
//           {filteredBooks.length === 0 ? (
//             <li className="no-books">No books found for your filters.</li>
//           ) : (
//             filteredBooks.map(book => (
//               <li key={book.id} className="booklist-item">
//                 <div className="book-info">
//                   <h2 className="booklist-title">
//                     <Link to={`/books/${book.id}`}>{book.title}</Link>
//                   </h2>
//                   <p className="booklist-author">{book.author}</p>
//                 </div>
//                 <div className="booklist-actions">
//                   <Link to={`/books/${book.id}`} className="booklist-view">View 📗</Link>
//                   <button onClick={() => deleteBook(book.id)} className="booklist-delete">Delete 📕</button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       )}

//       <style jsx>{`
//         .booklist-container {
//           max-width: 600px;
//           margin-left: 20px;
//           margin-right: auto;
//           margin-top: 20px;
//           padding: 15px 20px;
//           background-color: #ffffff;
//           border-radius: 10px;
//           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
//           font-family: Arial, sans-serif;
//         }

//         .booklist-form {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 20px;
//           margin-bottom: 30px;
//           align-items: flex-end;
//         }

//         .booklist-form-group {
//           flex: 1;
//           min-width: 200px;
//           display: flex;
//           flex-direction: column;
//         }

//         .booklist-label {
//           font-weight: bold;
//           margin-bottom: 6px;
//           font-size: 15px;
//           color: #333;
//         }

//         .booklist-input,
//         .booklist-select {
//           padding: 10px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 14px;
//         }

//         .booklist-input:focus,
//         .booklist-select:focus {
//           border-color: #4caf50;
//           outline: none;
//         }

//         .booklist-add-button {
//           padding: 10px 16px;
//           background-color: #4caf50;
//           color: white;
//           border-radius: 8px;
//           text-align: center;
//           text-decoration: none;
//           font-weight: bold;
//           font-size: 14px;
//           transition: background-color 0.3s;
//         }

//         .booklist-add-button:hover {
//           background-color: #388e3c;
//         }

//         .error-message {
//           background-color: #ffe6e6;
//           color: #c62828;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 16px;
//           font-weight: bold;
//         }

//         .loading-message {
//           text-align: center;
//           font-size: 16px;
//           color: #555;
//           margin-top: 20px;
//         }

//         .booklist-items {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//         }

//         .booklist-item {
//           width: 100%;
//           background-color: #f5f5f5;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 16px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
//           text-align: left;
//         }

//         .book-info {
//           margin-bottom: 10px;
//         }

//         .booklist-title {
//           font-size: 20px;
//           margin: 0 0 8px;
//           color: #1e88e5;
//         }

//         .booklist-title a {
//           text-decoration: none;
//           color: inherit;
//         }

//         .booklist-title a:hover {
//           color: #43a047;
//         }

//         .booklist-author {
//           font-size: 15px;
//           color: #555;
//           margin: 0;
//         }

//         .booklist-actions {
//           display: flex;
//           justify-content: flex-start;
//           gap: 12px;
//         }

//         .booklist-view,
//         .booklist-delete {
//           padding: 8px 14px;
//           border-radius: 6px;
//           text-decoration: none;
//           font-size: 14px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .booklist-view {
//           background-color: #1e88e5;
//           color: white;
//         }

//         .booklist-view:hover {
//           background-color: #1565c0;
//         }

//         .booklist-delete {
//           background-color: #e53935;
//           color: white;
//         }

//         .booklist-delete:hover {
//           background-color: #b71c1c;
//         }

//         .no-books {
//           text-align: center;
//           padding: 20px;
//           font-size: 16px;
//           color: #777;
//         }

//         @media (max-width: 600px) {
//           .booklist-form {
//             flex-direction: column;
//           }

//           .booklist-add-button {
//             width: 100%;
//           }

//           .booklist-actions {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .booklist-view,
//           .booklist-delete {
//             width: 100%;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




















// import React, { useState, useEffect } from 'react'; // Importing React and hooks
// import axios from 'axios'; // Importing axios
// import { Link } from 'react-router-dom'; // Link for navigation

// export default function BookList() {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/books')
//       .then(res => setBooks(res.data))
//       .catch(() => setError('Failed to load books. Please try again.'))
//       .finally(() => setLoading(false));
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/books/${id}`);
//       setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
//     } catch {
//       alert('Error deleting the book. Try again.');
//     }
//   };

//   const genres = ['All', ...Array.from(new Set(books.map(book => book.genre)))];

//   const filteredBooks = books.filter(book =>
//     (selectedCategory === 'All' || book.genre === selectedCategory) &&
//     (
//       book.title.toLowerCase().includes(search.toLowerCase()) ||
//       book.genre.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="booklist-container">
//       <form className="booklist-form">
//         <div className="booklist-form-group">
//           <label htmlFor="search" className="booklist-label">Search by Title or Genre:</label>
//           <input
//             type="text"
//             id="search"
//             placeholder="Enter title or genre..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="booklist-input"
//           />
//         </div>

//         <div className="booklist-form-group">
//           <label htmlFor="category" className="booklist-label">Select Genre:</label>
//           <select
//             id="category"
//             className="booklist-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {genres.map(genre => (
//               <option key={genre} value={genre}>{genre}</option>
//             ))}
//           </select>
//         </div>

//         <div className="booklist-form-group">
//           <Link to="/add" className="booklist-add-button">Add Book 📘</Link>
//         </div>
//       </form>

//       {error && <div className="error-message">{error}</div>}
//       {loading ? (
//         <div className="loading-message">Loading books...</div>
//       ) : (
//         <ul className="booklist-items">
//           {filteredBooks.length === 0 ? (
//             <li className="no-books">No books found for your filters.</li>
//           ) : (
//             filteredBooks.map(book => (
//               <li key={book.id} className="booklist-item">
//                 <h2 className="booklist-title">
//                   <Link to={`/books/${book.id}`}>{book.title}</Link>
//                 </h2>
//                 <p className="booklist-author">{book.author}</p>
//                 <div className="booklist-actions">
//                   <Link to={`/books/${book.id}`} className="booklist-view">View 📗</Link>
//                   <button onClick={() => deleteBook(book.id)} className="booklist-delete">Delete 📕</button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       )}

//       <style jsx>{`
      
//         .booklist-container {
//   max-width: 600px;           /* reduced from 800px */
//   margin: 20px auto;
//   padding: 15px 20px;         /* reduced padding */
//   background-color: #ffffff;
//   border-radius: 10px;        /* slightly smaller */
//   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
//   font-family: Arial, sans-serif;
// }


//         .booklist-form {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 20px;
//           margin-bottom: 30px;
//           align-items: flex-end;
//         }

//         .booklist-form-group {
//           flex: 1;
//           min-width: 200px;
//           display: flex;
//           flex-direction: column;
//         }

//         .booklist-label {
//           font-weight: bold;
//           margin-bottom: 6px;
//           font-size: 15px;
//           color: #333;
//         }

//         .booklist-input,
//         .booklist-select {
//           padding: 10px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 14px;
//         }

//         .booklist-input:focus,
//         .booklist-select:focus {
//           border-color: #4caf50;
//           outline: none;
//         }

//         .booklist-add-button {
//           padding: 10px 16px;
//           background-color: #4caf50;
//           color: white;
//           border-radius: 8px;
//           text-align: center;
//           text-decoration: none;
//           font-weight: bold;
//           font-size: 14px;
//           transition: background-color 0.3s;
//         }

//         .booklist-add-button:hover {
//           background-color: #388e3c;
//         }

//         .error-message {
//           background-color: #ffe6e6;
//           color: #c62828;
//           padding: 12px;
//           border-radius: 8px;
//           margin-bottom: 16px;
//           font-weight: bold;
//         }

//         .loading-message {
//           text-align: center;
//           font-size: 16px;
//           color: #555;
//           margin-top: 20px;
//         }

//         .booklist-items {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .booklist-item {
//           background-color: #f5f5f5;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 16px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
//           transition: box-shadow 0.3s, background-color 0.3s;
//         }

//         .booklist-item:hover {
//           background-color: #f0f0f0;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .booklist-title {
//           font-size: 20px;
//           margin: 0 0 8px;
//           color: #1e88e5;
//         }

//         .booklist-title a {
//           text-decoration: none;
//           color: inherit;
//         }

//         .booklist-title a:hover {
//           color: #43a047;
//         }

//         .booklist-author {
//           font-size: 15px;
//           color: #555;
//           margin-bottom: 10px;
//         }

//         .booklist-actions {
//           display: flex;
//           justify-content: flex-start;
//           gap: 12px;
//         }

//         .booklist-view,
//         .booklist-delete {
//           padding: 8px 14px;
//           border-radius: 6px;
//           text-decoration: none;
//           font-size: 14px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .booklist-view {
//           background-color: #1e88e5;
//           color: white;
//         }

//         .booklist-view:hover {
//           background-color: #1565c0;
//         }

//         .booklist-delete {
//           background-color: #e53935;
//           color: white;
//         }

//         .booklist-delete:hover {
//           background-color: #b71c1c;
//         }

//         .no-books {
//           text-align: center;
//           padding: 20px;
//           font-size: 16px;
//           color: #777;
//         }

//         @media (max-width: 600px) {
//           .booklist-form {
//             flex-direction: column;
//           }

//           .booklist-add-button {
//             width: 100%;
//           }

//           .booklist-actions {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .booklist-view,
//           .booklist-delete {
//             width: 100%;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }











































// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function BookList() {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/books')
//       .then(res => setBooks(res.data))
//       .catch(() => setError('Failed to load books. Please try again.'))
//       .finally(() => setLoading(false));
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/books/${id}`);
//       setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
//     } catch {
//       alert('Error deleting the book. Try again.');
//     }
//   };

//   const genres = ['All', ...Array.from(new Set(books.map(book => book.genre)))];

//   const filteredBooks = books.filter(book =>
//     (selectedCategory === 'All' || book.genre === selectedCategory) &&
//     (
//       book.title.toLowerCase().includes(search.toLowerCase()) ||
//       book.genre.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="booklist-container">
//       <div className="booklist-header">
//         <input
//           type="text"
//           placeholder="Search by title or genre..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="booklist-search"
//         />
//         <select
//           className="booklist-category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {genres.map(genre => (
//             <option key={genre} value={genre}>{genre}</option>
//           ))}
//         </select>
//         <Link to="/add" className="booklist-add-button">Add 📘</Link>
//       </div>

//       {error && <div className="error-message">{error}</div>}
//       {loading ? (
//         <div className="loading-message">Loading books...</div>
//       ) : (
//         <ul>
//           {filteredBooks.length === 0 ? (
//             <li>No books found for your filters.</li>
//           ) : (
//             filteredBooks.map(book => (
//               <li key={book.id} className="booklist-item">
//                 <h2 className="booklist-title"><Link to={`/books/${book.id}`}>{book.title}</Link></h2>
//                 <p className="booklist-author">{book.author}</p>
//                 <div className="booklist-actions">
//                   <Link to={`/books/${book.id}`} className="booklist-view">View 📗</Link>
//                   <button onClick={() => deleteBook(book.id)} className="booklist-delete">Delete 📕</button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

































