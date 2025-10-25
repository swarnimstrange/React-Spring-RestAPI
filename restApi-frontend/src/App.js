import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import NotFound from './pages/NotFound';
import Update from './pages/Update';
import PostUser from './pages/PostUser';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/employee' element={<PostUser />} />
      <Route path='/employee/:id' element={<Update />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
