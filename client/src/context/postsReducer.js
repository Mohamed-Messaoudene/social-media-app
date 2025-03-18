export const initialState = {
  allPosts: [],
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        allPosts: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
      };
    case "REMOVE_POST":
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post.id !== action.payload),
      };
    case "UPDATE_POST":
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post.id === action.payload.id
            ? { ...post, numberOfLikes: action.payload.numberOfLikes,liked: action.payload.liked }
            : post
        ),
      };
    default:
      return state;
  }
};
