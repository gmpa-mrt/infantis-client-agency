import defaultPicture from '../../assets/images/default.png'

import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'

const s3Url = import.meta.env.VITE_S3_URL
const apiUrl = import.meta.env.VITE_API_URL

const MainPicture = ({ agency }) => {
  const { register, handleSubmit } = useForm();


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("mainPicture", data.file[0]);

    const fileType = data.file[0].name.split('.').pop();
    formData.append('subtype', fileType);

    try {
      const response = await fetch(`${apiUrl}/driver/avatar/${agency.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        window.location.reload()
      } else {
        // Gérez les erreurs ici si nécessaire
      }
    } catch (error) {
      // Gérez les erreurs réseau ou autres erreurs ici
    }
  };

  return (
    <div className={'grid grid-cols-3'}>
      {agency.main_picture === null
        ? (
          <div className={'relative group w-[500px] h-[500px]'}>
            <img className={'object-cover h-full w-full'} src={defaultPicture} alt=""/>
          </div>
        )
        : (
          <div className={'relative w-full h-full group'}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className={'hidden absolute top-1/2 left-1/2 right-1/2 -translate-x-1/2 text-white text-xl font-bold group-hover:block z-10'}>
                  Modifier
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0"/>
                <Dialog.Content
                  className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Modifier la photo
                  </Dialog.Title>
                  <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    Selectionner une image jpeg / jpg ou png
                  </Dialog.Description>
                  <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
                    <input type="file" {...register('file')} />
                    <button type="submit">
                      Sauvegarder
                    </button>
                  </form>
                  <Dialog.Close asChild>
                    <button
                      className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                      aria-label="Close"
                    >
                      close
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <img className={'object-cover h-full w-full'}
                 src={`${s3Url}/agency/${agency.name}/main_picture/${agency.main_picture}`} alt=""/>
            <div className={'w-full h-full absolute top-0 left-0  group-hover:bg-black/50'}/>
          </div>
        )
      }
    </div>
  )
}

export default MainPicture
