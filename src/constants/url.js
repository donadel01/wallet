const API_URL = process.env.REACT_APP_API_KEY;
export const getRewardsUrl = (address) => `${API_URL}/cosmos/distribution/v1beta1/delegators/${address}/rewards`;
export const getDelegationsUnbondUrl = (address) => `${API_URL}/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`;
export const getDelegationsUrl = (address) => `${API_URL}/cosmos/staking/v1beta1/delegations/${address}`;
