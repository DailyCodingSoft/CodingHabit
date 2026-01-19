---Datos para insertar dentro de la base de datos Datos CodingHabit para Dev
--Se crean los datos paara la seccion de usaraios
---Credo el 18-01-2026 por Sebastian Lopez 
---Modificado por
--Favor Seguir este formato para poder seguir el rastro sin depender de los comits
INSERT INTO users (user_name, user_biography, github_link, user_email, user_password)
VALUES
('Sebastian Lopez', 'Fullstack developer', 'https://github.com/sebalopez', 'sebastian@mail.com', 'hashed_password_1'),
('Maria Gomez', 'Frontend developer', 'https://github.com/mariag', 'maria@mail.com', 'hashed_password_2');
INSERT INTO programing_languages (Language_name, pl_Info, pl_type)
VALUES
('Python', 'General purpose programming language', 'language'),
('JavaScript', 'Language for web development', 'language'),
('TypeScript', 'Typed superset of JavaScript', 'language'),
('HTML', 'Markup language for web', 'language'),
('Flask', 'Python web framework', 'framework'),
('React', 'JavaScript UI library', 'framework'),
('Next.js', 'React framework for SSR', 'framework');
-- Flask depende de Python
INSERT INTO language_dependencies (base_language, dependency_language)
VALUES (5, 1);

-- React depende de JavaScript
INSERT INTO language_dependencies (base_language, dependency_language)
VALUES (6, 2);

-- Next.js depende de React, JS, TS y HTML
INSERT INTO language_dependencies (base_language, dependency_language)
VALUES
(7, 6),
(7, 2),
(7, 3),
(7, 4);
INSERT INTO user_languages (user_id, language_id, nivel)
VALUES
(1, 1, 'advanced'),      -- Sebastian → Python
(1, 2, 'advanced'),      -- Sebastian → JavaScript
(1, 6, 'intermediate'),  -- Sebastian → React
(2, 2, 'advanced'),      -- Maria → JavaScript
(2, 7, 'intermediate');  -- Maria → Next.js
