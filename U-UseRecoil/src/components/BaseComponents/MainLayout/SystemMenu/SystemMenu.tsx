import React from 'react';
import { Menu } from 'antd';
import { ISystemMenuProps, ISystemMenuState, IRouterConfigs } from './IProps';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import routerConfigs from '@src/routers/routerConfigs';
import { useMount, useSetState } from 'ahooks';
import intl from 'react-intl-universal';
import type { MenuProps } from 'antd';
import { withRouter } from 'react-router-dom';
import './SystemMenu.less';

type MenuItem = Required<MenuProps>['items'][number];
const initState: ISystemMenuState = {
    menuItem: [], // 菜单内容
    selectedKeys: [''], // 被选中的菜单
    openKeys: [''], // 打开的菜单
};

/**
 * 菜单栏
 * @param props ISystemMenuProps
 * @returns SystemMenu
 */
const SystemMenu: React.FC<ISystemMenuProps> = (props) => {
    const [state, setState] = useSetState<ISystemMenuState>(initState);
    const { onCollapesed, isCollapsed, history } = props;

    useMount(() => {
        const routerConfig = routerConfigs(intl);
        const menu: IRouterConfigs[] = routerConfig.menus;
        const other: IRouterConfigs[] = routerConfig.others;
        const allMenu = other.concat(menu);
        const menuItem = formatMenuItem(allMenu);
        setDefaultOptions(allMenu);
        setState({
            menuItem,
        });
    });

    // 设置默认选中和展开item
    const setDefaultOptions = (menu: IRouterConfigs[]) => {
        if (menu[0].subs) {
            setState({
                openKeys: [menu[0].key],
                selectedKeys: [menu[0].subs[0].key],
            });
        } else {
            setState({
                selectedKeys: [menu[0].key],
                openKeys: [''],
            });
        }
    };

    // 格式化 MenuItem
    const formatMenuItem = (menu: IRouterConfigs[]): MenuItem[] => {
        return menu.map((item: IRouterConfigs) => {
            if (item.subs) {
                return {
                    key: item.key,
                    label: item.title,
                    // icon: item.icon,
                    icon: <MenuUnfoldOutlined />,
                    theme: 'light',
                    title: item.title,
                    children: item.subs ? formatMenuItem(item.subs) : [],
                };
            }

            // TODO  引入自己的字体库
            return {
                key: item.key,
                label: item.title,
                // icon: item.icon,
                icon: <MenuUnfoldOutlined />,
                theme: 'light',
                title: item.title,
            };
        });
    };

    // 点击 MenuItem 调用此函数
    const onClick = ({ key, keyPath }) => {
        history.push(key);
        if (isCollapsed) onCollapesed();
        setTimeout(() => {
            setState({
                openKeys: keyPath,
                selectedKeys: key,
            });
        }, 10);
    };

    // Menu 展开/关闭的回调
    const onOpenChange = (openKeys: string[]) => {
        setState({ openKeys });
    };

    return (
        <div className="system_menu">
            <Menu
                selectedKeys={state.selectedKeys}
                openKeys={state.openKeys}
                items={state.menuItem}
                mode="inline"
                onClick={onClick}
                onOpenChange={onOpenChange}
                theme="light"
            />
            <div className="collapsed_btn">
                {!isCollapsed ? (
                    <MenuFoldOutlined onClick={onCollapesed} />
                ) : (
                    <MenuUnfoldOutlined onClick={onCollapesed} />
                )}
            </div>
        </div>
    );
};

export default withRouter(SystemMenu);
