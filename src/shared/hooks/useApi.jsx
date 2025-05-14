import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  getAllPublications,
  createPublication,
  getCommentsByPublication,
  createComment
} from '../../services/api.jsx'

export const useApi = () => {
  const [posts, setPosts] = useState([])
  const [isFetchingPosts, setIsFetchingPosts] = useState(true)

  // Obtener todas las publicaciones con sus comentarios
  const getPosts = async () => {
    setIsFetchingPosts(true)
    const res = await getAllPublications()
    if (res.error) {
      toast.error(
        res?.err?.response?.data?.message || 'Error al obtener las publicaciones'
      )
      setIsFetchingPosts(false)
      return
    }

    // Obtener comentarios de cada publicación
    const postsWithComments = await Promise.all(
      res.data.map(async (post) => {
        const commentsRes = await getCommentsByPublication(post._id)
        return {
          ...post,
          comments: commentsRes.error ? [] : commentsRes.data
        }
      })
    )

    setPosts(postsWithComments)
    setIsFetchingPosts(false)
  }

  // Crear una nueva publicación
  const addPost = async (post) => {
    const res = await createPublication(post)
    if (res.error) {
      toast.error(
        res?.err?.response?.data?.message || 'Error al guardar la publicación'
      )
      return
    }
    toast.success('Publicación guardada correctamente')
    getPosts() // Recarga las publicaciones
  }

  // Agregar comentario a una publicación
  const addComment = async (comment) => {
    const res = await createComment(comment)
    if (res.error) {
      toast.error(
        res?.err?.response?.data?.message || 'Error al agregar comentario'
      )
      return
    }
    toast.success('Comentario agregado correctamente')
    getPosts() // Recarga las publicaciones y sus comentarios
  }

  return {
    posts,
    isFetchingPosts,
    getPosts,
    addPost,
    addComment
  }
}
