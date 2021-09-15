const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();

const messagesRoutes = require('./routes/messages.routes');

app.use('/messages', messagesRoutes);

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.render('index.html');
});


// app.post('/send-message', (req, res) => {

//   const { author, sender, title, message } = req.body;

//   if(author && sender && title && message) {
//     res.send('The message has been sent!');
//   }
//   else {
//     res.send('You can\'t leave fields empty!')
//   }

// });


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// module.exports = server;
