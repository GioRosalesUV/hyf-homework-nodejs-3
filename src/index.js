const express = require('express');
const app = express();

app.locals.users = [];

app.get('/', (req, res) => {
  res.send("Hello World!");
});
app.route('/users')
  .get((req, res) => {
    res.status(200).json(app.locals.users.map(user => ({ id: user })));
  })
  .post((req, res) => {
    app.locals.users.push(app.locals.users.length || 0);
    res.status(200).json({ id: app.locals.users[app.locals.users.length - 1] });
  });
app.get('/user/:id', (req, res) => {
  res.status(200).json({ id: app.locals.users[Number(req.params.id)] });
});

app.listen(3000, () => {
  console.log("Server runned");
});