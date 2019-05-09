import React from 'react';
import { Label } from 'semantic-ui-react'


import "../Header/styles.css";

//pra usar o icon do fa só colocar a url no index.html
//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

const Header = () => (
    <div id="box-container">
        <header>
            <i class="fas fa-tasks"></i>
            <h1>To Do</h1>
        </header>

    </div>
);

export default Header;