import {DataState} from "../applicationState";
import {Action} from "@ngrx/store";
import {
    ADD_TWEET, REMOVE_TWEET, SET_TWEETS, UPDATE_TWEET, TWEET_UN_LIKED, TWEET_LIKED,
    TWEET_UN_RETWEETED, TWEET_RETWEETED, TOGGLE_STAR_TWEET
} from "./tweet.actions";
import {tweetsReducer} from "./tweet.reducer";

let initialTweetState: DataState = {
    tweets: []
};

export function dataReducer(state: DataState = initialTweetState, action: Action): DataState {
    switch (action.type) {
        case ADD_TWEET:
        case REMOVE_TWEET:
        case SET_TWEETS:
        case UPDATE_TWEET:
        case TWEET_UN_LIKED:
        case TWEET_LIKED:
        case TWEET_UN_RETWEETED:
        case TWEET_RETWEETED:
        case TOGGLE_STAR_TWEET:
            return Object.assign({}, state, {tweets: tweetsReducer(state.tweets, action)});
        default:
            return state;
    }
}
