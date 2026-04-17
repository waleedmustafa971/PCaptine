import React, { createContext, useContext, useState } from 'react';

export type AppState = 'auth' | 'kyc' | 'main';

interface AppContextValue {
  appState: AppState;
  driverPhone: string;
  /** Called after OTP for a returning driver — jumps straight to main. */
  loginExisting: (phone: string) => void;
  /** Called after OTP for a new driver — OTPScreen navigates to Register next. */
  loginNew: (phone: string) => void;
  /** Called at the end of RegisterScreen — moves to KYC flow. */
  completeRegistration: () => void;
  /** Called at the end of KYCScreen — moves to main app. */
  completeKYC: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue>({
  appState: 'auth',
  driverPhone: '',
  loginExisting: () => {},
  loginNew: () => {},
  completeRegistration: () => {},
  completeKYC: () => {},
  logout: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [driverPhone, setDriverPhone] = useState('');

  const loginExisting = (phone: string) => {
    setDriverPhone(phone);
    setAppState('main');
  };

  const loginNew = (phone: string) => {
    setDriverPhone(phone);
    // Caller (OTPScreen) navigates to Register — state stays 'auth'.
  };

  const completeRegistration = () => {
    setAppState('kyc');
  };

  const completeKYC = () => {
    setAppState('main');
  };

  const logout = () => {
    setDriverPhone('');
    setAppState('auth');
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        driverPhone,
        loginExisting,
        loginNew,
        completeRegistration,
        completeKYC,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
