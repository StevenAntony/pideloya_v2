import { Routes, Route } from "react-router-dom"
import AuthWrapper from "../components/AuthWrapper";
import DashboardPage from "../pages/dashboard";
import Login from "../pages/Login";
import AuthContextProvider from "../contexts/auth/AuthContext";
import AppContextProvider from "../contexts/AppContext";
import { SocketProvider } from "../contexts/SocketContext";
import ProductPage from "../pages/product";

function RouteApp() {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <SocketProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<AuthWrapper />}>
              <Route path="" element={<DashboardPage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="cash" element={<CashPage />} />
              <Route path="movement" element={<MovementPage />} />
              <Route path="sale" element={<SaleProcessPage type="Ordinary" />} />
              <Route path="quotations" element={<QuotationsPage />} />
              <Route path="collect-sale" element={<CollectSalePage />} />
              <Route path="cancel-sale" element={<CancelSalePage />} />
              <Route path="customer" element={<CustomerPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="group-category" element={<GroupCategoryPage />} />
              <Route path="unit" element={<UnitPage />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="send-sales-receipt" element={<SendSalesReceiptPage />} />
              <Route path="sales-receipts-sent" element={<SalesReceiptSentPage />} />
              <Route path="store" element={<StorePage />} />
              <Route path="stock" element={<StockPage />} />
              <Route path="transfer-stock" element={<TransferPage />} />
              <Route path="buy" element={<BuyPage />} />
              <Route path="pay-purchases" element={<PayBuyPage />} />
              <Route path="cancel-buy" element={<CancelBuyPage />} />
              <Route path="provider" element={<ProviderPage />} />
              <Route path="table" element={<TablePage />} />
              <Route path="sale-table" element={<SaleTablePage />} />
              <Route path="printer" element={<MaintainerPrinterPage />} />
              <Route path="series" element={<MaintainerSeriesPage />} />
              <Route path="kitchen/order" element={<KitchenPage />} />
              <Route path="remission-guide" element={<RemissionGuidePage />} />
              <Route path="master/" element={<AuthMasterWrapper />}>
                <Route path="companies" element={<CompaniesPage />} />
              </Route>
              <Route path="report/">
                <Route path="sale" element={<ReportSalePage />} />
                <Route path="buy" element={<ReportBuyPage />} />
                <Route path="cash" element={<ReportCashPage />} />
                <Route path="movement" element={<ReportMovementPage />} />
                <Route path="stock" element={<ReportStockPage />} />
                <Route path="sunat" element={<ReportSunatPage />} />
              </Route>
              <Route path="consult/">
                <Route path="sale" element={<ConsultSalePage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </SocketProvider>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default RouteApp
