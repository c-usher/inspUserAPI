const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use('/', (req, res, next) => {
    res.json({message: "Message works"});
})

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
