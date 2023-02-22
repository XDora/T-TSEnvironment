import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export interface ISystemMenuProps {
    onCollapesed: () => void;
    isCollapsed: boolean;
    history: any;
}

export interface ISystemMenuState {
    menuItem: MenuItem[];
    selectedKeys: string[];
    openKeys: string[];
}

export interface IRouterConfigs {
    key: string;
    title: string;
    icon: string;
    component?: string;
    subs?: IRouterConfigs[];
}
