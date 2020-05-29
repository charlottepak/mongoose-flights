const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = require('./ticket').prototype.schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    },

    arrival: Date,
  },
  {
    timestamps: true,
  }
);

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["American", "Southwest", "United"],
    },

    airport: {
      type: String,
      default: "DEN",
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    },

    flightNo: {
      type: Number,
      minlength: 10,
      maxlength: 999,
    },

    departs: {
      type: Date,
      default: function () {
        return new Date().oneYearFromNow.setFullYear(
          oneYearFromNow.getFullYear() + 1
        );
      },
    },

    destinations: [destinationSchema],
    tickets: [ticketSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
