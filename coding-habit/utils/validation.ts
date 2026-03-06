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
