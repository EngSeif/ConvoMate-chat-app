/**
 * `useChatStore` - A Zustand store managing chat functionality, including users, messages, and socket subscription.
 *
 * The store handles fetching users and messages, sending messages, and subscribing to new messages for real-time updates.
 * It also manages the selected user and the loading states for fetching data.
 *
 * @module useChatStore
 */

import { create } from "zustand"; // Zustand library for state management
import { axiosInstance } from "@/lib/axios"; // Axios instance for API requests
import { useAuthStore } from "./useAuthStore"; // Importing the auth store to access socket

export const useChatStore = create((set, get) => ({
    /**
     * @property {Array} messages - Stores the list of messages for the selected user.
     */
    messages: [],

    /**
     * @property {Array} users - Stores the list of all users available for messaging.
     */
    users: [],

    /**
     * @property {Object|null} selectedUser - Stores the currently selected user for messaging, or null if no user is selected.
     */
    selectedUser: null,

    /**
     * @property {boolean} isUsersLoading - Tracks if the list of users is being loaded.
     */
    isUsersLoading: false,

    /**
     * @property {boolean} isMessagesLoading - Tracks if the messages for the selected user are being loaded.
     */
    isMessagesLoading: false,

    /**
     * @action getUsers - Fetches the list of users that can be messaged.
     * Sets the `users` property with the fetched data and manages loading state.
     */
    getUsers: async () => {
        set({ isUsersLoading: true }); // Set users loading state
        try {
            const res = await axiosInstance.get("/messages/user"); // Fetch users
            set({ users: res.data }); // Set fetched users
        } catch (error) {
            console.log("Error fetching users");
        } finally {
            set({ isUsersLoading: false }); // Set users loading state to false
        }
    },

    /**
     * @action getMessages - Fetches the list of messages for the selected user.
     * Sets the `messages` property with the fetched data and manages loading state.
     * 
     * @param {string} userId - The ID of the selected user whose messages are being fetched.
     */
    getMessages: async (userId) => {
        set({ isMessagesLoading: true }); // Set messages loading state
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); // Fetch messages for the user
            set({ messages: res.data }); // Set fetched messages
        } catch (error) {
            console.log("Error fetching messages");
        } finally {
            set({ isMessagesLoading: false }); // Set messages loading state to false
        }
    },

    /**
     * @action sendMessage - Sends a new message to the selected user.
     * Updates the `messages` property by adding the new message to the list.
     * 
     * @param {Object} messageData - The data of the message being sent.
     */
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            console.log("Sending Data");
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // Send message
            console.log(res.data);
            set({ messages: [...messages, res.data] }); // Update messages with the new message
        } catch (error) {
            console.log("Error sending message");
        }
    },

    /**
     * @action subscribeToMessages - Subscribes to the `newMessage` event from the socket.
     * If a new message is received from the selected user, it updates the `messages` state.
     */
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket; // Get socket from the auth store
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return; // Ignore messages not from the selected user
            set({ messages: [...get().messages, newMessage] }); // Update messages with the new message
        });
    },

    /**
     * @action unsubscribeFromMessages - Unsubscribes from the `newMessage` event from the socket.
     */
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket; // Get socket from the auth store
        socket?.off("newMessage"); // Unsubscribe from the newMessage event
    },

    /**
     * @action setSelectedUser - Sets the currently selected user for messaging.
     * 
     * @param {Object} selectedUser - The user to be selected for messaging.
     */
    setSelectedUser: (selectedUser) => {
        set({ selectedUser }); // Set the selected user
    }
}));
