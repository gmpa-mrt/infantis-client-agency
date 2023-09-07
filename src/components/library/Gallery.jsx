import { useEffect, useState } from 'react'
import Modal from '../utils/Modal.jsx'

const s3Url = import.meta.env.VITE_S3_URL
const apiUrl = import.meta.env.VITE_API_URL

const Gallery = ({ user }) => {
  const [library, setLibrary] = useState(null)

  const deleteImage = async (id, fileName) => {
    try {
      const response = await fetch(`${apiUrl}/driver/delete/library/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: fileName
        },)
      })

      if (response.ok) {
        const updatedLibrary = library.filter((img) => img.fileName !== fileName)
        setLibrary(updatedLibrary)
      } else {
        // Gérer les erreurs de suppression
      }
    } catch (error) {
      // Gérer les erreurs réseau ou autres erreurs
    }
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("library", data.file[0]);

    try {
      const response = await fetch(`${apiUrl}/driver/library/${user.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const responseBody = await response.json();
        const updatedLibrary = JSON.parse(responseBody.library); // Analysez la bibliothèque depuis la réponse
        setLibrary(updatedLibrary);

        window.location.reload()
      } else {
        // Gérez les erreurs ici si nécessaire
      }
    } catch (error) {
      // Gérez les erreurs réseau ou autres erreurs ici
    }
  };


  useEffect(() => {
    if (user.library) {
      const libraryJson = JSON.parse(user.library)
      setLibrary(libraryJson)
    }
  }, [])

  return (
    <div className={'flex flex-col  2xl:grid grid-cols-3 gap-16'}>
      {library && library.map((img, index) =>
        <div key={img.fileName} className={'relative w-[400px] h-[400px] group'}>
          <button
            className={'hidden absolute top-1/2 left-1/2 right-1/2 -translate-x-1/2 text-white text-xl font-bold group-hover:block z-10'}
            onClick={() => deleteImage(user.id, img.fileName)}
          >
            Supprimer
          </button>
          <img key={`${img.fileName}-${index}`} className="w-full h-full object-cover" src={`${s3Url}/agency/${user.name}/library/${img.fileName}`} alt=""  onLoad={() => console.log('Image chargée')}/>
          <div className={'w-full h-full absolute top-0 left-0  group-hover:bg-black/50'}/>
        </div>
      )}
      <div className={'w-[400px] h-[400px] bg-stone-400 flex justify-center items-center'}>
        <Modal onSubmit={onSubmit}/>
      </div>
    </div>
  )
}

export default Gallery
