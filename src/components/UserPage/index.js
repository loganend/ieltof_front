import React, {Component} from "react";
import styles from "./UserPage.css";
import classNames from "classnames";
import ChatPage from "components/ChatPage";
import Community from "components/Community";
import Tests from "components/Tests";
import * as MainServices from "../../services/MainServices";
import * as UserServices from "../../services/UserServices";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class UserPage extends React.Component {


    constructor(props) {
        super(props);

        this.state = this.props;

        cookies.set('facebookid', this.state.user.id, { path: '/' });
        console.log(cookies.get('facebookid'));

        this.state.avatar = "";
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Community/>
            </div>;
        console.log(this.state.user.name);
    }

    componentDidMount() {
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

                UserServices.getUser(this.state);
                this.setState({})
                if (response && !response.error) {
                    /* handle the result */
                }
            }
        );
    }

    facebookLogout() {
        MainServices.facebookLogout();
    }

    openCommunity() {
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Community/>
            </div>;
        this.setState({});
    }

    openMessages() {
        this.state.tab =
            <div className={classNames({"container-app": true, [styles.container_app_inbox]: true})}>
                <ChatPage/>
            </div>;
        this.setState({});
    }

    openTests() {
        this.state.tab =
            <div className={classNames({[styles.container_app]: true})}>
                <Tests/>
            </div>;
        this.setState({});
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
                                    <ul className={classNames({"dropdown-menu": true})} aria-labelledby="dropdownMenu1">
                                        <li><a href="/buddies/">Friends</a>
                                        </li>
                                        {/*<li><a href="/settings/"*/}
                                        {/*ng-bind-html="'NAVBAR_SETTINGS' | translate">Settings</a></li>*/}
                                        {/*<li role="separator" class="hl"></li>*/}
                                        {/*<li><a report-problem="" report-from="Navbar">Report a problem</a></li>*/}
                                        <li><a logout="" onClick={this.facebookLogout.bind(this)}>Log out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menu_navbar_container} style={{color: 'white'}}>
                            <ul className={styles.main_navigation_navbar}>
                                <li>
                                    <a onClick={this.openCommunity.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_group_chat}></i>
                                                {/*<i className="icon-set-1 icon-group-chat middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle" ng-bind-html="'COMMUNITY' | translate">
                                                    Community
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.openMessages.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_chat_double_bubble}></i>
                                                {/*<i className="icon-set-1 icon-chat-double-bubble middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle"
                                                     ng-bind-html="'HEADING_MESSAGE' | translate">Messages
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.openTests.bind(this)}>
                                        <div className={styles.navbar_link_container}>
                                            <div className={styles.navbar_left_icon}>
                                                <i className={styles.icon_test_speaking}></i>
                                                {/*<i className="icon-set-1 icon-chat-double-bubble middle"></i>*/}
                                            </div>
                                            <div className={styles.navbar_left_text}>
                                                <div className="inline middle"
                                                     ng-bind-html="'HEADING_MESSAGE' | translate">Go to Test
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </navbar>
                {this.state.tab}
            </div>
        )
    }
}

