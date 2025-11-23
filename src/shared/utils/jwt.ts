
/**
 * Extracts payload of JWT
 * 
 * @param {string} jwt - JWT token as string 
 * @returns {Record<string, unknown>} dictionary of JWT payload
 */
export const parseJWT = (jwt: string): Record<string, unknown> => {
    const payload = JSON.parse(atob(jwt.split('.')[1]))
    return payload;
}