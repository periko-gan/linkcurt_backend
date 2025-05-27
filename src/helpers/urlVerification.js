/**
 * Validates if the given URL is in the correct format.
 *
 * @param {string} url - The URL string to be verified.
 * @return {boolean} True if the URL is valid, otherwise false.
 */
export function urlVerification(url) {
    const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    return regex.test(url);
}
