import {Tweet} from "./entities/tweet.entity";
export const SET_TWEETS = "SET_TWEETS";
export const ADD_TWEET = "ADD_TWEET";
export const UPDATE_TWEET = "UPDATE_TWEET";
export const REMOVE_TWEET = "REMOVE_TWEET";
export const TOGGLE_STAR_TWEET = "TOGGLE_STAR_TWEET";
export const TWEET_RETWEETED = "TWEET_RETWEETED";
export const TWEET_LIKED = "TWEET_LIKED";
export const TWEET_UN_LIKED = "TWEET_UN_LIKED";
export const TWEET_UN_RETWEETED = "TWEET_UN_RETWEETED";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_TOPBAR = "TOGGLE_TOPBAR";

export function addTweet(tweet:Tweet) {
    return {
        type: ADD_TWEET,
        payload: {tweet}
    };
}

export function removeTweet(id:string) {
    return {
        type: REMOVE_TWEET,
        payload: {id}
    }
}

export function setTweets(tweets: Array<Tweet>) {
    return {
        type: SET_TWEETS,
        payload: {tweets}
    }
}

export function updateTweet(id, tweet) {
    return {
        type: UPDATE_TWEET,
        payload: {id, tweet}
    }
}

export function toggleStarTweet(id) {
    return {
        type: TOGGLE_STAR_TWEET,
        payload: {id}
    }
}

export function toggleSideBar() {
    return {
        type: TOGGLE_SIDEBAR
    }
}

export function toggleTopBar() {
    return {
        type: TOGGLE_TOPBAR
    }
}

export function tweetRetweeted(id) {
    return {
        type: TWEET_RETWEETED,
        payload: {id}
    }
}

export function tweetUnRetweeted(id) {
    return {
        type: TWEET_UN_RETWEETED,
        payload: {id}
    }
}

export function tweetLiked(id) {
    return {
        type: TWEET_LIKED,
        payload: {id}
    }
}

export function tweetUnLiked(id) {
    return {
        type: TWEET_UN_LIKED,
        payload: {id}
    }
}
