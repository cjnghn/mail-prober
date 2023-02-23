import net from "net"
import tls from "tls"

type SMTPClientOptions = { tls?: boolean }
type Socket = tls.TLSSocket | net.Socket
type ConnectFunction = (port: number, host: string, options: any) => Socket

class SMTPClient {
  private socket?: Socket
  private connecting = false
  private connected = false

  constructor(
    private host: string,
    private port: number,
    private options: SMTPClientOptions = {}
  ) {}

  connect() {
    if (this.connected || this.connecting) {
      return Promise.reject(new Error("Already connected or connecting"))
    }
    this.connecting = true

    const _connect: ConnectFunction = this.options.tls
      ? tls.connect
      : net.connect
    this.socket = _connect(this.port, this.host, this.options)

    return new Promise((resolve, reject) => {
      this.socket!.on("connect", () => {
        this.connected = true
        this.connecting = false
        resolve(null)
      })

      this.socket!.on("error", err => {
        this.connecting = false
        reject(err)
      })
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.destroy()
      this.socket = undefined
      this.connected = false
    }
  }

  send(command: string, args = "") {
    if (!this.connected) {
      return Promise.reject(new Error("Not connected"))
    }

    return new Promise((resolve, reject) => {
      const callback = (err: Error | null, response?: unknown) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      }

      this.socket!.write(`${command} ${args}\r\n`, "utf8", () => {
        this.socket!.once("data", data => {
          const statusCode = parseInt(data.toString().substr(0, 3))
          const response = data.toString().substr(4).trim()

          if (statusCode >= 400) {
            callback(new Error(response))
          } else {
            callback(null, { statusCode, response })
          }
        })
      })
    })
  }
}

export default SMTPClient
