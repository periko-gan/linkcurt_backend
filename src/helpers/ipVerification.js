/**
 * Validates if the given string is a valid IPv4 address.
 *
 * @param {string} ip - The IP address to be validated.
 * @return {boolean} Returns true if the IP address is valid, otherwise false.
 */
export function isValidIp(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    return regex.test(ip);
}
