# Nova POS

Sistema de punto de venta hecho con React + Vite + Tailwind.

## Instalación (en VS Code)

1. Descomprime el proyecto y ábrelo en VS Code.
2. Abre una terminal y ejecuta:
   ```
   npm install
   npm run dev
   ```
3. Abre el navegador en `http://localhost:5173`.

## Acceso demo

- Usuario: `admin`
- Contraseña: `1234`

## Vistas incluidas

- **Login** (`/login`) — autenticación con validación y mensaje de error.
- **Venta** (`/`) — catálogo con búsqueda y filtro por categoría, carrito estilo ticket con IVA y total.
- **Productos** (`/productos`) — alta, edición y eliminación de productos.
- **Historial** (`/ventas`) — ventas registradas (persisten en `localStorage`).

## Notas

- Los datos de productos son de ejemplo (`src/data/mockData.js`); reemplázalos por tu catálogo real o conéctalos a una API.
- Para producción, sustituye la autenticación local por un backend real (JWT, sesiones, etc.).
