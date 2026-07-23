# 🚀 Manual de Uso Completo: AssetMatrix Intelligence API

Este documento es tu guía definitiva para entender, levantar y probar al 100% la API REST de AssetMatrix Intelligence. Como es un proyecto Backend, toda la interacción se hace a través de peticiones HTTP utilizando **Swagger**.

---

## 1. 🛠️ Levantando el Servidor

Para que el proyecto funcione en tu computadora local, sigue estos pasos en tu terminal:

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```
3. **Verificación:** Si todo sale bien, verás en la consola:
   - `Conexión a la Base de Datos (MongoDB) establecida correctamente.`
   - `Servidor ejecutándose en: http://localhost:3000`

---

## 2. 🌐 Accediendo a la Interfaz (Swagger)

Abre tu navegador y ve a: **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**
Desde esta pantalla podrás probar todas las APIs.

---

## 3. 🔐 Paso 1: Autenticación (El paso más importante)

La mayoría de las rutas están protegidas. Necesitas estar "logueado" (tener un Token JWT).

1. En Swagger, busca la sección **Auth**.
2. Despliega `POST /api/auth/register` y dale a **"Try it out"**.
3. En el Body pon tus datos:
   ```json
   {
     "name": "Profesor",
     "email": "profesor@universidad.com",
     "password": "password123"
   }
   ```
4. Presiona **"Execute"**. Copia el código larguísimo llamado `token` (sin las comillas).
5. Sube al inicio de Swagger, dale al botón verde **"Authorize"**, pega tu token y dale a **"Authorize"**.

¡Listo! Ya tienes permiso para usar todas las demás rutas.

---

## 4. 🧪 Probando Todos los Módulos (Paso a Paso)

### 👤 Módulo de Usuarios (`/api/users`)
*Prueba que el CRUD de usuarios funciona.*
- **Ver Usuarios (`GET /api/users`):** Dale Execute para ver la lista de todos los registrados.
- **Crear Usuario Manual (`POST /api/users`):** Crea un usuario sin registrarlo a través del auth.
- **Actualizar Usuario (`PUT /api/users/{id}`):** Copia un ID del GET anterior, ponlo en la ruta y mándale un nuevo nombre en el Body para cambiarlo.
- **Borrar Usuario (`DELETE /api/users/{id}`):** Pon el ID y dale a Execute para eliminarlo.

### 🪙 Módulo de Crypto (Integrado con CoinGecko)
*Demuestra la conexión externa y la inteligencia de la API.*
- **Precio en Vivo (`GET /api/crypto/{coin}`):** Pon `bitcoin` en el parámetro y mira cómo trae el precio real de CoinGecko.
- **Comprar Crypto (`POST /api/crypto/portfolio`):** Pon `{"coin": "bitcoin", "name": "Ahorro BTC"}`. La API buscará el precio por sí sola y lo guardará en MongoDB a tu nombre.
- **Ver tu Balance (`GET /api/crypto/analytics`):** Dale Execute. Sumará el precio de todas tus cryptos y te dará tu balance total invertido.

### 🏢 Módulo de Stocks (Integrado con Alpha Vantage)
*Demuestra el manejo del mercado bursátil.*
- **Cotización Real (`GET /api/stocks/{symbol}`):** Pon `AAPL` (Apple) para ver su precio en bolsa.
- **Historial (`GET /api/stocks/{symbol}/history`):** Pon `MSFT` (Microsoft) para ver cómo se comportó en los días anteriores.
- **Lista de Seguimiento (`POST /api/stocks/watch`):** Pon `{"symbol": "TSLA"}`. La API guardará la acción de Tesla en tu base de datos con su precio actual.

### 📦 Módulo de Activos Genéricos (`/api/assets`)
*Para cosas manuales como dinero fiat o commodities.*
- **Crear Manualmente (`POST /api/assets`):** Pon `{"name": "Oro", "symbol": "XAU", "type": "commodity", "price": 1900}` y se guardará en tu bóveda.
- **Ver Todo (`GET /api/assets`):** Te mostrará todos los activos que has guardado, revueltos (crypto, stocks y genéricos).

---

## 💡 Tips para tu Presentación Universitaria

Si el profesor te pide que demuestres el proyecto, haz exactamente este recorrido:

1. *"Profesor, primero voy a autenticarme para obtener mi Token JWT, ya que la API está protegida por seguridad."* (Haces el Auth).
2. *"Como ve, construí un CRUD completo de Usuarios para gestionar el sistema."* (Le muestras el GET de usuarios).
3. *"Ahora viene la inteligencia financiera. Usando una **Capa de Servicios**, me conecté a la API de CoinGecko para traer el precio en vivo."* (Haces el GET de Crypto).
4. *"Si decido guardar este activo en mi portafolio, la API automáticamente consulta el precio antes de insertar el documento en MongoDB."* (Haces el POST de Crypto).
5. *"Y finalmente, si consulto mis Analíticas, la API suma mis inversiones y me da un balance total."* (Haces el GET de Crypto Analytics).
