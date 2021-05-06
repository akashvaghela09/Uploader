import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DeletePage } from '../Components/DeletePage';
import { DownloadPage } from '../Components/DownloadPage';
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
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route exact path="/delete">
                    <DeletePage />
                </Route>
                <Route exact path="/download/:code/:md5/:file" component={DownloadPage}>
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