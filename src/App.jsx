import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [courses, setCourses] = useState([])
  const [publications, setPublications] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [commentTexts, setCommentTexts] = useState({}) // comentarios por publicación

  // Cargar cursos y publicaciones al iniciar
useEffect(() => {
  fetchCourses()
  fetchPublications()
}, [])

const fetchCourses = async () => {
  try {
const res = await axios.get('/api/courses')
    console.log(res.data); // Verifica los cursos que recibes
    
    setCourses(res.data)
  } catch (err) {
    console.error('Error al obtener cursos', err)
  }
}

const fetchPublications = async () => {
  try {
    const res = await axios.get('/api/publications')
    console.log(res.data); // Verifica las publicaciones que recibes
    setPublications(res.data)
  } catch (err) {
    console.error('Error al obtener publicaciones', err)
  }
}

  const handlePublish = async () => {
    if (!selectedCourse || !newTitle || !newContent) return alert('Completa todos los campos')

    try {
      const res = await axios.post('/api/publications', {
        title: newTitle,
        content: newContent,
        course: selectedCourse
      })
      setPublications([res.data, ...publications])
      setNewTitle('')
      setNewContent('')
      setSelectedCourse('')
    } catch (err) {
      console.error('Error al publicar', err)
    }
  }

  const handleAddComment = async (pubId) => {
    const content = commentTexts[pubId]
    if (!content) return alert('Escribe un comentario')

    try {
      const res = await axios.post('/api/comments', {
        content,
        authorName: 'Anónimo',
        publication: pubId
      })

      const updated = publications.map(pub => {
        if (pub._id === pubId) {
          return { ...pub, comments: [...pub.comments, res.data] }
        }
        return pub
      })
      setPublications(updated)
      setCommentTexts({ ...commentTexts, [pubId]: '' })
    } catch (err) {
      console.error('Error al comentar', err)
    }
  }

  return (
    <div className="main-container">
      <header className="header">
        <h1>📘 Blog Técnico</h1>
      </header>

      {/* Publicar nueva publicación */}
      <section className="course">
        <h2>Publicar en un curso</h2>
        <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
          <option value="">-- Selecciona un curso --</option>
    {courses.map(course => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Título de la publicación"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido de la publicación"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        />
        <button onClick={handlePublish}>Publicar</button>
      </section>

      {/* Lista de publicaciones */}
      {publications.map(pub => (
        <article key={pub._id} className="publication">
          <h3>{pub.title}</h3>
          <p><strong>Curso:</strong> {pub.course?.name || 'Sin curso'}</p>
          <p>{pub.content}</p>

          {/* Comentarios */}
          <div className="comments-section">
            <h4>Comentarios</h4>
            {pub.comments?.map(c => (
              <div className="comment" key={c._id}>
                <p className="comment-author">{c.authorName}</p>
                <p className="comment-content">{c.content}</p>
              </div>
            ))}
            <textarea
              placeholder="Escribe un comentario"
              value={commentTexts[pub._id] || ''}
              onChange={e => setCommentTexts({ ...commentTexts, [pub._id]: e.target.value })}
            />
            <button onClick={() => handleAddComment(pub._id)}>Comentar</button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default App
