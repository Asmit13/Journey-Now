const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    console.log("getfare serveice: ", pickup, destination)
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log("distime: ", distanceTime)

    // Ensure distanceTime is not undefined before accessing properties
    if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
        throw new Error('Could not retrieve distance and time from map service.');
    }

    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    const fare = {
        auto: Math.round(
            baseFare.auto +
            (((distanceTime?.distance?.value ?? 0) / 1000) * perKmRate.auto) +
            (((distanceTime?.duration?.value ?? 0) / 60) * perMinuteRate.auto)
        ),
        car: Math.round(
            baseFare.car +
            (((distanceTime?.distance?.value ?? 0) / 1000) * perKmRate.car) +
            (((distanceTime?.duration?.value ?? 0) / 60) * perMinuteRate.car)
        ),
        moto: Math.round(
            baseFare.moto +
            (((distanceTime?.distance?.value ?? 0) / 1000) * perKmRate.moto) +
            (((distanceTime?.duration?.value ?? 0) / 60) * perMinuteRate.moto)
        )
    };

    return fare;
}

module.exports.getFare = getFare;

// OTP Generator
function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

// Create a Ride
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    if (!fare[vehicleType]) {
        throw new Error('Invalid vehicle type selected.');
    }

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
};

// Confirm a Ride
module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Ride ID and captain are required');
    }

    const ride = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted', captain: captain._id },
        { new: true }
    ).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

// Start a Ride
module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }

    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride has not been accepted yet.');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP.');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'ongoing' }
    );

    return ride;
};

// End a Ride
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Ride ID and captain are required');
    }

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id })
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not currently ongoing.');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'completed' }
    );

    return ride;
};
