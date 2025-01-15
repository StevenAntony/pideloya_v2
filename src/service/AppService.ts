import { NotificationAllModel } from "../models/AppModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

class _AppService extends ResponseService {
    private notifications: NotificationAllModel[] = []

    constructor(){
        super()
    }

    getNotifications(): NotificationAllModel[] {
        return this.notifications
    }

    async allNotification() {
        this.response = await Api.Post(`notifications/all`)
        if (this.response.success) {
            this.notifications = this.response.data
        }
    }
}

export const AppService = new _AppService()
