var RIDES = {
    property: 10,

    initialize: function () {
        RIDES.loadRides();
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
    },

    initializeEvents: function () {
        //boton registro
        if (document.getElementById('register')) {
            document.getElementById('register').addEventListener('click', function () {
                // obtener la información del form
                var user = {
                    userName: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    firstName: document.getElementById('first_name').value,
                    lastName: document.getElementById('last_name').value,
                    phone: document.getElementById('phone').value,
                    speed: "60",
                    aboutme: ""
                };
                if (!(RIDES.addUser(user))) {
                    alert('Successful registration');
                    location.href = "index.html";
                    /*
                     Materialize.toast('Successful registration', 5000, 'rounded', function () {
                         location.href = "index.html";
                     });
                     */
                } else {
                    alert('User already exist!');
                }


            });
        }

    },
    //falta
    loadRides: function () {
        if (document.getElementById('myTableData')) {
            //leer de localStorage los rides
            var rides = [];

            if (localStorage.getItem('rides')) {
                rides = JSON.parse(localStorage.getItem('rides'));
            }
            //agregar cada ride al DOM
            rides.forEach(function (ride, index, rides) {
                // crear una HTML fila
                var row = "<tr><td>" + ride.name + "</td><td>" + ride.userName + "</td></tr>";

                // agregar a la tabla
                var table = document.getElementById("myTableData");
                table.innerHTML = table.innerHTML + row;
            });

        }


    },


    Login: function () {
        if (document.getElementById('username') && document.getElementById('password')) {
            var users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('rides'));
            }

            users.forEach(function (user, index, users) {
                if (user.userName == document.getElementById('username').value) {
                    localStorage.setItem('islogin', JSON.stringify(user.userName));
                }
            });
        }
    },

    //falta arreglar detalles menores
    addUser: function (user) {
        // agregarlo a localStorage
        var users = [],
            same = false;
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.forEach(function (user, index, users) {
            if (user.userName == document.getElementById('username').value) {
                same = true;
            }
        });
        if (same == false) {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }
        return same;
    },
    //falta
    addRide: function (ride) {
        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        rides.push(ride);
        localStorage.setItem('rides', JSON.stringify(rides));
    }
};

RIDES.initialize();
RIDES.initializeEvents();