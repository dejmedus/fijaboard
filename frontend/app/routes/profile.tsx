import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return; // so ts doesn't get mad, but naviate will redirect
  }

  return <main>hi {user.username} this is your profile</main>;
}
