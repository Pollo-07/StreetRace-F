# 🏎️ StreetRace-F

> Aplicación web de carreras callejeras construida con React, TypeScript y Vite.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![MUI](https://img.shields.io/badge/MUI-6-007FFF?style=flat-square&logo=mui)

---

## 📖 Descripción

**StreetRace-F** es una aplicación web de carreras callejeras que permite a los usuarios explorar, gestionar y seguir el rastro de eventos de street race. Desarrollada con un stack moderno enfocado en rendimiento y experiencia de usuario.

---

## 🚀 Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/ | 18+ | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Tipado estático |
| [Vite](https://vitejs.dev/) | 6+ | Bundler / Dev server |
| [React Query](https://tanstack.com/query) | 5+ | Server state management |
| [MUI (Material UI)](https://mui.com/) | 6+ | Componentes de UI |

---

## ⚙️ Instalación y uso

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Pollo-07/StreetRace-F.git
cd StreetRace-F

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus valores

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🔧 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build de producción
npm run preview   # Vista previa del build
npm run lint      # Verificar código con ESLint
```

---

## 🌐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

```env
VITE_API_URL=https://tu-api.com
```

> ⚠️ Nunca subas el archivo `.env` con valores reales al repositorio.

---

## 📁 Estructura del proyecto

```
StreetRace-F/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── feature/             # Módulos por dominio
│   │   ├── admin/           # Funcionalidades de administración
│   │   └── Pilot/           # Funcionalidades de pilotos
│   ├── hooks/               # Custom hooks
│   ├── routes/              # Configuración de rutas
│   ├── services/            # Llamadas a la API
│   ├── types/               # Tipos e interfaces TypeScript
│   ├── utils/               # Funciones utilitarias
│   ├── App.tsx              # Componente raíz
│   └── main.tsx             # Punto de entrada
├── index.html
├── vite.config.ts
├── staticwebapp.config.json # Configuración Azure Static Web Apps
└── package.json
```



