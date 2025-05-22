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
























