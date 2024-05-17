# buda-test
Tarea 1 para postular a buda

# Para Correr (Distintas Opciones)
1. make run-docker (entorno dockerizado)
2. npm start
3. npm run dev (nodemon)

# Testing
1. npm test 

## 1. Necesitamos calcular el spread (explicado más abajo) de cualquiera de los mercados de Buda.com.

La ruta get 'api/spread/:market_id' entrega el spread del mercado con id 'market_id'

## 2. Necesitamos obtener el spread de todos los mercados en una sola llamada.

La ruta get de 'api/spreads' entrega los spread de todos los mercados 

## 3. Necesitamos guardar un spread de “alerta” el cual en el futuro consultaremos por medio de polling si el spread actual es mayor o menor de ese spread guardado. Además, debes habilitar un endpoint para que realicemos este polling.

### a. La ruta post de '/api/spread/alert/:market_id' se utiliza para generar una alerta
### b. la ruta get de '/api/spread/alert/:market_id' se utiliza para hacer el polling y revisar la alerta. 
