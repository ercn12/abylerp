import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';

// Ana Sayfa Bileşeni
function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Abylerp: <span className="text-primary-light">Ses Klipleriyle</span> Eğlencenin Merkezine Hoş Geldiniz!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Binlerce ses klibini keşfedin, kendi kliplerinizi yükleyin ve topluluğun bir parçası olun.
        </p>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          <i className="fas fa-fire text-secondary-light mr-2"></i>
          Trend Klipler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="bg-primary-light h-32 flex items-center justify-center">
                  <i className="fas fa-music text-white text-4xl"></i>
                </div>
                <div className="absolute bottom-3 right-3">
                  <button className="h-10 w-10 flex items-center justify-center bg-white text-primary-light rounded-full shadow-lg hover:scale-105 transition-transform">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Örnek Ses Klibi #{item}</h3>
                  <span className="bg-secondary-light bg-opacity-20 text-secondary-light text-xs px-2 py-1 rounded-full">
                    <i className="fas fa-fire-alt mr-1"></i>
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded mr-2">
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

// Kategoriler Sayfası
function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Ses Klip Kategorileri</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {['Komik Sesler', 'Film Replikleri', 'Oyun Sesleri', 'Müzik Klipleri', 'Özel Efektler'].map((category, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className={`h-28 flex items-center justify-center ${
              index === 0 ? 'bg-pink-500' :
              index === 1 ? 'bg-blue-500' :
              index === 2 ? 'bg-green-500' :
              index === 3 ? 'bg-yellow-500' :
              'bg-purple-500'
            }`}>
              <i className={`fas ${
                index === 0 ? 'fa-laugh-squint' :
                index === 1 ? 'fa-film' :
                index === 2 ? 'fa-gamepad' :
                index === 3 ? 'fa-music' :
                'fa-magic'
              } text-white text-4xl`}></i>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {index === 0 ? 'Kahkaha etkili, eğlenceli ve mizahi ses klipleri' :
                 index === 1 ? 'Popüler filmlerden unutulmaz replikler' :
                 index === 2 ? 'Video oyunlarından ses efektleri' :
                 index === 3 ? 'Kısa müzik kesitleri' :
                 'Çeşitli ses efektleri'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-volume-up mr-1"></i>
                  {Math.floor(Math.random() * 1000) + 500} klip
                </span>
                <button className="text-primary-light dark:text-primary-dark hover:underline">
                  Keşfet
                  <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Yükleme Sayfası
function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ses Klibi Yükle</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="p-6">
          <form className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200">
              <div className="text-center">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Dosyanızı sürükleyin veya seçin</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  MP3, WAV veya OGG formatındaki ses dosyaları (maks 5MB)
                </p>
                <button type="button" className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                  Dosya Seç
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="clipTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Klip Başlığı</label>
              <input type="text" id="clipTitle" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-base" placeholder="Ses klibinin başlığı" />
            </div>
            
            <div>
              <label htmlFor="clipCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
              <select id="clipCategory" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-base">
                <option value="">Kategori Seçin</option>
                <option value="komik">Komik Sesler</option>
                <option value="film">Film Replikleri</option>
                <option value="oyun">Oyun Sesleri</option>
                <option value="muzik">Müzik Klipleri</option>
                <option value="efekt">Özel Efektler</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="clipDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Açıklama (İsteğe Bağlı)</label>
              <textarea id="clipDescription" rows="3" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark text-base" placeholder="Ses klibi hakkında kısa bir açıklama yazın"></textarea>
            </div>
            
            <div className="pt-4">
              <button type="button" className="w-full py-3 px-4 bg-primary-light text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                <i className="fas fa-cloud-upload-alt mr-2"></i>
                Ses Klibini Yükle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Kayıt Olma Formu
function SignupForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { signup } = useAuth();
  const navigate = React.useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Form doğrulama
    if (password !== confirmPassword) {
      return setError('Şifreler eşleşmiyor');
    }
    
    if (username.length < 3) {
      return setError('Kullanıcı adı en az 3 karakter olmalıdır');
    }
    
    try {
      setError('');
      setLoading(true);
      const result = await signup(email, password, username);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  }
  
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Hesap Oluştur</h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kullanıcı Adı</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`}></i>
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifreyi Onayla</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Zaten bir hesabınız var mı? 
            <Link to="/login" className="text-primary-light dark:text-primary-dark ml-1 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Giriş Formu
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const navigate = React.useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      const result = await login(email, password);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  }
  
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Giriş Yap</h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`}></i>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-light border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Beni hatırla
              </label>
            </div>
            
            <Link to="/forgot-password" className="text-sm text-primary-light dark:text-primary-dark hover:underline">
              Şifremi unuttum
            </Link>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Henüz hesabınız yok mu? 
            <Link to="/signup" className="text-primary-light dark:text-primary-dark ml-1 hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Şifre Sıfırlama Formu
function ForgotPasswordForm() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      const result = await resetPassword(email);
      
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Şifre sıfırlama işlemi sırasında bir hata oluştu');
    }
    
    setLoading(false);
  }
  
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Şifremi Unuttum</h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Kayıtlı e-posta adresinizi giriniz. Şifre sıfırlama bağlantısı bu adrese gönderilecektir.
            </p>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-primary-light dark:text-primary-dark hover:underline">
            Giriş sayfasına dön
          </Link>
        </div>
      </div>
    </div>
  );
}

// Profil Sayfası
function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = React.useState('');
  const navigate = React.useNavigate();

  async function handleLogout() {
    try {
      setError('');
      await logout();
      navigate('/login');
    } catch {
      setError('Çıkış yapılamadı');
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-primary-light flex items-center justify-center text-white text-4xl">
                  {currentUser.username ? currentUser.username.substring(0, 1).toUpperCase() : '?'}
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-pencil-alt text-primary-light"></i>
                </button>
              </div>
            </div>
            
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentUser.username}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {currentUser.email}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Ses Klipleri</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Toplam Oynatma</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Üyelik</span>
                  <p className="text-lg font-semibold text-primary-light">Ücretsiz</p>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-opacity-90 transition-colors">
                  Profili Düzenle
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ses Kliplerim</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <i className="fas fa-music text-gray-400 text-5xl mb-4"></i>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Henüz hiç ses klibiniz yok.</p>
          <button className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-opacity-90 transition-colors">
            İlk Ses Klibini Yükle
          </button>
        </div>
      </div>
    </div>
  );
}

// Özel Route - Korumalı rotalar için
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  const { currentUser, logout } = useAuth();
  
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Çıkış yaparken hata oluştu', error);
    }
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-primary-light text-2xl font-bold">Abylerp</span>
                  <i className="fas fa-volume-up ml-2 text-secondary-light"></i>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light">Ana Sayfa</Link>
                <Link to="/categories" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light">Kategoriler</Link>
                <Link to="/upload" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-light">Yükle</Link>
                
                {currentUser ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light">
                      <i className="fas fa-user mr-2"></i>
                      {currentUser.username}
                    </Link>
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light">
                      <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="ml-4 px-4 py-2 rounded-md font-medium bg-primary-light text-white hover:bg-opacity-90 transition-colors duration-200">
                    Giriş Yap
                  </Link>
                )}
              </div>
              <div className="flex md:hidden items-center">
                <button className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/upload" element={
              <PrivateRoute>
                <UploadPage />
              </PrivateRoute>
            } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-10 text-center"><h1 className="text-3xl font-bold">Sayfa Bulunamadı</h1></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
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