/**
 * Created by olgundutkan on 24.03.2020
 */

/**
 * If has client id key in local storage return this value
 * If has not client id key in local storage return null
 * @returns {string|null}
 */
export const getClientInLocalStorage = () => {
    const clientSessionStr = localStorage.getItem("client");

    if (!clientSessionStr) {
        return null;
    }
    return JSON.parse(clientSessionStr);
};

/**
 * Set value of client id local storage
 * @param data
 */
export const setClientInLocalStorage = (data) => {
    return localStorage.setItem("client", JSON.stringify(data));
};

/**
 * Remove client key on local storage
 */
export const removeClientInLocalStorage = () => {
    return localStorage.removeItem("client");
};