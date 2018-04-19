import React, {Component} from "react";
import classNames from "classnames";

import styles from "./ReceivedMessage.css";


export default class ReceivedMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={classNames({[styles.message_row]: true, [styles.message_row_in_messages]: true, [styles.received_message_row]: true})}>
                    <div>
                        <div className={classNames({[styles.small_profile_picture_in_messages]: true})}>
                            <a className={classNames({[styles.small_profile_picture_in_messages]: true})}
                               href="/user/918273/">
                                <img
                                    src="http://cdn-storage.speaky.com/image/8d0059e8-cace-4be2-9cab-4d5136c6209c.jpeg?resize-width=100&amp;resize-height=100"/>
                            </a>
                        </div>
                        <div className={classNames({[styles.message_bubble_in_messages]: true})} >
                            <div>
                                <span>Hi</span>
                            </div>
                            <div className={classNames({[styles.btn_edit_on_message]: true})}>
                                <span className="fa fa-pencil"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

