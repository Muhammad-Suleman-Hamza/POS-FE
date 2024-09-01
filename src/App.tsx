import Item from './components/item/item';
import Home from './components/home/home';
import Order from './components/order/order';
import MainMenu from './components/menu/menu';
import ItemDetails from './components/item/itemDetails';
import OrderDetails from './components/order/orderDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <BrowserRouter>
    <MainMenu/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="item/" element={<Item />} />
      <Route path="order/" element={<Order />} />
      <Route path="order/:id" element={<ItemDetails />} />
      <Route path="order/:id" element={<OrderDetails />} />
    </Routes>
  </BrowserRouter>
)

export default App
