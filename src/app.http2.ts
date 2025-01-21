// Importar los módulos necesarios
import fs from 'fs';
import http2 from 'http2';

// Crear un servidor HTTP/2 seguro
const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'), // Leer la clave privada del servidor
  cert: fs.readFileSync('./keys/server.crt') // Leer el certificado del servidor
}, (req, res) => {

  // Imprimir la URL de la solicitud en la consola
  console.log(req.url)

  // Manejar la solicitud según la URL
  if (req.url === '/'){
    // Leer y enviar el archivo HTML principal
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(htmlFile)
  } else if (req.url === '/style.css'){
    // Leer y enviar el archivo CSS
    const cssFile = fs.readFileSync('./public/style.css', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/css'})
    res.end(cssFile)
  } else if (req.url === '/script.js'){
    // Leer y enviar el archivo JavaScript
    const jsFile = fs.readFileSync('./public/script.js', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/javascript'})
    res.end(jsFile)
  } else {
    // Leer y enviar el archivo HTML de error 404
    const htmlFile404 = fs.readFileSync('./public/404.html', 'utf-8')
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end(htmlFile404)
  }

})

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
  console.log('server is running on port 8080');
})