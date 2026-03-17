import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      showToast("Erreur lors du chargement des tâches", "error");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      showToast("Le titre est requis", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/tasks", { 
        title, 
        description,
        completed: false 
      });
      setTasks([res.data, ...tasks]);
      setTitle(""); 
      setDescription("");
      showToast("Tâche ajoutée avec succès", "success");
    } catch (err) {
      showToast("Erreur lors de l'ajout de la tâche", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      showToast(completed ? "Tâche réactivée" : "Tâche complétée !", "success");
    } catch (err) {
      showToast("Erreur lors de la mise à jour", "error");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      showToast("Tâche supprimée", "success");
    } catch (err) {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("Déconnexion réussie", "success");
    setTimeout(() => navigate("/login"), 500);
  };

  useEffect(() => { 
    fetchTasks(); 
  }, []);

  // Calcul des statistiques
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className="tasks-page">
        <div className="tasks-container">
          <div className="empty-state">
            <div className="spinner spinner-dark" style={{ width: "40px", height: "40px", margin: "0 auto" }}></div>
            <h3 style={{ marginTop: "1rem", color: "var(--text-primary)" }}>Chargement...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="tasks-header">
          <h2>Mes Tâches</h2>
          <button onClick={handleLogout} className="btn-secondary">
            Déconnexion
          </button>
        </div>

        {/* Statistiques */}
        {totalTasks > 0 && (
          <div className="tasks-stats">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{totalTasks}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Actives</div>
              <div className="stat-value" style={{ color: "var(--accent-primary)" }}>{activeTasks}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Complétées</div>
              <div className="stat-value" style={{ color: "var(--success)" }}>{completedTasks}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Progression</div>
              <div className="stat-value" style={{ color: "var(--accent-secondary)" }}>{completionRate}%</div>
            </div>
          </div>
        )}

        <div className="tasks-form">
          <h3>Nouvelle tâche</h3>
          <form onSubmit={addTask}>
            <input 
              placeholder="Titre de la tâche" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              disabled={submitting}
              required
            />
            <input 
              placeholder="Description (optionnelle)" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              disabled={submitting}
            />
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting && <span className="spinner"></span>}
              {submitting ? "Ajout..." : "Ajouter"}
            </button>
          </form>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>Aucune tâche pour le moment</h3>
            <p>Commencez par ajouter votre première tâche ci-dessus</p>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map(t => (
              <div key={t._id} className={`task-item ${t.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  className="task-checkbox"
                  checked={t.completed || false}
                  onChange={() => toggleComplete(t._id, t.completed)}
                />
                <div className="task-content">
                  <h3 className="task-title">{t.title}</h3>
                  {t.description && <p className="task-description">{t.description}</p>}
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => deleteTask(t._id)}
                    className="btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
