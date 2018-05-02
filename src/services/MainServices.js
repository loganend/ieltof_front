import dispatcher from "../dispatcher";

export function faceToFaceTest() {
    dispatcher.dispatch({
        type: "FACE_TO_FACE_TEST"
    });
}


export function facebookLogout() {
    window.FB.logout(response => {
        console.log(response);
        dispatcher.dispatch({
            type: "FACEBOOK_LOGOUT"
        });
    });
}

