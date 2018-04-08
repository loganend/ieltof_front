import React, {Component} from "react";
import styles from "./MainPage.css";
import world from "images/world.jpg";
import cool from "images/cool.jpg";
import arrow from "images/arrow.png";
import classNames from "classnames";
import * as MainActions from "../../services/MainActions";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.onFaceExam = this.onFaceExam.bind(this);
    }

    render() {
        return (
            <div>
                <div className={styles.section_1}>
                    <div>Title</div>
                    <div className={styles.title_1}>Lets practice speaking for international english exams</div>
                </div>
                <div className={styles.section_2}>
                    <div className={styles.title_2}>
                        <h1>
                            Find a partner to practice speaking of one of<br/> international english exams
                        </h1>
                    </div>
                    <div className={classNames({"container": true, [styles.info]: true})}>
                        <div className={"row"}>
                            <div className={classNames({"col-sm-6": true, [styles.about]: true})}>
                                <div>
                                    <img src={world} className={styles.world_img}/>
                                </div>
                                <div>
                                    <h2>Worldwide language learning community</h2>
                                    <p>You'll meet people from 180+countries, speaking 110 + languages. </p>
                                </div>
                            </div>
                            <div className={classNames({"col-sm-6": true, [styles.about]: true})}>
                                <div>
                                    <img src={cool} className={styles.cool_img}/>
                                </div>
                                <div >
                                    <h2>Find your perfect language partners</h2>
                                    <p>On Speaky, you talk to people who share your interests and passions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={classNames({"col-sm-6": true, [styles.about]: true})}>
                                <div>
                                    <img src={cool} className={styles.cool_img}/>
                                </div>
                                <div>
                                    <h2>Fully dedicated environment
                                    </h2>
                                    <p>You can chat or make calls (audio and video). Directly from your browser.</p>
                                </div>
                            </div>
                            <div className={classNames({"col-sm-6": true, [styles.about]: true})}>
                                <div>
                                    <h2>3453</h2>
                                    <h2>People online</h2>
                                </div>
                                <div>
                                    <h2>Live</h2>
                                    <p>Practice right away by talking to people online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.action_2}>
                        <h2>Chose the exam you prepare to</h2>
                        <img src={arrow}/>
                    </div>
                </div>
                <div className={styles.section_3}>
                    <div>
                        <div className={classNames({"row": true})}>
                            <div className={classNames({"col-sm-6": true, [styles.exam]: true})}>
                                <h2 data-toggle="modal" data-target="#exampleModalCenter">IELTS</h2>
                            </div>
                            <div className={classNames({"col-sm-6": true, [styles.exam]: true})}>
                                <h2 data-toggle="modal" data-target="#exampleModalCenter">TOEFL</h2>
                            </div>
                        </div>
                        <div className={classNames({"row": true})}>
                            <div className={classNames({"col-sm-6": true, [styles.exam]: true})}>
                                <h2 data-toggle="modal" data-target="#exampleModalCenter">CAE</h2>
                            </div>
                            <div className={classNames({"col-sm-6": true, [styles.exam]: true})}>
                                <h2 data-toggle="modal" data-target="#exampleModalCenter">FCE</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section_4}>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div className={classNames({"container": true, [styles.popup_exam_container]: true})}>
                                <div className="row">
                                    <div
                                        className={classNames({"col-sm-12": true, [styles.popup_exam_header]: true})}>
                                        <h2>Choose the type of test</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div onClick={this.onFaceExam} data-dismiss="modal"
                                         className={classNames({"col-sm-6": true, [styles.popup_exam_type]: true})}>
                                        <h2>Face-to-face<br/>IELTS</h2>
                                    </div>
                                    <div className={classNames({"col-sm-6": true, [styles.popup_exam_type]: true})}>
                                        <h2>Computer<br/>IELTS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onFaceExam() {
        MainActions.faceToFaceTest();
    }
}

