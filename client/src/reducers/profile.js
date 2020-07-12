import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	CREATE_PROFILE,
	ADD_EDUCATION,
	ADD_EXPERIENCE,
	DELETE_EDUCATION,
	DELETE_EXPERIENCE,
	GET_PROFILES,
	CLEAR_CURRENT_PROFILE,
} from "../actions/actionTypes";

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
		case CREATE_PROFILE:
		case ADD_EDUCATION:
		case ADD_EXPERIENCE:
		case DELETE_EDUCATION:
		case DELETE_EXPERIENCE:
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
		case CLEAR_PROFILE:
			return {
				...state,
				loading: true,
				profile: null,
				error: null,
				repos: [],
				otherProfiles: [],
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		default:
			return state;
	}
}
