import {combineReducers} from "redux";
import spinReducer from "../components/Spin/spin.reducer";
import challengeReducer from "../components/Challenge/challenge.reducer";

export const rootReducer = combineReducers({
    Spin: spinReducer,
    Challenge: challengeReducer
});

export type IRootState = ReturnType<typeof rootReducer>;
