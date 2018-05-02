import React, {Component} from "react";
import styles from "./CommunityPeople.css";

import CommunityPerson from './CommunityPerson';



export default class CommunityPeople extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            users: this.props.data.users
        }
    }

    renderComunityPeople() {
        let users = this.state.users;
        let list_users = [];

        if(users === null || users === undefined ){
            return
        }

        for (let i = 0; i < users.length; i++) {
            list_users.push(<CommunityPerson data={users[i]}/>)
        }

        return list_users
    }

    render() {
        this.state.users = this.props.data.users;
        console.log(this.props);
        return (
            <div className={styles.container_app_table}>
                <div>
                    {this.renderComunityPeople()}
                    {/*<CommunityPerson/>*/}
                    {/*<CommunityPerson/>*/}
                    {/*<CommunityPerson/>*/}
                    {/*<CommunityPerson/>*/}
                </div>
            </div>
        )
    }

}
