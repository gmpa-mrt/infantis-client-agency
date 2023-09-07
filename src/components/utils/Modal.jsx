import * as Dialog from '@radix-ui/react-dialog'
import plus from '../../assets/icons/plus.svg'
import { useForm } from 'react-hook-form'

const Modal = ({onSubmit}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <img className={'object-cover h-full w-full'} src={plus} alt=""/>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0"/>
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Ajouter une nouvelle image
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
  )
}

export default Modal
