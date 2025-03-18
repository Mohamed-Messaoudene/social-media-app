import  { createContext, useReducer, useContext } from "react";
import { postsReducer, initialState } from "./postsReducer";

const PostsContext = createContext();

export const usePosts = () => {
  return useContext(PostsContext);
};

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const setPosts = (posts) => {
    dispatch({ type: "SET_POSTS", payload: posts });
  };

  const addPost = (post) => {
    dispatch({ type: "ADD_POST", payload: post });
  };

  const updatePost = (postId,numberOfLikes,liked) => {
    dispatch({
      type: "UPDATE_POST",
      payload: {
        id: postId, 
        numberOfLikes, 
        liked,
      },
    });
  };

  const removePost = (postId) => {
    dispatch({ type: "REMOVE_POST", payload: postId });
  };

  return (
    <PostsContext.Provider value={{ state, setPosts, addPost,updatePost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
};
