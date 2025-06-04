import { apiConfig, reverbConfig } from '@/config/config';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const token = sessionStorage.getItem('token');

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.echo = new Echo({
        cluster: '',
        broadcaster: 'pusher',
        key: reverbConfig.APP_KEY,
        wsHost: reverbConfig.HOST,
        wsPort: reverbConfig.PORT,
        wssPort: reverbConfig.PORT,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ['ws'],
        authEndpoint: `${apiConfig.API_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      });

      SocketService.instance = this;
    }

    return SocketService.instance;
  }

  subscribe(channelName) {
    return this.echo.channel(channelName);
  }

  subscribeToPrivate(channelName) {
    return this.echo.private(channelName);
  }

  subscribeToPresence(channelName) {
    return this.echo.presence(channelName);
  }

  unsubscribe(channelName) {
    this.echo.leave(channelName);
  }

  disconnect() {
    this.echo.disconnect();
  }
}

const socketService = new SocketService();
export default socketService;
