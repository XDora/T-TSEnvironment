/**
 * 将对象转换成 querystring 的字符串
 * @param url 请求地址
 * @param params 请求参数
 * @returns querystring 字符串
 */

export const setParamsToUrl = (url: string, params: any): string => {
    let urlStr: string = url;
    if (params && Object.keys(params).length) {
        urlStr += '?';
        Object.keys(params).forEach((item: string, index: number) => {
            if (params[item] === void 0 || params[index] === null) {
                return;
            }
            if (index === Object.keys(params).length - 1) {
                urlStr += item + '=' + params[item];
            } else {
                urlStr += item + '=' + params[item] + '&';
            }
        });
    }
    return urlStr;
};
