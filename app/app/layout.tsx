'use client'
import LayoutDesktop from "@/components/layouts/LayoutDesktop"
import LayoutMobile from "@/components/layouts/LayoutMobile"
import LoadingApp from "@/components/loading/LoadingApp"
import { useAuthContext } from "@/contexts/AuthContext"
import useMobile from "@/hooks/useMobile"
import { useEffect, useState } from "react"
import { redirect } from 'next/navigation'
import SaleContextProvider from "@/contexts/SaleContext"

export default function AppLayout({
    children
  }: {
    children: React.ReactNode
}) {
  
  const [isLoading, setLoading] = useState<boolean>(true)
  const { isLoggedIn } = useAuthContext()

  const { isMobile } = useMobile()  

  useEffect(() => {
    if (!isLoggedIn) redirect('/')
    setLoading(false)
  }, [])

  // if (!isMobile) return (
  //   <div className='bg-white h-screen'>
  //     <LoadingApp />
  //   </div>
  // )

  if(isLoading) return (
    <div className='bg-white h-screen'>
      <LoadingApp />
    </div>
  )

  return (
    <SaleContextProvider>
      <div className='bg-white h-screen'>
        { isMobile ? <LayoutMobile>{children}</LayoutMobile> : <LayoutDesktop>{children}</LayoutDesktop> }
      </div>
    </SaleContextProvider>
  )
}  