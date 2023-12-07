import { useState } from "react";
import type { UserData } from "@/_domain/interfaces/user/user";
import { UserAPIImplementation } from "@/_data/repositories/user-api-implementation";
import { SetAuthSecret } from "@/_domain/use-cases/user/set-auth-secret";

interface SetAuthSecretViewModelResponse {
  setAuthSecret: (accessToken: string, authSecret: string) => Promise<void>;
  user: UserData | undefined;
  error: string | undefined;
  loading: boolean;
}

export default function SetAuthSecretViewModel(): SetAuthSecretViewModelResponse {
	const [user, setUser] = useState<UserData | undefined>();
  const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new SetAuthSecret(
		new UserAPIImplementation()
	);

	async function setAuthSecret(accessToken: string, authSecret: string): Promise<void> {
		try {
			setLoading(true);
      
      const response = await UseCase.invoke(accessToken, authSecret);

      if (response.success) {
        setUser(response.data);
      }
      else{
        setError('Set auth secret: Error getting user info.')
      }
		} catch {
      setError('Set auth secret: Unexpected Error getting user info.')
			throw new Error('An unexpected error ocurred.');
		} finally {
			setLoading(false);
		}
	}

	return {
		setAuthSecret,
		user,
    error,
		loading,
	};
}