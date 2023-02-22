/**
 * 设置cookie
 * @param name 名字
 * @param value 值
 * @param day 期限
 */

export const setCookie = (name: string, value: any, day: number): void => {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = `${name}=${value};expires=${date}`;
};

/**
 * 获取 cookie
 * @param name 名字
 * @returns cookie 值
 */
export const getCookie = (name: string): string => {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
};

/**
 * 删除 cookie
 * @param name 名字
 */
export const deleteCookie = (name: string): void => {
    setCookie(name, null, -1);
};
