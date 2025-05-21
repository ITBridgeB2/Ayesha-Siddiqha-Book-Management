import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/genres')
      .then(res => setCategories(res.data));
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <Link to={`/categories/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function CategoryList() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/books`)
//       .then(res => {
//         const genres = [...new Set(res.data.map(book => book.genre))];
//         setCategories(genres);
//       });
//   }, []);

//   return (
//     <div style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
//       <h2>Browse by Category</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {categories.map((genre, idx) => (
//           <li key={idx} style={{ marginBottom: '10px' }}>
//             <Link to={`/categories/${encodeURIComponent(genre)}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
//               {genre}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
