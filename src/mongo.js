const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    networkDevicesname: {
        type: String,
        default: "Default Network Device"
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    connectedDevices: {
        type: String,
        default: 0
    },
    connectionStatus: {
        type: String,
        default: "Disconnected"
    },
    networkSpeed: {
        type: String,
        default: "20Mbps"
    },
    signalStrength: {
        type: String,
        default: "Strong"
    },
    Amount: {
        type: String,
        default: "0"  // Default value with prefix "Ksh"
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    subscriptionStartDate: {
        type: Date,
        default: Date.now
    },
    RemainingDays: {
        type: Number,
        default: 30
    },
    modifiedFields: {
        type: [String],
        default: [] // Initialize modified fields array
    }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
