'use client'
import { redirect } from 'next/navigation'
import Login from "@/components/page/Login";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import LoadingApp from '@/components/loading/LoadingApp';
import useMobile from '@/hooks/useMobile';

export default function Home() {
  
  const { isLoggedIn } = useAuthContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const { isMobile } = useMobile()

  useEffect(() => {
    if (isLoggedIn) redirect('/app')
    setLoading(false)
  }, [])

  if(isLoading) return (
    <div className='bg-white h-screen'>
      <LoadingApp />
    </div>
  )

  return (
    <div className='sm:bg-white bg-[--color-app] h-screen'>
      <div className='h-full flex justify-center'>
        {isMobile ? <Login /> : 'Aun no disponible en escritorio'}
      </div>
    </div>
  )
}
