import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/User";

export default function ProtectedRoute({ children }: any) {
  const user = useUserStore((state) => state.userKey);
  const navigate = useNavigate();

  // 로그인 상태가 아니면 홈으로 보내기
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
}
