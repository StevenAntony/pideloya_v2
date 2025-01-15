import React, {createContext, useContext, useEffect, useState } from "react"
import { cashCurrentStorage, salesPriceTypeStorage } from "../../helpers/LocalStorage"
import QueueProgress from "../components/progress/QueueProgress";
import { useQueueProgress } from "../hooks/useQueueProgress";
import { AppContextProps, AppContextProviderProps, ICashSelectedStore } from "./AppContextProps";

export const AppContext = createContext<AppContextProps>({
    cashSelectedApp: null,
    updatedCashSelectedApp: (e) => {},

    priceTypeApp: 'public',
    updatedPriceTypeApp: (e) => {},

    queueProgressApp: {queues: [], addQueue: () => {}, setQueues: () => {}, removeQueue: () => {}, updatedQueue: () => {}}
});

export default function AppContextProvider({children}: AppContextProviderProps) {
    const { getCash, setCash } = cashCurrentStorage()
    const { getPriceType, setPriceType } = salesPriceTypeStorage()

    const [cashSelectedApp, setCashSelectedApp] = useState(getCash)
    const [priceTypeApp, setPriceTypeApp] = useState(getPriceType() ?? 'public')

    const queueProgressApp = useQueueProgress()

    const updatedCashSelectedApp = (e: ICashSelectedStore|null) => {
        setCashSelectedApp(e)
        setCash(e)
    }

    const updatedPriceTypeApp = (e: string) => {
        setPriceTypeApp(e)
        setPriceType(e)
    }

    return (
        <AppContext.Provider value={{
            cashSelectedApp,
            updatedCashSelectedApp,
            priceTypeApp,
            updatedPriceTypeApp,

            queueProgressApp,
        }}>
            {
                queueProgressApp.queues.map((queue, index) => <QueueProgress key={index} {...queue} />)
            }
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return useContext(AppContext);
}
