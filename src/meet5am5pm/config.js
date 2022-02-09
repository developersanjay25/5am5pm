import openSocket from 'socket.io-client';
// const socketport = 'https://app.5am5pm.com:3000'
const socketport = 'http://localhost:5000'

export const socket = openSocket(socketport); 