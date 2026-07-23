# 🧠 Manual Técnico y de Arquitectura (AssetMatrix)

Este manual está diseñado para que conozcas la anatomía exacta del proyecto. Si el profesor te pregunta "¿Dónde programaste X cosa?" o "¿Qué hace cada carpeta?", aquí tienes las respuestas exactas y fáciles de defender.

El proyecto sigue una **Arquitectura en Capas (MVC + Service Layer)** para mantener el código ordenado, seguro y escalable.

---

## 🏗️ La Anatomía del Proyecto (¿Qué hace cada carpeta y archivo?)

Si te preguntan de qué se encarga cada componente, usa esta guía:

### Las Carpetas Principales (`src/`)
*   **🚦 `routes` (Rutas):** Es el recepcionista. Su único trabajo es recibir la petición del usuario (ej. un `GET` o un `POST`) y redirigirla a su respectivo controlador. No hace cálculos.
*   **🧠 `controllers` (Controladores):** Es el gerente. Recibe la orden de las rutas, orquesta todo el flujo, delega el trabajo pesado a los servicios y ordena a los modelos guardar en base de datos.
*   **🛠️ `services` (Servicios):** Es el mensajero. Toda la comunicación con el "mundo exterior" (Alpha Vantage y CoinGecko) ocurre aquí. Mantiene el controlador limpio de configuraciones de librerías como `axios`.
*   **🗄️ `models` (Modelos):** Es el arquitecto de la base de datos (usando Mongoose). Define las reglas estrictas de cómo se guardan los datos en MongoDB (ej. obligar a que el usuario tenga email).
*   **🛡️ `middlewares` (Intermediarios):** Son los guardias de seguridad en la puerta. Se ejecutan *antes* de que la petición llegue al controlador (ej. verificar que el Token JWT sea válido).
*   **📋 `validations` (Validaciones):** Es el inspector de aduanas. Revisa que la información que manda el usuario tenga sentido lógico (usando la librería Zod) antes de dejarla pasar.

### Los Archivos de Arranque y Calidad
*   **⚙️ `app.js` (La Configuración):** Es el motor "apagado". Aquí se inicializa Express, se conectan las rutas y Swagger, pero **no** se enciende el servidor. Esto permite exportar la app limpia para hacerle pruebas automatizadas.
*   **🚀 `server.js` (El Encendido):** Es la llave del motor. Importa la app armada de `app.js`, se conecta a MongoDB y ejecuta el comando para encender el servidor (`app.listen`) en el puerto 3000. 
*   **🧪 Carpeta `tests` (Pruebas Unitarias):** Es tu control de calidad automatizado (usando Jest y Supertest). Evalúa automáticamente que el código funcione correctamente sin necesidad de probar todo a mano en Postman o Swagger cada vez que cambias una línea de código. (TDD - Test Driven Development).

---

## 1. 🌍 ¿Dónde están las APIs Externas (CoinGecko y Alpha Vantage)?
Las conexiones hacia afuera (hacia otros servidores) **NUNCA** deben estar mezcladas con las rutas ni los controladores. Para eso creamos la **Capa de Servicios** (`src/services/`).

*   **Alpha Vantage (Acciones/Stocks):**
    *   **Archivo:** `src/services/stockService.js`
    *   *Respuesta al profesor:* "La comunicación con Alpha Vantage está aislada en la capa de servicios. Ahí uso la librería `axios` para consultar el endpoint `GLOBAL_QUOTE` para el precio en vivo y `TIME_SERIES_DAILY` para el historial."
*   **CoinGecko (Criptomonedas):**
    *   **Archivo:** `src/services/cryptoService.js`
    *   *Respuesta al profesor:* "Toda la interacción con CoinGecko ocurre en mi `cryptoService`. Uso el endpoint `/simple/price` para traer los precios y market cap en tiempo real."

---

## 2. 🔌 ¿Dónde están mis APIs (Los Endpoints que yo creé)?
Tus endpoints se definen en la carpeta **`src/routes/`**. Aquí es donde le dices a Express: *"Cuando alguien entre a esta URL, ejecuta esta función"*. Además, aquí mismo están los **comentarios de Swagger** (anotaciones JSDoc) que generan la documentación visual.

