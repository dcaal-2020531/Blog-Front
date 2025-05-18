import React, { useEffect, useState } from "react";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentData, setCommentData] = useState({});
  const [sortAsc, setSortAsc] = useState(false);
  const [courseFilter, setCourseFilter] = useState("Todos");

  const COURSES = ["Todos", "Taller", "TICS", "Tecnologia", "Practica Supervisada"];

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:1998/v1/publication/posts");
      if (!res.ok) throw new Error("Error cargando publicaciones");
      const { publications } = await res.json();
      setPosts(publications);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCommentChange = (postId, field, value) => {
    setCommentData(prev => ({
      ...prev,
      [postId]: { ...prev[postId], [field]: value }
    }));
  };

  const submitComment = async postId => {
    const comment = commentData[postId];
    if (!comment?.name?.trim() || !comment?.content?.trim()) {
      return alert("Por favor completa el nombre y el comentario");
    }
    try {
      const res = await fetch(
        "http://localhost:1998/v1/comment/createcomment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authorName: comment.name,
            content: comment.content,
            publication: postId
          })
        }
      );
      if (!res.ok) throw new Error("Error enviando comentario");
      setCommentData(prev => ({ ...prev, [postId]: { name: "", content: "" } }));
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = posts.filter(p =>
    courseFilter === "Todos" ? true : p.course === courseFilter
  );

  const sortedPosts = [...filtered].sort((a, b) => {
    const aT = new Date(a.createdAt).getTime();
    const bT = new Date(b.createdAt).getTime();
    return sortAsc ? aT - bT : bT - aT;
  });

  return (
    <div style={{
      width: "100%",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Blog de Aprendizaje</h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "1rem"
      }}>
        <button
          onClick={() => setSortAsc(prev => !prev)}
          style={{
            backgroundColor: "#ff9800",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {sortAsc ? "Más antiguas primero" : "Más nuevas primero"}
        </button>

        <select
          value={courseFilter}
          onChange={e => setCourseFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer"
          }}
        >
          {COURSES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={fetchPosts}
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Refrescar publicaciones
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Cargando publicaciones…</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <div style={{
        maxHeight: "75vh",
        overflowY: "auto",
        paddingRight: "10px"
      }}>
        {sortedPosts.map(post => (
          <div key={post._id} style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "1.5rem"
          }}>
            <h2 style={{ color: "#222" }}>{post.title}</h2>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              <strong>Curso:</strong> {post.course || "Sin curso"}
            </p>
            <p>{post.content}</p>
            <small style={{ color: "#777" }}>
              {new Date(post.createdAt).toLocaleString()}
            </small>

            <div style={{
              marginTop: "1.5rem",
              backgroundColor: "#f0f8ff",
              padding: "1rem",
              borderRadius: "8px"
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>
                Comentarios ({post.comments?.length || 0})
              </h3>
              <ul style={{
                listStyle: "none",
                paddingLeft: 0,
                maxHeight: "40vh",
                overflowY: "auto"
              }}>
                {(post.comments || [])
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map(c => (
                    <li key={c._id} style={{
                      marginBottom: "1rem",
                      backgroundColor: "#fff",
                      padding: "0.8rem",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}>
                      <p><strong>{c.authorName}</strong> dijo:</p>
                      <p>{c.content}</p>
                      <small style={{ color: "#888" }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
              </ul>

              <div style={{ marginTop: "1rem" }}>
                <h4 style={{ marginBottom: "0.5rem" }}>Agregar comentario</h4>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={commentData[post._id]?.name || ""}
                  onChange={e => handleCommentChange(post._id, "name", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                  }}
                />
                <textarea
                  placeholder="Tu comentario"
                  rows={3}
                  value={commentData[post._id]?.content || ""}
                  onChange={e => handleCommentChange(post._id, "content", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    resize: "vertical"
                  }}
                />
                <button
                  onClick={() => submitComment(post._id)}
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Enviar comentario
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
