import React, {Component} from "react";
import styles from "./Conversation.css";
import classNames from "classnames";

export default class Conversation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: this.props.friend
        }
    }


    render() {
        return (

            <a className={classNames({[styles.conversation_in_messages]: true, [styles.selected_conversation]: true})}>
                <div className={classNames({[styles.conversation_in_messages_img]: true})}>
                    <img className={classNames({[styles.img_messaging]: true})}
                         src="http://cdn-storage.speaky.com/image/ec20eba9-b969-4ac2-ac87-5139eec5da10.jpeg?resize-width=100&amp;resize-height=100"/>
                </div>
                <div className={classNames({[styles.conversation_in_messages_content]: true})}>
                    <div className={classNames({[styles.conversation_content_title]: true})}>
                        <div className={classNames({[styles.conversation_content_title_name]: true})}>
                            <span>{this.state.friend.friend_id}</span>
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

}

