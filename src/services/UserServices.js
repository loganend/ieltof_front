import dispatcher from "../dispatcher";
import {getUrl} from "../config/config";
import UserStore from "../stores/UserStore";

export function faceToFaceTest() {

}

export function getUser(state) {

    console.log(state);
    let request = {
        facebook_id: state.user.id,
        name: state.user.name,
        url: state.avatar
    };
    console.log(request);

    fetch(getUrl('/api2/user'),
        {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            return response.json()
        }
    }).then(json => {
        console.log(json);
        dispatcher.dispatch({
            type: "GET_USER_EVENT",
            user: json
        });
    }).catch(err => {
        console.log(err)
    })
}


export function getAllUsers() {

    fetch(getUrl('/api2/users'),
        {
            method: 'get'
        }).then(response => {
        console.log(response.status);

        if (response.status === 200) {
            return response.json()
        }
    }).then(json => {
        console.log(json);
        dispatcher.dispatch({
            type: "GET_ALL_USERS_EVENT",
            users: json
        });
    }).catch(err => {
        console.log(err)
    })
}


export function sendRequestToFriends(from_id, to_id) {


    let request = {
        from_id: from_id,
        to_id: to_id,
    };
    console.log(request);

    fetch(getUrl('/api2/friend'),
        {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            return response.json()
        }
    }).then(json => {
        dispatcher.dispatch({
            type: "REQUEST_FRIEND",
        });
    }).catch(err => {
        console.log(err)
    })
}


export function getFriends() {

    let profile = UserStore.getProfile();


    fetch(getUrl('/api2/friends?user_id=' + profile.Id),
        {
            method: 'get'
        }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            return response.json()
        }
    }).then(json => {
        console.log(json);
        dispatcher.dispatch({
            type: "GET_ALL_FRIENDS",
            friends: json
        });
    }).catch(err => {
        console.log(err)
    })
}


