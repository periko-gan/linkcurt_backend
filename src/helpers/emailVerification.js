/**
 * Verifies if the given email address is valid according to a standard email format.
 *
 * @param {string} email - The email address to be verified.
 * @return {boolean} Returns true if the email address is valid, false otherwise.
 */
export function emailVerification(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

}
