let availableSpaces = 100;
let reservationHistory =[];

let userProfile = {
    userName: '',
    vehicleNumber: '',
    userEmail: '',
    userPhoneNumber: '',
    vehicleType:'',
    
};
function reserveSpace() {
    
    userProfile.userName = prompt('Enter your name:');
    userProfile.vehicleNumber = prompt('Enter your vehicle number:');
    userProfile.userEmail = prompt('Enter your email:');
    userProfile.userPhoneNumber = prompt('Enter your phone number:');
    userProfile.vehicleType = askVehicleType();

    if (userProfile.userName && userProfile.vehicleNumber && userProfile.userEmail &&
        userProfile.userPhoneNumber && userProfile.vehicleType) {
        availableSpaces--;
        updateAvailableSpaces();
        const allocatedSpace=Math.floor(Math.random()*100)+1;
     

    
        const timestamp = new Date().toLocaleString();
        const reservationInfo = `Reserved by ${userProfile.userName} ,Allocated space:${allocatedSpace},(${userProfile.vehicleNumber}), Email: ${userProfile.userEmail}, Phone Number: ${userProfile.userPhoneNumber}, Vehicle Type: ${userProfile.vehicleType} on ${timestamp}`;
        reservationHistory.push(reservationInfo);

        alert('Parking space reserved! Please navigate to the reserved space.');
    } else {
        alert('Please provide all required information.');
    }
}



function askVehicleType() {
    const vehicleType = prompt('Choose your vehicle type:\n1. 2-wheeler\n2. 4-wheeler');
    if (vehicleType === '1' || vehicleType.toLowerCase() === '2-wheeler') {
        return '2-wheeler';
    } else if (vehicleType === '2' || vehicleType.toLowerCase() === '4-wheeler') {
        return '4-wheeler';
    } else {
        alert('Invalid selection. Please choose either 1 or 2.');
        return askVehicleType(); 
    }
}

function updateAvailableSpaces() {
    document.getElementById('availableSpaces').innerText = availableSpaces;
}

function navigateToReservedSpace() {
   
    const predefinedDestination = 'mgroad';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLocation = `${position.coords.latitude},${position.coords.longitude}`;

                
                const mapsURL = `https://www.google.com/maps/dir/${userLocation}/${predefinedDestination}/`;

               
                window.open(mapsURL, '_blank');
            },
            function (error) {
                console.error('Error getting user location:', error.message);
                alert('Error getting user location. Please try again or manually enter your location.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please manually enter your location.');
    }
}


function updateProfileInfo() {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <p>Name: ${userProfile.userName}</p>
        <p>Vehicle Number: ${userProfile.vehicleNumber}</p>
        <p>Email: ${userProfile.userEmail}</p>
        <p>Phone Number: ${userProfile.userPhoneNumber}</p>
        <p>Vehicle Type: ${userProfile.vehicleType}</p>
    `;
}


function showProfile() {
    const profileSection = document.getElementById('profile');

    
    if (userProfile.userName && userProfile.vehicleNumber && userProfile.userEmail &&
        userProfile.userPhoneNumber && userProfile.vehicleType) {
        updateProfileInfo();
        profileSection.style.display = 'block';
    } else {
        alert('No profile information available. Please reserve a parking space first.');
    }
}

function showReservationHistory() {
    const historySection = document.getElementById('reservationHistory');
    const historyList = document.getElementById('historyList');

    historyList.innerHTML = '';

   
    if (reservationHistory.length > 0) {
        reservationHistory.forEach((entry) => {
            const listItem = document.createElement('li');
            listItem.textContent = entry;
            historyList.appendChild(listItem);
        });

        historySection.style.display = 'block';
    } else {
        alert('No reservation history available.');
    }
}

function saveToHistoryMenu() {
    const historyListMenu = document.getElementById('historyListMenu');

    historyListMenu.innerHTML = '';

    if (reservationHistory.length > 0) {
        reservationHistory.forEach((entry) => {
            const listItem = document.createElement('li');
            
            listItem.textContent = `
                Allocated Space: ${entry.allocatedSpace},
                Reserved by ${entry.userName} (${entry.vehicleNumber}),
                Email: ${entry.userEmail},
                Phone Number: ${entry.userPhoneNumber},
                Vehicle Type: ${entry.vehicleType},
                Reserved On: ${entry.timestamp}
            `;
            historyListMenu.appendChild(listItem);
        });

        document.getElementById('reservationHistoryMenu').style.display = 'block';
    }
}