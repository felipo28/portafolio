# Portafolio — Andrés Felipe Guerrero Macías

Portafolio personal construido con **Angular 17** y conectado a **Supabase** para gestión de contenido dinámico. Diseño propio con sistema de tokens CSS, arquitectura standalone y despliegue en Vercel.

## Tecnologías

- **Framework:** Angular 17 (standalone components, sin SSR)
- **Estilos:** SCSS con design tokens CSS personalizados
- **Backend / BD:** Supabase (PostgreSQL + RLS + API REST)
- **Tipografías:** Newsreader · Inter · JetBrains Mono
- **Despliegue:** Vercel

## Secciones

| Sección | Descripción |
|---|---|
| Hero | Presentación, descarga de CV y contacto por email |
| Stack | Tecnologías frontend, backend y bases de datos |
| Proyectos | Carrusel con autoplay y vista expandida |
| Experiencia | Timeline profesional con tags y logros |
| Educación | Tarjetas de formación académica y certificaciones |

## Instalación local

```bash
# Clonar el repositorio
git clone git@github-felipo28:felipo28/portafolio.git
cd portafolio

# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve
```

Abre `http://localhost:4200` en el navegador.

## Variables de entorno

Copia el archivo de ejemplo y añade tus credenciales de Supabase:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.prod.ts
```

Edita ambos archivos con tu `supabaseUrl` y `supabaseKey` (anon key) desde el panel de Supabase → **Settings → API**.

> Los archivos `environment.ts` están en `.gitignore` y no se suben al repositorio.

## Base de datos (Supabase)

Tres tablas con lectura pública via RLS:

- `projects` — proyectos del carrusel
- `experience` — trayectoria profesional
- `education` — formación y certificaciones

El script de seed está en `supabase/seed.sql`.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── hero/
│   │   ├── navbar/
│   │   ├── stack/
│   │   ├── projects/
│   │   ├── experience/
│   │   └── footer/
│   └── services/
│       └── data.service.ts
├── environments/
└── styles.scss
```

## Contacto

**Andrés Felipe Guerrero Macías**
[LinkedIn](https://www.linkedin.com/in/andres-felipe-guerrero-macias-113926185/) · pipegmacias00@gmail.com


Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
