import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import type { Notification } from '@/types';

interface SocketContextType {
  socket: Socket | null;
  notifications: Notification[];
  clearNotifications: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://api-gigflow.akashhalder.in/';

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_URL, {
        auth: {
          userId: user._id,
        },
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      newSocket.on('hired', (data: { gigTitle: string; message: string }) => {
        const notification: Notification = {
          id: Date.now().toString(),
          message: data.message,
          type: 'success',
          gigTitle: data.gigTitle,
          timestamp: new Date(),
        };

        setNotifications((prev) => [notification, ...prev]);
        
        toast.success('🎉 You got hired!', {
          description: `You have been hired for "${data.gigTitle}"!`,
          duration: 5000,
        });
      });

      newSocket.on('bidRejected', (data: { gigTitle: string; message: string }) => {
        const notification: Notification = {
          id: Date.now().toString(),
          message: data.message,
          type: 'info',
          gigTitle: data.gigTitle,
          timestamp: new Date(),
        };

        setNotifications((prev) => [notification, ...prev]);
        
        toast.info('Bid Update', {
          description: data.message,
          duration: 4000,
        });
      });

      newSocket.on('newBid', (data: { gigTitle: string; freelancerName: string; bidAmount: number }) => {
        const notification: Notification = {
          id: Date.now().toString(),
          message: `New bid received from ${data.freelancerName}`,
          type: 'info',
          gigTitle: data.gigTitle,
          timestamp: new Date(),
        };

        setNotifications((prev) => [notification, ...prev]);
        
        toast.success('🎯 New Bid Received!', {
          description: `${data.freelancerName} bid ₹${data.bidAmount} on "${data.gigTitle}"`,
          duration: 5000,
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider value={{ socket, notifications, clearNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
