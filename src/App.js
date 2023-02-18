import './App.scss';
import { Menus } from './pages/Menus';
import { Login_Register } from './pages/Login_Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { AddDish } from './pages/AddDish';
import { ItemPage } from './pages/item_page';
import { UpdateDish } from './pages/UpdateDish';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login_Register />} />
        <Route path='/Menus' element={<Menus />} />
        <Route path='/AddDish' element={
          <ProtectedRoute>
            <AddDish />
          </ProtectedRoute>
        } />
        <Route path='/ItemPage/:id' element={<ItemPage />} />
        <Route path='/UpdateItem/:id' element={
          <ProtectedRoute>
            <UpdateDish />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
