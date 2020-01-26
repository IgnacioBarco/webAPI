# webAPI

--------------------------------------------------------------------------------------
#Practica devops: direccion http://ec2-18-222-10-183.us-east-2.compute.amazonaws.com/ 
--------------------------------------------------------------------------------------


# webAPI

## Web:
* http://localhost:3000     Lista los anuncios
    podemos filtrar por parámetros y nos muestra los resultados
        ejemplo: http://localhost:3000/?start=1&limit=3&sort=name&tag=mobile

* http://localhost:3000/id  Nos lleva al detalle del anuncio
    ejemplo: http://localhost:3000/5e2a2049a402ef0b243b3a30


## API Methods
http://localhost:3000/apiv1/anuncios        Nos devuelve un json con todos los anuncios
    Se le pueden añadir filtros por parámetros

http://localhost:3000/apiv1/anuncios/tags   Nos devuelve un json con todos los tags

http://localhost:3000/apiv1/anuncios/nuevo  Añade un anuncio nuevo


## Filtros:
* tag: filtra por tag

* venta: tipo de anuncio (se vende o se compra)

* precio: rango de precios:
    -50     menos de 50
    50-     mas de 50 
    50-100  entre 50 y 100
    50      precio esacto

* nombre: nombre del articulo

* sort: ordena segun el parámetro que le pasemos

* paginación:
    start: empieza a listar desde esa posición
    limit: muestra ese número de anuncios

* ejemplo: http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-&start=0&limit=2&sort=precio


## Instalación y ejecución:
### Para ejecutar la app
```
npm run start
```

### Para ejecutar la app en modo desarrollador
```
npm run dev
```

### Para inicializar la base de datos
```
npm run installDB
```






