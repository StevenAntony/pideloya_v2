'use client'
import Image from "next/image"
import logo from '@/public/icon-192x192.png'
import { Button, Input, message } from 'antd'
import AuthService from '@/service/AuthService'
import { useState } from "react"
import { useAuthContext } from "@/contexts/AuthContext"
import { useRouter } from 'next/navigation'

const Login = () => {
    const [isLoadingLogin, setLoadingLogin] = useState<boolean>(false)
    const [isForm, setForm] = useState<IFormLogin>({
        user: '',
        password: ''
    })

    const router = useRouter()
    const { login } = useAuthContext()
    const [messageApi, contextHolder] = message.useMessage()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({
          ...prevState,
          [name]: value
        }));
    }

    const handleClick = async () => {
        setLoadingLogin(true)
        const response = await AuthService.login(isForm.user, isForm.password)
        
        if (response.acceso) {
            messageApi.open({
                type: 'success',
                content: 'Acceso obtenido',
            })
            login({
                token: response.id,
                refresh_token: response.id,
                user: {
                    email: response.email,
                    id: response.id,
                    name: response.nombre
                }
            })
            router.push("/app")
        }else{
            messageApi.open({
                type: 'error',
                content: 'Credenciales no valido',
            })
        }

        setLoadingLogin(false)
    }

    return (
        <div className='sm:w-[400px] px-12 shadow-2xl w-full sm:my-36'>
            <div className='flex justify-center py-8'>
                <Image
                    src={logo}
                    priority={true}
                    alt="Picture of the author"
                    className='w-36 h-36'
                />
            </div>
            <div className='grid gap-6'>
                <div>
                    <label htmlFor="user" className='sm:text-slate-700 text-white font-medium'>Usuario</label>
                    <Input 
                        id='user' 
                        value={isForm.user} 
                        className='mt-2 h-10' 
                        name="user"
                        placeholder='usuario@dominio.com'
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="password" className='sm:text-slate-700 text-white font-medium'>Contraseña</label>
                    <Input.Password 
                        id='password' 
                        value={isForm.password} 
                        name="password"
                        className='mt-2 h-10' 
                        placeholder='*********' 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button
                        onClick={handleClick}
                        loading={isLoadingLogin}
                        className='w-full sm:bg-[--color-app] !text-white h-10'
                    >
                        INGRESAR
                    </Button>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default Login