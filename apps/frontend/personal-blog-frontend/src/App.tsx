//import { useState } from 'react'
import Header from './components/header.tsx'
import Hero from './components/hero.tsx'
import Blog from './components/blog.tsx'
import { Routes, Route } from 'react-router-dom';
//import './App.css'
import BlogPage from './components/blog_components/blogPage.tsx'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={
          <>
            <Header/>
            <Hero/>
            <Blog />
          </>
          } />
        <Route path="/blog/:id" element={<BlogPage/>} />
      </Routes>
    </div>
  );
}

export default App;
