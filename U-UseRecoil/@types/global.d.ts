declare let userName: string;

interface IAppConfig {
    name: string;
}

interface Window {
    less: any;
    appConfig: IAppConfig;
}
