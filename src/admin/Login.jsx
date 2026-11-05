import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-soft p-8"
      >
        <h1 className="font-display uppercase text-2xl mb-1">
          WEB<span className="text-vermilion">NEST</span>
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-mist mb-6">
          Admin access
        </p>

        <label className="block font-mono text-xs uppercase tracking-widest text-mist mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-lg bg-ink border border-white/15 px-4 py-3 text-paper mb-4 focus:border-acid outline-none"
        />

        {error && <p className="text-vermilion text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-acid transition-colors disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
