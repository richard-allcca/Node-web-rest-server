import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
},(req, res) => {

  console.log(req.url)

  if (req.url === '/'){
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(htmlFile)
  } else if (req.url === '/style.css'){
    const cssFile = fs.readFileSync('./public/style.css', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/css'})
    res.end(cssFile)
  } else if (req.url === '/script.js'){
    const jsFile = fs.readFileSync('./public/script.js', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/javascript'})
    res.end(jsFile)
  } else {
    const htmlFile404 = fs.readFileSync('./public/404.html', 'utf-8')
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end(htmlFile404)
  }

})

server.listen(8080, () => {
  console.log('server is running on port 8080');
})