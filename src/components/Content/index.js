import React, {Component} from 'react';

import styles from './Content.css'

export default class Content extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={styles.content}>
                {this.props.data}
            </div>
        )
    }
}

