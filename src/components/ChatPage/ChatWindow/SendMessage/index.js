import React, {Component} from "react";
import classNames from "classnames";

import styles from "./SendMessage.css";


export default class SendMessage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div class="" style={{}}>
                <div className={classNames({[styles.message_row]: true, [styles.message_row_in_messages]: true, [styles.sent]: true})}>
                    <div class="" style={{}}>
                        <div className={classNames({[styles.small_profile_picture_in_messages]: true})}>
                        </div>
                        <div className={classNames({[styles.message_bubble_in_messages]: true})}>
                            <div>
                                <span>aa ss</span>
                            </div>
                            <div className={classNames({[styles.btn_edit_on_message]: true})}>
                                <span class="fa fa-pencil"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

