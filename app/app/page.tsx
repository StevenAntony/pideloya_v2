'use client'
import AppMobile from "@/components/page/app/AppMobile"
import { useSaleContext } from "@/contexts/SaleContext"
import useMobile from "@/hooks/useMobile"
import SaleService from "@/service/SaleService"
import { useEffect } from "react"

export default function AppPage() {
  
  const { setSaleContext } = useSaleContext()

  const { isMobile } = useMobile()    

  const getInformation =async () => {
    const response = await SaleService.getInformationForSale();
    
    if (response.success) {
        setSaleContext({
            products: [],
            information: response.data
        })
    }
  }

  useEffect(() => {
    getInformation()
  }, [])

  return (
      <>
        {isMobile ? <AppMobile /> :'No disponible para a computadora'} 
      </>
    )
}  