import webpush from "web-push"


webpush.setVapidDetails('mailto:federicoarce2004@gmail.com',process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)


console.log(process.env.PUBLIC_VAPID_KEY,process.env.PRIVATE_VAPID_KEY)
export default webpush