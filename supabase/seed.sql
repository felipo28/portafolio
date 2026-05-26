-- ============================================================
-- SEED — Portafolio Andrés Felipe Guerrero Macías
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1. Crear tablas si no existen
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  tags        TEXT[],
  image       TEXT,
  demo        TEXT,
  code        TEXT,
  "order"     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id          SERIAL PRIMARY KEY,
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  period      TEXT,
  active      BOOLEAN DEFAULT FALSE,
  description TEXT,
  highlights  TEXT[],
  tags        TEXT[],
  "order"     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id          SERIAL PRIMARY KEY,
  type        TEXT,
  title       TEXT NOT NULL,
  institution TEXT,
  icon        TEXT,
  "order"     INTEGER DEFAULT 0
);

-- 2. RLS — lectura pública sin autenticación
-- ============================================================

ALTER TABLE projects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read projects"   ON projects;
DROP POLICY IF EXISTS "public read experience" ON experience;
DROP POLICY IF EXISTS "public read education"  ON education;

CREATE POLICY "public read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "public read experience"
  ON experience FOR SELECT USING (true);

CREATE POLICY "public read education"
  ON education FOR SELECT USING (true);

-- 3. Datos — Projects
-- ============================================================

DELETE FROM projects;

INSERT INTO projects (title, description, tags, image, demo, code, "order") VALUES
(
  'Calculadora Web',
  'Calculadora funcional con diseño minimalista. Soporta operaciones básicas, historial de cálculos y atajos de teclado.',
  ARRAY['Angular', 'TypeScript', 'SCSS'],
  '',
  'https://calculadora-demo.vercel.app',
  'https://github.com/pipegmacias00/calculadora-web',
  1
),
(
  'Sistema de Créditos',
  'Aplicación interna para la gestión y seguimiento de créditos corporativos. Integra servicios SOAP/REST y flujos de aprobación multi-etapa.',
  ARRAY['Angular', 'Java', 'JSF', 'SQL', 'REST API', 'SOAP'],
  '',
  '',
  '',
  2
),
(
  'Design System Interno',
  'Biblioteca de componentes reutilizables para estandarizar la experiencia visual de aplicaciones legadas del banco.',
  ARRAY['Angular', 'TypeScript', 'SCSS', 'Storybook'],
  '',
  '',
  '',
  3
),
(
  'Portafolio Personal',
  'Este portafolio: SPA construida con Angular 17, integrada con Supabase para contenido dinámico y desplegada en Vercel.',
  ARRAY['Angular', 'Supabase', 'TypeScript', 'SCSS'],
  '',
  'https://portafolio-andres.vercel.app',
  'https://github.com/pipegmacias00/portafolio',
  4
);

-- 4. Datos — Experience
-- ============================================================

DELETE FROM experience;

INSERT INTO experience (role, company, period, active, description, highlights, tags, "order") VALUES
(
  'Desarrollador Junior',
  'Banco de Bogotá',
  '2022 — Presente',
  TRUE,
  'Desarrollo, mejora e implementación de funcionalidades en las aplicaciones del equipo, enfocadas en la gestión de créditos corporativos y procesos de desembolso. Participación en proyectos de modernización tecnológica con AWS, Node.js y Angular.',
  ARRAY[
    'Optimización de consultas y servicios que redujeron los tiempos de respuesta de procesos críticos.',
    'Diseño e implementación de un Design System interno para una aplicación legada, estandarizando la experiencia visual del equipo.',
    'Participación en la migración de servidores y servicios deprecados hacia infraestructura moderna.'
  ],
  ARRAY['Java', 'JSF', 'SQL', 'SOAP', 'REST API', 'AWS', 'Angular'],
  1
);

-- 5. Datos — Education
-- ============================================================

DELETE FROM education;

INSERT INTO education (type, title, institution, icon, "order") VALUES
('Pregrado',        'Ingeniería de Sistemas',          'Universidad Cooperativa de Colombia — 2023', '🎓', 1),
('Especialización', 'Desarrollo Frontend & JavaScript', 'Platzi / Udemy',                            '💻', 2),
('Especialización', 'Backend, Bases de Datos & Cloud',  'Platzi / Udemy',                            '⚙️', 3),
('Especialización', 'DevOps: Contenedores, IaC & CI/CD','Platzi / Udemy',                            '☁️', 4);
