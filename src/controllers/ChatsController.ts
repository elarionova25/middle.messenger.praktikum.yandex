import API, {AddUsers, CreateChat, DeleteChat} from '../api/ChatsAPI';
import {ChatsAPI} from "../api/ChatsAPI";
import router from '../core/Router';
import store from "../core/Store";
import {ChangeData} from "../api/UsersAPI";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async getChats() {
        const chats = await this.api.read();
        store.set('chats', chats);
        return chats;
    }

    async createchat(data: CreateChat) {
        try {
            await this.api.createchat(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async deletechat(data: DeleteChat){
        try {
            await this.api.deletechat(data);
        } catch (e: any) {
            console.error(e)
        }
    }

    async addusertochat(data: AddUsers) {
        try {
            await this.api.addusertochat(data);
        } catch (e: any) {
            console.error(e)
        }
    }

    async getchatusers(id: number) {
        const users = await this.api.getchatusers(id);
        return users;
    }
}

export default new ChatsController();
