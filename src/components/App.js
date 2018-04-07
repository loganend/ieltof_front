import React from 'react';

import Content from 'components/Content';
import MainPage from 'components/MainPage';
import TestPage from 'components/TestPage';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            content: <TestPage/>
        }
    }

    render() {
        return (
            <Content data={this.state.content}/>
        )
    }
}