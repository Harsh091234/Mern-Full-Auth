import {create} from "zustand";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials= true;

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth: true,
    error: null,

    signup: async(email, password, name) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name});
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: error.response.data.message || "error signing up", isLoading: false});
            throw error;
        }
    },

    verifyEmail: async(code) => {
       set({isLoading: true, error: null});
       try {
            const response = await axios.post(`${API_URL}/verify-email`, {code});
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
            const response = await axios.get(`${API_URL}/check-auth`);
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
            const response = await axios.post(`${API_URL}/login`, {email, password});
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
            const response = axios.post(`${API_URL}/logout` );
            set({user: null, error: null, isAuthenticated: false, isLoading: false});
        } catch (error) {
            set({error: "Error logging out", isLoading: false});
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({isLoading: true, error: null, message: null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "error sending reset password email"});
            throw error;
        }
    },

    resetPassword: async(isCSSVariableToken, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "error resetting password"});
            throw error;
        }
    }


}));

