import { useState } from 'react'
import { useApi } from '../shared/hooks/useApi.jsx'

export function CommentSection({ publicationId, comments }) {
  const { addComment, removeComment } = useApi()
  const [newComment, setNewComment] = useState('')
  const [author, setAuthor] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await addComment({
      authorName: author,
      content: newComment,
      publication: publicationId
    })

    setAuthor('')
    setNewComment('')
    setIsSubmitting(false)
  }

  const handleDelete = async (id) => {
    await removeComment(id)
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comentarios</h3>

      {comments?.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {comments.map(comment => (
            <li key={comment._id} className="border p-2 rounded">
              <p><strong>{comment.authorName}</strong>: {comment.content}</p>
              <button
                onClick={() => handleDelete(comment._id)}
                className="text-red-600 text-sm mt-1"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Escribe un comentario"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Enviando...' : 'Comentar'}
        </button>
      </form>
    </div>
  )
}
