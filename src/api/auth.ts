import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

// 회원가입
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 로그인 with 비밀번호
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 로그인 with 소셜
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  return data;
}

// 비밀번호 리셋
export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;
  return data;
}

// 비밀번호 변경
export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw error;
  return data;
}
