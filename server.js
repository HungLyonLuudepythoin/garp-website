import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const phoneToSocketMap = new Map();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.NODE_ENV === 'production' ? 'app' : 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  console.log("dev:", dev)
  console.log(process.env.NEXTAUTH_URL)
  const io = new Server(httpServer, {
    path: '/socket',
    wssEngine: ['ws', 'wss'],
    transport: ['websocket', 'polling'],
    cors: {
      origin: '*'
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    socket.on("send-location", async (data) => {
      const { phoneNumber } = data;
      phoneToSocketMap.set(phoneNumber, socket.id);
      io.emit("location-received", data);
    });

    socket.on("send-accept", (data) => {
      const { phoneNumber, message } = data;
      const recipientSocketId = phoneToSocketMap.get(phoneNumber);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive-accept", { message });
      }
    });

    socket.on("driver-location", (data) => {
      io.emit("receive-driver-location", data);
    });

    socket.on("driver-redirect-dashboard", (data) => {
      const recipientSocketId = phoneToSocketMap.get(data);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive-redirect");
      }
    });
  });

  httpServer.once("error", (err) => {
    console.error("Server Error:", err);
    process.exit(1);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
