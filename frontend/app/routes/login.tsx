import { useState } from "react";
import { useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasLoggedIn = await login(email, password);

    if (hasLoggedIn) {
      navigate("/");
    }
  };

  return (
    <section className="bg-white shadow-md mx-auto my-28 p-6 rounded-lg max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-bold text-2xl text-center">Login</h2>

        {error && (
          <div className="bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700">
            {error}
          </div>
        )}

        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 focus:ring-opacity-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-semibold text-white"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

function Input({
  type,
  label,
  value,
  onChange,
  required = false,
}: {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label htmlFor={type} className="block">
      <span className="font-medium text-gray-700 text-sm"> {label} </span>

      <input
        type={type}
        id={type}
        value={value}
        onChange={onChange}
        required={required}
        className="shadow-sm mt-0.5 p-2 border border-gray-300 rounded w-full sm:text-sm"
      />
    </label>
  );
}
