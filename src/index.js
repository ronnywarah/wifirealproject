const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// Render a page with options to login or signup
app.get('/', (req, res) => {
    res.render('login');
});

// Render the signup page
app.get('/signup', (req, res) => {
    const message = req.query.message || ""; // Message from the server
    res.render('signup', { message });
});

// Render the login page
app.get('/login', (req, res) => {
    const signupSuccess = req.query.signupSuccess === 'true';
    res.render('login', { signupSuccess });
});

// Handle the signup form submission
app.post('/signup', async (req, res) => {
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    });

    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking) {
            // User already exists
            return res.redirect('/signup?message=User details already exist. Proceed to login.');
        } else {
            // Save the new user
            await data.save();
            // Notify user about successful registration
            return res.redirect('/signup?message=You have registered successfully. Proceed to login.');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/signup?message=An error occurred during signup.');
    }
});

// Handle the login form submission
app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name });

        if (user && user.password === req.body.password) {
            // Fetch additional user data from the database
            // Assuming the user's data is stored in the `userData` field
            const userData = {
                name: user.name,
                networkDevicesname: user.networkDevicesname,
                paymentStatus: user.paymentStatus,
                connectedDevices: user.connectedDevices,
                connectionStatus: user.connectionStatus,
                networkSpeed: user.networkSpeed,
                signalStrength: user.signalStrength,
                Amount: user.Amount,
                currentBalance: user.currentBalance,
                subscriptionStartDate: user.subscriptionStartDate,
                RemainingDays: user.RemainingDays
            };
            
            // Render the home page with user data
            return res.render("home", { user: userData });
        } else {
            return res.send("Incorrect password");
        }
    } catch (error) {
        console.error(error);
        return res.send("Wrong details");
    }
});

app.listen(port, '192.168.20.102', () => {
    console.log('Server is running and accessible from all network interfaces');
});