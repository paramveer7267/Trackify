import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <div>
        AuthScreen
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-blue-500 hover:underline"
        >
          Signup
        </Link>
      </div>
      ;
    </div>
  );
};

export default HomePage;
