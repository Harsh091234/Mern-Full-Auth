import {create} from "zustand";
import api from "../utils/axios";
const API_URL = import.meta.env.VITE_API_URL;

api.defaults.withCredentials= true;

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth: true,
    error: null,

    signup: async(email, password, name) => {
        set({isLoading: true, error: null});
        try {
            const response = await api.post(`/auth/signup`, {email, password, name});
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || "error signing up", isLoading: false});
            throw error;
        }
    },

    verifyEmail: async(code) => {
       set({isLoading: true, error: null});
       try {
           const response = await api.post(`/auth/verify-email`, {code});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
       } catch (error) {
            set({error: error.response.data.message || "error verifying email", isLoading: false});
            throw error;
       } 
    },

    checkAuth: async() => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        set({isCheckingAuth: true, error: null});
        try {
            const response = await api.get(`/auth/check-auth`);
            set({user: response.data.user, isCheckingAuth: false, isAuthenticated: true})
        } catch (error) {
            set({
              error: null,
              isCheckingAuth: false,
              isAuthenticated: false,
            });
        }
    },

    login: async(email, password) => {
      
        set({isLoading: true, error: null});
        try {
            const response = await api.post(`/auth/login`, {email, password});
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            })
        } catch (error) {
            set({error: error.response.data.message || "error logging in", isLoading: false});
            throw error;
        }
    },

    logout: async() => {
        set({ isLoading: true, error: null});
        try {
            const response = api.post(`/auth/logout` );
            set({user: null, error: null, isAuthenticated: false, isLoading: false});
        } catch (error) {
            set({error: "Error logging out", isLoading: false});
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({isLoading: true, error: null, message: null});
        try {
            const response = await api.post(`/auth/forgot-password`, {email});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "error sending reset password email"});
            throw error;
        }
    },

    resetPassword: async(token, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await api.post(`/auth/reset-password/${token}`, {password});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "error resetting password"});
            throw error;
        }
    },



}));

