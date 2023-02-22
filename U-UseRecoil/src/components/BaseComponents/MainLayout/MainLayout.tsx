import React from 'react';
import { Layout } from 'antd';
import { Content, Header, Footer } from 'antd/lib/layout/layout';
import { IMainLayoutProps, IMainLayoutState } from './IProps';
import SystemMenu from './SystemMenu/SystemMenu';
import { useSetState } from 'ahooks';
import { withRouter } from 'react-router-dom';
import SystemHeader from './SystemHeader/SystemHeader';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs';
import './MainLayout.less';

const Sider = Layout.Sider;

const initState: IMainLayoutState = {
    isCollapsed: false, // 侧边栏展开收起状态
};

/**
 * 布局
 * @param props IMainLayoutProps
 * @returns MainLayout
 */
const MainLayout: React.FC<IMainLayoutProps> = (props) => {
    const [state, setState] = useSetState<IMainLayoutState>(initState);
    const { children } = props;

    // 改变侧边栏展开或收起状态
    const onCollapesed = () => {
        setState({
            isCollapsed: !state.isCollapsed,
        });
    };

    return (
        <Layout className="main_layout">
            <Header className="main_header">
                <SystemHeader />
            </Header>
            <Layout className="sub_layout">
                <Sider
                    className="sidebar"
                    theme="light"
                    collapsed={state.isCollapsed}
                >
                    <SystemMenu
                        onCollapesed={onCollapesed}
                        isCollapsed={state.isCollapsed}
                    />
                </Sider>
                <div className="main_content">
                    {/* TODO 面包屑组件放在这里还是放在 Content 里面  */}
                    <BreadCrumbs />
                    <Content className="content">{children}</Content>
                    <Footer className="footer">&copy; 公司名称</Footer>
                </div>
            </Layout>
        </Layout>
    );
};

export default withRouter(MainLayout);
