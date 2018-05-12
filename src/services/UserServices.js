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


export function getOnlineUsers() {

    fetch(getUrl('/api2/users/online'),
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
            dispatcher.dispatch({
                type: "REQUEST_FRIEND",
                person: to_id
            });
        }
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


export function openDialog(key) {
    dispatcher.dispatch({
        type: "OPEN_DIALOG",
        key: key
    });
}

export function acceptFriendship(dialogId, friendId) {

    let profile = UserStore.getProfile();
    console.log(profile);
    let request = {
        dialog_id: dialogId,
        friend_id: friendId,
        user_id: profile.Id
    };
    console.log(request);

    fetch(getUrl('/api/friend/accept'),
        {

            // credentials: 'include',
            method: 'put',
            body: JSON.stringify(request)
        }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            dispatcher.dispatch({
                type: "ACCEPT_FRIENDSHIP",
                dialog: request
            });
        }
    }).catch(err => {
        console.log(err)
    })
}

export function ignoreFriendship(dialogId, friendId) {

    let profile = UserStore.getProfile();

    let request = {
        dialog_id: dialogId,
        friend_id: friendId,
        user_id: profile.id
    };
    console.log(request);

    fetch(getUrl('/api/friend/ignore'),
        {
            method: 'delete',
            body: JSON.stringify(request)
        }).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            dispatcher.dispatch({
                type: "IGNORE_FRIENDSHIP",
                dialog: request
            });
        }
    }).catch(err => {
        console.log(err)
    })
}



