import http from 'http';
import fs from 'fs/promises';

import { getIdRange, getRequestById, saveToDatabase } from './db.js';

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);


    if (req.method === 'POST' && url.pathname === '/requests') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                await saveToDatabase(data); 

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ message: 'Запрос успешно сохранен в базу!' }));
            } catch (error) {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ message: 'Ошибка при сохранении' }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`APP запущен на порту ${PORT}`);
});
