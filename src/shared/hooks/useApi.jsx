import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  getAllPublications,
  createPublication,
  getCommentsByPublication,
  createComment,
  deleteComment as deleteCommentService 
} from '../../services/api.jsx'


export const useApi = () => {
  const [posts, setPosts] = useState([])
  const [isFetchingPosts, setIsFetchingPosts] = useState(true)

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

  const removeComment = async (commentId) => {
  const res = await deleteCommentService(commentId)
  if (res.error) {
    toast.error(
      res?.err?.response?.data?.message || 'Error al eliminar comentario'
    )
    return
  }
  toast.success('Comentario eliminado')
  getPosts() 
}

  const addPost = async (post) => {
    const res = await createPublication(post)
    if (res.error) {
      toast.error(
        res?.err?.response?.data?.message || 'Error al guardar la publicación'
      )
      return
    }
    toast.success('Publicación guardada correctamente')
    getPosts() 
  }

  const addComment = async (comment) => {
    const res = await createComment(comment)
    if (res.error) {
      toast.error(
        res?.err?.response?.data?.message || 'Error al agregar comentario'
      )
      return
    }
    toast.success('Comentario agregado correctamente')
    getPosts() 
  }

  return {
  posts,
  isFetchingPosts,
  getPosts,
  addPost,
  addComment,
  removeComment
}

}
