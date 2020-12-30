import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [socialType, setSocialType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const login = useCallback((jwtToken, name, type, photo) => {
    setToken(jwtToken);
    setUserName(name);
    setUserPhoto(photo);
    setSocialType(type);

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken, socialType: type, userName: name, userPhoto: photo
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserName(null);
    setSocialType(null);
    localStorage.removeItem(storageName);
  }, []);

  const userDataUpdate = useCallback((name, photo) => {
    setUserName(name);
    setUserPhoto(photo);

    const data = JSON.parse(localStorage.getItem(storageName));
    localStorage.setItem(storageName, JSON.stringify({
      ...data, userName: name, userPhoto: photo
    }));
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userName, data.socialType, data.userPhoto);
    }
    setReady(true);
  }, [login]);


  return {
    login, logout, userDataUpdate, token, userPhoto, socialType, userName, ready
  };
};

export default useAuth;
