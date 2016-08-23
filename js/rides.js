var RIDES = {
    property: 10,
    initialize: function () {
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
        if (document.getElementById('myTableData1')) {
            RIDES.loadUserRides();
        }
        RIDES.loadUserInfo();
    },
    initializeEvents: function () {
        if (document.getElementById('register')) {
            document.getElementById('register').addEventListener('click', function () {

                // validar si existe un error en el formulario
                if (document.getElementsByClassName('invalid').length) {
                    Materialize.toast('Please review the errors on the form before proceeding', 5000, 'rounded');
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


                    if (user.userName !== "" && user.firstName.length > 1 && user.lastName.length > 1 && user.password.length > 7) {

                        if (RIDES.addUser(user) === 0) {
                            Materialize.toast('Successful registration', 5000, 'rounded', function () {
                                location.href = "index.html";
                            });
                        } else {
                            Materialize.toast('User Already Exist!', 5000, 'rounded');
                        }
                    }

                }


            });
        }
        if (document.getElementById('addRide')) {
            document.getElementById('addRide').addEventListener('click', function () {
                if (document.getElementsByClassName('invalid').length) {
                    Materialize.toast('Please review the errors on the form before proceeding', 5000, 'rounded');
                } else {

                    var dayscheck = [];

                    for (i = 0; i < 7; i++) {
                        var array = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
                        if (document.getElementById(array[i]).checked) {
                            dayscheck.push(document.getElementById(i).innerHTML);
                            console.log(document.getElementById(i).innerHTML);
                        }
                    };

                    var ride = {
                        userName: RIDES.loadUserInfo(),
                        name: document.getElementById('ride_name').value,
                        start: document.getElementById('autocomplete').value,
                        end: document.getElementById('autocomplete2').value,
                        description: document.getElementById('textarea1').value,
                        departure: document.getElementById('departure').value,
                        arrival: document.getElementById('arrival').value,
                        days: dayscheck
                    };

                    RIDES.addRide(ride);
                    location.href = "dashboard.html";
                }
            });
        }

        if (document.getElementById('editUser')) {
            document.getElementById('editUser').addEventListener('click', function () {

                // validar si existe un error en el formulario
                if (document.getElementsByClassName('invalid').length) {
                    Materialize.toast('Please review the errors on the form before proceeding', 5000, 'rounded');
                } else {

                    // obtener la información del form
                    var userInfo = {
                        speed: document.getElementById('speed').value,
                        aboutme: document.getElementById('aboutme').value
                    };

                    if (userInfo.speed > 0) {

                        RIDES.editUser(userInfo);

                        Materialize.toast('Successful registration', 5000, 'rounded', function () {
                            location.href = "dashboard.html";
                        });
                    }
                }
            })
        }
        if (document.getElementById('buscar')) {
            document.getElementById('buscar').addEventListener('click', function () {
                // obtener la información del form
                var place = {
                    start: document.getElementById('autocomplete').value,
                    end: document.getElementById('autocomplete2').value
                };
                RIDES.loadRides(place);
            });
        }
        if (document.getElementById('login')) {
            document.getElementById('login').addEventListener('click', function () {
                // obtener la información del form
                RIDES.Login();
            });
        }
        if (document.getElementById('logout')) {
            document.getElementById('logout').addEventListener('click', function () {
                RIDES.logout();
            });
            document.getElementById('logout1').addEventListener('click', function () {
                RIDES.logout();
            });
        }
    },
    //terminado
    loadRides: function (place) {
        if (document.getElementById('myTableData')) {
            RIDES.clearTable();
            var rides = [];

            if (localStorage.getItem('rides')) {
                rides = JSON.parse(localStorage.getItem('rides'));
            }


            rides.forEach(function (ride, index, rides) {
                var table = document.getElementById("myTableData");
                if ((place.start === "" || place.end === "") || (ride.start === place.start && ride.end === place.end)) {
                    var row = "<tr><td>" + ride.userName + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" + '<button data-target="modal' + index + '" class="btn modal-trigger">View</button>' + "</td></tr>";
                }
                table.innerHTML = table.innerHTML + row;
                $(document).ready(function () {
                    $('.modal-trigger').leanModal();
                });

                RIDES.addModals(index, ride);
            });

        }


    },
    //falta editar y eliminar
    loadUserRides: function () {
        if (localStorage.getItem('islogin')) {
            if (document.getElementById('myTableData1')) {
                var rides = [];
                RIDES.clearTable();
                if (localStorage.getItem('rides')) {
                    rides = JSON.parse(localStorage.getItem('rides'));
                }
                var table = document.getElementById("myTableData1");
                var user = JSON.parse(localStorage.getItem('islogin'));
                rides.forEach(function (ride, index, rides) {
                    if (ride.userName === user.userName) {
                        var row = "<tr><td>" + ride.name + "</td><td>" + ride.start + "</td><td>" + ride.end + "</td><td>" +
                            '<a href="rides_edit.html" id="delete' + index + '">Edit</a>' + "-" + '<a href="" id="delete' + index + '">Delete</a>' + "</td></tr>";
                        table.innerHTML = table.innerHTML + row;
                    }
                });
            }
        }
    },
    //Terminado
    Login: function () {
        if (document.getElementById('username') && document.getElementById('password')) {
            var users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'));

                users.forEach(function (user, index, users) {
                    if (user.userName === document.getElementById('username').value && user.password === document.getElementById('password').value) {
                        localStorage.setItem('islogin', JSON.stringify(user));
                        location.href = "dashboard.html";
                    }
                });
            }
        }
    },
    //Terminado
    logout: function () {
        if (localStorage.getItem('islogin')) {
            localStorage.removeItem('islogin');
            location.href = "index.html";
        }
    },
    //Terminado
    addUser: function (user) {
        // agregarlo a localStorage
        var users = [],
            cant = 0;
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }


        users.forEach(function (user1, index, users) {
            if (user1.userName === user.userName) {
                cant++;
            }
        });

        if (cant === 0) {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }

        return cant;
    },
    //terminado
    editUser: function (userInfo) {
        var users = [],
            usersBackup = [],
            logon = [];

        if (localStorage.getItem('users')) {
            usersBackup = JSON.parse(localStorage.getItem('users'));
        }
        if (localStorage.getItem('islogin')) {
            logon = JSON.parse(localStorage.getItem('islogin'));
        }
        usersBackup.forEach(function (user, index, usersBackup) {
            if (user.userName === logon.userName) {
                user.speed = userInfo.speed;
                user.aboutme = userInfo.aboutme;
                logon = user;
            }
            users.push(user);
        });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('islogin', JSON.stringify(logon));
        location.href = "dashboard.html";
    },
    //terminado
    loadUserInfo: function () {
        if (localStorage.getItem('islogin')) {
            var user = [];
            user = JSON.parse(localStorage.getItem('islogin'));
            if (document.getElementById('settings')) {
                document.getElementById('full_name').value = user.firstName + " " + user.lastName;
                document.getElementById('speed').value = user.speed;
                document.getElementById('aboutme').value = user.aboutme;
            }

            if (document.getElementById('userName')) {
                var username = document.getElementById('userName');
                var usernameside = document.getElementById('userNameSide');
                username.innerHTML = user.userName + username.innerHTML;
                usernameside.innerHTML = usernameside.innerHTML + user.userName;
            }

            return user.userName;
        }
    },
    //Terminado
    addRide: function (ride) {
        var rides = [];
        if (localStorage.getItem('rides')) {
            rides = JSON.parse(localStorage.getItem('rides'));
        }
        rides.push(ride);
        localStorage.setItem('rides', JSON.stringify(rides));
    },
    //falta hacer
    editRide: function (ride) {
        var users = [],
            usersBackup = [];

        if (localStorage.getItem('users')) {
            usersBackup = JSON.parse(localStorage.getItem('users'));
        }
        if (localStorage.getItem('islogin')) {
            logon = JSON.parse(localStorage.getItem('islogin'));
        }
        usersBackup.forEach(function (user, index, usersBackup) {
            if (user.userName === logon.userName) {
                user.speed = userInfo.speed;
                user.aboutme = userInfo.aboutme;
                logon = user;
            }
            users.push(user);
        });
        localStorage.setItem('users', JSON.stringify(users));

        location.href = "dashboard.html";
    },
    //crea modals dinamicos en el DOM de index.html, terminado
    addModals: function (num, ride) {

        var ni = document.getElementById('myDiv');

        var newdiv = document.createElement('div');

        var divIdName = 'modal' + num;

        var days = ride.days;

        newdiv.setAttribute('id', divIdName);
        newdiv.setAttribute('class', 'modal');

        var daysHtml = '';
        days.forEach(function (day, index, days) {
            daysHtml += '<li>' + day + '</li>';
        });

        newdiv.innerHTML = '<div class="modal-content"><ul><li>Start from: <span>' + ride.start + '</span></li><li>End: <span>' + ride.end + '</span></li><li>Description: <span>' + ride.description + '</span></li><br><li>Departure: <span>' + ride.departure + '</span></li><li>Estimated Arrival: <span>' + ride.arrival + '</span></li><br><br><ul>Days' + daysHtml + '</ul></ul></div><div class="modal-footer"><a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a></div>';

        ni.appendChild(newdiv);
    },
    //terminado
    clearTable: function (table) {
        if (document.getElementById('myTableData')) {
            document.getElementById("myTableData").innerHTML = "";
        }
        if (document.getElementById('myTableData1')) {
            document.getElementById("myTableData1").innerHTML = "";
        }

    }
};
RIDES.initialize();
RIDES.initializeEvents();