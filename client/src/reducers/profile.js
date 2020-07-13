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
	GET_GITHUB_REPOS,
	GET_GITHUB_REPOS_ERROR,
} from "../actions/actionTypes";

const initialState = {
	profile: null,
	otherProfiles: [],
	repos: [],
	loading: true,
	error: null,
	githubFetchError: null,
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
				githubFetchError: null,
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				loading: true,
				profile: null,
				error: null,
				repos: [],
				otherProfiles: [],
				githubFetchError: null,
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
				githubFetchError: null,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		case GET_GITHUB_REPOS:
			return {
				...state,
				repos: payload,
				githubFetchError: null,
			};
		case GET_GITHUB_REPOS_ERROR:
			return {
				...state,
				repos: null,
				githubFetchError: payload,
			};

		default:
			return state;
	}
}
