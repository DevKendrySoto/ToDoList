const express = require('express');
const path = require('path');

const app = express();
const tasksRoute = require('./routes/routerTask');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/tasks', tasksRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
