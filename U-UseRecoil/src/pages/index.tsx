import SubRouter from '../routers/SubRouter';
import MainLayout from '@src/components/BaseComponents/MainLayout/MainLayout';
import { withRouter } from 'react-router-dom';

function App() {
    return (
        <MainLayout>
            <SubRouter />
        </MainLayout>
    );
}

export default withRouter(App);
