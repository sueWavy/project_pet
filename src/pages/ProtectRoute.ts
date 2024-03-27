import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/User";

export default function ProtectedRoute({ children }: any) {
  const user = useUserStore((state) => state.userKey);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
}
