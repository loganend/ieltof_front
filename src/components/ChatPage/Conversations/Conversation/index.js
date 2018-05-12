import React, {Component} from "react";
import styles from "./Conversation.css";
import classNames from "classnames";

import * as UserServices from "../../../../services/UserServices";

export default class Conversation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: this.props.friend
        }
    }

    render() {
        return (

            <a onClick={this.openDiaplog.bind(this)} className={classNames({[styles.conversation_in_messages]: true, [styles.selected_conversation]: true})}>
                <div className={classNames({[styles.conversation_in_messages_img]: true})}>
                    <img className={classNames({[styles.img_messaging]: true})}
                         src={this.state.friend.url}/>
                </div>
                <div className={classNames({[styles.conversation_in_messages_content]: true})}>
                    <div className={classNames({[styles.conversation_content_title]: true})}>
                        <div className={classNames({[styles.conversation_content_title_name]: true})}>
                            <span>{this.state.friend.name}</span>
                        </div>
                        <div className={classNames({[styles.conversation_content_title_date]: true})}>
                            09:35 pm
                        </div>
                    </div>
                    <div className={classNames({[styles.conversation_content_message]: true})}>
                        <div className={classNames({[styles.conversation_content_message_text]: true})}>привет
                        </div>
                        <div className={classNames({[styles.conversation_content_message_icon]: true})}>
                            <i className="fa fa-remove"></i>
                        </div>
                    </div>
                </div>
            </a>
        )
    }

    openDiaplog() {
        UserServices.openDialog(this.state.friend.friend_id);
    }

}

