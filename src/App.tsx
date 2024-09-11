import Item from './pages/item/item';
import Home from './pages/home/home';
import Order from './pages/order/order';
import Vendor from './pages/vendor/vendor';
import Report from './pages/report/report';
import MainMenu from './pages/menu/mainMenu';
import Customer from './pages/customer/customer';
import ItemDetails from './pages/item/itemDetails';
import OrderDetails from './pages/order/orderDetails';
import VendorDetails from './pages/vendor/vendorDetails';
import ReportDetails from './pages/report/reportDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerDetails from './pages/customer/customerDetails';

const App: React.FC = () => (
  <BrowserRouter>
    <MainMenu/>
    <Routes>
      {/* home */}
      <Route path="/" element={<Home />} />

      {/* item */}
      <Route path="items/all" element={<Item />} />
      <Route path="items/:id" element={<ItemDetails />} />

      {/* order */}
      <Route path="orders/all" element={<Order />} />
      <Route path="orders/:id" element={<OrderDetails />} />

      {/* customer */}
      <Route path="customers/all" element={<Customer />} />
      <Route path="customers/:id" element={<CustomerDetails />} />

      {/* vendor */}
      <Route path="vendors/all" element={<Vendor />} />
      <Route path="vendors/:id" element={<VendorDetails />} />

      {/* report */}
      <Route path="reports/all" element={<Report />} />
      <Route path="reports/:id" element={<ReportDetails />} />
    </Routes>
  </BrowserRouter>
)

export default App
