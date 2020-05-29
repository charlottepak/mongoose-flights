const Flight = require('../models/flight');

module.exports = {
    create
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        console.log(flight, ' this is the flight document')
        flight.destinations.push(req.body); // add the destination to the destinations array
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
    })    
}