var secuencias = [	"AGVNFT", 
					"XJILSB", 
					"CHAOHD", 
					"ERCVTQ", 
					"ASOYAO", 
					"ERMYUA", 
					"TELEFE" ]

var matrix = setMatrix();
printMatrix(matrix);

function clickSearch(){
	var palabra = $("select")[0].value;
	//var posiciones = getPosiciones(palabra);
	//printResult(data);
	url = "http://localhost:3000/search/" + palabra;
    $.get(url, function (data) {
		printResult(data);
    });
}

function setMatrix(){
	var matrix = [];
	for(var i=0; i<7; i++) {
	    matrix[i] = new Array(secuencias[i].split(""));
	}
	return matrix;
}

function getPosiciones(palabra){
	var primeraLetra = palabra.substring(0,1);
	var segundaLetra = palabra.substring(1,2);
	var restoPalabra = palabra.substring(2);
	var posiciones = "No se encontró la palabra.";
	var direction = 0;

	for(var i=0; i<7; i++){
		for (var j=0; j<6; j++){
			console.log(matrix[i][0][j]);
			if (matrix[i][0][j] == primeraLetra){
				posiciones = "[" + (i+1) + ", " + (j+1) + "]; ";
				var row = i;
				var col = j
				if (row > palabra.length){
					if (segundaLetra == matrix[row-1][0][col-1]){
						direction = 1;
						row = row-1;
						col = col-1;
						posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
					}
					else if (segundaLetra == matrix[row-1][0][col]){
						direction = 2;
						row = row-1;
						col = col;
						posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
					}
					else if (segundaLetra == matrix[row-1][0][col+1]){
						direction = 3;
						row = row-1;
						col = col+1;
						posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
					}
				}
				else if (segundaLetra == matrix[row][0][col-1]){
					direction = 4;
					row = row;
					col = col-1;
					posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
				else if (segundaLetra == matrix[row][0][col+1]){
					direction = 5;
					row = row;
					col = col+1;
					posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
				else if (segundaLetra == matrix[row+1][0][col-1]){
					direction = 6;
					row = row+1;
					col = col-1;
					posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
				else if (segundaLetra == matrix[row+1][0][col]){
					direction = 7;
					row = row+1;
					col = col;
					posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
				else if (segundaLetra == matrix[row+1][0][col+1]){
					direction = 8;
					row = row+1;
					col = col+1;
					posiciones += "[" + (row+1) + ", " + (col+1) + "]; ";
				}

				if (direction != 0){
					var posTxt = buscarEnDireccion(row, col, restoPalabra, direction);
					if (posTxt != ""){
						posiciones += posTxt;
						break;
					}
				}
			}
		}
		if (direction != 0)
			break;
	}

	return posiciones;
}

function buscarEnDireccion(row,col,palabra,direccion){
	var palabraArray = palabra.split("");
	var posicionLetra = 0;
	var posTxt = "";
	while (posicionLetra < palabra.length){
		letra = palabraArray[posicionLetra];
		posicionLetra++;
		switch (direccion){
			case 1:
				if (letra == matrix[row-1][0][col-1]){
					row = row-1;
					col = col-1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 2:
				if (letra == matrix[row-1][0][col]){
					row = row-1;
					col = col;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 3:
				if (letra == matrix[row-1][0][col+1]){
					row = row-1;
					col = col+1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 4:
				if (letra == matrix[row][0][col-1]){
					row = row;
					col = col-1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 5:
				if (letra == matrix[row][0][col+1]){
					row = row;
					col = col+1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 6:
				if (letra == matrix[row+1][0][col-1]){
					row = row+1;
					col = col-1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 7:
				if (letra == matrix[row+1][0][col]){
					row = row+1;
					col = col;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
			case 8:
				if (letra == matrix[row+1][0][col+1]){
					row = row+1;
					col = col+1;
					posTxt += "[" + (row+1) + ", " + (col+1) + "]; ";
				}
			break;
		}
	}
	return posTxt;
}

function printMatrix(matrix){
	for(var i=0; i<7; i++){
		for (var j=0; j<6; j++){
			$(".matrix")[0].innerText += matrix[i][0][j] + " | ";
		}
		$(".matrix")[0].innerText += "\n";
	}
}

function printResult(result){
	$(".resultado")[0].innerText = result;
}