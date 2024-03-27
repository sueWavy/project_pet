import Header from "../components/Header";
import noPage from "../assets/noPage.mp4";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-gray-300">
      <Header />
      <h1 className="text-center p-5">
        <span className="border border-black p-3 font-bold ">
          존재하지 않는 페이지입니다 404 NotFound
        </span>
      </h1>
      <video src={noPage} autoPlay loop muted />
      <Footer />
    </div>
  );
}
