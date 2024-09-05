import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet'
import { ToastContainer} from 'react-toastify';

const Layout = ({children,title,description,keyword}) => {
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <meta name='description' content={description}/>
    <meta name='keyword' content={keyword} />
    <title>{title}</title>
    </Helmet>
   <div >
   <div className='header-position'>
   <Header />
   </div>
    <div className='body-section'><div  style={{minHeight:'89vh', marginBottom:"8px"}}><ToastContainer/>{children}</div></div>
    <div className='footer'>
    <Footer  />
    </div>
   </div>
    </>
  )
}
Layout.defaultProps={
    title:'Ecommerce app',
    description:'mern stack project',
    keyword:'mern,react,nodejs,mongodb'
}
export default Layout