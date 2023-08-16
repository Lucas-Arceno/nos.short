import './App.css';
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import MainPage from './pages/MainPage'
import LinksEncurtadosPage from './pages/LinksEncurtadosPage'

function App() {

  const [linksList, setLinksList] = useState([]);

  const addLinkList = (link) =>{
    setLinksList([...linksList, link]);
  }

  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='links' element={<LinksEncurtadosPage/>}></Route>
    </Routes>
  );
}

export default App;
