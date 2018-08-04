const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use('/listings/:id', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Listening on port ', 3000);
});

app.get('/api/listings/:id/photos', (req, res) => {
  const id = Number(req.params.id);
  axios.get(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/api/listings/${id}/photos`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err))
})

app.post('/api/listings/:id/saved', (req, res) => {
  console.log(req.params)
  const request = Object.keys(req.body)[0];
  axios.post(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/saved`, request)
    .then(response => res.status(200).send())
    .catch(err => res.status(404).send())
 })


app.get('/api/house/:id', (req, res) => {
  const id = Number(req.params.id);
  axios.get(`http://ec2-18-222-220-204.us-east-2.compute.amazonaws.com/api/house/${id}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err))
})

app.get('/api/listings/:id/bookings', (req, res) => {
  const id = Number(req.params.id);
  axios.get(`http://ec2-34-203-218-92.compute-1.amazonaws.com/api/listings/${id}/bookings`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err))
})

app.get('/:id/reviews', (req, res) => {
 const id = req.params.id;
 axios.get(`http://ec2-52-87-204-118.compute-1.amazonaws.com/${id}/reviews`)
   .then(response => res.status(200).send(response.data))
   .catch(err => res.status(404).send(err))
})

app.post('/:id/reviews/query=:searchTerm', (req, res) => {
  const id = req.params.id;
  const searchTerm = req.params.searchTerm;
  axios.post(`http://ec2-52-87-204-118.compute-1.amazonaws.com/${id}/reviews/query=${searchTerm}`)
    .then(response => res.status(200).send(response.data))
    .catch(err => res.status(404).send(err))
 })
