import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
        <Header />
        <main className="pt-16 bg-gradient-to-r from-pink-500 to-purple-700 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
