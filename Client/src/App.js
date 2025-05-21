import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import BookForm from './BookForm';
import BookDisplay from './BookDisplay';
import CategoryList from './CategoryList';
import CategoryBook from './CategoryBook';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <h1 style={styles.header}>📚 Library Manager</h1> {/* Added header here */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm editMode={true} />} />
          <Route path="/books/:id" element={<BookDisplay />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:genre" element={<CategoryBook />} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple styles for header and container
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#3b82f6',  // Blue color for the title
    fontWeight: 'bold',
  },
};

export default App;





































// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import BookList from './BookList';
// import BookForm from './BookForm';
// import BookDisplay from './BookDisplay';
// import BookDetails from './BookDetails';
// import CategoryList from './CategoryList';
// import CategoryBooks from './CategoryBook';

// function App() {
//   return (
//     <Router>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4" align="center">📚 Library Manager</h1>
//         <Routes>
//           <Route path="/" element={<BookList />} />
//           <Route path="/add" element={<BookForm />} />
//           {/* <Route path="/books/:id" element={<BookDetails />} /> */}
//           <Route path="/books/:id" element={<BookDisplay />} />
//           <Route path="/books/:id/edit" element={<BookForm editMode={true} />} />
//           <Route path="/" element={<CategoryList />} />
//         <Route path="/categories/:category" element={<CategoryBooks />} />
//         <Route path="/books/:id" element={<BookDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;