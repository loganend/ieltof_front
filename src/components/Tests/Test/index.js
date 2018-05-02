import React, {Component} from "react";

import styles from "./Test.css";
import classNames from "classnames";

import face_to_face from "images/face_to_face.jpg";
import audio_record from "images/audio_record_2.jpg";

import * as MainServices from "../../../services/MainServices";

export default class Test extends React.Component {

    constructor(props) {
        super(props);
    }

    onFaceToFace() {
        MainServices.faceToFaceTest();
    }

    render() {
        return (
            <div className={styles.community_grid_cell}>
                <display-user-card>
                    <div className={classNames({[styles.card]: true, [styles.community_card]: true })}>
                        <div>

                            <div className={classNames({[styles.community_profile_picture_container]: true})}>
                                <div className={styles.profile_picture_community}>
                                    <p>IELTS</p>
                                </div>
                                {/*<img className={styles.profile_picture_community}*/}
                                     {/*src="http://cdn-storage.speaky.com/image/f42478c1-a692-4a1b-8440-91d50a6cbabf.jpeg?resize-width=640&amp;resize-height=640"/>*/}
                            </div>

                            <div className={styles.community_info_container} >

                                <div onClick={this.onFaceToFace.bind(this)} className={styles.face_to_face}>
                                    <div>
                                        <img src={face_to_face}/>
                                    </div>
                                    <p>Face to face</p>
                                </div>
                                <div className={styles.audio_record}>
                                    <div>
                                        <img src={audio_record}/>
                                    </div>
                                    <p>Audio record</p>
                                </div>


                                {/*<div className={styles.community_personal_info_name}>*/}
                                    {/*<b>Mody R.</b>*/}
                                    {/*<span className={styles.community_personal_info_age}>21</span>*/}
                                    {/*<dot-connected>*/}
                                        {/*<i className={classNames({"fa": true, "fa-circle": true, [styles.dot_connected]: true })}></i>*/}
                                    {/*</dot-connected>*/}
                                {/*</div>*/}


                                {/*<div className={styles.community_description_container}>Say Hii 😎*/}
                                    {/*insta:modyrabie*/}
                                {/*</div>*/}

                            </div>
                        </div>

                    </div>
                </display-user-card>
            </div>
        )
    }

}

