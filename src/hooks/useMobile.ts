import { useEffect, useState } from "react";

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        // La función se ejecutará solo en el cliente, donde `window` está definido
        const checkIfMobile = () => {
            //const match = window.matchMedia("(max-width: 767px)").matches;
            setIsMobile(window.innerWidth < 768);
        };

        // Ejecuta la verificación inicial
        checkIfMobile();

        // Agrega un listener para cuando cambie el tamaño de la ventana
        window.addEventListener('resize', checkIfMobile);

        // Limpia el listener cuando el componente se desmonte
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [])

    return {isMobile}
}

export default useMobile
