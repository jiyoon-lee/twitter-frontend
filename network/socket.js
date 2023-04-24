import io from "socket.io-client";

export class Socket {
  constructor(baseUrl) {
    this.io = io(baseUrl);
  }
}
