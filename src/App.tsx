import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const { kakao } = window;
  const KAKAO_KEY = import.meta.env.REACT_APP_KAKAO_API;
  const GOOGLE_KEY = import.meta.env.REACT_APP_GOOGLE_API;
  const WEATHER_KEY = import.meta.env.REACT_APP_WEATHER_API_KEY;

  if (kakao) {
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_KEY);
    }
  } else {
    console.error("Kakao object is not defined.");
  }

  console.log(window.kakao);

  return (
    <div className="bg-slate-100 dark:bg-gray-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
