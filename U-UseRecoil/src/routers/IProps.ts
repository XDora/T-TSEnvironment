export interface ISubRouter {
    [key: string]: any;
}

export interface IRouterConfigs {
    key: string;
    title: string;
    icon: string;
    component?: string;
    subs?: IRouterConfigs[];
}
