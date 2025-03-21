import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Abylerp: <span className="text-primary-light">Ses Klipleriyle</span> Eğlencenin Merkezine Hoş Geldiniz!
        </h1>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Binlerce ses klibini keşfedin, kendi kliplerinizi yükleyin ve topluluğun bir parçası olun.
        </p>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          <i className="fas fa-fire text-secondary-light mr-2"></i>
          Trend Klipler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="clip-card bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <div className="bg-primary-light h-32 flex items-center justify-center">
                  <i className="fas fa-music text-white text-4xl"></i>
                </div>
                <div className="absolute bottom-3 right-3">
                  <button className="h-10 w-10 flex items-center justify-center bg-white text-primary-light rounded-full shadow-lg">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Örnek Ses Klibi #{item}</h3>
                  <span className="bg-secondary-light bg-opacity-20 text-secondary-light text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-fire-alt mr-1"></i>
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-2">
                    Kategori
                  </span>
                  <span>2.5 sn</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-primary-light text-2xl font-bold">Abylerp</span>
                  <i className="fas fa-volume-up ml-2 text-secondary-light"></i>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-light">Ana Sayfa</Link>
                <Link to="/categories" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-light">Kategoriler</Link>
                <Link to="/upload" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-light">Yükle</Link>
                <Link to="/login" className="ml-4 px-4 py-2 rounded-md font-medium bg-primary-light text-white">Giriş Yap</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<div className="max-w-7xl mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Kategoriler</h1></div>} />
            <Route path="/upload" element={<div className="max-w-7xl mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Ses Klibi Yükle</h1></div>} />
            <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-10 text-center"><h1 className="text-3xl font-bold">Sayfa Bulunamadı</h1></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 mt-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <span className="text-2xl font-bold">Abylerp</span>
                <p className="text-gray-400 mt-2">Ses klipleriyle eğlencenin yeni merkezi.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Bağlantılar</h3>
                <ul className="space-y-1">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link></li>
                  <li><Link to="/categories" className="text-gray-400 hover:text-white">Kategoriler</Link></li>
                  <li><Link to="/upload" className="text-gray-400 hover:text-white">Yükle</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Abylerp. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;