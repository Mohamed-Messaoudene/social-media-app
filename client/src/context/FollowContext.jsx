import { createContext, useReducer, useContext, useEffect } from "react";
import { makeRequest } from "../axios";
import { useAuth } from "./AuthContext";

// Initial state
const initialState = {
  followers: [],
  followings: [],
  suggestions: [],
};

// Action types
const actionTypes = {
  SET_DATA: "SET_DATA",
  FOLLOW_USER: "FOLLOW_USER",
  UNFOLLOW_USER: "UNFOLLOW_USER",
};

// Reducer function
const followReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        followers: action.payload.followers,
        followings: action.payload.followings,
        suggestions: action.payload.suggestions,
      };

    case actionTypes.FOLLOW_USER:
      return {
        ...state,
        followings: [...state.followings, action.payload.user],
        suggestions: state.suggestions.filter(
          (s) => s.id !== action.payload.user.id
        ),
      };

    case actionTypes.UNFOLLOW_USER:
      return {
        ...state,
        followings: state.followings.filter(
          (f) => f.id !== action.payload.user.id
        ),
        suggestions: [...state.suggestions, action.payload.user],
      };

    default:
      return state;
  }
};

// Create context
const FollowContext = createContext();

// Provider component
// eslint-disable-next-line react/prop-types
export const FollowProvider = ({ children }) => {
  const { user,login:update_loggedIn_user } = useAuth();
  const [state, dispatch] = useReducer(followReducer, initialState);

  // Fetch initial follow data
  useEffect(() => {
    const getFollowData = async () => {
      if (!user?.id) return;
      try {
        const response = await makeRequest.get(`/users/${user.id}/follow`);
        dispatch({
          type: actionTypes.SET_DATA,
          payload: {
            followers: response.data.followers,
            followings: response.data.followings,
            suggestions: response.data.suggestions,
          },
        });
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    getFollowData();
  }, [user?.id]);

  // Follow a user
  // Follow a user
  const followUser = async (userId) => {
    try {
      await makeRequest.post("/users/follow", {
        followerId: user.id,
        followingId: userId,
      });

      // Find the user in suggestions
      const followedUser = state.suggestions.find((user) => user.id == userId);

      if (!followedUser) {
        console.error("User to follow not found in suggestions");
        return;
      }

      // Dispatch action
      dispatch({
        type: actionTypes.FOLLOW_USER,
        payload: { user: followedUser },
      });
      update_loggedIn_user({...user,followingCount:user.followingCount+1})
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Unfollow a user
  const unfollowUser = async (userId) => {
    try {
      await makeRequest.post("/users/unfollow", {
        followerId: user.id,
        followingId: parseInt(userId),
      });
      // Find the user in followings
      const unfollowedUser = state.followings.find(
        (user) => user.id == userId
      );

      if (!unfollowedUser) {
        console.error("User to unfollow not found in followings");
        return;
      }

      // Dispatch action
      dispatch({
        type: actionTypes.UNFOLLOW_USER,
        payload: { user: unfollowedUser },
      });
      update_loggedIn_user({...user,followingCount:user.followingCount-1})
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <FollowContext.Provider value={{ state, followUser, unfollowUser }}>
      {children}
    </FollowContext.Provider>
  );
};

// Custom hook for using the FollowContext
export const useFollow = () => useContext(FollowContext);
