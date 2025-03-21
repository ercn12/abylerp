import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  
  // Oturum süresi kontrolü için değişkenler (30 dakika)
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika
  const [lastActivity, setLastActivity] = useState(Date.now());

  // İlk yükleme sırasında localStorage'dan kullanıcı bilgilerini çek
  useEffect(() => {
    const user = localStorage.getItem('abylerp_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        const lastLoginTime = localStorage.getItem('abylerp_last_activity');
        
        // Oturum süresi kontrolü
        if (lastLoginTime && Date.now() - parseInt(lastLoginTime) > SESSION_TIMEOUT) {
          // Oturum süresi dolmuş, kullanıcıyı çıkış yaptır
          logout();
          setAuthError('Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.');
        } else {
          setCurrentUser(userData);
          setLastActivity(Date.now());
          localStorage.setItem('abylerp_last_activity', Date.now().toString());
        }
      } catch (e) {
        // JSON parse hatası, localStorage'ı temizle
        localStorage.removeItem('abylerp_user');
        localStorage.removeItem('abylerp_last_activity');
      }
    }
    setLoading(false);
  }, []);

  // Kullanıcı aktivitesi olduğunda son aktivite zamanını güncelle
  useEffect(() => {
    function updateActivity() {
      setLastActivity(Date.now());
      localStorage.setItem('abylerp_last_activity', Date.now().toString());
    }

    // Kullanıcı hareketlerini dinle
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    // Periyodik olarak oturum süresini kontrol et
    const interval = setInterval(() => {
      if (currentUser && Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
        setAuthError('Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.');
      }
    }, 60000); // Her dakika kontrol et

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
      clearInterval(interval);
    };
  }, [currentUser, lastActivity]);

  // Kayıt olma fonksiyonu
  async function signup(email, password, username) {
    try {
      // Email formatı kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Geçerli bir e-posta adresi giriniz');
      }
      
      // Şifre güvenliği kontrolü
      if (password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır');
      }
      
      // Daha güçlü şifre kontrolü (opsiyonel)
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      if (!(hasUpperCase && hasNumber && hasSpecialChar)) {
        throw new Error('Şifre en az bir büyük harf, bir rakam ve bir özel karakter içermelidir');
      }
      
      // Kullanıcının daha önce kayıtlı olup olmadığını kontrol et
      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      const usernameExists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      
      if (emailExists) {
        throw new Error('Bu e-posta adresi zaten kullanılıyor');
      }
      
      if (usernameExists) {
        throw new Error('Bu kullanıcı adı zaten alınmış');
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        password, // Gerçek projede şifre hash'lenir!
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profilePicture: null,
        role: 'user', // Varsayılan rol
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
      
      // Kullanıcıları kaydet
      users.push(newUser);
      localStorage.setItem('abylerp_users', JSON.stringify(users));
      
      // Kullanıcı durumunu güncelle (şifreyi çıkararak)
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('abylerp_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('abylerp_last_activity', Date.now().toString());
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Giriş yapma fonksiyonu
  async function login(email, password) {
    try {
      // Kullanıcıları getir
      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      
      // Kullanıcıyı bul (büyük/küçük harf duyarsız e-posta kontrolü)
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      // Şifreyi kontrol et
      if (user.password !== password) {
        throw new Error('Hatalı şifre');
      }
      
      // Kullanıcı durumunu güncelle (şifreyi çıkararak)
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('abylerp_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('abylerp_last_activity', Date.now().toString());
      
      // Son giriş bilgisini güncelle
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, lastLogin: new Date().toISOString() };
        }
        return u;
      });
      localStorage.setItem('abylerp_users', JSON.stringify(updatedUsers));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Çıkış yapma fonksiyonu
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('abylerp_user');
    localStorage.removeItem('abylerp_last_activity');
  }

  // Şifre sıfırlama fonksiyonu (simüle edilmiş)
  async function resetPassword(email) {
    try {
      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı');
      }
      
      // Gerçek projede burada email gönderilir
      return { success: true, message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Profil güncelleme fonksiyonu
  async function updateProfile(userData) {
    try {
      if (!currentUser) {
        throw new Error('Önce giriş yapmalısınız');
      }

      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      
      if (userIndex === -1) {
        throw new Error('Kullanıcı bulunamadı');
      }

      // Kullanıcı adı değiştiriliyorsa ve başka biri tarafından kullanılıyorsa hata ver
      if (userData.username && userData.username !== users[userIndex].username) {
        const usernameExists = users.some(
          u => u.id !== currentUser.id && u.username.toLowerCase() === userData.username.toLowerCase()
        );
        
        if (usernameExists) {
          throw new Error('Bu kullanıcı adı zaten alınmış');
        }
      }

      // Kullanıcıyı güncelle
      const updatedUser = {
        ...users[userIndex],
        ...userData,
        updatedAt: new Date().toISOString()
      };
      
      users[userIndex] = updatedUser;
      localStorage.setItem('abylerp_users', JSON.stringify(users));
      
      // Güncel kullanıcı bilgilerini sakla (şifre hariç)
      const { password: _, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('abylerp_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, data: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Şifre değiştirme fonksiyonu
  async function changePassword(currentPassword, newPassword) {
    try {
      if (!currentUser) {
        throw new Error('Önce giriş yapmalısınız');
      }

      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      // Mevcut şifreyi kontrol et
      if (user.password !== currentPassword) {
        throw new Error('Mevcut şifre yanlış');
      }
      
      // Yeni şifre kontrolleri
      if (newPassword.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır');
      }
      
      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasNumber = /\d/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      
      if (!(hasUpperCase && hasNumber && hasSpecialChar)) {
        throw new Error('Şifre en az bir büyük harf, bir rakam ve bir özel karakter içermelidir');
      }
      
      // Şifreyi güncelle
      const updatedUsers = users.map(u => {
        if (u.id === currentUser.id) {
          return { ...u, password: newPassword, updatedAt: new Date().toISOString() };
        }
        return u;
      });
      
      localStorage.setItem('abylerp_users', JSON.stringify(updatedUsers));
      
      return { success: true, message: 'Şifreniz başarıyla güncellendi' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Sosyal medya ile giriş simülasyonu
  async function socialLogin(provider) {
    try {
      // Gerçek dünyada burada OAuth akışı olacaktı
      // Şimdilik simüle edilmiş bir sosyal giriş
      
      const socialUser = {
        id: `social_${Date.now()}`,
        email: `user_${Date.now()}@${provider}.com`,
        username: `${provider}_user_${Date.now().toString().slice(-4)}`,
        provider,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profilePicture: `https://via.placeholder.com/150?text=${provider}`,
        role: 'user'
      };
      
      // Kullanıcıları kaydet
      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      users.push(socialUser);
      localStorage.setItem('abylerp_users', JSON.stringify(users));
      
      // Kullanıcı durumunu güncelle
      setCurrentUser(socialUser);
      localStorage.setItem('abylerp_user', JSON.stringify(socialUser));
      localStorage.setItem('abylerp_last_activity', Date.now().toString());
      
      return { success: true, data: socialUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Kullanıcı hesabını silme
  async function deleteAccount(password) {
    try {
      if (!currentUser) {
        throw new Error('Önce giriş yapmalısınız');
      }

      const users = JSON.parse(localStorage.getItem('abylerp_users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      // Sosyal giriş dışında şifre kontrolü yap
      if (!user.provider && user.password !== password) {
        throw new Error('Şifre doğrulaması başarısız oldu');
      }
      
      // Kullanıcıyı sil
      const updatedUsers = users.filter(u => u.id !== currentUser.id);
      localStorage.setItem('abylerp_users', JSON.stringify(updatedUsers));
      
      // Oturumu kapat
      logout();
      
      return { success: true, message: 'Hesabınız başarıyla silindi' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Rol tabanlı yetkilendirme kontrolü
  function hasPermission(requiredRole) {
    if (!currentUser || !currentUser.role) return false;
    
    const roles = {
      admin: 3,
      moderator: 2,
      user: 1
    };
    
    return roles[currentUser.role] >= roles[requiredRole];
  }

  const value = {
    currentUser,
    authError,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile,
    changePassword,
    socialLogin,
    deleteAccount,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}