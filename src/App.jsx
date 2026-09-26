import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CalculatorPage from './pages/CalculatorPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="servicii" element={<ServicesPage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="galerie" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
