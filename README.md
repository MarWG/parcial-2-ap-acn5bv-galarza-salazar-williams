<img width="51" height="54" alt="image" src="https://github.com/user-attachments/assets/bf5512c8-6b6e-4bcf-86bf-1244d44d16b5" />
**Informe del Proyecto: BugLog**
PARCIAL 2 - Diseño de Sistemas.

**Repositorio:**
https://github.com/AnthonyNadsat/parcial2-dds-acn5bv-galarza-salazar-williams

**Equipo:**
- Galarza Lukas
- Salazar Anthony
- Williams Mariano

**Descripción:** 
- Entrega Parcial 2 - Diseño de Sistemas (_cuatrimestre 1 - 2026_)

---

## 📋 Descripción

**BugLog** es una aplicación que permite la gestión y reporte de bugs encontrados en videojuegos. El sistema permite a los usuarios reportar errores de diferentes plataformas, asignarles niveles de prioridad, detallar el problema y gestionar los usuarios que participan.

A diferencia del segundo parcial, esta versión **final** incorpora:

- Autenticación JWT con roles (Admin/Tester)
- Encriptación bcrypt de contraseñas
- Panel de gestión de usuarios (CRUD admin)
- Relaciones entre tablas con Foreign Keys
- Middleware de autorización por roles
- Manejo centralizado de errores
- Índices en base de datos
- Context API para estado global
- Grid responsive de 3 columnas
- Diseño mejorado inspirado en Steam/Backloggd
- Portadas de juegos integradas

### Características Principales

- 🔐 **Sistema de autenticación JWT** con roles (Admin/Tester)
- 📝 **CRUD completo** de reportes de bugs con validaciones
- 👥 **Panel de administración** de usuarios (exclusivo para admins)
- 🎮 **Portadas de juegos** mediante URLs de imágenes
- 🎨 **Interfaz moderna** inspirada en plataformas de gaming (Steam/Backloggd)
- 📱 **Diseño** optimizado para desktop, tablet y móvil
- 🔒 **Rutas protegidas** con middlewares de autenticación y autorización
- ⚡ **Validaciones en tiempo real** tanto en frontend como backend

---

## ✨ Características Técnicas

### Frontend
- **React** con Hooks (useState, useEffect, useContext)
- **React Router DOM** para navegación SPA
- **Context API** para manejo de estado global (autenticación)
- **Validaciones en tiempo real** con feedback visual
- **Componentes reutilizables** (BugCard, BugForm, EditModal, Header, etc.)

### Backend
- **Node.js + Express** con arquitectura MVC
- **SQLite (better-sqlite3)** para persistencia de datos
- **JWT (jsonwebtoken)** para autenticación segura
- **Bcrypt** para encriptación de contraseñas
- **Express Validator** para validaciones robustas
- **Middlewares personalizados** para autenticación y manejo de errores
- **CORS** configurado para desarrollo local

### Arquitectura
- Separación clara de responsabilidades (MVC)
- Rutas protegidas con verificación de roles
- Manejo centralizado de errores
- Relaciones entre tablas (usuarios ↔ bugs)
- Índices en base de datos para optimización

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- React 
- React Router DOM
- Vite 
- CSS 
- Fetch API

### **Backend**
- Node.js
- Express 
- SQLite3 (better-sqlite3)
- Bcrypt
- JSON Web Token 
- Express Validator 
- CORS

### **Herramientas**
- Git & GitHub
- Conventional Commits
- Vite Dev Server

---

## 🛠 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/AnthonyNadsat/parcial-2-pd-acn4bv-galarza-salazar.git
cd parcial-2-pd-acn4bv-galarza-salazar
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install express cors better-sqlite3 bcrypt jsonwebtoken express-validator
```

### 3. Instalar dependencias del frontend
```bash
cd frontend
npm install react react-dom react-router-dom
```

### 4. Ejecutar el backend
```bash
cd backend
npm start
```

**Servidor corriendo en:** `http://localhost:3000`

### 5. Ejecutar el frontend
```bash
cd frontend
npm run dev
```

**Aplicación corriendo en:** `http://localhost:5173`

