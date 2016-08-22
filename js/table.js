var direcciones = [
    ["Pepito2015", "San Jose, San José, Costa Rica", "Alajuela - La Guacima, Alajuela, Costa Rica"],
    ["Pepito2015", "Alajuela - La Guacima, Alajuela, Costa Rica", "San Jose, San José, Costa Rica"],
    ["Pepito2015", "San Josecito, Heredia Province, Costa Rica", "Calle El Progreso, Heredia, Costa Rica"]
];


function addRow() {
    $("#myTableData tr").remove();
    var table = document.getElementById("myTableData");
    for (var i = 0; i < direcciones.length; i++) {
        for (var j = 0; i < direcciones[i].length; i++) {
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            row.insertCell(0).innerHTML = direcciones[i][0];
            row.insertCell(1).innerHTML = direcciones[i][1];
            row.insertCell(2).innerHTML = direcciones[i][2];
            row.insertCell(3).innerHTML = '<button data-target="modal1" class="btn modal-trigger">View</button>';

            $(document).ready(function () {
                $('.modal-trigger').leanModal();
            });
        }
    }
    
}
