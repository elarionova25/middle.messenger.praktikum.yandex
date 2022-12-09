import SOCKET, {WebSocketAPI} from "../api/WebSocketAPI";
import router from "../core/Router";

export class WebSocketController {
    private readonly socket: WebSocketAPI;

    constructor() {
        this.socket = SOCKET;
    }

    async createsocket(chatId: number, token: string) {
        try {
            await this.socket.createsocket(chatId, token);
        } catch (e: any) {
            console.log('error');
            router.go('/error500');
        }
    }
}

export default new WebSocketController();
