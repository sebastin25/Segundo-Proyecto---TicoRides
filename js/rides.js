var RIDES = {
    property: 10,

    initialize: function () {
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();


    },

    initializeEvents: function () {
        //boton registro
        if (document.getElementById('register')) {
            document.getElementById('register').addEventListener('click', function () {

                // validar si existe un error en el formulario
                if (document.getElementsByClassName('invalid').length) {

                    alert('Por favor revise los errores en el formulario antes de continuar.');
                } else {

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
                        Materialize.toast('Successful registration', 5000, 'rounded', function () {
                            location.href = "index.html";
                        });

                    } else {
                        alert('User already exist!');
                    }
                }


            });
        };

        //BuscarRides
        if (document.getElementById('buscar')) {
            document.getElementById('buscar').addEventListener('click', function () {
                // obtener la información del form
                var place = {
                    start: document.getElementById('autocomplete').value,
                    end: document.getElementById('autocomplete2').value
                };
                RIDES.loadRides(place);
            });
        };

        if (document.getElementById('login')) {
            document.getElementById('login').addEventListener('click', function () {
                // obtener la información del form
                RIDES.Login();
            });
        };

        if (document.getElementById('logout')) {
            document.getElementById('logout').addEventListener('click', function () {
                // obtener la información del form
                RIDES.logout();
            });
        };

    },

    //falta arreglar modal
    loadRides: function (place) {
        if (document.getElementById('myTableData')) {
            RIDES.clearTable();
            var rides = [];

            if (localStorage.getItem('rides')) {
                rides = JSON.parse(localStorage.getItem('rides'));
            }

            rides.forEach(function (ride, index, rides) {
                var table = document.getElementById("myTableData");

                if (place.start === "" || place.end === "") {
                    var row = "<tr><td>" + ride.userName + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" + '<button data-target="modal1" class="btn modal-trigger">View</button>' + "</td></tr>";
                } else if (ride.start === place.start && ride.end === place.end) {
                    var row = "<tr><td>" + ride.userName + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" + '<button data-target="modal1" class="btn modal-trigger">View</button>' + "</td></tr>";
                }
                
                
                
                table.innerHTML = table.innerHTML + row;
                $(document).ready(function () {
                    $('.modal-trigger').leanModal();
                });

            });

        }


    },

    Login: function () {
        if (document.getElementById('username') && document.getElementById('password')) {
            var users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'));
            }

            users.forEach(function (user, index, users) {
                if (user.userName == document.getElementById('username').value && user.password == document.getElementById('password').value) {
                    localStorage.setItem('islogin', JSON.stringify(user.userName));
                    location.href = "dashboard.html"
                }
            });
        }
    },

    logout: function () {
        if (localStorage.getItem('islogin')) {
            localStorage.setItem('islogin', JSON.stringify(""));
        }
        location.href = "index.html";
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
    },

    clearTable: function () {
        if (document.getElementById('myTableData')) {
            document.getElementById("myTableData").innerHTML = "";
        };

    }


};

RIDES.initialize();
RIDES.initializeEvents();