import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
// import Logo from './pages/Logo';



function App() { 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


