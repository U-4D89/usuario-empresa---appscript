let id='1YLycTkhCbd1xhneOfdJq2pj_qz5bowVO4wwuO1IwtGQ';
const spreadSheet = SpreadsheetApp.openById(id);
const initialSheet = spreadSheet.getSheetByName('initial');




function setHeaders() {
  // Para definir los encabezados de la hoja:
    // - Crear un arreglo con los titulos
    // - Obtener las ubicaciones en las que se desean asignar
    // - Comprobar que solo se asignen los encabezados si estan disponibles
    //   las ubicaciones para evitar sobreescribir.
  const headers = ['nombre', 'correo electrónico', 'tipo de documento', 'número documento', 'empresa'];
  const firstRow = initialSheet.getRange(1,1,1, headers.length).getValues();
  const firstCell = firstRow[0][0];
  if (firstCell ==='') {  
    initialSheet.appendRow(headers)
    initialSheet.autoResizeColumns(1, headers.length)
  } 
  
}


function include (fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}


function doGet() {

  // La funcion reservada doGet ayuda a crear la plantilla de html que se quiere 
  // representar en la web app, es necesario evaluar que no haya errores en ella.
  // los tipos de documentos y las empresas para poder cargar esta informacion de manera
  // dinamica en el formulario.
  const typesDocs = ['registro civil','tarjeta de identidad', 'cédula de ciudadanía', 'cédula extranjería'];
  const companies = ['Seguros Bolívar', 'Davivienda', 'Constructora Bolívar'];

  const template =  HtmlService.createTemplateFromFile('index');
  template.tipoDocumentos = typesDocs;
  template.empresas = companies;
  const result = template.evaluate();
  return result;
}


function uploadData(user) {
  initialSheet.appendRow([user.nombre, user.email, user.tipoDocumento, user.numeroDocumento, user.empresa]);
}
