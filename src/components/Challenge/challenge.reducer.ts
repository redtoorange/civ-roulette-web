import moment from 'moment';
import {ChallengeCreateVm, ChallengeVm} from "./ChallengeHome";
import AWSInstance from "../../config/AWSInstance";

export const CHALLENGE_TYPES = {
    SET_CHALLENGES: 'SET_CHALLENGES',
    FINISHED_POSTING: 'FINISHED_POSTING',
};

const initialState = {
    challenges: [],
    selected: '',
};

export type ChallengesState = Readonly<typeof initialState>;

export default (state: ChallengesState = initialState, action: any): ChallengesState => {
    const {type, payload} = action;

    switch (type) {
        case CHALLENGE_TYPES.SET_CHALLENGES:
            return {
                ...state,
                challenges: payload.challenges,
            };
        case CHALLENGE_TYPES.FINISHED_POSTING:
            return {
                ...state,
                selected: payload.id,
            };
        default:
            return state;
    }
};

const postChallenge = (id: string) => {
    return {
        type: CHALLENGE_TYPES.FINISHED_POSTING,
        payload: {
            id,
        },
    };
};

const setChallenges = (challenges: ChallengeVm[]) => {
    return {
        type: CHALLENGE_TYPES.SET_CHALLENGES,
        payload: {
            challenges,
        },
    };
};

export const getChallenges = () => {
    return (dispatch: any) => {
        AWSInstance.get('/api/challenge')
            .then(response => {
                const data = response.data;
                const challenges: ChallengeVm[] = [];

                for (const id in data) {
                    if ({}.hasOwnProperty.call(data, id)) {
                        challenges.push({
                            id,
                            title: data[id].title,
                            body: data[id].body,
                            difficulty: data[id].difficulty,
                            points: Number(data[id].points),
                            createdDate: moment.parseZone(data[id].createdDate).toDate(),
                        });
                    }
                }
                return challenges.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
            })
            .then(data => dispatch(setChallenges(data)));
    };
};

export const createChallenge = (vm: ChallengeCreateVm) => {
    return (dispatch: any) => {
        AWSInstance.post('/api/challenge', vm)
            .then(response => {
                dispatch(getChallenges());
                return response.data;
            })
            .then(data => dispatch(postChallenge(data.name)));
    };
};
