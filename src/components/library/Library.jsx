import { Suspense } from 'react'
import MainPicture from './MainPicture.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import Gallery from './Gallery.jsx'

const Library = () => {
  const { user } = useAuth()
  return (
    <section id="library" className={'mt-10 flex flex-col space-y-10 bg-stone-200 p-16 rounded'}>
      <div>
        <h2 className={'text-2xl py-2 font-bold mb-5'}>Photo principale</h2>
        <MainPicture agency={user}/>
      </div>
      <div>
        <h2 className={'text-2xl py-2 font-bold mb-5'}>Galerie</h2>
        <Gallery user={user}/>
      </div>
    </section>
  )
}

export default Library
