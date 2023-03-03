import { Routes, Route } from 'react-router-dom';
import Pins from 'pages/Pins';
import Home from 'pages/Home';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pins" element={<Pins />} />
    </Routes>
  );
};

export default Router;
