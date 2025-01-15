import { Button, Input, message } from 'antd'
import { useState } from "react"
import Logo from '../../img/logo.png'
import { useAuthContext } from '../contexts/auth/AuthContext'
import AuthService from '../service/AuthService'

const Login = () => {
  const [isLoadingLogin, setLoadingLogin] = useState(false)
  const [isForm, setForm] = useState({
    user: '',
    password: ''
  })

  const { login } = useAuthContext()
  const [messageApi, contextHolder] = message.useMessage()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleClick = async () => {
    setLoadingLogin(true)
    const response = await AuthService.login(isForm.user, isForm.password)
    if (response.success) {
      messageApi.open({
        type: 'success',
        content: 'Acceso obtenido',
      })
      login(response.data.token)
      location.href = '/'
    } else {
      messageApi.open({
        type: 'error',
        content: response.message,
      })
      setLoadingLogin(false)
    }
  }

  return (
    <div className='justify-end w-full flex min-h-screen login-app'>
      <div className='sm:w-[600px] p-10 w-full bg-white h-auto'>
        <div className='w-full flex pt-10 sm:px-10 flex-col'>
          <div className='flex justify-center'>
            <div className='flex gap-2'>
              <img src={Logo} className='w-52' alt="" />
              {/* <h1 className='text-6xl font-black !text-[--color-app-600]'>TeVendo<span className='text-violet-800'>Ya</span></h1> */}
            </div>
          </div>
          <div className='grid gap-4'>
            <div>
              <label htmlFor="user" className='font-bold'>Usuario</label>
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
              <label htmlFor="password" className='font-bold'>Contraseña</label>
              <Input.Password
                id='password'
                value={isForm.password}
                name="password"
                className='mt-2 h-10'
                placeholder='*********'
                onChange={handleChange}
              />
            </div>
            <div className='pb-5'>
              <Button
                onClick={handleClick}
                loading={isLoadingLogin}
                className='w-full bg-[--color-app-600] font-bold !text-white hover:!bg-[--color-app-500] h-10'
              >
                INGRESAR
              </Button>
            </div>
          </div>
          {contextHolder}
        </div>
      </div>
    </div>
  )
}

export default Login
