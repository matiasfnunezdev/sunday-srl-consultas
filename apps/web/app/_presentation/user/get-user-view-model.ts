import { useState } from "react";
import type { UserData } from "@/_domain/interfaces/user/user";
import { GetUser } from "@/_domain/use-cases/user/get-user";
import { UserAPIImplementation } from "@/_data/repositories/user-api-implementation";

interface GetUserViewModelResponse {
  getUser: (accessToken: string) => Promise<void>;
  user: UserData | undefined;
  error: string | undefined;
  loading: boolean;
}

export default function GetUserViewModel(): GetUserViewModelResponse {
	const [user, setUser] = useState<UserData | undefined>();
  const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	const UseCase = new GetUser(
		new UserAPIImplementation()
	);

	async function getUser(accessToken: string): Promise<void> {
		try {
			setLoading(true);
      
      const response = await UseCase.invoke(accessToken)

      if (response.success) {
        setUser(response.data);
      }
      else{
        setError('Get user: Error getting user info.')
      }
		} catch {
      setError('Get user: Unexpected Error getting user info.')
			throw new Error('An unexpected error ocurred.');
		} finally {
			setLoading(false);
		}
	}

	return {
		getUser,
		user,
    error,
		loading,
	};
}