---

## 📝 Uso de la Aplicación

### 🔐 Autenticación

**Usuarios por defecto:**
- **Admin:** `admin` / `1234`
- **Tester:** `tester` / `1234`

**Roles y permisos:**
- **Tester:** Puede reportar bugs y gestionar sus propios reportes
- **Admin:** Acceso total (gestionar todos los bugs + panel de usuarios)

### 📋 Funcionalidades por Rol

#### **Tester**
1. Reportar nuevos bugs
2. Ver historial de todos los reportes
3. Editar/eliminar sus propios reportes
4. Filtrar bugs por prioridad (Baja/Media/Alta)

#### **Admin**
1. Todas las funcionalidades de Tester
2. Editar/eliminar cualquier reporte
3. **Panel de gestión de usuarios:**
   - Crear nuevos usuarios
   - Modificar usuarios existentes
   - Eliminar usuarios (excepto su propia cuenta)
   - Cambiar roles entre Admin o Testerw

### 🎮 Reportar un Bug

1. Iniciar sesión
2. Ir a "Reportar bug"
3. Completar el formulario:
   - **Nombre del juego**
   - **Plataforma** (PC, PS5, Xbox Series X, Switch, etc.)
   - **Tipo de bug** (Gráfico, Audio, Gameplay)
   - **Gravedad** (Baja, Media, Alta)
   - **Descripción detallada**
   - **URL de portada** (opcional)
4. Click en "Reportar bug"

### 📊 Ver y Gestionar Reportes

1. Ir a "Historial"
2. Usar filtros de prioridad (TODOS/BAJA/MEDIA/ALTA)
3. Ver cards con:
   - Portada del juego (si tiene URL)
   - Información completa del bug
   - Nombre del usuario que lo reportó
   - Fecha de reporte
4. Botones de acción (si tienes permisos):
   - **Editar:** Modificar información del bug
   - **Eliminar:** Eliminar reporte (con confirmación)

### 👥 Gestión de Usuarios (Admin)

1. Ir a "Usuarios"
2. Ver tabla con todos los usuarios registrados
3. Acciones disponibles:
   - **Agregar Usuario:** Crear nuevo usuario con rol
   - **Modificar:** Editar username, email, rol o contraseña
   - **Eliminar:** Borrar usuario (excepto tu propia cuenta)

---

## 🎨 Diseño y UI/UX

### **Inspiración**
Interfaz inspirada en plataformas como Steam o Backloggd.

### **Características del Diseño**
- **Tema oscuro** con gradientes sutiles
- **Cards estilo gaming** con efectos hover
- **Portadas de juegos** integradas en los reportes
- **Animaciones suaves** en hover y transiciones
- **Badges de prioridad/gravedad** con color verde para Baja, naranja para Media y rojo para Alta.

---

