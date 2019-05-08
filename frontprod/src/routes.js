import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Main from './pages/main';
import Create from './pages/create';
import Delete from './pages/delete';
import Update from './pages/update';

const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/todo/add" component={Create} />
        <Route path="/todo/delete/:idtodo" component={Delete} />
        <Route path="/todo/update/:idtodo" component={Update} />
        </Switch>
    </BrowserRouter>
);

export default Routes;