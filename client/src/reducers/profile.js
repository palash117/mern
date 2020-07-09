import { GET_PROFILE, PROFILE_ERROR } from "../actions/actionTypes";

const initialState = {
	profile: null,
	otherProfiles: [],
	repos: [],
	loading: true,
	error: null,
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
				error: null,
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
}
