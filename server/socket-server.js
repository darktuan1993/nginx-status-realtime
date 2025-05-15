const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const NGINX_STATUS_URL = 'https://dev-domain-status.bravo.com.vn/status/format/json';
const INTERVAL_MS = 1000;

let latestData = null;

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

setInterval(async () => {
  try {
    const res = await axios.get(NGINX_STATUS_URL);
    latestData = res.data;
    broadcast(latestData);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}, INTERVAL_MS);

wss.on('connection', (ws) => {
  console.log('Client connected');
  if (latestData) ws.send(JSON.stringify(latestData));
});

server.listen(8080, () => console.log('WebSocket server on ws://localhost:8080'));
