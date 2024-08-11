import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/auth';
import { SearchContext } from './context/SearchContext';
import CartContext from './context/cartContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
   <AuthContext>
   <SearchContext>
    <CartContext>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </CartContext>  
   </SearchContext>
    </AuthContext>


);