## 🏗️ Arquitectura del Proyecto
```
buglog/
├── backend/
│   ├── config/
│   │   └── jwt.js                    # Configuración JWT
│   ├── controllers/
│   │   ├── authController.js         # Lógica de autenticación
│   │   ├── bugsController.js         # Lógica de bugs (CRUD)
│   │   └── usersController.js        # Lógica de usuarios (CRUD)
│   ├── middlewares/
│   │   ├── authMiddleware.js         # Verificación JWT y roles
│   │   ├── errorHandler.js           # Manejo centralizado de errores
│   │   ├── logger.js                 # Logger de requests
│   │   └── validateBug.js            # Validaciones de bugs
│   ├── models/
│   │   └── User.js                   # Modelo de Usuario
│   ├── routes/
│   │   ├── auth.js                   # Rutas de autenticación
│   │   ├── bugs.js                   # Rutas de bugs
│   │   └── users.js                  # Rutas de usuarios (admin)
│   ├── data/
│   │   └── bugs.db                   # Base de datos SQLite
│   ├── database.js                   # Configuración DB + tablas
│   ├── index.js                      # Punto de entrada servidor
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── background.png        # Fondo de la app
│   │   │   ├── buglog.png            # Logo
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── BugCard.jsx           # Card individual de bug
│   │   │   ├── BugForm.jsx           # Formulario de bugs
│   │   │   ├── BugList.jsx           # Lista de bugs
│   │   │   ├── EditModal.jsx         # Modal de edición
│   │   │   ├── Header.jsx            # Navbar con navegación
│   │   │   ├── RequireAuth.jsx       # HOC autenticación
│   │   │   └── RequireAdmin.jsx      # HOC admin
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Context de autenticación
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Página de reporte
│   │   │   ├── Login.jsx             # Página de login
│   │   │   ├── Reportes.jsx          # Página de historial
│   │   │   └── AdminUsers.jsx        # Panel de usuarios
│   │   ├── services/
│   │   │   └── api.js                # Servicios API (fetch)
│   │   ├── styles/
│   │   │   ├── base.css              # Estilos base y variables
│   │   │   ├── navbar.css            # Estilos navbar
│   │   │   ├── login.css             # Estilos login
│   │   │   ├── home.css              # Estilos home
│   │   │   ├── reportes.css          # Estilos reportes
│   │   │   ├── modal.css             # Estilos modales
│   │   │   ├── adminusers.css        # Estilos admin
│   │   │   └── editmodal.css         # Estilos edit modal
│   │   ├── App.jsx                   # Componente raíz
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Imports CSS
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Flujo de la Aplicación

### **1. Autenticación (Login)**
```
Usuario → POST /api/auth/login → Backend valida credenciales 
→ Genera JWT → Frontend almacena token → Redirige a Home
```

### **2. Crear Bug**
```
Usuario completa formulario → Validación frontend → POST /api/bugs 
→ Backend valida (express-validator) → Inserta en DB 
→ Respuesta JSON → Frontend actualiza lista
```

### **3. Ver Historial**
```
Usuario ingresa a /reportes → GET /api/bugs → Backend consulta DB 
→ JOIN con users → Respuesta JSON → Frontend renderiza cards con filtros
```

### **4. Editar Bug**
```
Usuario click en Editar → Modal con datos → PUT /api/bugs/:id 
→ Backend verifica permisos (middleware) → Actualiza DB 
→ Frontend recarga lista
```

### **5. Gestión de Usuarios (Admin)**
```
Admin ingresa a /admin/users → GET /api/users (requiere rol admin) 
→ CRUD completo de usuarios → Validaciones + JWT
```

---

## 📡 Endpoints de la API

### **Autenticación**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil | Sí (JWT) |

### **Bugs**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/bugs` | Listar todos | No |
| GET | `/api/bugs/:id` | Obtener por ID | No |
| GET | `/api/bugs/user/my-bugs` | Mis bugs | Sí (JWT) |
| POST | `/api/bugs` | Crear bug | Sí (JWT) |
| PUT | `/api/bugs/:id` | Actualizar bug | Sí (JWT + permisos) |
| DELETE | `/api/bugs/:id` | Eliminar bug | Sí (JWT + permisos) |

### **Usuarios (Admin)**
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | Sí (Admin) |
| POST | `/api/users` | Crear usuario | Sí (Admin) |
| PUT | `/api/users/:id` | Actualizar usuario | Sí (Admin) |
| DELETE | `/api/users/:id` | Eliminar usuario | Sí (Admin) |

---

## 🔍 Ejemplo de Request/Response

### **POST /api/auth/login**

**Request:**
```json
{
  "username": "admin",
  "password": "1234"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@buglog.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **POST /api/bugs**

**Request:**
```json
{
  "nombreJuego": "Cyberpunk 2077",
  "plataforma": "PC",
  "tipo": "Gráfico",
  "gravedad": "Alta",
  "descripcion": "Texturas no cargan correctamente en el Acto 2",
  "imageUrl": "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Bug creado exitosamente",
  "data": {
    "id": 15,
    "nombreJuego": "Cyberpunk 2077",
    "plataforma": "PC",
    "tipo": "Gráfico",
    "gravedad": "Alta",
    "descripcion": "Texturas no cargan correctamente en el Acto 2",
    "imageUrl": "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png",
    "fecha": "14/12/2025, 15:42:30",
    "userId": 1,
    "createdBy": "admin",
    "creatorRole": "admin"
  }
}
```

### **GET /api/bugs**

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombreJuego": "Overwatch 2",
      "plataforma": "PlayStation 4",
      "tipo": "Gráfico",
      "gravedad": "Baja",
      "descripcion": "Fallos menores en texturas",
      "imageUrl": "https://example.com/image.jpg",
      "fecha": "12/12/2025, 11:55:32",
      "userId": 2,
      "createdBy": "tester",
      "creatorRole": "tester"
    }
  ],
  "count": 1
}
```

