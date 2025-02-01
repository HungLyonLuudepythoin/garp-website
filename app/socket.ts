"use client";
import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? "https://garp.io.vn" : "http://localhost:3000"
// Set the server URL and options to match the server configuration
const socket = io(URL, {
  cert: process.env.NODE_ENV === 'production' ? process.env.SSL_CERT : '',
  key: process.env.NODE_ENV === 'production' ? process.env.SSL_KEY : '',
  path: '/socket',
  transports: ['websocket', 'polling'], 
  reconnection: true,
  reconnectionAttempts: 5
});

export default socket;