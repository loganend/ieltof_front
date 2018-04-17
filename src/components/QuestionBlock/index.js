import React, {Component} from "react";
import styles from "./QuestionBlock.css";
import Countdown from "react-countdown-now";
import classNames from "classnames";
import TestStore from "../../stores/TestStore";

const Completionist = () => <p>You are good to go!</p>;

export default class QuestionBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            test: {
                part1: {
                    questions: []
                },
                part2: {
                    questions: []
                },
                part3: {
                    questions: []
                }
            },
        };


        console.log(this.props);
        console.log(this.state.test);

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


    componentWillMount() {
        TestStore.on("test_questions", this.onTestQuestions.bind(this));
    }

    componentWillUnmount() {
        TestStore.removeListener("test_questions", this.onTestQuestions.bind(this));
    }

    onTestQuestions() {
        let test = TestStore.getTestQuestions();

        this.state.test.part1 = test.part1;
        this.state.test.part2 = test.part2;
        this.state.test.part3 = test.part3;

        console.log(this.state.test);
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
                        <div onClick={this.onClickPartOne.bind(this)}
                             className={classNames({[styles.part_header]: true, [styles.part_1_header]: true})}><p>Part
                            1</p></div>
                        <div className={styles.part_1_content} style={this.innerStyles.part1}>
                            <ol>
                                {this.state.test.part1.questions.map((item, i) =>
                                    <li key={i}>{item}</li>
                                )}
                            </ol>
                        </div>
                    </div>
                    <div className={styles.part_2}>
                        <div onClick={this.onClickPartTwo.bind(this)} className={[styles.part_header]}><p>Part 2</p>
                        </div>
                        <div  className={styles.part_2_content} style={this.innerStyles.part2}>
                            <div><p>{this.state.test.part2.questions[0]}</p></div>
                            <div>You should say</div>
                            <div>
                                <ul>
                                    {this.state.test.part2.questions.slice(1, this.state.test.part2.questions.length-1).map((item, i) =>
                                        <li key={i}>{item}</li>
                                    )}

                                </ul>
                                <p>{this.state.test.part2.questions[this.state.test.part2.questions.length - 1]}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.part_3}>
                        <div onClick={this.onClickPartThree.bind(this)} className={[styles.part_header]}><p>Part 3</p>
                        </div>
                        <div  className={styles.part_3_content} style={this.innerStyles.part3}>
                            <ol>
                                {this.state.test.part3.questions.map((item, i) =>
                                    <li key={i}>{item}</li>
                                )}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    onClickPartOne() {
        if (this.innerStyles.part1.display === 'none') {
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
        if (this.innerStyles.part2.display === 'none') {
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
        if (this.innerStyles.part3.display === 'none') {
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

