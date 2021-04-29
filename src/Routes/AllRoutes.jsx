import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UploadPage } from '../Components/UploadPage';

const Allroutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <UploadPage />
                </Route>
                <Route exact path="/download">
                    <h1>Download</h1>
                </Route>
            </Switch>
        </div>
    )
}

export { Allroutes }