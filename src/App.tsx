import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-100 dark:bg-gray-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
