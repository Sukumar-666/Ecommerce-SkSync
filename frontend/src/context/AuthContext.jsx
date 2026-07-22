import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api, { setAccessToken, silentRefresh } from "../utils/api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  // session is null (logged out) or the public user object { id, name, email, role, gender, ... }
  const [session, setSession] = useState(null);
  // true while we're checking for an existing session on first load
  const [initializing, setInitializing] = useState(true);
  // On first mount, try to silently turn the httpOnly refresh cookie (if any)
  // back into a working session — this is what makes "stay logged in after
  // refresh" work without ever putting a long-lived token in localStorage.
  useEffect(() => {
    (async () => {
      const result = await silentRefresh();
      if (result?.user) setSession(result.user);
      setInitializing(false);
    })();
  }, []);

  // Step 0: create the account. No session is issued yet — the account is
  // inactive until the email verification link is clicked.
  const signup = useCallback(async ({ name, email, mobile, password, confirmPassword, gender }) => {
    try {
      const data = await api.signup({ name, email, mobile, password, confirmPassword, gender });
      return { ok: true, message: data.message };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const verifyEmail = useCallback(async (token) => {
    try {
      const data = await api.verifyEmail(token);
      return { ok: true, message: data.message };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const resendVerification = useCallback(async (email) => {
    try {
      const data = await api.resendVerification(email);
      return { ok: true, message: data.message };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  // Step 1: password check. On success this does NOT log the user in yet —
  // it emails an OTP and returns a short-lived pendingToken used to complete
  // step 2 (verifyLoginOtp) below.
  const login = useCallback(async ({ email, password, role }) => {
    try {
      const data = await api.login({ email, password, role });
      if (data.otpRequired) {
        return { ok: true, otpRequired: true, pendingToken: data.pendingToken, message: data.message };
      }
      if (data.accessToken && data.user) {
        setAccessToken(data.accessToken);
        setSession(data.user);
        return { ok: true, otpRequired: false, user: data.user, message: data.message };
      }
      return { ok: false, message: "Unexpected response from server." };
    } catch (error) {
      // Surface the EMAIL_NOT_VERIFIED case distinctly so the Login page can
      // offer a "resend verification email" action instead of a dead end.
      return { ok: false, message: error.message };
    }
  }, []);

  // Step 2: OTP check. On success this actually completes login.
  const verifyLoginOtp = useCallback(async ({ pendingToken, otp }) => {
    try {
      const data = await api.verifyOtp({ pendingToken, otp });
      setAccessToken(data.accessToken);
      setSession(data.user);
      return { ok: true, role: data.user.role };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const resendLoginOtp = useCallback(async (pendingToken) => {
    try {
      const data = await api.resendOtp(pendingToken);
      return { ok: true, message: data.message };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setAccessToken(null);
      setSession(null);
    }
  }, []);

  const logoutAllDevices = useCallback(async () => {
    try {
      await api.logoutAll();
    } finally {
      setAccessToken(null);
      setSession(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const { user } = await api.getProfile();
      setSession(user);
      return user;
    } catch {
      return null;
    }
  }, []);

  const value = {
    session,
    initializing,
    isAuthenticated: !!session,
    signup,
    verifyEmail,
    resendVerification,
    login,
    verifyLoginOtp,
    resendLoginOtp,
    logout,
    logoutAllDevices,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
