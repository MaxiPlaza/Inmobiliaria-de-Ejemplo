import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Ventas from './pages/Ventas';
import Alquileres from './pages/Alquileres';
import Lotes from './pages/Lotes';
import Tasaciones from './pages/Tasaciones';
import RequisitosPage from './pages/RequisitosPage';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PropertyForm from './pages/admin/PropertyForm';

// Layout for Admin pages to optionally differ from public if needed
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/ventas" element={<PublicLayout><Ventas /></PublicLayout>} />
        <Route path="/alquileres" element={<PublicLayout><Alquileres /></PublicLayout>} />
        <Route path="/lotes" element={<PublicLayout><Lotes /></PublicLayout>} />
        <Route path="/propiedad/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
        <Route path="/tasaciones" element={<PublicLayout><Tasaciones /></PublicLayout>} />
        <Route path="/requisitos" element={<PublicLayout><RequisitosPage /></PublicLayout>} />

        {/* Admin Routes without main Navbar and Footer */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/property/new" element={<PropertyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
