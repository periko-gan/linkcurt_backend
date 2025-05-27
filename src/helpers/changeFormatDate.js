/**
 * Changes the format of a given date string from "DD-MM-YYYY" to "YYYY-MM-DD".
 *
 * @param {string} date - The date string in the format "DD-MM-YYYY".
 * @return {string} - The reformatted date string in the format "YYYY-MM-DD".
 */
export function changeFormatDate(date) {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
}
