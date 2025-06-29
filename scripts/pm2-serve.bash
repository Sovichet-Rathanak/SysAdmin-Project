pm2 start --name mykanban-backend ../backend/server.js
pm2 start serve --name mykanban-frontend -- -s ../frontend/dist
