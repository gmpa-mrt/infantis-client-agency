import React, { useEffect, useState } from 'react'
import logo from '../assets/logo/logo_blue.png'
import * as Form from '@radix-ui/react-form'
import { Card } from '@radix-ui/themes'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate, useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;


const LoginPage = () => {
  const {login, user} = useAuth()
  const navigate = useNavigate();

  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const [serverErrors, setServerErrors] = React.useState({
    email: false,
    password: false,
  });

  const submitForm = (data) => fetch(`${apiUrl}/agency/login`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className={"h-screen flex"}>
      <section className={"flex-1 flex flex-col justify-center items-center space-y-5"}>
        <div>
          <h1>Infantis Portail Agence</h1>
          <span>Nous sommes ravis de vous revoir !</span>
        </div>
        <Card size="3" style={{ width: 500 }} className={"flex justify-center"}>
          <h2 className={"text-tertiary font-bold text-xl"}>Connexion</h2>
          <Form.Root className="w-[260px]"
            // `onSubmit` only triggered if it passes client-side validation
                     onSubmit={(event) => {
                       const data = Object.fromEntries(new FormData(event.currentTarget));
                       // Submit form data and catch errors in the response
                       submitForm(data)
                         .then((response) => {
                           if (!response.ok) {
                             throw new Error('La requête a échoué');
                           }
                           return response.json(); // Vous pouvez également utiliser response.json() si la réponse est au format JSON
                         })
                         .then(response => {
                           login(response.token)
                           navigate('/home')
                         })
                         /**
                          * Map errors from your server response into a structure you'd like to work with.
                          * In this case resulting in this object: `{ email: false, password: true }`
                          */
                         .catch((errors) => {
                           console.log("Erros SubmitForm ===> ", errors)
                           setInvalidCredentials(true)
                         });

                       // prevent default form submission
                       event.preventDefault();
                     }}
                     onClearServerErrors={() =>
                       setServerErrors({ email: false, password: false })
                     }
          >
            {invalidCredentials && <span className="text-[13px] text-red-700 opacity-[0.8]">Identifiants incorrects</span>}
            <Form.Field className="grid mb-[10px]" name="email">
              <div className="flex flex-col items-baseline justify-between mb-2">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-tertiary">
                  Email
                </Form.Label>
                <Form.Message className="text-[13px] text-red-700 opacity-[0.8]" match="valueMissing">
                  Veuillez entrer un email valide
                </Form.Message>
                <Form.Message className="text-[13px] text-tertiary opacity-[0.8]" match="typeMismatch">
                  Identifiants incorrect
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-tertiary shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                  type="email"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="password">
              <div className="flex flex-col items-baseline justify-between mb-2">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-tertiary">
                  Mot de passe
                </Form.Label>
                <Form.Message className="text-[13px] text-red-700 opacity-[0.8]" match="valueMissing">
                  Veuillez entrer un mot de passe
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-tertiary shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                  type="password"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <button className="box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                Se connecter
              </button>
            </Form.Submit>
          </Form.Root>
        </Card>
      </section>
      <div className={"flex-1 flex justify-center items-center bg-slate-900"}>
        <img
          src={logo}
          alt="Infantis"
          className={"object-cover"}
        />
      </div>

    </main>
  )
}

export default LoginPage
