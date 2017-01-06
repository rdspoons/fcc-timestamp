time microservice
accpts natural date or unix timestamp
returns JASON with unix timestamp and natural time values or null if the date is not recognized.

examples:

https://secret-harbor-22383.herokuapp.com/December%2015,%202015
returns
{"unix":1450137600,"natural":"December 15, 2015"}

https://secret-harbor-22383.herokuapp.com/1450137600
returns
{"unix":1450137600,"natural":"December 15, 2015"}

https://secret-harbor-22383.herokuapp.com/Maruaryr%2014,%202015
returns
{"unix":null,"natural":null}
