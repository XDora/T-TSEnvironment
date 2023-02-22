const routerConfigs = (intl: any) => {
    if (!intl) return;

    return {
        menus: [
            {
                key: '/app/menu',
                title: '菜单1',
                icon: '',
                subs: [
                    {
                        key: '/app/menu1',
                        title: '菜单1-1',
                        icon: '',
                        component: 'ResourcesExcavate',
                    },
                    {
                        key: '/app/menu2',
                        title: '菜单1-2',
                        icon: '',
                        component: 'NetworkAnalysis',
                    },
                ],
            },
        ],
        others: [
            {
                key: '/app/systemHome',
                title: '状态管理',
                icon: '',
                component: 'SystemHome',
            },
        ],
    };
};

export default routerConfigs;
