import React, {Component} from "react";
import styles from "./Community.css";
import CommunityPeople from "./CommunityPeople";
import UserStore from "../../stores/UserStore";
import * as UserServices from "../../services/UserServices";

export default class Community extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: UserStore.getProfile(),
            users: []
        }
    }

    componentDidMount() {
        // UserServices.getAllUsers();
        if (this.state.profile.Id !== undefined) {
            UserServices.getOnlineUsers();
        }
    }


    componentWillMount() {
        UserStore.on("get_users_event", this.onGetUsersEvent.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("get_users_event", this.onGetUsersEvent.bind(this));
    }

    onGetUsersEvent() {
        let users = UserStore.getUsers();
        console.log(users);
        this.setState({users: users})
    }

    render() {
        console.log(1);
        return (
            <div className={styles.container_app_table}>
                <div className={styles.live_container}>
                    <header-people style={{marginBottom: 20}}>
                        <h2 className={styles.page_title}>Community</h2>
                        <div className={styles.people_tab}>
                            <ul style={{width: '100%'}}>
                                <li>
                                    <a className={styles.active}>All</a>
                                </li>
                                <li>
                                    <a>IELTS</a>
                                </li>
                                <li>
                                    <a>TOEFL</a>
                                </li>
                                <li>
                                    <a>CAE</a>
                                </li>
                                <li>
                                    <a>FCE</a>
                                </li>
                            </ul>
                        </div>
                    </header-people>
                    <CommunityPeople data={this.state}/>
                </div>
                {/*<ChatBox/>*/}
            </div>
        )
    }
}
