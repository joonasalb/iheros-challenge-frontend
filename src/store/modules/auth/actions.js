export function LoginRequest(username, password) {
    return {
        type: "@auth/SIGN_IN_REQUEST",
        payload: { username, password },
    };
}

export function LoginSuccess(access, user) {
    return {
        type: "@auth/SIGN_IN_SUCCESS",
        payload: { access, user },
    };
}

export function signFailure() {
    return {
        type: "@auth/SIGN_FAILURE",
    };
}

export function signOut() {
    return {
        type: "@auth/SIGN_OUT",
    };
}
