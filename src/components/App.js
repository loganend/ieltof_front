import React from "react";
import Content from "components/Content";
import Policy from "components/Policy";
import Terms from "components/Terms";
import MainPage from "components/MainPage";
import UserPage from "components/UserPage";
import MainStore from "../stores/MainStore";


import  { HashRouter,
    Switch,
    Route,
    Link } from 'react-router-dom';

const getIsMobile = () => {
    let isMobile = false;

    try {
        isMobile = !!((window.navigator && window.navigator.standalone) || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i));
    } catch (ex) {
        // continue regardless of error
    }

    return isMobile;
};


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: <div/>,
            isSdkLoaded: false,
            isProcessing: false
        }
    }

    static defaultProps = {
        redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
        scope: 'public_profile,email',
        returnScopes: false,
        xfbml: false,
        cookie: false,
        authType: '',
        fields: 'name',
        version: '2.3',
        language: 'en_US',
        disableMobileRedirect: false,
        isMobile: getIsMobile(),
        onFailure: null,
        state: 'facebookdirect',
        responseType: 'code',
    };

    componentDidMount() {
        console.log(1);
        this._isMounted = true;
        if (document.getElementById('facebook-jssdk')) {
            this.sdkLoaded();
            return;
        }
        this.setFbAsyncInit();
        this.loadSdkAsynchronously();
        let fbRoot = document.getElementById('fb-root');
        if (!fbRoot) {
            fbRoot = document.createElement('div');
            fbRoot.id = 'fb-root';
            document.body.appendChild(fbRoot);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isSdkLoaded && nextProps.autoLoad) {
            window.FB.getLoginStatus(this.checkLoginAfterRefresh);
        }
    }

    setStateIfMounted(state) {
        if (this._isMounted) {
            this.setState(state);
        }
    }

    setFbAsyncInit() {
        console.log(2);
        const {appId, xfbml, cookie, version, autoLoad, state} = this.props;
        window.fbAsyncInit = () => {
            window.FB.init({
                version: 'v2.12',
                appId: '1919046028165378',
                xfbml,
                cookie,
            });
            this.setStateIfMounted({isSdkLoaded: true});
            // console.log(window.location.search);
            // console.log(window.location.search.indexOf(state));
            // if ( window.location.search.indexOf(state) !== -1) {
            //     console.log(7);
            window.FB.getLoginStatus(this.checkLoginAfterRefresh);
            // }
        };
    }

    sdkLoaded() {
        this.setState({isSdkLoaded: true});
    }


    loadSdkAsynchronously() {
        console.log(3);
        const {language} = this.props;
        ((d, s, id) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = `https://connect.facebook.net/${language}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    checkLoginAfterRefresh = (response) => {
        console.log(4);
        if (response.status === 'connected') {
            console.log('connected');
            this.checkLoginState(response);
        } else {
            this.state.content = <MainPage callback={this.responseFacebook.bind(this)}/>;
            this.setState({})
            // window.FB.login(loginResponse => this.checkLoginState(loginResponse), true);
        }
    };

    responseApi = (authResponse) => {
        console.log(6);
        window.FB.api('/me', {locale: this.props.language, fields: this.props.fields}, (me) => {
            Object.assign(me, authResponse);
            this.callback(me);
        });
    };

    checkLoginState = (response) => {
        console.log(5);
        this.setStateIfMounted({isProcessing: false});
        if (response.authResponse) {
            this.responseApi(response.authResponse);
        } else {
            if (this.props.onFailure) {
                this.props.onFailure({status: response.status});
            } else {
                this.callback({status: response.status});
            }
        }
    };

    callback = (response) => {
        console.log(response);
        if (response.status !== "unknown") {

            this.state.content = <UserPage user={response}/>;

            this.setState({});
        }
    };

    responseFacebook = (response) => {
        console.log(response);
        if (response.status !== "unknown") {


            this.state.content = <UserPage user={response}/>;

            this.setState({})
        }
    };

    componentWillMount() {
        MainStore.on("face_to_face_test", this.setFaceTestPage.bind(this));
        MainStore.on("facebook_logpout_event", this.onFacebookLogpoutEvent.bind(this));
    }

    componentWillUnmount() {
        MainStore.removeListener("face_to_face_test", this.setFaceTestPage.bind(this));
        MainStore.removeListener("facebook_logpout_event", this.onFacebookLogpoutEvent.bind(this));

        this._isMounted = false;
    }

    setFaceTestPage() {
        this.state.content = MainStore.getContent();

        this.setState({});
    }

    onFacebookLogpoutEvent() {
        // this.state.content = MainStore.getContent();
        // this.setState({});
        this.props.history.push("/");
        location.reload()
    }

    render() {
        return (
        <div>

            <Switch>
                <Route exact path='/' render={(props) => (
                    <Content {...props} data={this.state.content}/>
                )}/>
                <Route path='/privacy' component={Policy}/>
                <Route path='/terms' component={Terms}/>
            </Switch>

            {/*<Content data={this.state.content}/>*/}

        </div>
        )
    }
}