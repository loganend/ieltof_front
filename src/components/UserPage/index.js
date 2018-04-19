import React, {Component} from "react";
import styles from "./UserPage.css";
import classNames from "classnames";
import ChatPage from "components/ChatPage";

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props;
        this.state.avatar = "";
        console.log(this.state.user.name);

    }

    componentDidMount() {
        // window.FB.api(
        //     '/1919046028165378/picture?type=small',
        //     'GET',
        //     {"redirect":"false"},
        //     (response) => {
        //         console.log(response)
        //     }
        // );

        window.FB.api(
            "/me/picture",
            {
                "redirect": false,
                "type": "large"
            },
            (response) => {
                console.log(response)
                console.log(response.data.url)
                this.state.avatar = response.data.url;
                this.setState({})
                if (response && !response.error) {
                    /* handle the result */
                }
            }
        );
    }

    render() {
        return (
            <div>
                <navbar>
                    <div className={styles.navbar_content}>
                        <div className={styles.navbar_content_main}>
                            <div className={styles.porfile_navbar}>
                                <a>
                                    <img className={styles.profile_picture_navbar} src={this.state.avatar}/>
                                </a>
                                <div className={classNames({"dropdown": true, [styles.name_navbar]: true})}>
                                    <a className={styles.name_profile_button} style={{color: "#fff"}} type="button"
                                       id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="true">
                                        <div className={styles.bold} style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {this.state.user.name} <i className={classNames({
                                            "fa": true,
                                            "fa-caret-down": true,
                                            [styles.fa_caret_down]: true
                                        })}></i></div>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <li><a href="/profile/" ng-bind-html="'NAVBAR_PROFILE' | translate">Profile</a>
                                        </li>
                                        <li><a href="/buddies/" ng-bind-html="'NAVBAR_FRIENDS' | translate">Friends</a>
                                        </li>
                                        <li><a href="/settings/"
                                               ng-bind-html="'NAVBAR_SETTINGS' | translate">Settings</a></li>
                                        <li role="separator" class="hl"></li>
                                        <li><a report-problem="" report-from="Navbar">Report a problem</a></li>
                                        <li><a logout="">Log out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menu_navbar_container} style={{color: 'white'}}>
                            <ul className={styles.main_navigation_navbar}>
                                <li>
                                    <a>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_group_chat}></i>
                                                {/*<i className="icon-set-1 icon-group-chat middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle" ng-bind-html="'COMMUNITY' | translate">Community</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_chat_double_bubble}></i>
                                                {/*<i className="icon-set-1 icon-chat-double-bubble middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle" ng-bind-html="'HEADING_MESSAGE' | translate">Messages</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </navbar>
                <div className={classNames({"container-app": true, [styles.container_app_inbox]: true})}>
                    <ChatPage/>
                </div>
            </div>
        )
    }
}

