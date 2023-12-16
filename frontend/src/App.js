
import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';

function App() {
  return (
    <>
    
    <Header/>
    <main className='pt-16'> 
      <Outlet/>
    </main>
  
    </>
  );
}

export default App;
