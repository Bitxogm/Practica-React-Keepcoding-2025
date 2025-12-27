# Dashboard de Componentes PC - Práctica React

Aplicación web para gestionar un inventario de componentes de PC con autenticación JWT.

## 🛠️ Tecnologías

**Frontend:**
- React 19 + TypeScript
- Vite
- React Router v7 (Data Mode)

**Backend:**
- Sparrest.js (JSON Server con JWT)
- Puerto: 8000

## 📋 Requisitos

- Node.js 18+
- npm 9+

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repo>
cd Practica-React
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd server
npm install
```
### 4. Configurar variables de entorno

**Frontend (.env en raíz):**

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

El archivo contiene:
```env
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000
```

**Backend (server/.env):**

Copia el archivo de ejemplo:
```bash
cp server/.env.example server/.env
```

El archivo contiene:
```env
SECRET_KEY=Annie is Vader
PORT=8000
DB_FILE=db.json
JWT_EXPIRATION=24h
SALT=10
AUTH_READ=yes
AUTH_WRITE=yes
```

**Importante:** `AUTH_READ=yes` requiere autenticación para LEER productos.

## ▶️ Ejecución

### Backend (Terminal 1)
```bash
cd server
npm start
```

Servidor corriendo en: http://localhost:8000

### Frontend (Terminal 2)
```bash
npm run dev
```

Aplicación corriendo en: http://localhost:5173

## 🔐 Credenciales de prueba

- **Usuario:** `admin`
- **Contraseña:** `1234`

También puedes registrar nuevos usuarios en `/register`

## 📁 Estructura del Proyecto
```
src/
├── core/                    # Componentes y lógica compartida
│   ├── routes/             # Configuración de rutas
│   └── types/              # Tipos compartidos
├── features/               # Funcionalidades por módulo
│   ├── auth/              # Autenticación
│   │   ├── components/    # LoginForm
│   │   ├── hooks/         # useAuth
│   │   ├── pages/         # LoginPage, RegisterPage
│   │   ├── services/      # auth.service
│   │   └── types/         # User, LoginCredentials
│   └── products/          # Gestión de productos
│       ├── components/    # ProductCard, ProductForm
│       ├── hooks/         # useProducts, useProduct
│       ├── pages/         # ProductsPage, ProductDetailPage, NewProductPage
│       ├── services/      # products.service
│       └── types/         # PCComponent
└── App.tsx
```

## ✅ Funcionalidades Implementadas

### Autenticación
- ✅ Registro de usuarios
- ✅ Login con JWT
- ✅ Persistencia de sesión (localStorage)
- ✅ Protección de rutas

### Productos (CRUD)
- ✅ **Listar** productos (requiere autenticación)
- ✅ **Ver detalle** de un producto
- ✅ **Crear** nuevo producto (con formulario manual, sin librerías)
- ⏳ Editar producto (pendiente)
- ⏳ Eliminar producto (pendiente)

### Filtros
- ⏳ Filtrar por nombre
- ⏳ Filtrar por rango de precio
- ⏳ Filtrar por tags
- ⏳ Filtrar por ofertas

## 🎯 Características Técnicas

- **React Router Data Mode:** Rutas programáticas con lazy loading
- **Custom Hooks:** Separación de lógica de negocio
- **Services Layer:** Llamadas API centralizadas
- **TypeScript Strict:** Tipado completo
- **Formularios manuales:** Sin React Hook Form ni Formik (requisito de la práctica)
- **Arquitectura por features:** Código organizado por funcionalidad

## 📝 Notas

- El backend usa `bcrypt` para hashear contraseñas
- Todos los endpoints de `/api/*` requieren token JWT en el header `Authorization: Bearer <token>`
- El token expira en 24 horas
- Las imágenes se pueden subir usando el endpoint `/upload` del backend