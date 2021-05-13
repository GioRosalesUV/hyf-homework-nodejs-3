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
app.route('/user/:id')
  .get((req, res) => {
    const index = app.locals.users.indexOf(Number(req.params.id));

    if (index < 0)
      return res.status(204).json({ message: "User not found" });

    res.status(202).json({ id: app.locals.users[index] });
  })
  .delete((req, res) => {
    const index = app.locals.users.indexOf(Number(req.params.id));

    if (index < 0)
      return res.status(204).json({ message: "User not found" });

    const deleted = app.locals.users.splice(index, 1);
    return res.status(202).json({ id: deleted });
  });

app.listen(3000, () => {
  console.log("Server runned");
});