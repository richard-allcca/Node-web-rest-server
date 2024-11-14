# Web and Rest server

Node 20.10.0

## Instalaciones

Instalar Typescript y demás dependencias

```bash
  npm i -D typescript @types/node ts-node-dev rimraf
```

Inicializar el archivo de configuración de TypeSCript (SE puede configurar al gusto)

```bash
  npx tsc --init --outDir dist/ --rootDir src
```

## http2

### Creación de Keys para open ssl

Si no reconoce de primera el comando el la terminal necesitas agregar la ruta de openssl en las variables de entorno
En window busca el openssl que seria algo asi: C:\Program Files\Git\usr\bin

```bash
  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

> NOTA - para correr en local http2 necesitas usar <https://localhost:8080> y si aparece el mensaje de sitio no seguro 'continuar'
