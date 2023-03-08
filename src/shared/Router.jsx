import { Routes, Route } from 'react-router-dom';
import Pins from 'pages/Pins';
import Home from 'pages/Home';
import Load from 'pages/Load';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pins" element={<Pins />} />
      <Route path="/upload" element={<Load />} />
    </Routes>
  );
};

export default Router;
