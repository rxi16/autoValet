var mysql = require('mysql');
var inquirer = require('inquirer');
require(console.table);

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",
  password: "",
  database: "autoValetDB"
});

// Creates the connection with the server
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
});

// Prompt the user for a wardrobe color scheme
function promptUserForColor() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'color',
				message: 'Please choose a wardrobe color scheme by entering blue, red, or white [quit with q]',
				validate: function(input) {
					input.toUpperCase();
					if (input === 'BLUE' || input === 'RED' || input === 'WHITE' || input === 'Q') {
						return input;
					}
				}
			}
		])
		.then(function(input) {
			checkIfShouldQuit(input.color);
			var color = input.color.toUpperCase();
			console.log('You have chosen the ' + input.color + ' wardrobe color scheme.');

		});
}
function checkIfShouldQuit(input) {
	if (input.toUpperCase() === 'Q') {
		console.log("You have chosen to quit the Auto Valet Service. Goodbye!");
		process.exit(0);
	};
}
