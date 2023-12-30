
import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';

function App() {
  return (
    <>
    
    <Header/>
    <main className='pt-16 bg-slate-500 min-h-[calc(100vh)]'> 
      <Outlet/>
    </main>
  
    </>
  );
}

export default App;
