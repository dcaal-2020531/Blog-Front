// En tu App.jsx o componente PublicationForm.jsx
import { createPublication } from './api'; // Asegúrate de importar tu función

const PublicationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    course: "" // Asegúrate de tener el ID del curso si es necesario
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPublication(formData);
      console.log("Publicación creada:", response.data);
      alert("¡Publicación creada con éxito!");
    } catch (error) {
      console.error("Error al crear:", error);
      alert("Error al crear la publicación");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <textarea
        placeholder="Contenido"
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
      />
      <button type="submit">Crear Publicación</button>
    </form>
  );
};