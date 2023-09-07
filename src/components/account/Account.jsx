import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

const apiUrl = import.meta.env.VITE_API_URL

const Account = () => {
  const {user} =useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [description, setDescription] = useState(user.description)

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch(`${apiUrl}/agency/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        description
      })
    })
  }

  return (
    <div id="account" className={"mt-24 p-16 bg-blue-500 rounded "}>
      <form className={"flex flex-col justify-center"} onSubmit={handleSubmit}>
          <label htmlFor="" className={"flex flex-col"}>
            <span>Nom</span>
            <input
              className={"w-1/3"}
              type="text"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </label>
          <label htmlFor="" className={"flex flex-col"}>
            <span>Email</span>
            <input
              className={"w-1/3"}
              type="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </label>
          <label htmlFor="" className={"flex flex-col"}>
            <span>Description</span>
            <textarea
              name="description"
              cols="30" rows="10"
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
              placeholder={"Votre description"}
            >
            </textarea>
          </label>
        <button className={"mt-5 self-start"}>
          Sauvegarder
        </button>
      </form>
    </div>
  )
}

export default Account
