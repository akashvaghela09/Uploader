import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../Components/Dashboard';
import { DownloadPage } from '../Components/DownloadPage';
import { FAQ } from '../Components/FAQ';
import { Login } from '../Components/Login';
import { NotFound } from '../Components/NotFound';
import { Registration } from '../Components/Registration';
import { UploadPage } from '../Components/UploadPage';

const Allroutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <UploadPage />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/faq">
                    <FAQ />
                </Route>
                <Route exact path="/download/:store/:fileId/:fileName" component={DownloadPage}>
                    <DownloadPage/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </div>
    )
}

export { Allroutes }