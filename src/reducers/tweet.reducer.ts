import {Tweet} from "../entities/tweet.entity";
import {
    TOGGLE_STAR_TWEET, TWEET_RETWEETED, TWEET_UN_RETWEETED, TWEET_LIKED, TWEET_UN_LIKED,
    ADD_TWEET, REMOVE_TWEET, SET_TWEETS, UPDATE_TWEET
} from "./tweet.actions";
import {Action} from "@ngrx/store";
import {Object} from "es6-shim";

export function tweetsReducer(state: Array<Tweet> = [], action: Action): Array<Tweet> {
    let id: number, tweet: Tweet, tweets: Array<Tweet>;
    switch (action.type) {
        case ADD_TWEET:
            ({tweet} = action.payload);
            return [...state, tweet];
        case REMOVE_TWEET:
            ({id} = action.payload);
            return state.filter(filterTweet => filterTweet.id !== id)
        case SET_TWEETS:
            ({tweets} = action.payload);
            return [...tweets];
        case UPDATE_TWEET:
            ({id, tweet} = action.payload);
            return state.map(filterTweet => filterTweet.id === id ? tweet : tweet);
        case TWEET_UN_LIKED:
        case TWEET_LIKED:
        case TWEET_UN_RETWEETED:
        case TWEET_RETWEETED:
        case TOGGLE_STAR_TWEET:
            ({id} = action.payload);
            return state.map(filterTweet => filterTweet.id === id ? tweetReducer(filterTweet, {
                type: action.type,
                payload: {tweet: filterTweet}
            }) : filterTweet);
        default:
            return state;
    }
}

export function tweetReducer(state: Tweet = undefined, action: Action) {
    let tweet: Tweet;
    switch (action.type) {
        case TOGGLE_STAR_TWEET:
            ({tweet} = action.payload);
            return Object.assign({}, tweet, {starred: !tweet.starred});
        case TWEET_RETWEETED:
            ({tweet} = action.payload);
            return Object.assign({}, tweet, {retweeted: tweet.retweets++, hasRetweeted: true});
        case TWEET_UN_RETWEETED:
            ({tweet} = action.payload);
            return Object.assign({}, tweet, {retweeted: tweet.retweets--, hasRetweeted: false});
        case TWEET_LIKED:
            ({tweet} = action.payload);
            return Object.assign({}, tweet, {retweeted: tweet.likes++, hasLiked: true});
        case TWEET_UN_LIKED:
            ({tweet} = action.payload);
            return Object.assign({}, tweet, {retweeted: tweet.likes--, hasLiked: false});
        default:
            return state;
    }
}
