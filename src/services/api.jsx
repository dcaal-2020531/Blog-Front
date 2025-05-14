import axios from "axios";

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: "/api", // Esto será redirigido por el proxy
  timeout: 3000,
});

// Función para obtener token del localStorage
const getToken = () => localStorage.getItem("token");

// Headers con token


//////////////////////////////
// 📚 Publicaciones
//////////////////////////////

export const getAllPublications = async () => {
  try {
    return await apiClient.get("/publication");
  } catch (err) {
    return { error: true, err };
  }
};

export const getPublicationById = async (id) => {
  try {
    return await apiClient.get(`/publication/${id}`);
  } catch (err) {
    return { error: true, err };
  }
};

export const createPublication = async (publication) => {
  try {
    return await apiClient.post("/publication", publication, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

export const updatePublication = async (id, updatedData) => {
  try {
    return await apiClient.put(`/publication/${id}`, updatedData, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

export const deletePublication = async (id) => {
  try {
    return await apiClient.delete(`/publication/${id}`, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

//////////////////////////////
// 💬 Comentarios
//////////////////////////////

export const getCommentsByPublication = async (publicationId) => {
  try {
    return await apiClient.get(`/comment/publication/${publicationId}`);
  } catch (err) {
    return { error: true, err };
  }
};

export const createComment = async (comment) => {
  try {
    return await apiClient.post("/comment", comment, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

export const deleteComment = async (id) => {
  try {
    return await apiClient.delete(`/comment/${id}`, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

//////////////////////////////
// 📘 Cursos
//////////////////////////////

export const getAllCourses = async () => {
  try {
    return await apiClient.get("/course");
  } catch (err) {
    return { error: true, err };
  }
};

export const getCourseById = async (id) => {
  try {
    return await apiClient.get(`/course/${id}`);
  } catch (err) {
    return { error: true, err };
  }
};

export const createCourse = async (course) => {
  try {
    return await apiClient.post("/course", course, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

export const updateCourse = async (id, updatedData) => {
  try {
    return await apiClient.put(`/course/${id}`, updatedData, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};

export const deleteCourse = async (id) => {
  try {
    return await apiClient.delete(`/course/${id}`, authHeaders());
  } catch (err) {
    return { error: true, err };
  }
};
