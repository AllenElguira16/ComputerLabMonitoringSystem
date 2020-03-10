import {
  Namespace,
  SocketService as SocketServiceDecorator,
  Socket,
  SocketSession
} from "@tsed/socketio";

@SocketServiceDecorator()
class SocketService {
  @Namespace
  public nsp!: Namespace;

  $onNamespaceInit(nsp: SocketIO.Namespace) {}

  /**
   * Triggered when a new client connects to the Namespace.
   */
  $onConnection(
    @Socket socket: SocketIO.Socket,
    @SocketSession session: SocketSession
  ) {}

  /**
   * Triggered when a client disconnects from the Namespace.
   */
  $onDisconnect(@Socket socket: SocketIO.Socket) {}

  closeWindow() {
    this.nsp.emit("closeWindow");
  }
}

export default SocketService;
