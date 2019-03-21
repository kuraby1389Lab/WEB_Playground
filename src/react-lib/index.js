import React, {Component} from 'react';
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCkGWUgO_YMrEwBjRiKgk45wqhT6XUgfo4");
// Enable or disable logs. Its optional.

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);

// Get latidude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    error => {
        console.error(error);
    }
);
