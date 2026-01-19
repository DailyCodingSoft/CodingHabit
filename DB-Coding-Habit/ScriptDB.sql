--Base De Datos CodingHabit 
---Se crea el Script base para los usuarios 
---Credo el 18-01-2026 por Sebastian Lopez 
---Modificado por
--Favor Seguir este formato para poder seguir el rastro sin depender de los comits

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_biography TEXT,
  github_link VARCHAR(255),
  user_email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programing_languages (
  PL_ID SERIAL PRIMARY KEY,
  Language_name VARCHAR(100) NOT NULL,
  pl_Info TEXT,
  pl_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS language_dependencies (
  LD_ID SERIAL PRIMARY KEY,
  base_language INT NOT NULL,
  dependency_language INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_base_language
    FOREIGN KEY (base_language) REFERENCES programing_languages(PL_ID) ON DELETE CASCADE,
  CONSTRAINT fk_dependency_language
    FOREIGN KEY (dependency_language) REFERENCES programing_languages(PL_ID) ON DELETE CASCADE,
  CONSTRAINT chk_no_self_dependency
    CHECK (base_language <> dependency_language)
);

CREATE TABLE IF NOT EXISTS user_languages (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  language_id INT NOT NULL,
  nivel VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_language
    FOREIGN KEY (language_id) REFERENCES programing_languages(PL_ID) ON DELETE CASCADE,
  CONSTRAINT uq_user_language
    UNIQUE (user_id, language_id)
  );
