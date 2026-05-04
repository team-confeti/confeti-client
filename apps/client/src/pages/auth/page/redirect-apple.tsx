import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '@shared/pages/loading/loading';

import { tryHandoffToNativeApp } from '../utils/native-redirect-bridge';

const APPLE_NATIVE_SCHEME = 'com.confeti.app://callback/apple';

const RedirectApple = () => {
  const location = useLocation();

  useEffect(function handoffNativeAppleAuth() {
    tryHandoffToNativeApp(location.search, APPLE_NATIVE_SCHEME);
  }, []);

  return <Loading />;
};

export default RedirectApple;
