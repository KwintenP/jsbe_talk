import {Tweet} from "../entities/tweet.entity";
export const SET_TWEETS = "SET_TWEETS";
export const ADD_TWEET = "ADD_TWEET";
export const UPDATE_TWEET = "UPDATE_TWEET";
export const REMOVE_TWEET = "REMOVE_TWEET";
export const TOGGLE_STAR_TWEET = "TOGGLE_STAR_TWEET";
export const TWEET_RETWEETED = "TWEET_RETWEETED";
export const TWEET_LIKED = "TWEET_LIKED";
export const TWEET_UN_LIKED = "TWEET_UN_LIKED";
export const TWEET_UN_RETWEETED = "TWEET_UN_RETWEETED";

export function addTweet(tweet: Tweet) {
    return {
        type: ADD_TWEET,
        payload: {tweet}
    };
}

export function removeTweet(id: number) {
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

export function updateTweet(id: number, tweet: Tweet) {
    return {
        type: UPDATE_TWEET,
        payload: {id, tweet}
    }
}

export function toggleStarTweet(id: number) {
    return {
        type: TOGGLE_STAR_TWEET,
        payload: {id}
    }
}


export function tweetRetweeted(id: number) {
    return {
        type: TWEET_RETWEETED,
        payload: {id}
    }
}

export function tweetUnRetweeted(id: number) {
    return {
        type: TWEET_UN_RETWEETED,
        payload: {id}
    }
}

export function tweetLiked(id: number) {
    return {
        type: TWEET_LIKED,
        payload: {id}
    }
}

export function tweetUnLiked(id: number) {
    return {
        type: TWEET_UN_LIKED,
        payload: {id}
    }
}
