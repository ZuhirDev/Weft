import { Button } from '@/components/ui/button';
import socketService from '@/lib/socketService';
import { get } from '@/utils/xhr';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
const [notification, setNotification] = useState(null);


    // useEffect(() => {
    //     const pusher = new Pusher('s8uws0nw7wzpjtxbhfx9', {
    //         cluster: '',
    //         wsHost: 'localhost',
    //         wsPort: 85,
    //         wssPort: 85,
    //         forceTLS: false,
    //         disableStats: true,
    //         enabledTransports: ['ws'],
    //     });

    //     const channel = pusher.subscribe('public-channel');

    //     channel.bind('user-notified', (data) => {
    //         console.log('Mensaje recibido:', data.message);
    //         setNotification(data.message);
    //     });

    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
    // }, []);


    useEffect(() => {
      const channel = socketService.subscribe('public-channel');

      channel.listen('.user-notified', (e) => {
        console.log('Evento recibido mamañema:', e.message);
        setNotification(e.message);
      });

      return () => {
        socketService.unsubscribe('public-channel');
      };
    }, []);


    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification]);


    const notifyUsers = async () => {
      try {
        await get({url: '/notify'});

      } catch (error) {
        console.log("Error", error)
      }
    }

    return (
        <div>
            <Button onClick={notifyUsers}>Notificar a todos los usuarios</Button>

            {notification && <div>{notification}</div>}
        </div>
    );
}

export default HomePage
