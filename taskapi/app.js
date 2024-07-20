const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasksRouter = require('./task');
app.use('/tasks', tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
