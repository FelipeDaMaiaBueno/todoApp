import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Create from './pages/create';
import Delete from './pages/delete';
import Update from './pages/update';
import Teste from './pages/teste';

const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/produtos/add" component={Create} />
        <Route path="/produtos/delete" component={Delete} />
        <Route path="/produtos/update" component={Update} />
        <Route path="/produtos/teste" component={Teste} />
        
        </Switch>
    </BrowserRouter>
);

export default Routes;