import React, {Component} from "react";

import styles from "./Tests.css";
import Test from "./Test";

export default class Tests extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container_app_table}>
                <div className={styles.live_container}>
                    <header-people>
                        <h2 className={styles.page_title}>Exams</h2>
                    </header-people>
                    <div className={styles.container_app_table}>
                        <div>
                            <Test/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

