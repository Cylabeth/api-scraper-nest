<h1 align="center">API Scraper NestJS
</h1>


  <p align="center">Este proyecto es una API REST construida con NestJS que realiza web scraping a páginas seleccionadas por el usuario y almacena los datos recogidos en una base de datos MongoDB.</p>
    <p align="center">

## Requisitos

Para ejecutar este proyecto necesitarás:

- Node.js
- Nest.js
- Docker
- MongoDB
- Puppeteer (para el web scraping)

## Configuración

1. Clona este repositorio en tu máquina local:

```bash
$ git clone https://github.com/Cylabeth/api-scraper-nest
```

2. Navega a la carpeta del proyecto y instala las dependencias:
```bash
$ cd api-scraper-nest
$ npm install
```
3. Configura tu base de datos MongoDB ejecutando un contenedor de Docker:
```bash
$ export MONGODB_VERSION=5.0.1-ubi8
$ docker run --name tu-contenedor -d -p 27017:27017 -v $(pwd)/data:/data/db -e MONGO_INITDB_ROOT_USERNAME=tu-usuario -e MONGO_INITDB_ROOT_PASSWORD=tu-password mongodb/mongodb-community-server:$MONGODB_VERSION
```
4. Asegúrate de configurar tus variables de entorno en un archivo .env basado en el archivo .env.example proporcionado en este repositorio. Ajusta las variables de usuario y contraseña de la DB según las hayas definido.

5. Inicia la aplicación:
```bash
$ npm run start
```

## Uso

La API consta de tres endpoints:

<strong>/scraper/scrape?url=< URL ></strong> - Realiza el web scraping de la URL especificada y guarda los resultados en la DB.

<strong>/scraper/data</strong> - Lista todas las URLs y sus datos relacionados (previamente almacenados en la DB).

<strong>/scraper/fetch?url=< URL ></strong> - Recupera la información almacenada en la DB de la URL solicitada.


## Ejemplos

Realizar web scraping y almacenar datos:
```bash
$ curl -X GET 'http://localhost:3000/scraper/scrape?url=https://www.example.com'
```

Listar todas las URL's guardadas
```bash
curl -X GET 'http://localhost:3000/scraper/data'
```

Obtener datos de una URL específica
```bash
curl -X GET 'http://localhost:3000/scraper/fetch?url=https://www.example.com
```

