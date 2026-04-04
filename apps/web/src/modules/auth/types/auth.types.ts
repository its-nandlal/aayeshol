export interface AuthUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
    lastname?: string | null;
    [key: string]: any;
  }
  
  export interface SignupResponse {
    token: string;
    user: AuthUser;
  }
  
  export interface SigninResponse {
    redirect: boolean;
    token: string;
    user: AuthUser;
  }