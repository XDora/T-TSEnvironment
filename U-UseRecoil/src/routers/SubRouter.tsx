import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ISubRouter, IRouterConfigs } from './IProps';
import intl from 'react-intl-universal';
import routerConfig from './routerConfigs';
import allComponents from './allComponents';
import Undeveloped from './Undeveloped';
import queryString from 'query-string';

const SubRouter: React.FC<ISubRouter> = (props) => {
    const routerConfigs = routerConfig(intl);
    const menus: IRouterConfigs[] = routerConfigs.menus;
    const others: IRouterConfigs[] = routerConfigs.others;
    const routerMenus = menus.concat(others);

    const requireLogin = (Component: any, merge: any) => {
        // const token=localStorage.getItem('token')
        const token = 'token';

        return !token ? <Redirect to="/app/login" /> : <Component {...merge} />;
    };

    const route = (r: IRouterConfigs, parent?: IRouterConfigs) => {
        let Component = allComponents[r.component] || Undeveloped;
        return (
            <Route
                key={r.key}
                path={r.key}
                render={(props) => {
                    let reg = /\?\S*/g;
                    // console.log('window', window.location);
                    let queryParams = window.location.hash.match(reg);
                    console.log(window.location);

                    // 去除参数空格
                    let { params } = props.match;
                    Object.keys(params).forEach((key) => {
                        params[key] =
                            params[key] && params[key].replace(reg, '');
                    });
                    props.match.params = { ...params };

                    // 合并组件参数
                    let merge = {
                        ...props,
                        ...r,
                        query: queryParams
                            ? queryString.parse(queryParams[0])
                            : {},
                    };
                    if (parent) merge.parentParam = { ...parent };
                    return requireLogin(Component, merge);
                }}
            />
        );
    };

    return (
        <Switch>
            {routerMenus.map((r: IRouterConfigs) => {
                return r.subs
                    ? r.subs.map((s: IRouterConfigs) => route(s, r))
                    : route(r);
            })}
            <Route render={() => <Redirect to="/app/404" />} />
        </Switch>
    );
};

export default SubRouter;