---

## 🔒 Seguridad Implementada

### **Autenticación y Autorización**
- ✅ Contraseñas hasheadas con **bcrypt**
- ✅ Tokens **JWT**
- ✅ Verificación de token en cada request protegido
- ✅ Middleware de autorización por roles
- ✅ Protección contra modificación de datos ajenos

### **Validaciones**
- ✅ Validación de inputs en **frontend** (tiempo real)
- ✅ Validación de datos en **backend** (express-validator)
- ✅ Sanitización de datos
- ✅ Constraints en base de datos (UNIQUE, CHECK, FOREIGN KEY)

### **Manejo de Errores**
- ✅ Clase personalizada `AppError`
- ✅ Middleware centralizado de errores
- ✅ Mensajes de error descriptivos
- ✅ Códigos HTTP apropiados (400, 401, 403, 404, 500)

---

## 🎯 Patrones y Buenas Prácticas

### **Backend**
- ✅ Arquitectura **MVC** (Model-View-Controller)
- ✅ Separación de responsabilidades (routes/controllers/models/middlewares)
- ✅ Middlewares reutilizables
- ✅ Async/Await con manejo de errores (`asyncHandler`)
- ✅ Variables de entorno para configuración
- ✅ CORS configurado correctamente

### **Frontend**
- ✅ Componentes funcionales con **Hooks**
- ✅ Context API para estado global (AuthContext)
- ✅ Custom Hooks (`useAuth`)
- ✅ HOCs para protección de rutas (RequireAuth, RequireAdmin)
- ✅ Separación de lógica y presentación
- ✅ CSS modular por funcionalidad
- ✅ Reutilización de componentes

### **Git & Commits**
- ✅ **Conventional Commits**
  - `feat:` para nuevas funcionalidades
  - `fix:` para correcciones
  - `style:` para cambios de diseño
  - `refactor:` para reorganización de código
  - `chore:` para mantenimiento
- ✅ Participación visible de todos los integrantes

---

## 📱 Capturas de Pantalla

### Vista Login
![login buglog](https://github.com/user-attachments/assets/3834a5f7-48be-49a2-9a97-47e7d7d63c63)


### Vista Reportar Bug
![reportar buglog](https://github.com/user-attachments/assets/ca7c6b0b-1a16-45c9-9ad5-536e1d2e4e2b)


### Vista Historial de Reportes(Admin)
![Historial de reportes buglog](https://github.com/user-attachments/assets/cc865211-36ef-4db0-b3b8-4292e7a82568)


### Vista Gestión de Usuarios

![Creacion de usario buglog](https://github.com/user-attachments/assets/613d68d4-893e-44e4-ad64-bfe8e7a2f65d)


![Gestion de usuarios buglog](https://github.com/user-attachments/assets/3983c1db-f74e-4d4f-b19f-c4c7aa2890a7)


---


## 📝 Conclusiones

### **Logros Destacados**

✅ **Fullstack completo** con arquitectura MVC  
✅ **Autenticación JWT** con sistema de roles funcional  
✅ **CRUD completo** con validaciones robustas en ambos lados  
✅ **Panel de administración** de usuarios exclusivo para admins  
✅ **Seguridad** implementada en múltiples capas (JWT, bcrypt, middlewares)  
✅ **Manejo de errores** centralizado y descriptivo  
✅ **Base de datos** con relaciones, constraints e índices  
✅ **Conventional Commits** durante todo el desarrollo  


<img width="51" height="54" alt="buglog" src="https://github.com/user-attachments/assets/e1fb7a2b-b764-4be6-a914-437d82de482c" />

