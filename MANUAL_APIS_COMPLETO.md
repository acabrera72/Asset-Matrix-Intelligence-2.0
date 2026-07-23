# 📚 Manual Completo de Endpoints (Las APIs de AssetMatrix)

Este manual detalla paso a paso cómo usar **cada una de las rutas (APIs)** del proyecto a través de Swagger. 

Antes de empezar con las rutas protegidas, recuerda que **siempre debes hacer Login primero, copiar el Token y ponerlo en el botón "Authorize" de Swagger**.

---

## 🔐 1. Módulo de Autenticación (`/api/auth`)
Estas rutas **no necesitan token**, son tu puerta de entrada.

### 1.1 Registrar un Usuario (`POST /api/auth/register`)
- **Para qué sirve:** Crea una cuenta nueva en la base de datos.
- **Cómo usarlo en Swagger:** 
  - Busca `POST /api/auth/register`.
  - Dale a "Try it out".
  - En el cuerpo (Body) envía: `{"name": "Juan", "email": "juan@test.com", "password": "123456"}`
  - Presiona "Execute". Te devolverá tu Token de acceso.

### 1.2 Iniciar Sesión (`POST /api/auth/login`)
- **Para qué sirve:** Entrar a una cuenta existente y obtener el Token.
- **Cómo usarlo en Swagger:** 
  - Pon el email y password con el que te registraste.
  - Copia el `token` de la respuesta, sube al candado verde de "Authorize" y pégalo.

### 1.3 Ver mi Perfil (`GET /api/auth/me`)
- **Para qué sirve:** Te devuelve los datos del usuario dueño del Token actual.
- **Cómo usarlo:** Solo dale a "Execute". (Recuerda que debes estar autorizado).

---

## 👤 2. Módulo de Usuarios (`/api/users`)
*Nota: Este módulo no requiere token por defecto en este proyecto.*

### 2.1 Ver todos los usuarios (`GET /api/users`)
- **Para qué sirve:** Lista todos los usuarios registrados en el sistema.
- **Cómo usarlo:** Dale "Try it out" y "Execute".

### 2.2 Buscar un usuario (`GET /api/users/{id}`)
- **Para qué sirve:** Obtiene la información de un usuario específico.
- **Cómo usarlo:** Copia el `_id` de un usuario (de la lista anterior) y pégalo en el parámetro `id`.

### 2.3 Actualizar usuario (`PUT /api/users/{id}`)
- **Para qué sirve:** Cambiar el nombre o email de un usuario.
- **Cómo usarlo:** Pon el `id` en la ruta, y en el Body envía los datos a cambiar, ej: `{"name": "Juan Actualizado"}`.

### 2.4 Eliminar usuario (`DELETE /api/users/{id}`)
- **Para qué sirve:** Borra un usuario del sistema.
- **Cómo usarlo:** Pon el `id` y presiona "Execute".

### 2.5 Crear usuario de forma manual (`POST /api/users`)
- **Para qué sirve:** Es una alternativa al registro normal para crear un usuario directamente en la base de datos (generalmente útil para pruebas o si un administrador quiere crear cuentas).
- **Cómo usarlo:** En el Body envía los datos: `{"name": "Prueba", "email": "prueba@test.com", "password": "123"}`.

---

## 📦 3. Módulo Genérico de Activos (`/api/assets`)
*Rutas protegidas con Token.*

### 3.1 Ver mis activos (`GET /api/assets`)
- **Para qué sirve:** Muestra todo lo que tienes guardado (tanto stocks como cryptos genéricos).

### 3.2 Crear activo manual (`POST /api/assets`)
- **Para qué sirve:** Guardar un activo de forma manual (fiat, commodity) sin usar las APIs externas.
- **Cómo usarlo:** En el Body pon algo como `{"name": "Oro", "symbol": "XAU", "type": "commodity", "price": 1900}`.

### 3.3 Eliminar activo (`DELETE /api/assets/{id}`)
- **Para qué sirve:** Borra un activo usando su `id` (el de MongoDB).

---

## 🏢 4. Módulo de Stocks (Alpha Vantage) (`/api/stocks`)
*Rutas protegidas con Token.*

### 4.1 Cotización en Vivo (`GET /api/stocks/{symbol}`)
- **Para qué sirve:** Se conecta a Alpha Vantage para traer el precio de una acción ahora mismo.
- **Cómo usarlo:** En el parámetro `symbol` escribe `AAPL` (Apple) o `MSFT` (Microsoft). No modifica la BD.

### 4.2 Historial (`GET /api/stocks/{symbol}/history`)
- **Para qué sirve:** Trae la tendencia diaria de esa acción.
- **Cómo usarlo:** Escribe el `symbol` y "Execute".

### 4.3 Guardar en Watchlist (`POST /api/stocks/watch`)
- **Para qué sirve:** Agrega la acción a tu lista de favoritos en la base de datos.
- **Cómo usarlo:** En el Body pon `{"symbol": "TSLA", "name": "Tesla"}`. La API busca el precio sola y lo guarda.

### 4.4 Eliminar alerta (`DELETE /api/stocks/{id}`)
- **Para qué sirve:** Quita la acción de tu watchlist. Usa el `id` que te devuelve la ruta GET.

---

## 🪙 5. Módulo de Crypto (CoinGecko) (`/api/crypto`)
*Rutas protegidas con Token.*

### 5.1 Cotización Crypto (`GET /api/crypto/{coin}`)
- **Para qué sirve:** Va a CoinGecko y trae el Market Cap y fluctuación.
- **Cómo usarlo:** En el parámetro `coin` escribe el nombre completo, ej: `bitcoin` o `ethereum`.

### 5.2 Registrar Transacción (`POST /api/crypto/portfolio`)
- **Para qué sirve:** Registra una compra de crypto en MongoDB al precio actual.
- **Cómo usarlo:** En el Body pon `{"coin": "bitcoin", "name": "Mi primer BTC"}`.

### 5.3 Ver Analíticas Crypto (`GET /api/crypto/analytics`)
- **Para qué sirve:** Suma el precio de todas tus criptos guardadas y te da el balance total.
- **Cómo usarlo:** Solo dale "Execute", él sabe quién eres por tu Token y calcula tu portafolio.

### 5.4 Eliminar Transacción (`DELETE /api/crypto/{tx_id}`)
- **Para qué sirve:** Si te equivocaste al registrar, esto lo borra. Usa el `id` de la transacción.

---

## 📊 6. Analíticas Globales (`/api/analytics`)
*Rutas protegidas con Token.*

### 6.1 Reporte Global (`GET /api/analytics`)
- **Para qué sirve:** Dependiendo de cómo lo hayas programado, esta ruta genera un reporte de estadísticas generales de tus activos.
- **Cómo usarlo:** Dale a "Execute" y observa el JSON resultante.
