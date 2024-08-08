console.log('Service worker')

self.addEventListener('push',e=>{
    const data = e.data.json()
    console.log(data)
    self.registration.showNotification(data.title,{
        body: data.message,
        icon: 'https://play-lh.googleusercontent.com/CachTgIoVy7oEtLlgeo8bPcJfaUHRopRYUOH-DYyeiRsQQaqg8gjpp1qGgOs3wiC2IQ'
    })
})