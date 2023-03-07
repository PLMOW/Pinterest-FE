import { Routes, Route } from 'react-router-dom';
import Pins from 'pages/Pins';
import Home from 'pages/Home';
import Load from 'pages/Load';
import Login from 'pages/Login';
import Signin from 'pages/Signin';
import Test from 'pages/Test';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pins" element={<Pins />} />
      <Route path="/upload" element={<Load />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default Router;
