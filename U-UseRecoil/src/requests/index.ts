import { deleteCookie, getCookie } from '@src/utils/cookie';
import { setParamsToUrl } from '@src/utils/setParamsToUrl';
import { message } from 'antd';
import axios, {
    AxiosProgressEvent,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const base = '/api';

interface IOnFulfilledRequest {
    (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any>;
}

interface IOnFulfilledResponse {
    (value: AxiosResponse<any, any>):
        | AxiosResponse<any, any>
        | Promise<AxiosResponse<any, any>>;
}

const onFulfilledRequest: IOnFulfilledRequest = (config) => {
    const token = getCookie('token');
    config.headers['token'] = token;
    return config;
};

const onRejectedRequest = (error: any): any => {
    message.error('网络请求超时');
    return Promise.reject(error);
};

// 请求前拦截
axios.interceptors.request.use(onFulfilledRequest, onRejectedRequest);

const onFulfilledResponse: IOnFulfilledResponse = (value) => {
    return value.data;
};

const onRejectedResponse = (error: any): any => {
    if (!error.response) {
        message.error('服务器内部错误');
        return Promise.reject(error);
    }

    // 请求状态
    let status = error.response.status;
    switch (status) {
        case 504:
            message.error('服务器内部错误');
            break;
        case 500:
            message.error('服务器开小差了');
            break;
        case 502:
            message.error(
                '服务异常，可能存在一下问题：1、服务正在部署 2、其他内部问题'
            );
            break;
        case 401:
            message.warning('登录信息失效');
            window.location.hash = '/app/login';
            deleteCookie('token');
            deleteCookie('authType');
            break;
        case 400:
            message.error('请求传递参数错误');
            break;
        case 404:
            message.error('请求接口不存在');
            break;
        case 405:
            message.error('请求类型错误');
            break;
        default:
            message.error('服务器内部错误');
    }

    return Promise.reject(error);
};

// 返回后拦截
axios.interceptors.response.use(onFulfilledResponse, onRejectedResponse);

/**
 * requsetParam 请求(表单方式提交数据)
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const postRequestParam = (
    url: string,
    params: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    return axios({
        method: 'POST',
        url: `${baseUrl || base}${url}`,
        data: params,
        transformRequest: [
            (data): string => {
                let ret = '';
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&';
                }

                return ret;
            },
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

/**
 * RequestBody 请求(json 方式提交数据)
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const post = (
    url: string,
    params: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    return axios({
        method: 'POST',
        url: `${baseUrl || base}${url}`,
        data: params,
        headers: {
            charset: 'UTF-8',
            'Content-Type': 'application/json',
        },
    });
};

/**
 * GET 方式提交或获取数据
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const get = (
    url: string,
    params?: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    return axios({
        method: 'GET',
        url: setParamsToUrl(`${baseUrl || base}${url}`, params),
        headers: {
            charset: 'UTF-8',
            'Content-Type': 'application/json',
        },
    });
};

/**
 * post 文件下载
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const postDownload = (
    url: string,
    params: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    return axios({
        method: 'POST',
        url: `${baseUrl || base}${url}`,
        data: params,
        responseType: 'blob',
    });
};

/**
 * get 文件下载
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const getDownload = (
    url: string,
    params: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    return axios({
        method: 'GET',
        url: `${baseUrl || base}${url}`,
        data: params,
        responseType: 'blob',
    });
};

/**
 * 文件上传
 * @param url 请求地址
 * @param params 请求参数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const upload = (
    url: string,
    params: any,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    // 创建 formData
    let data = new FormData();

    // 配置传递参数
    Object.keys(params).forEach((item: string) => {
        data.append(item, params[item]);
    });
    return axios({
        method: 'POST',
        url: `${baseUrl || base}${url}`,
        data,
        headers: {
            charset: 'UTF-8',
            'Content-Type': 'multipart/form-data',
        },
    });
};

/**
 * 文件上传
 * @param url 请求地址
 * @param params 请求参数
 * @param onUploadProgress 上传进度函数
 * @param baseUrl 请求代理地址
 * @returns 请求返回数据
 */
export const progressUpload = (
    url: string,
    params: any,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    baseUrl?: string
): Promise<AxiosResponse<any, any>> => {
    // 创建 formData
    let data = new FormData();

    // 配置传递参数
    Object.keys(params).forEach((item: string) => {
        data.append(item, params[item]);
    });
    return axios({
        method: 'POST',
        url: `${baseUrl || base}${url}`,
        data,
        onUploadProgress,
        headers: {
            charset: 'UTF-8',
            'Content-Type': 'multipart/form-data',
        },
    });
};
