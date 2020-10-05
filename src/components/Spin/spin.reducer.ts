import moment from 'moment';
import {SpinCreateVm, SpinVm} from "./SpinHome";
import AWSInstance from "../../config/AWSInstance";

export const SPIN_TYPES = {
    SET_SPINS: 'SET_SPINS',
    GET_SPIN: 'GET_SPIN',
    POST_SPIN: 'POST_SPIN',
    DELETE_SPIN: 'DELETE_SPIN',
    SELECT_SPIN: 'SELECT_SPIN',
};

const initialState = {
    spins: [],
    selected: '',
};

export type SpinState = Readonly<typeof initialState>;

// Reducer
export default (state: SpinState = initialState, action: any): SpinState => {
    const {type, payload} = action;

    switch (type) {
        case SPIN_TYPES.SET_SPINS:
            return {
                ...state,
                spins: payload.spins ? payload.spins : [],
            };
        case SPIN_TYPES.POST_SPIN:
        case SPIN_TYPES.SELECT_SPIN:
            return {
                ...state,
                selected: payload.id,
            };
        default:
            return state;
    }
};

const setSpins = (spins: SpinVm[]) => {
    return {
        type: SPIN_TYPES.SET_SPINS,
        payload: {
            spins,
        },
    };
};

export const getSpins = () => {
    return (dispatch: any) => {
        AWSInstance.get('/api/spin')
            .then(response => {
                const data = response.data;
                const spins: SpinVm[] = [];

                for (const id in data) {
                    if ({}.hasOwnProperty.call(data, id)) {
                        spins.push({
                            id,
                            name: data[id].name,
                            createdDate: moment.parseZone(data[id].createdDate).toDate(),
                        });
                    }
                }
                return spins.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
            })
            .then(data => dispatch(setSpins(data)));
    };
};

const finishedPosting = (id: string) => {
    return {
        type: SPIN_TYPES.POST_SPIN,
        payload: {
            id,
        },
    };
};

export const postSpin = (spin: SpinCreateVm) => {
    return (dispatch: any) => {
        AWSInstance.post('/api/spin', spin)
            .then(response => {
                dispatch(getSpins());
                return response.data;
            })
            .then(data => dispatch(finishedPosting(data.name)));
    };
};

export const selectSpin = (id: string) => {
    return {
        type: SPIN_TYPES.SELECT_SPIN,
        payload: {
            id,
        },
    };
};
