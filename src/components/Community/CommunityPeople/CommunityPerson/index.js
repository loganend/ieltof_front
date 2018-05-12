import React, {Component} from "react";
import classNames from "classnames";
import styles from "./CommunityPerson.css";
import UserStore from "../../../../stores/UserStore";
import * as UserServices from "../../../../services/UserServices";

export default class CommunityPerson extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            person: this.props.data,
            isRequestFriend: false
        }
    }

    componentWillMount() {
        UserStore.on("request_friend_" + this.state.person.Id, this.onPressFriendRequest.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeListener("request_friend_" + this.state.person.Id, this.onPressFriendRequest.bind(this));
    }

    onPressFriendRequest() {
        this.setState({isRequestFriend: true})
    }

    render() {

        return (
            <div className={styles.community_grid_cell}>
                <display-user-card>
                    <div className={classNames({[styles.card]: true, [styles.community_card]: true})}>
                        <div>

                            <div className={classNames({[styles.community_profile_picture_container]: true})}>
                                {/*<div className={classNames({[styles.new_user_badge_community]: true, [styles. new_user_badge_position_community]: true })} >*/}
                                {/*NEW*/}
                                {/*</div>*/}
                                <img className={styles.profile_picture_community}
                                     src={this.state.person.url}/>
                            </div>


                            <div className={styles.community_info_container}>
                                <div className={styles.community_personal_info_name}>
                                    <b>{this.state.person.name}</b>
                                    {/*<span className={styles.community_personal_info_age}>21</span>*/}
                                    <dot-connected>
                                        <i className={classNames({
                                            "fa": true,
                                            "fa-circle": true,
                                            [styles.dot_connected]: true
                                        })}></i>
                                    </dot-connected>
                                </div>


                                <div className={styles.community_description_container}>Say Hii 😎
                                    insta:modyrabie
                                </div>
                                {(UserStore.getFriend(this.state.person.Id) === undefined || UserStore.getFriend(this.state.person.id) === null) && !this.state.isRequestFriend ?

                                    <div style={{marginTop: 10}} onClick={this.sendRequestToFriends.bind(this)}>
                                        <p>Add to friend</p>
                                    </div> :
                                    <div style={{marginTop: 10}}>
                                        <p>Your friend :)</p>
                                    </div>
                                }


                                {/*<div className={styles.community-flag-container} >*/}
                                {/*<div className={styles.community-flag-container} class="community-native-flag-container">*/}
                                {/*<div>NATIVE*/}
                                {/*</div>*/}
                                {/*<flag-language language-level="6" more-languages="0" user="user">*/}
                                {/*<div className={classNames({[styles.community_profile_picture_container]: true})}*/}
                                {/*class="container-native-language relative container-flag">*/}
                                {/*<div className={styles.display_table}>*/}
                                {/*<div className={styles.community-flag-container} class="language-container-flag">*/}

                                {/*<div class="flag40 English40"></div>*/}


                                {/*</div>*/}


                                {/*</div>*/}


                                {/*</div>*/}
                                {/*</flag-language>*/}
                                {/*</div>*/}
                                {/*<div className={styles.community-flag-container} class="community-non-native-flag-container">*/}
                                {/*<div>LEARNING*/}
                                {/*</div>*/}
                                {/*<flag-language user="user" more-languages="0">*/}
                                {/*<div className={styles.community-flag-container} class="container-flag relative">*/}
                                {/*<div className={styles.display_table}>*/}
                                {/*<div className={styles.community-flag-container} class="language-container-flag">*/}
                                {/*<div class="flag40 Russian40"></div>*/}

                                {/*</div>*/}
                                {/*<div class="inline display-table-cell">*/}
                                {/*<div class="language-levels">*/}
                                {/*<div class="language-level level-1">*/}
                                {/*<div class="complete-level">*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div class="language-level level-2">*/}
                                {/*<div>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div class="language-level level-3">*/}
                                {/*<div class="uncomplete-level">*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div class="language-level level-4">*/}
                                {/*<div class="uncomplete-level">*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div class="language-level level-5">*/}
                                {/*<div class="uncomplete-level">*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</div>*/}

                                {/*</div>*/}


                                {/*</div>*/}
                                {/*</flag-language>*/}
                                {/*</div>*/}
                                {/*</div>*/}

                            </div>
                        </div>

                    </div>
                </display-user-card>
            </div>
        )
    }

    sendRequestToFriends() {
        let profile = UserStore.getProfile();
        UserServices.sendRequestToFriends(profile.Id, this.state.person.Id);
    }

}
