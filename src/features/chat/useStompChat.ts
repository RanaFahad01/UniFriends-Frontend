import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import { apiFetch } from '@/api/client';
import type { ChatMessage } from '@/types/chat';

interface UseStompChatOptions {
  leagueId: number;
  enabled: boolean;
  onMessage: (msg: ChatMessage) => void;
}

interface UseStompChatReturn {
  sendMessage: (content: string) => void;
  isConnected: boolean;
}

export function useStompChat({ leagueId, enabled, onMessage }: UseStompChatOptions): UseStompChatReturn {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const onMessageRef = useRef(onMessage);
  const queryClient = useQueryClient();

  // Keep the callback ref up to date without triggering reconnect
  useEffect(() => {
    onMessageRef.current = onMessage;
  });

  useEffect(() => {
    if (!enabled) return;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    const client = new Client({
      beforeConnect: async () => {
        const { ticket } = await apiFetch<{ ticket: string }>('/api/auth/ws-ticket');
        client.connectHeaders = { Authorization: `Bearer ${ticket}` };
      },
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);

        queryClient.invalidateQueries({ queryKey: ['chat', 'messages', leagueId] });

        client.subscribe(`/topic/league/${leagueId}`, (frame) => {
          const msg = JSON.parse(frame.body) as ChatMessage;
          onMessageRef.current(msg);
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: () => {
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      clientRef.current = null;
      setIsConnected(false);
    };
  }, [leagueId, enabled, queryClient]);

  const sendMessage = useCallback((content: string) => {
    const client = clientRef.current;
    if (!client?.connected) return;
    client.publish({
      destination: `/app/league/${leagueId}/send`,
      body: JSON.stringify({ content }),
    });
  }, [leagueId]);

  return { sendMessage, isConnected };
}
