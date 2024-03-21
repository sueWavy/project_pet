import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import MyPage from "./pages/MyPage.tsx";
import Write from "./pages/Write.tsx";
import View from "./pages/View.tsx";

const { Kakao } = window;

declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_KEY: string | undefined = import.meta.env.VITE_REACT_APP_KAKAO_API;

const GOOGLE_KEY: string | undefined = import.meta.env
  .VITE_REACT_APP_GOOGLE_API;

if (Kakao) {
  if (!Kakao.isInitialized()) {
    Kakao.init(KAKAO_KEY);
    console.log(KAKAO_KEY);
  }
} else {
  console.error("Kakao object is not defined.");
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/mypage/:id", element: <MyPage /> },
      { path: "/view/:id", element: <View /> },
      { path: "/write", element: <Write /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_KEY || ""}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