*   **Autenticación (Login/Registro):** `src/routes/authRoutes.js` (`/api/auth`)
*   **Usuarios (CRUD Completo - GET, POST, PUT, DELETE):** `src/routes/userRoutes.js` (`/api/users`)
*   **Activos (CRUD general):** `src/routes/assetRoutes.js` (`/api/assets`)
*   **Criptomonedas (CoinGecko + DB):** `src/routes/cryptoRoutes.js` (`/api/crypto`)
*   **Acciones Bursátiles (Alpha Vantage + DB):** `src/routes/stockRoutes.js` (`/api/stocks`)
*   **Analíticas Globales:** `src/routes/analyticsRoutes.js` (`/api/analytics`)

*Nota: Todas estas rutas se conectan e inicializan en el archivo principal `src/app.js`.*

---

## 3. 🧠 ¿Dónde funciona la Lógica (Business Logic)?
Las rutas (`src/routes/`) solo reciben la petición, pero la verdadera lógica (guardar en base de datos, validar, calcular balances) ocurre en los **Controladores (`src/controllers/`)**.

*   **Lógica de Stocks (Acciones):** `src/controllers/stockController.js`
    *   *Aquí se une lo que devuelve Alpha Vantage (desde el Service) con la base de datos de MongoDB para guardar en la watchlist.*
*   **Lógica de Crypto:** `src/controllers/cryptoController.js`
    *   *Aquí se procesan las compras de cripto verificando el precio real y se calcula el balance total del portafolio del usuario.*
*   **Lógica de Autenticación:** `src/controllers/authController.js`
    *   *Aquí se encriptan las contraseñas usando `bcryptjs` y se firman los tokens `JWT`.*
*   **Lógica de Usuarios (CRUD):** `src/controllers/userController.js`
    *   *Contiene las funciones `getUsers`, `getUser`, `createUser`, `updateUser` y `deleteUser`.*
*   **Lógica de Activos Genéricos:** `src/controllers/assetController.js`
*   **Lógica de Analíticas:** `src/controllers/analyticsController.js`

---

## 4. 🗄️ ¿Dónde se define la Base de Datos (MongoDB)?
La estructura estricta de cómo se guardan los datos está en la carpeta **`src/models/`** utilizando el ODM `Mongoose`.

*   **Usuarios:** `src/models/User.js` (Define que el usuario tiene nombre, email, password encriptado y rol).
*   **Activos:** `src/models/Asset.js` (Define que un activo tiene símbolo, precio, tipo (crypto/stock) y está relacionado con un `ObjectId` que pertenece a un dueño/usuario).

---

## 5. 🧪 ¿Dónde están las Pruebas Unitarias (TDD / Calidad)?
Las pruebas para garantizar que el código no falle se encuentran en la carpeta **`tests/`**.

*   **Archivo principal de pruebas:** `tests/auth.test.js`
*   *Respuesta al profesor:* "Implementé un enfoque TDD (Test Driven Development) utilizando `Jest` como motor de pruebas y `Supertest` para simular las peticiones HTTP a la API. Si corre el comando `npm test`, verá cómo se evalúa automáticamente la respuesta de los endpoints de autenticación."

---

## 6. 🛡️ Seguridad y Validación
Si el profesor pregunta cómo te aseguras de que no te envíen datos basura (por ejemplo, un email sin arroba):

*   **Lógica de Validación:** Está en `src/validations/` (usando la librería **Zod**).
*   **Filtro de Seguridad (Middlewares):** 
    *   `src/middlewares/authMiddleware.js`: Verifica si el token JWT es válido antes de dejar pasar al usuario a las rutas privadas. 
    *   `src/middlewares/validateMiddleware.js`: Conecta las reglas estables de Zod interceptando los payloads malos antes de que lleguen al controlador.

---

## 🗺️ Resumen Rápido (El Flujo de Vida de una Petición)
Si te hace una pregunta de cómo viajan los datos, este es el flujo exacto:
1. El cliente (Swagger/Postman) hace la petición a **`app.js`**.
2. Entra a tu **Route** en `routes/`.
3. Pasa por seguridad y validación en **`middlewares/`**.
4. Llega al **Controller** en `controllers/`.
5. Si necesita datos externos (CoinGecko/Alpha), el Controller llama al **Service** en `services/`.
6. Si necesita guardar/leer de Mongo, el Controller usa el **Model** en `models/`.
7. El Controller responde con el JSON final.
