const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newFlight,
  create,
  show,
  index
};

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', { title: 'All Flights', flights });
  });
}

// function show(req, res) {
//   Flight.findById(req.params.id, function(err, flight) {
//     res.render('flights/show', { title: 'Flight Detail', flight });
//   });
// }

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('tickets')
  .exec(function(err, flight) {
    Ticket.find({_id: {$nin: flight.tickets}}, function(err, tickets) {
      res.render('flights/show', {
        title: 'Flight Details',
        flight,
        tickets
      });
    });
  });
}


function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.render('flights/new');
    console.log(flight);
    res.redirect('/flights');
  });
}

function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}