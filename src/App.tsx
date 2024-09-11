import Item from './components/item/item';
import Home from './components/home/home';
import Order from './components/order/order';
import Vendor from './components/vendor/vendor';
import Report from './components/report/report';
import MainMenu from './components/menu/mainMenu';
import Customer from './components/customer/customer';
import ItemDetails from './components/item/itemDetails';
import OrderDetails from './components/order/orderDetails';
import VendorDetails from './components/vendor/vendorDetails';
import ReportDetails from './components/report/reportDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerDetails from './components/customer/customerDetails';

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
