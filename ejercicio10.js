//Primero requerimos los modulos 'http' 'url' y 'fs'
const http = require('http');
const url = require('url');
const fs = require('fs');

//Definimos un objeto literal asociado a las extensiones de archivos y su valor MIME
const mime = {
    'html' : 'text/html',
    'css' : 'text/css',
    'jpg' : 'image/jpg',
    'ico' : 'image/x-ico',
    'mp3' : 'audio/mpeg3',
    'mp4' : 'video/mp4'
}

//Creamos un servidor de peticiones HTTP
const servidor = http.createServer((pedido, respuesta) => {

    //En la funcion anonima llamamos al metodo parse de 'url' y le pasamos como parametro la url de 'pedido'
    const objetourl = url.parse(pedido.url);

    //Inicializamos una variablle con el nombre de la carpeta que contiene los archivos 'static' + camino i nombre del archivo HTML solicitado
    let camino = 'static' + objetourl.pathname;
    //ej: static/index.html

    //Comprobamos si en la url no viene ninguna pagina, en tal caso retornamos la pagina principal
    if(camino == 'static/') camino = 'static/index.html';

    //Mediante el modulo fs comprobamos que el archivo HTML existe, usando el metodo .stat, tiene como primer parametro el nombre(con la ruta completa) del archivo y de segundo parametro una funcion anonima.
    fs.stat(camino, error => {

        //Si no hay error(existe HTML)
        if (!error) {

            //Lllamamos a readFile para leer el contenido. Tiene dos parametros( nombre del archivo(con ruta) ,funcion anonima con dos parametros (error, contenido del archivo) )
            fs.readFile(camino, (error,contenido) => {

            //Verificamos si hubo error al traer los archivos a memoria el contenido del archivo
            if (error) { //Devolvemos el codigo 500(el archivo existe ero no se puede leer)
                respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                respuesta.write('Error interno');
                respuesta.end();
            } else {//Devolvemos mediante el objeto 'respuesta' el contenido completo del archivo
                
                //Descomponemos en un vector separando por el punto laconstante camino:
                const vec = camino.split('.');

                
            }    
            });
            
        } else { // Si no existe el archivo, saltara un error 404 de recurso inexistente
            respuesta.writeHead(404, {'Content-Type': 'text/html'});
            respuesta.write('<!doctype html><html><head></head><body>Recursos Inexistentes</body></html> ');
            respuesta.end();
        }
    });
});