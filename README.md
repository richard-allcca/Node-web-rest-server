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

## RestServer + PostgresSQL

Verificar las variables de entorno
Levantar la base de datos con 'docker compose up -d'

### Prisma

[Prisma documentación](https://www.prisma.io/docs/getting-started/quickstart-sqlite)

```bash
  npm install prisma --save-dev
  npx prisma init --datasource-provider postgresql
  npx prisma migrate dev --name init
```

### Base de datos en la nube

- Para desplegar o crear las tablas de este proyecto en una db en la nube.
- Debes haber creado y obtenido la url de conexión y agregar o reemplazar la del .env 'POSTGRES_URL'
- luego debes crear un script en el package.json para la migración

```json
  "prisma:migrate:prod": "prisma migrate deploy"
```
