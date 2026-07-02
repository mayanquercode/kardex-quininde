# Kardex Quinindé

Aplicación web para consulta de inventario (kardex) de productos de construcción. Construida con React, TypeScript, Tailwind CSS v4 y Supabase.

## Stack tecnológico

| Herramienta | Versión | Propósito |
|---|---|---|
| React | 19 | UI |
| TypeScript | 6 | Tipado estático |
| Vite | 8 | Bundler / dev server |
| Tailwind CSS | 4 | Estilos utilitarios |
| Supabase JS | 2 | Cliente de base de datos PostgreSQL |
| TanStack Query | 5 | Fetching y caché de datos |
| React Router | 7 | Enrutamiento SPA |
| GitHub Pages | — | Hosting estático |
| GitHub Actions | — | CI/CD (build + deploy automático) |

## Arquitectura

Se sigue una separación en capas para desacoplar la UI de la lógica de datos:

```
Componentes (UI)
  ↓
Hooks (React Query)
  ↓
Servicios (orquestación)
  ↓
Repositorios (consultas a Supabase)
  ↓
Supabase (PostgreSQL)
```

### Capas

**Repositorios** (`src/repositories/`)
- Encapsulan consultas SQL individuales por tabla.
- Cada repositorio corresponde a una tabla de la base de datos.
- Importan directamente el cliente de Supabase (`src/libs/supabase.ts`).
- Devuelven datos tipados según las interfaces del dominio.
- Métodos actuales:
  - `productRepository.findCategoriesWithCount()` — obtiene categorías con cantidad de productos
  - `productRepository.findAll(category?, search?)` — busca productos con filtros
  - `productRepository.findByCode(code)` — obtiene un producto por código
  - `stockRepository.findByCodes(codes)` — obtiene stock por lista de códigos

**Servicios** (`src/services/`)
- Orquestan llamadas a múltiples repositorios.
- Contienen lógica de negocio (combinación de datos, transformaciones).
- Son consumidos por los hooks.
- Métodos actuales:
  - `inventoryService.getCategoriesWithProductCount()` — categorías + conteo
  - `inventoryService.getProductsByCategory(category, search?)` — productos con stock
  - `inventoryService.getProductDetail(code)` — producto individual con stock

**Hooks** (`src/hooks/`)
- Envuelven llamadas a servicios con TanStack Query.
- Definen las claves de caché (`queryKey`) y condiciones de habilitado (`enabled`).
- Hooks actuales:
  - `useQueryCategories()` — lista de categorías para la home
  - `useQueryKardexProduct(category, search)` — productos por categoría
  - `useQueryProductDetail(code)` — detalle de un producto

**Componentes** (`src/components/`)
- Solo renderizan UI y se conectan a hooks.
- Sin lógica de negocio ni acceso directo a Supabase.

## Estructura del proyecto

```
kardex-quininde/
├── .env                      # Variables de entorno locales (NO subir a git)
├── .env.example              # Template de variables de entorno
├── .github/workflows/
│   └── deploy.yml            # CI/CD: build + deploy a GitHub Pages
├── public/                   # Archivos estáticos (manifest, iconos)
├── src/
│   ├── main.tsx              # Entry point: BrowserRouter + QueryClientProvider
│   ├── App.tsx               # Definición de rutas
│   ├── index.css             # Directivas Tailwind + dark mode
│   ├── types/
│   │   └── inventory.ts      # Interfaces del dominio (Product, Stock, etc.)
│   ├── libs/
│   │   └── supabase.ts       # Cliente Supabase (desde variables de entorno)
│   ├── repositories/
│   │   ├── product.repository.ts
│   │   └── stock.repository.ts
│   ├── services/
│   │   └── inventory.service.ts
│   ├── hooks/
│   │   └── use-inventory.tsx
│   ├── components/
│   │   ├── Header.tsx        # Barra superior con volver + theme toggle
│   │   ├── ThemeToggle.tsx   # Switch claro/oscuro
│   │   └── TableListProducts.tsx  # Tabla desktop / cards mobile
│   └── pages/
│       ├── Home.tsx          # Grid de categorías
│       ├── CategoryProducts.tsx  # Productos de una categoría
│       └── ProductDetail.tsx # Detalle de un producto
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Grid de categorías con conteo de productos |
| `/category/:category` | CategoryProducts | Productos filtrados por categoría + buscador |
| `/product/:code/:type` | ProductDetail | Detalle completo del producto con stock |
| `*` | — | Redirecciona a `/` |

## Base de datos

### Tabla: `products`

| Columna | Tipo | Descripción |
|---|---|---|
| `code` | `text PK` | Código único del producto |
| `name` | `text` | Nombre del producto |
| `category` | `text` | Categoría (ej. "BAÑOS ACCESORIOS") |
| `product_type` | `text` | Tipo: `UNIT` o `AREA` |

### Tabla: `stock`

| Columna | Tipo | Descripción |
|---|---|---|
| `code` | `text PK` | FK a `products.code` |
| `system_quantity` | `numeric(12,2)` | Cantidad según sistema |
| `physical_quantity` | `numeric(12,2)` | Cantidad física real |
| `broken_quantity` | `numeric(12,2)` | Cantidad rota |
| `missing_quantity` | `numeric(12,2)` | Cantidad faltante |
| `leftover_quantity` | `numeric(12,2)` | Cantidad sobrante |

### Tabla: `product_area`

| Columna | Tipo | Descripción |
|---|---|---|
| `code` | `text PK` | FK a `products.code` |
| `area_per_box` | `numeric` | Área por caja |
| `area_per_piece` | `numeric` | Área por pieza |
| `pieces_per_box` | `integer` | Piezas por caja |
| `format` | `text` | Formato |

## Tema claro/oscuro

- Clase `.dark` en `<html>` + `@custom-variant dark` en CSS (Tailwind v4).
- Detecta `prefers-color-scheme` al inicio.
- El toggle guarda preferencia en `localStorage("theme")`.
- Transición suave con `transition-colors`.

## Variables de entorno

| Variable | Dónde se usa |
|---|---|
| `VITE_SUPABASE_URL` | `src/libs/supabase.ts` |
| `VITE_SUPABASE_KEY` | `src/libs/supabase.ts` |

En desarrollo local se cargan desde `.env`. En producción (GitHub Actions) se inyectan desde [GitHub Secrets](https://github.com/tu-usuario/kardex-quininde/settings/secrets/actions).

## Comandos disponibles

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo (Vite)
npm run build      # Compilar TypeScript + build de producción
npm run preview    # Vista previa del build de producción
npm run lint       # ESLint
```

## Deployment

El deploy a GitHub Pages es automático mediante GitHub Actions. Al hacer push a `main`:

1. El workflow `.github/workflows/deploy.yml` se ejecuta.
2. Instala dependencias, compila TypeScript y construye el bundle.
3. Inyecta `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY` desde los Secrets del repositorio.
4. Sube el contenido de `dist/` a GitHub Pages.

**Requisito único**: configurar los Secrets en el repositorio:

| Secret | Valor |
|---|---|
| `VITE_SUPABASE_URL` | URL de tu proyecto Supabase |
| `VITE_SUPABASE_KEY` | Anon key de Supabase |

## Cómo empezar a desarrollar

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/kardex-quininde.git
cd kardex-quininde

# 2. Instalar dependencias
npm install

# 3. Crear .env con las credenciales de Supabase
cp .env.example .env
# Editar .env con los valores reales

# 4. Iniciar dev server
npm run dev
```
