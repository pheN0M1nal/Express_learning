const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

// init middle ware
///app.use(logger);

// Handlebar MiddleWare
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) =>
	res.render('index', {
		title: 'Member App',
		members,
	})
);
// Get all members
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'));
// }); this isnt ideal

// Body Parser middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
