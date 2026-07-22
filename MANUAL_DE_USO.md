# Manual de Uso - Asset-Matrix-Intelligence 2.0

Este documento explica cómo funciona la API, la estructura de sus datos (Schemas) y cómo realizar pruebas (mediante peticiones) para cada uno de sus módulos principales: Autenticación, Gestión de Activos (Assets) y Analíticas.

## 1. ¿Cómo funciona el programa?

La aplicación es una API REST construida en Node.js, Express y MongoDB. Su objetivo es permitir a los usuarios gestionar su portafolio de activos (criptomonedas, acciones, divisas fiat, etc.) y obtener inteligencia financiera básica sobre ellos.

El flujo principal es:
1. **Registro/Login**: El usuario se registra y/o inicia sesión para obtener un **Token JWT** (JSON Web Token).
2. **Autorización**: Este token debe incluirse en la cabecera (header) `Authorization: Bearer <TOKEN>` para acceder a las rutas protegidas.
3. **Gestión (CRUD)**: El usuario puede crear, leer o eliminar sus propios activos financieros.
4. **Inteligencia (Analíticas)**: La API calcula el valor total del portafolio del usuario dividiéndolo por tipo de activo.

---

## 2. Modelos de Datos (Schemas)

### Schema de Usuario (User)
```json
{
  "name": "Juan Perez",
  "email": "juan@ejemplo.com",
  "password": "micontraseñasecreta",
  "role": "user" 
}
```

### Schema de Activo (Asset)
```json
{
  "name": "Bitcoin",
  "symbol": "BTC",
  "type": "crypto", 
  "price": 65000
}
```
*(Los tipos permitidos para `type` son: `crypto`, `stock`, `fiat`, `commodity`, `other`)*

---

## 3. Demostración de Peticiones (Endpoints)

> [!IMPORTANT]
> Para probar las rutas protegidas (`/api/assets` y `/api/analytics`), debes reemplazar `<TU_TOKEN_AQUI>` con el token real que te devuelve el endpoint de Login.

### A. Autenticación y Usuarios

#### POST - Registro de Usuario
Registra un nuevo usuario en la base de datos.
**URL:** `POST http://localhost:3000/api/auth/register`
**Body (JSON):**
```json
{
  "name": "Antonio Cabrera",
  "email": "antonio@ejemplo.com",
  "password": "password123"
}
```

#### POST - Inicio de Sesión (Login)
Devuelve el Token JWT necesario para operar con los activos.
**URL:** `POST http://localhost:3000/api/auth/login`
**Body (JSON):**
```json
{
  "email": "antonio@ejemplo.com",
  "password": "password123"
}
```

### B. Gestión de Activos (Assets)

#### POST - Crear un Activo
Agrega un nuevo activo al portafolio del usuario autenticado.
**URL:** `POST http://localhost:3000/api/assets`
**Headers:** `Authorization: Bearer <TU_TOKEN_AQUI>`
**Body (JSON):**
```json
{
  "name": "Apple Inc.",
  "symbol": "AAPL",
  "type": "stock",
  "price": 185.50
}
```

#### GET - Obtener Activos
Obtiene la lista de todos los activos pertenecientes al usuario actual.
**URL:** `GET http://localhost:3000/api/assets`
**Headers:** `Authorization: Bearer <TU_TOKEN_AQUI>`

#### DELETE - Eliminar un Activo
Elimina un activo específico utilizando su ID (el cual puedes obtener con la petición GET anterior).
**URL:** `DELETE http://localhost:3000/api/assets/<ID_DEL_ACTIVO>`
**Headers:** `Authorization: Bearer <TU_TOKEN_AQUI>`

### C. Analíticas

#### GET - Analítica del Portafolio
Devuelve un resumen con el valor total del portafolio y el valor dividido por tipos de activos.
**URL:** `GET http://localhost:3000/api/analytics/portfolio`
**Headers:** `Authorization: Bearer <TU_TOKEN_AQUI>`

---

## Alternativa con Interfaz Web
Puedes probar absolutamente todas estas peticiones de forma visual entrando al Swagger de la aplicación:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)** 

*(Allí verás el botón "Authorize" arriba a la derecha para pegar tu Token, y luego podrás probar cada ruta dando click en "Try it out").*
