"use client"
/* eslint-disable react/function-component-definition -- N/A */
import { getAuth, onAuthStateChanged, onIdTokenChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import type { ReactNode} from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase/fireabase';
import type { UserData } from '@/_domain/interfaces/user/user';
import useGetUserViewModel from '@/_presentation/user/get-user-view-model';

interface AuthContextType {
  user: User | null;
  userInfo: UserData | undefined;
  accessToken: string | null;
  secret: string | undefined;
  isAuthReady: boolean;
  signInFirebase: (email: string, password: string) => Promise<void>;
  signOutFireabase: () => Promise<void>;
  handleSetSecret: (secret: string) => void
  handleSetUserData: (user: UserData) => void;
  handleRefetchUserInfo: (token: string, uid: string) => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

interface AuthContextProvider {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProvider> = ({ children }) => {
  const { getUser, user: userInfoResponse, error: userInfoError, loading: userInfoLoading } = useGetUserViewModel();
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | undefined>();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | undefined>()
  const [isAuthReady, setIsAuthReady] = useState(false);

  const getAccessToken = async (): Promise<string | null> => {
    
    const auth = getAuth(firebaseApp);
    if (auth?.currentUser) {
      try {
        const token = await auth?.currentUser.getIdToken();
        setAccessToken(token);
        return token;
      } catch (error) {
        signOutFireabase();
        console.error('Error refreshing token', error);
        return null;
      }
    }
    return accessToken;
  };

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    async function updateAccessToken(authUser: User | null): Promise<void> {
      if (authUser) {
        setUser(authUser);
        const token = await authUser.getIdToken(true);
        setAccessToken(token);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    }

    const unsubscribe = onIdTokenChanged(auth, (authUser) => {
      void updateAccessToken(authUser)
    });

    return () => { unsubscribe(); };
  }, []);

  useEffect(() => {
    async function getEmailVerifyStatus(currentUser: User): Promise<void>{
      try {
        const idTokenResult = await currentUser.getIdTokenResult();
          setAccessToken(idTokenResult.token);
      } catch {
        throw new Error('getEmailVerifyStatus: Unexpected error')
      }
    }
    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsAuthReady(true);
        void getEmailVerifyStatus(authUser)
      } else {
        setUser(null);
      }
    });

    return () => { unsubscribe(); };
  }, []);

  useEffect(() => {
		if (userInfoResponse && !userInfoLoading && !userInfoError) {
			handleSetUserData(userInfoResponse);
		}
	}, [userInfoResponse]);

  const signInFirebase = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      throw new Error('signInWithEmailAndPassword: Unexpected error')
    }
  };

  const signOutFireabase = async (): Promise<void> => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
    } catch {
      throw new Error('signOutFireabase: Unexpected error')
    }
  };

  const handleSetSecret = (value: string): void => {
    setSecret(value)
  }

  const handleSetUserData = (userData: UserData): void => {
    setUserInfo(userData)
  }

  const handleRefetchUserInfo = async (token: string, uid: string): Promise<void> => {
      await getUser(token, uid);
  }

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      user, 
      userInfo, 
      secret,
      isAuthReady,
      signInFirebase, 
      signOutFireabase, 
      handleSetSecret, 
      handleSetUserData,
      handleRefetchUserInfo,
      getAccessToken
       }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};