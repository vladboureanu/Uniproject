// Initialise the map object
let map = L.map('map',
                {
                    center: [51.505, -0.09],
                    zoom: 13
                });
                
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// Render markers and their popups from the database
fetch('/locations') // Use the correct endpoint for fetching locations
.then(response => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
})
.then(locations => {
    console.log('Fetched locations:', locations);
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]);
        marker.addTo(map);
        marker.bindPopup(`<b>${location.name}</b><br>${location.desc}`);
    });
})
.catch(err => {
    console.log('Error fetching location data: ', err);
});


map.on('click', (e) => {
    let popup = L.popup()
                 .setLatLng(e.latlng)
                 .setContent(`
                    <form id="popup-form">
                        <label for="loc-name">Name: </label>
                        <input type="text" name="loc-name" id="loc-name" required />
                        <label for="loc-desc">Description: </label>
                        <input type="text" name="loc-desc" id="loc-desc" />
                        <button type="submit" id="loc-submit">Submit</button>
                    </form>
                 `)
                 .openOn(map);

    // Create an event listener to handle the popup form submission
    document.getElementById('popup-form').addEventListener('submit', async (e) => {
        const locName = document.getElementById('loc-name').value;
        const locDesc = document.getElementById('loc-desc').value;
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>${locName}</b><br>${locDesc}`).openPopup();

        // Close the popup form window after the submission
        map.closePopup(popup);

        // AJAX --> fetch --> contact the '/' endpoint in order to POST the client data and 
        // store them in the database
        try{
            const response = await fetch("/", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify({lat, lng, locName, locDesc})
                        })
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Error saving location to the database');
            }
        } catch(err) {
            console.error(err);
        }
        

        // Close the popup form window after the submission
        map.closePopup(popup);
    });
});


