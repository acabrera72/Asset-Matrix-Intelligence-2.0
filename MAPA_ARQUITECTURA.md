# 🗺️ Mapa de Arquitectura del Código (MVC)

Este documento sirve como guía rápida para ubicar la lógica de la API `Asset Matrix Intelligence`. La aplicación está construida utilizando la **Arquitectura MVC (Modelo-Vista-Controlador)**.

---

## 🏛️ Regla de Oro de las Carpetas

- 📍 **`src/routes/`**: Aquí **SOLO** se definen las direcciones de las URLs (los endpoints) de la API.
- 🧠 **`src/controllers/`**: Aquí está el **"Cerebro"** de la aplicación. Contiene la lógica real, las validaciones y los cálculos.
- 🗄️ **`src/models/`**: Define cómo se estructura y se guarda la información en la base de datos MongoDB.
- 🛡️ **`src/middlewares/`**: Actúan como "porteros de seguridad" (como verificar el Token JWT) antes de dejar pasar a las rutas protegidas.

---

## 📍 1. Autenticación (Auth)
*(Rutas: Registro, Login, Mi Perfil)*

- **Rutas en Swagger:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Carpeta de Rutas:** `src/routes/authRoutes.js`
- **Carpeta de Lógica (Controlador):** **`src/controllers/authController.js`**
  *(Aquí se crea el usuario, se encripta la contraseña y se genera el Token).*
- **Base de Datos (Modelo):** `src/models/User.js`

---

## 👥 2. Gestión de Usuarios
*(Rutas Administrativas para ver o crear usuarios manualmente)*

- **Rutas en Swagger:** `GET /api/users`, `POST /api/users`
- **Carpeta de Rutas:** `src/routes/userRoutes.js`
- **Carpeta de Lógica (Controlador):** **`src/controllers/userController.js`**
- **Base de Datos (Modelo):** `src/models/User.js`

---

## 💰 3. Gestión de Activos (Assets)
*(Rutas para Crear, Ver y Borrar criptomonedas o acciones)*

- **Rutas en Swagger:** `GET /api/assets`, `POST /api/assets`, `DELETE /api/assets/{id}`
- **Carpeta de Rutas:** `src/routes/assetRoutes.js`
- **Carpeta de Lógica (Controlador):** **`src/controllers/assetController.js`**
  *(Aquí está la lógica para guardar un activo o borrarlo).*
- **Reglas Anti-Errores (Validación):** `src/validations/assetValidation.js`
  *(Asegura que no se manden nombres vacíos o precios negativos).*
- **Base de Datos (Modelo):** `src/models/Asset.js`

---

## 🧠 4. Inteligencia Financiera (Analytics)
*(Rutas para calcular el portafolio)*

- **Ruta en Swagger:** `GET /api/analytics/portfolio`
- **Carpeta de Rutas:** `src/routes/analyticsRoutes.js`
- **Carpeta de Lógica (Controlador):** **`src/controllers/analyticsController.js`**
  *(Aquí se encuentra toda la matemática: sumar el dinero total del portafolio y dividirlo por categorías).*

---

## 🛡️ 5. Capa de Seguridad Extra
*(Si el profesor pregunta cómo te proteges contra hackers)*

- **Seguridad JWT:** El archivo **`src/middlewares/authMiddleware.js`** es el encargado de interceptar las peticiones a rutas privadas (como Assets), leer el Token JWT y verificar que sea 100% auténtico antes de permitir al usuario continuar.
