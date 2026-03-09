/**
 * Server-side input validation utilities
 */

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Basic format check
  if (!emailRegex.test(email)) return false;
  
  // Additional validations
  const [localPart, domain] = email.split('@');
  
  // Check local part (before @)
  if (!localPart || localPart.length > 64) return false;
  
  // Check domain part (after @)
  if (!domain || domain.length > 255) return false;
  
  // Domain must have at least one dot
  if (!domain.includes('.')) return false;
  
  // Domain parts validation
  const domainParts = domain.split('.');
  if (domainParts.some(part => !part || part.length > 63)) return false;
  
  return true;
}

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns true if valid, false otherwise
 */
export function isValidPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  
  if (password.length < 12) return false;
  
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
}

/**
 * Validates habit title format
 * @param title - Title string to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateHabitTitle(title: string): string | undefined {
  const titlePattern = /^[A-Za-z0-9]{3,30}$/;
  if (!titlePattern.test(title)) {
    return "El título debe tener entre 3 y 30 caracteres, sin espacios ni caracteres especiales.";
  }
  return undefined;
}

/**
 * Validates initial date
 * @param initialDate - Date string in YYYY-MM-DD format
 * @returns Error message if invalid, undefined if valid
 */
export function validateInitialDate(initialDate: string): string | undefined {
  if (!initialDate) {
    return "La fecha inicial es obligatoria.";
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initial = new Date(`${initialDate}T00:00:00`);
  
  if (initial < today) {
    return "La fecha inicial no puede ser anterior a hoy.";
  }
  
  return undefined;
}

/**
 * Validates end date relative to initial date
 * @param endDate - End date string in YYYY-MM-DD format
 * @param initialDate - Initial date string in YYYY-MM-DD format
 * @returns Error message if invalid, undefined if valid
 */
export function validateEndDate(endDate: string, initialDate: string): string | undefined {
  if (!endDate || !initialDate) return undefined;
  
  const initial = new Date(`${initialDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  
  if (end <= initial) {
    return "La fecha final debe ser posterior a la fecha inicial.";
  }
  
  return undefined;
}

/**
 * Validates debt value
 * @param debtValue - Formatted debt value string (e.g., "$5.000")
 * @returns Error message if invalid, undefined if valid
 */
export function validateDebtValue(debtValue: string): string | undefined {
  const numericDebt = Number(debtValue.replaceAll('$', '').replaceAll('.', '').replaceAll(',', ''));
  if (!numericDebt || numericDebt <= 0) {
    return "El valor de la deuda debe ser mayor a 0.";
  }
  return undefined;
}

/**
 * Validates repository selection
 * @param repoOwner - Repository owner username
 * @param repoName - Repository name
 * @returns Error message if invalid, undefined if valid
 */
export function validateRepository(repoOwner: string, repoName: string): string | undefined {
  if (!repoOwner || !repoName) {
    return "Debe seleccionar un repositorio.";
  }
  return undefined;
}
