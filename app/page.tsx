import Image from 'next/image'
import logo from '../public/icon-192x192.png'
import { Button, Input } from 'antd'

export default function Home() {
  return (
    <div className='sm:bg-white bg-[--color-app] h-screen'>
      <div className='h-full flex justify-center'>
        <div className='sm:w-[400px] px-12 shadow-2xl w-full sm:my-36'>
          <div className='flex justify-center py-8'>
            <Image 
              src={logo}
              alt="Picture of the author"
              className='w-36 h-36'
            />
          </div>
          <div className='grid gap-6'>
            <div>
              <label htmlFor="user" className='sm:text-slate-700 text-white font-medium'>Usuario</label>
              <Input id='user' className='mt-2 h-10' placeholder='usuario@dominio.com' />
            </div>
            <div>
              <label htmlFor="password" className='sm:text-slate-700 text-white font-medium'>Contraseña</label>
              <Input id='password' className='mt-2 h-10' placeholder='*********' />
            </div>
            <div>
              <Button
                className='w-full sm:bg-[--color-app] !text-white h-10'
              > 
                INGRESAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
