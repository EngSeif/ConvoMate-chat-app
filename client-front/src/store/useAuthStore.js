/**
 * `useAuthStore` - A Zustand store managing authentication, socket connection, and user profile updates.
 *
 * The store handles the authentication state, online users, socket connection, and user profile management.
 * It includes actions for checking authentication, signing up, logging in, updating profiles, and managing
 * socket connections.
 *
 * @module useAuthStore
 */

import { axiosInstance } from '@/lib/axios'; // Importing axios instance for API requests
import { create } from 'zustand'; // Zustand library for state management
import { io } from 'socket.io-client'; // Socket.io client for real-time communication

export const useAuthStore = create((set, get) => ({
    /**
     * @property {Object|null} authUser - Stores authenticated user information, or null if not authenticated.
     */
    authUser: null,

    /**
     * @property {Object|null} socket - Stores socket.io connection instance, or null if not connected.
     */
    socket: null,

    /**
     * @property {boolean} isSigningUp - Tracks if the user is in the process of signing up.
     */
    isSigningUp: false,

    /**
     * @property {boolean} isLoggingIn - Tracks if the user is in the process of logging in.
     */
    isLoggingIn: false,

    /**
     * @property {Array} onlineUsers - Stores a list of online users' IDs.
     */
    onlineUsers: [],

    /**
     * @property {boolean} isUpdatingProfile - Tracks if the user profile is being updated.
     */
    isUpdatingProfile: false,

    /**
     * @property {boolean} isCheckingAuth - Tracks if the authentication status is being checked.
     */
    isCheckingAuth: true,

    /**
     * @action checkAuth - Checks the authentication status of the user.
     * If authenticated, it sets the `authUser` and connects the socket.
     * If not authenticated, it sets `authUser` to null.
     */
    checkAuth: async () => {
        try {
            const res = await axiosInstance("/auth/check");
            set({ authUser: res.data }); // Set authenticated user info
            get().connectSocket(); // Connect to the socket after successful authentication
        } catch (error) {
            set({ authUser: null }); // Clear user info if authentication fails
        } finally {
            set({ isCheckingAuth: false }); // Stop checking auth after completion
        }
    },

    /**
     * @action clearAuthUser - Clears the authenticated user from the store.
     */
    clearAuthUser: () => set({ authUser: null }),

    /**
     * @action UpdateProfile - Updates the user's profile with new data.
     * Sets the `authUser` to the updated user data after a successful update.
     * 
     * @param {Object} data - The profile data to be updated.
     */
    UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true }); // Set profile update state to true
        try {
            const res = await axiosInstance.put("/auth/update-profile", data); // Update the profile via API
            set({ authUser: res.data }); // Set the updated user data
        } catch (error) {
            console.log(error.message); // Log error if update fails
        }
    },

    /**
     * @action connectSocket - Connects to the socket server and listens for online users.
     * If the user is authenticated and socket is not already connected, it establishes a new connection.
     */
    connectSocket: async () => {
        const { authUser } = get();
        const socket = io("http://localhost:5000", {
            query: { userId: authUser._id } // Pass user ID to the server for socket connection
        });

        if (!authUser || socket?.connected) {
            console.log("Socket is already connected or user not authenticated.");
            return;
        }

        console.log("Connecting to socket...");
        socket.connect(); // Connect the socket
        set({ socket: socket }); // Store the socket instance

        // Listen for online users and update state
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    /**
     * @action disconnectSocket - Disconnects the socket connection and clears the socket instance from state.
     */
    disconnectSocket: async () => {
        const { socket } = get();

        if (socket && socket.connected) {
            socket.disconnect(); // Disconnect the socket
            set({ socket: null }); // Clear the socket instance
            console.log("Socket disconnected successfully.");
        } else {
            console.log("Socket is already disconnected or not initialized.");
        }
    },
}));
