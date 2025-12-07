import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import type { User } from "../types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

interface UseUserCreatedToastProps {
  onUserCreated?: () => void;
}

export const useUserCreatedToast = ({ onUserCreated }: UseUserCreatedToastProps = {}) => {
  useEffect(() => {
    // Establish WebSocket connection
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    // Listen for connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for user_created event
    socket.on("user_created", (userData: User) => {
      console.log("New user created:", userData);
      
      // Display toast notification
      toast.success(
        `New user added: ${userData.first_name} ${userData.last_name}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Refresh user list if callback is provided
      if (onUserCreated) {
        onUserCreated();
      }
    });

    // Listen for disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Listen for connection errors
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      console.log("WebSocket disconnected (cleanup)");
    };
  }, [onUserCreated]);
};