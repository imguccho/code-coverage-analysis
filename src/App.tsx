import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';

const App: React.FC = memo(() => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
});

App.displayName = 'App';

export default App;
