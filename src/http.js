import axios from 'axios'

export default axios.create({
    baseURL: `${window.location.protocol}//${window.location.host}`,
    // baseURL: `https://videochat.chat-avenue.com:4004`,
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        'Content-Type': 'application/json'
    }
})
