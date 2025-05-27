
/**
 * Generates a random 4-character alphanumeric short link.
 *
 * @return {string} Returns a randomly generated 4-character string composed of uppercase, lowercase letters, and digits.
 */
export function generateShortLink() {
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * char.length);
        code += char.charAt(index);
    }
    return code;
}
