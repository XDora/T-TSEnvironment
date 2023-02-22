import '@babel/polyfill';
import 'core-js/es/map';

import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './routers/AppRouter';
import intl from 'react-intl-universal';
import en from './i18n/en-US';
import zh from './i18n/zh-CN';
import './styles/index.less';
import 'antd/dist/reset.css';

intl.init({
    currentLocale: 'en',
    locales: {
        zh,
        en,
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
