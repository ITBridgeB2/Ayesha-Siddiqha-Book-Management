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


























// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// export default function CategoryBooks() {
//   const { category } = useParams();
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/books')
//       .then(res => {
//         const filtered = res.data.filter(books => books.genre === category);
//         setBooks(filtered);
//       });
//   }, [category]);

//   return (
//     <div style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
//       <h2>Books in "{category}"</h2>
//       {books.length > 0 ? (
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {books.map(books => (
//             <li key={books.id} style={{ marginBottom: '10px' }}>
//               <Link to={`/books/${books.id}`} style={{ color: '#1d4ed8', textDecoration: 'none' }}>
//                 {books.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No books found in this category.</p>
//       )}
//     </div>
//   );
// }
