import React, {Component} from "react";
import styles from "./QuestionBlock.css";
import Countdown from "react-countdown-now";
import classNames from 'classnames';

const Completionist = () => <p>You are good to go!</p>;

export default class QuestionBlock extends React.Component {

    constructor(props) {
        super(props);

        this.innerStyles = {
            part1: {
                display: 'none'
            },
            part2: {
                display: 'none'
            },
            part3: {
                display: 'none'
            }
        }
    }

    render() {
        return (
            <div className={styles.question_block}>
                <div className={styles.test_title}><p>IELTS speaking test</p></div>
                <div className={styles.test_header}>
                    <div><p>You: </p></div>
                    <div><p>answer questions</p></div>
                    <div><p>Test1</p></div>
                    <div>
                        <Countdown className={styles.countdown} date={Date.now() + 10000}>
                            <Completionist />
                        </Countdown>
                    </div>
                </div>
                <div className={styles.questions}>
                    <div className={styles.part_1}>
                        <div onClick={this.onClickPartOne.bind(this)} className={classNames({[styles.part_header]: true, [styles.part_1_header]: true})}><p>Part 1</p></div>
                        <div style={this.innerStyles.part1}>
                            <ol>
                                <li>1. What sort of food do you like eating most?  </li>
                                <li>2. What sort of food do you like eating most?  </li>
                                <li>3. What sort of food do you like eating most?  </li>
                                <li>4. What sort of food do you like eating most?  </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div onClick={this.onClickPartTwo.bind(this)} className={[styles.part_header]}><p>Part 2</p></div>
                        <div style={this.innerStyles.part2}>
                            {/*<div>*/}
                                {/*<div>Your topic</div>*/}
                                {/*<div>Partner's topic</div>*/}
                            {/*</div>*/}
                            <div><p>Describe a house / apartament that someone you know lives in.</p></div>
                            <div>You should say</div>
                            <div>
                                <ul>
                                    <li>What sort of food do you like eating most? </li>
                                    <li>What sort of food do you like eating most? </li>
                                    <li>What sort of food do you like eating most? </li>
                                </ul>
                                <p>and explain what you like or dislike about this person’s house/ apartament</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={this.onClickPartThree.bind(this)} className={[styles.part_header]}><p>Part 3</p></div>
                        <div style={this.innerStyles.part3}>
                            <ol>
                                <li>1. What sort of food do you like eating most? </li>
                                <li>1. What sort of food do you like eating most? </li>
                                <li>1. What sort of food do you like eating most? </li>
                                <li>1. What sort of food do you like eating most? </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    onClickPartOne() {
        if(this.innerStyles.part1.display === 'none') {
            this.innerStyles = {
                part1: {
                    display: 'block'
                },
                part2: {
                    display: 'none'
                },
                part3: {
                    display: 'none'
                }
            };
        } else {
            this.innerStyles = {
                part1: {
                    display: 'none'
                },
                part2: {
                    display: 'none'
                },
                part3: {
                    display: 'none'
                }
            };
        }
        this.setState({})
    }

    onClickPartTwo() {
        if(this.innerStyles.part2.display === 'none') {
            this.innerStyles = {
                part1: {
                    display: 'none'
                },
                part2: {
                    display: 'block'
                },
                part3: {
                    display: 'none'
                }
            };
        } else {
            this.innerStyles = {
                part1: {
                    display: 'none'
                },
                part2: {
                    display: 'none'
                },
                part3: {
                    display: 'none'
                }
            };
        }
        this.setState({})
    }

    onClickPartThree() {
        if(this.innerStyles.part3.display === 'none') {
            this.innerStyles = {
                part1: {
                    display: 'none'
                },
                part2: {
                    display: 'none'
                },
                part3: {
                    display: 'block'
                }
            };
        } else {
            this.innerStyles = {
                part1: {
                    display: 'none'
                },
                part2: {
                    display: 'none'
                },
                part3: {
                    display: 'none'
                }
            };
        }
        this.setState({})
    }
}

