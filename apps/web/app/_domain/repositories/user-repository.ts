import type { ApiResponse, UserData } from "../interfaces/user/user";

export interface UserRepository {
  getUser: (accessToken: string) => Promise<ApiResponse<UserData>>;
  setAuthSecret: (accessToken: string, authSecret: string) => Promise<ApiResponse<UserData>>;
}