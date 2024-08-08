const PUBLIC_VAPID_KEY = 'BFLsPd5TWJ2xVs1u41NXoMUXmGvjMUiO3VmkBMHTDdZs7KtBruG-bMCL1olPRYI4DQZvR9yjWMLiebxcVByINp8';

const subscription = async () => {
    console.log('new Service Worker');
    try {
        // Service worker
        const register = await navigator.serviceWorker.register('worker.js', {
            scope: '/'
        });
        console.log('Service Worker registered');
        
        await navigator.serviceWorker.ready;
        
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
        });

        await fetch('/subscription', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log('Subscribed!');
    } catch (error) {
        console.error('Subscription failed:', error);
    }
};

subscription();


const eventSource = new EventSource('/events');

eventSource.onmessage = (event) => {
    subscription();
};

eventSource.onerror = (error) => {
    console.error('EventSource failed:', error);
};