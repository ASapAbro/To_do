import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password) {
      showToast("Veuillez remplir tous les champs", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Le mot de passe doit contenir au moins 6 caractères", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      showToast("Inscription réussie !", "success");
      setTimeout(() => navigate("/tasks"), 500);
    } catch (err) {
      showToast(err.response?.data?.msg || "Erreur d'inscription", "error");
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
            <p>Créez votre compte gratuitement</p>
          </div>
          
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Nom complet</label>
              <input 
                placeholder="Jean Dupont" 
                value={name} 
                onChange={e => setName(e.target.value)}
                disabled={loading}
                required
                autoComplete="name"
              />
            </div>

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
                minLength={6}
                autoComplete="new-password"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>
                Minimum 6 caractères
              </span>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <div className="link-text">
            Déjà un compte ?
            <Link to="/login" className="link">Se connecter</Link>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
