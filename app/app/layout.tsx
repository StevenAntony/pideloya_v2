'use client'
import LayoutMobile from "@/components/layouts/LayoutMobile";
import LoadingApp from "@/components/loading/LoadingApp";
import useMobile from "@/hooks/useMobile";
import { useEffect, useState } from "react";

export default function AppLayout({
    children
  }: {
    children: React.ReactNode
}) {
  
  const [isLoading, setLoading] = useState<boolean>(true)

  const { isMobile } = useMobile()  

  useEffect(() => {
    setLoading(false)
  }, [])

  if(isLoading) return (
    <div className='bg-white h-screen'>
      <LoadingApp />
    </div>
  )

  return (
    <div className='bg-white h-screen'>
      { isMobile ? <LayoutMobile>{children}</LayoutMobile> : children }
    </div>
  )
}  