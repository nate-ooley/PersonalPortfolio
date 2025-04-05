import { User, InsertUser } from '@shared/schema';
import { UseMutationResult } from '@tanstack/react-query';

type LoginData = Pick<InsertUser, "username" | "password">;

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, InsertUser>;
}

export function useAuth(): AuthContextType;