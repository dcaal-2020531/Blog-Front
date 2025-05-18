import { useEffect, useState } from 'react'
import { useApi } from '../../shared/hooks/useApi.jsx'
import { CommentSection } from '../Comment.jsx'

export const Posts = () => {
  const { posts, isFetchingPosts, getPosts } = useApi()
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPosts()
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>

      <input
        type="text"
        placeholder="Buscar por título..."
        className="w-full p-2 border border-gray-300 rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isFetchingPosts ? (
        <p className="text-center">Cargando publicaciones...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No se encontraron publicaciones.</p>
      ) : (
        <div className="grid gap-8">
          {filteredPosts.map((post) => (
            <div key={post._id} className="p-4 border border-gray-200 rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.content}</p>

              {post.course && (
                <p className="text-sm text-blue-600 mt-1">
                  Curso: {post.course.name || post.course}
                </p>
              )}

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="mt-3 w-full h-60 object-cover rounded"
                />
              )}

              {/* Sección de comentarios */}
              <div className="mt-6">
                <CommentSection publicationId={post._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
