
import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';

function App() {
  return (
    <>
    
    <Header/>
    <main className='pt-16 bg-gradient-to-r from-pink-500 to-purple-700 min-h-[calc(100vh)]'> 
      <Outlet/>
    </main>
  
    </>
  );
}

export default App;
