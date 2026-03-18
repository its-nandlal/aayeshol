"use client";

import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SignupResponse, SigninResponse } from "@/../../../Aayeshol/packages/types/auth";

// ======== API Functions ========

async function signUpApi(formData: FormData): Promise<SignupResponse> {
  const { data } = await api.post("/api/auth/sign-up/email", formData);
  return data;
}

async function signInApi(formData: FormData): Promise<SigninResponse> {
  const { data } = await api.post("/api/auth/sign-in/email", formData);
  return data;
}

async function sessionUserApi(): Promise<SigninResponse | null> {
  try {
    const { data } = await api.get("/users/me"); // ← correct endpoint
    return data;
  } catch (err: any) {
    return err;
  }
}

// ======== Hooks ========

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (data: SignupResponse) => {
      // Token save करो
      localStorage.setItem("token", data.token);
      
      // Session invalidate → useSession auto refetch करेगा
      queryClient.invalidateQueries({ queryKey: ["session"] });

      toast.success("Signup successful! Welcome " + data.user.name);
    },
    onError: (err: unknown) => {
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInApi,
    onSuccess: (data: SigninResponse) => {
      // Token save करो
      localStorage.setItem("token", data.token);

      // Session invalidate
      queryClient.invalidateQueries({ queryKey: ["session"] });

      toast.success("Sign in successful! Welcome back " + data.user.name);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Sign in failed. Please try again.");
    },
  });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async () => {
        await api.post("/api/auth/sign-out");
        localStorage.removeItem("token");
      },
      onSuccess: () => {
        queryClient.clear(); // सभी queries invalidate
        toast.success("Logged out successfully");
        window.location.href = "/";
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Sign out failed. Please try again.")
      }
    });
  };

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: sessionUserApi,
    staleTime: 1000 * 60 * 5,     // 5 min तक fresh
    retryDelay: 1000 * 60 * 5,
    retry: false,                 // session fail पर retry मत करो
    refetchOnWindowFocus: false,  // window focus पर मत refetch
  refetchOnMount: false,

    // enabled: !!localStorage.getItem("token"), // optional: token हो तभी run
  });
};