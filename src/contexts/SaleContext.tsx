import React, {createContext, useContext, useState } from "react";

const initSaleContext = {
  products: [],
  information: {
    paymentMethods: [],
    vouchersSeries: [],
    cashCompany: []
  },
  detailsSale: []
};

export const SaleContext = createContext({
  isSaleContext: initSaleContext,
  setSaleContext: () => {},
});

export default function SaleContextProvider({
  children,
}) {
  const [isSaleContext, setSaleContext] = useState(initSaleContext);

  return (
    <SaleContext.Provider value={{
      isSaleContext,
      setSaleContext
    }}>
      {children}
    </SaleContext.Provider>
  );
}

export function useSaleContext() {
  return useContext(SaleContext);
}
