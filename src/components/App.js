import React from 'react';

import Content from 'components/Content';
import MainPage from 'components/MainPage';
import TestPage from 'components/TestPage';
import MainStore from "../stores/MainStore";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            content: <MainPage/>
        }
    }

    componentWillMount() {
        MainStore.on("face_to_face_test", this.setFaceTestPage.bind(this));
    }

    componentWillUnmount() {
        MainStore.removeListener("face_to_face_test", this.setFaceTestPage.bind(this))
    }

    setFaceTestPage() {
        this.state.content = MainStore.getContent();
        this.setState({});
    }

    render() {
        return (
            <Content data={this.state.content}/>
        )
    }
}