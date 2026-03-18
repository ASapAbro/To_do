import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      showToast("Veuillez remplir tous les champs", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      showToast("Connexion réussie !", "success");
      setTimeout(() => window.location.href = "/tasks", 500);
    } catch (err) {
      showToast(err.response?.data?.msg || "Erreur de connexion", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <h1>MyTasks</h1>
            <p>Connectez-vous à votre compte</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Adresse e-mail</label>
              <input 
                placeholder="votre@email.com" 
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input 
                placeholder="••••••••" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="link-text">
            Pas encore de compte ?
            <Link to="/register" className="link">Créer un compte</Link>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
