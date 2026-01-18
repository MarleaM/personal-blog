//import { useState } from 'react'
import Header from './components/header.tsx'
import Hero from './components/hero.tsx'
import Blog from './components/blog.tsx'
//import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
      <Header/>
      <Hero/>
      <Blog/>
    </div>
  );
}

export default App;
