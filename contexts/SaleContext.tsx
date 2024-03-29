"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ISaleContext {
  products: Array<IProductForSale>;
  information: IInformation;
  detailsSale?: Array<IDetail>;
}

const initSaleContext = {
  products: [],
  information: {
    paymentMethods: [],
    vouchersSeries: [],
    cashCompany: []
  },
  detailsSale: []
};

export const SaleContext = createContext<{
  isSaleContext: ISaleContext;
  setSaleContext: (c: ISaleContext) => void;
}>({
  isSaleContext: initSaleContext,
  setSaleContext: () => {},
});

export default function SaleContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSaleContext, setSaleContext] = useState<ISaleContext>(initSaleContext);

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