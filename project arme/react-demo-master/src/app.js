import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import LoginContainer from "./login/login-container";
import AdminContainer from "./commons/admin/admin-container";
import ArmeContainer from "./commons/arme/arme-container";
import UtilizatorContainer from "./commons/utilizator/utilizator-container";
import CumparatorContainer from "./commons/cumparator/cumparator-container";
import AdminManagementContainer from "./commons/admin/admin-management-container";
import ArmeManagementContainer from "./commons/admin/arme-management-container";
import PersonManagementContainer from "./commons/admin/person-management-container";

class App extends React.Component {

    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/cumparator'
                            render={() => <CumparatorContainer/>}
                        />
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />
                        <Route
                            exact
                            path='/login'
                            render={() => <LoginContainer/>}
                        />
                        <Route
                            exact
                            path='/admin'
                            render={() => <AdminContainer/>}
                        />
                        <Route
                            exact
                            path='/arme'
                            render={() => <ArmeContainer/>}
                        />
                        <Route
                            exact
                            path='/client'
                            render={() => <UtilizatorContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/adminManage'
                            render={() => <AdminManagementContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/armeManage'
                            render={() => <ArmeManagementContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/personManage'
                            render={() => <PersonManagementContainer/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
