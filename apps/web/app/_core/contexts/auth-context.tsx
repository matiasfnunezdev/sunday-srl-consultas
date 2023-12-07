"use client"
/* eslint-disable react/function-component-definition -- N/A */
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
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
  signInFirebase: (email: string, password: string) => Promise<void>;
  signOutFireabase: () => Promise<void>;
  handleSetSecret: (secret: string) => void
  handleSetUserData: (user: UserData) => void;
  handleRefetchUserInfo: (token: string) => Promise<void>;
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

  const handleRefetchUserInfo = async (token: string): Promise<void> => {
      await getUser(token);
  }

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      user, 
      userInfo, 
      secret, 
      signInFirebase, 
      signOutFireabase, 
      handleSetSecret, 
      handleSetUserData,
      handleRefetchUserInfo
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