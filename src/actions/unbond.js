import Axios from 'axios';
import {getDelegationsUnbondUrl} from "../constants/url";
import Async from 'async';
import {
    UNBOND_DELEGATIONS_FETCH_ERROR,
    UNBOND_DELEGATIONS_FETCH_IN_PROGRESS,
    UNBOND_DELEGATIONS_FETCH_SUCCESS
} from "../constants/unbond"
import Lodash from "lodash";

export const fetchUnbondDelegationsProgress = () => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_IN_PROGRESS,
    };
};
export const fetchUnbondDelegationsSuccess = (data) => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_SUCCESS,
        data,
    };
};
export const fetchUnbondDelegationsError = (data) => {
    return {
        type: UNBOND_DELEGATIONS_FETCH_ERROR,
        data,
    };
};

export const fetchUnbondDelegations = (address) => {
    return async dispatch => {
        dispatch(fetchUnbondDelegationsProgress());
        const url = getDelegationsUnbondUrl(address);
        await Axios.get(url)
            .then((res) => {
                if (res.data.unbonding_responses.length) {
                    const totalUnbond = Lodash.sumBy(res.data.unbonding_responses, (item) => {
                        if (res.data.unbonding_responses[0].entries.length) {
                            return parseInt(res.data.unbonding_responses[0].entries[0].balance);
                        }
                    });
                    dispatch(fetchUnbondDelegationsSuccess(totalUnbond / 1000000));
                }
            })
            .catch((error) => {
                dispatch(fetchUnbondDelegationsError(error.response
                    ? error.response.data.message
                    : error.message));
            });
    }
};