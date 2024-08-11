import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import PaheNotFound from './pages/PaheNotFound';
import Register from './pages/authPage/Register';
import Login from './pages/authPage/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgetPassword from './pages/authPage/ForgetPassword';
import AdminRoutes from './components/routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Users from './pages/Admin/Users';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import SearchResult from './pages/SearchResult';
import ProductDetails from './pages/ProductDetails';
import ByCategory from './pages/ByCategory';
import Cart from './pages/Cart';




function App() {
  return (
   <>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/forgetpassword' element={<ForgetPassword/>}/>
    <Route path='/search-result' element={<SearchResult/>}/>
    <Route path='/product-details/:slug' element={<ProductDetails/>}/>
    <Route path='/category/:slug' element={<ByCategory/>}/>
    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='' element={<Dashboard/>}/>
    <Route path='orders' element={<Orders/>}/>
    <Route path='profile' element={<Profile/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoutes/>}>
    <Route path='admin' element={<AdminDashboard/>}/>
    <Route path='admin/create-category' element={<CreateCategory/>}/>
   
    <Route path='admin/create-product' element={<CreateProduct/>}/>
    <Route path='admin/product' element={<Product/>}/>
    <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
    <Route path='admin/users' element={<Users/>}/>
    </Route>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path='*' element={<PaheNotFound/>}/>
  </Routes>
   </>
  );
}

export default App;
