import {
	GET_POSTS,
	POSTS_ERROR,
	CLEAR_POSTS,
	LIKE_POST,
	DISLIKE_POST,
	DELETE_POST,
	ADD_POST,
	GET_SINGLE_POST,
	CLEAR_SINGLE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
} from "../actions/actionTypes";

const initialState = {
	postsData: null,
	loading: true,
	error: null,
	singlePost: null,
};

const posts = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_POSTS:
			return {
				...state,
				loading: false,
				postsData: payload,
			};
		case POSTS_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case CLEAR_POSTS: {
			return {
				...state,
				error: null,
				loading: true,
				postsData: null,
			};
		}
		case LIKE_POST:
		case DISLIKE_POST:
			return {
				...state,
				postsData: state.postsData
					? state.postsData.map((post) => {
							if (post._id === payload._id) {
								post.likecount = payload.likecount;
							}
							return post;
					  })
					: state.postsData,
			};
		case DELETE_POST:
			return {
				...state,
				postsData: state.postsData.filter(
					(post) => post._id !== payload
				),
			};
		case ADD_POST:
			return {
				...state,
				postsData: [payload, ...state.postsData],
			};
		case GET_SINGLE_POST:
			return {
				...state,
				loading: false,
				singlePost: payload,
			};
		case CLEAR_SINGLE_POST:
			return {
				...state,
				singlePost: null,
			};
		case ADD_COMMENT:
			let newSinglePost = { ...state.singlePost };
			newSinglePost.children.push(payload);
			return {
				...state,
				singlePost: newSinglePost,
			};
		case DELETE_COMMENT: {
			let newSinglePost = { ...state.singlePost };
			newSinglePost.children = newSinglePost.children.filter(
				(p) => p._id !== payload
			);
			return {
				...state,
				singlePost: newSinglePost,
			};
		}
		default:
			return state;
	}
};
export default posts;
