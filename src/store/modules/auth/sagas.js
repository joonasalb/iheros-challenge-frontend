import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { login } from "../../../services/auth";
import history from "../../../services/history";
import { LoginSuccess, signFailure } from "./actions";

export function* Login({ payload }) {
    const { username, password } = payload;
    try {
        const response = yield call(api.post, "token", {
            username,
            password,
        });
        const { user, access, refresh } = response.data;
        api.defaults.headers["Authorization"] = `Bearer ${access}`;
        login(access) // save the bearer token local storage

        yield put(LoginSuccess(access, user));

        history.push("/dashboard");
    } catch (err) {
        toast.error(err.response.data.detail);
        yield put(signFailure());
    }
}

export function setAccessToken({ payload }) {
    if (!payload) return;

    const { access } = payload.auth;

    if (access) {
        api.defaults.headers["Authorization"] = `Bearer ${access}`;
    }
}

export function setRefreshToken({ payload }) {
    if (!payload) return;

    const { refresh } = payload.auth;

    if (refresh) {
        api.defaults.headers["Authorization"] = `Bearer ${refresh}`;
    }
}

export function signOut() {
    history.push("/");
}

export default all([
    takeLatest("persist/REHYDRATE", setAccessToken),
    takeLatest("@auth/SIGN_OUT", signOut),
    takeLatest("@auth/SIGN_IN_REQUEST", Login),
]);
