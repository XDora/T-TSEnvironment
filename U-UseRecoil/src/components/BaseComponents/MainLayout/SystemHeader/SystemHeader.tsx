import React from 'react';
import './SystemHeader.less';

const appName = window.appConfig.name || '项目名称';

export default function SystemHeader() {
    return (
        <div className="system_top">
            <div className="system_info">
                {/*  TODO 放置logo图片 */}
                {/* <div className="system_logo">logo</div> */}
                <div className="system_name">{appName}</div>
                <div className="system_version">[v 0.0.1]</div>
            </div>
            <div className="system_status">
                {/* 123 */}
                {/*  TODO 完善登录、告警管理 */}
            </div>
        </div>
    );
}
