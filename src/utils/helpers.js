/**
 * Formats a number to USD currency string
 * @param {number} value 
 * @returns {string} 
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

/**
 * Creates an HTML element from a string
 * @param {string} htmlString 
 * @returns {Element}
 */
export function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
}
