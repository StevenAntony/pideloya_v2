'use client'
import AppMobile from "@/components/page/app/AppMobile"
import useMobile from "@/hooks/useMobile"

export default function AppPage() {
  const { isMobile } = useMobile()    
  return (
      <>
        {isMobile ? <AppMobile /> :'No disponible para a computadora'} 
      </>
    )
}  