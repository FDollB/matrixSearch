var secuencias = [	"AGVNFT", 
					"XJILSB", 
					"CHAOHD", 
					"ERCVTQ", 
					"ASOYAO", 
					"ERMYUA", 
					"TELEFE" ];

var matrix = setMatrix();
printMatrix(matrix);

function clickSearch(){
	var palabra = $("select")[0].value;
	url = "http://localhost:3000/search/" + palabra;
    $.get(url, function (data) {
		printResult(data);
    });
}

function seeLogs(){
	url = "http://localhost:3000/logs";
    $.get(url, function (data) {
		$(".logs")[0].innerText = JSON.stringify(data, null, 4);
    });
}

function setMatrix(){
	var matrix = [];
	for(var i=0; i<7; i++) {
	    matrix[i] = new Array(secuencias[i].split(""));
	}

	return matrix;
}

function printMatrix(matrix){
	for(var i=0; i<7; i++){
		for (var j=0; j<6; j++){
			$(".matrix")[0].innerText += " | " + matrix[i][0][j] + " | ";
		}
		
		$(".matrix")[0].innerText += "\n";
	}
}

function printResult(result){
	$(".resultado")[0].innerText = result;
}