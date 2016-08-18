import {Tweet} from "../entities/tweet.entity";
import {Action} from "@ngrx/store";
import {
    TOGGLE_SIDEBAR,
    TOGGLE_TOPBAR,
    ADD_TWEET,
    SET_TWEETS,
    REMOVE_TWEET,
    TOGGLE_STAR_TWEET,
    UPDATE_TWEET,
    TWEET_RETWEETED,
    TWEET_UN_RETWEETED,
    TWEET_LIKED,
    TWEET_UN_LIKED
} from "../actions";
import {Object} from "es6-shim";

export const rootReducer = {
    ui: uiReducer,
    data: dataReducer
}

/*
sidebarCollapsed: sidebarReducer,
    topbarCollapsed: topbarReducer,
    tweets: tweetsReducer*/

export function uiReducer(state: UiState, action: Action): UiState {
    switch(action.type) {
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {mainPage: topbarReducer()})
    }
}

export function mainPageReducer(state: MainPageState, action: Action): MainPageState {
    switch(action.type) {
        case
    }
}

export function dataReducer(data: DataState, action: Action): DataState {

}

export function sidebarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return !state;
        default:
            return state;
    }
}
export function topbarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_TOPBAR:
            return !state;
        default:
            return state;
    }
}

export function tweetsReducer(state: Array<Tweet> = [], action: Action): Array<Tweet> {
    let id: number, tweet: Tweet, tweets: Array<Tweet>;
    switch (action.type) {
        case ADD_TWEET:
            ({tweet} = action.payload);
            return [...state, tweet];
        case REMOVE_TWEET:
            ({id} = action.payload);
            return state.filter(tweet => tweet.id !== id)
        case SET_TWEETS:
            ({tweets} = action.payload);
            return [...tweets];
        case UPDATE_TWEET:
            ({id, tweet} = action.payload);
            return state.map(tweet => tweet.id == id ? tweet : tweet);
        case TWEET_UN_LIKED:
        case TWEET_LIKED:
        case TWEET_UN_RETWEETED:
        case TWEET_RETWEETED:
        case TOGGLE_STAR_TWEET:
            ({id} = action.payload);
            return state.map(tweet => tweet.id == id ? tweetReducer(tweet, {
                type: action.type,
                payload: {tweet}
            }) : tweet);
        default:
            return state;
    }
}

export function tweetReducer(state: Tweet, action: Action) {
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

    }
}


export interface UiState {
    mainPage: MainPageState;
}

export interface MainPageState {
    sidebarCollapsed: boolean;
    topbarCollapsed: boolean;
}

export interface DataState {
    tweets: Array<Tweet>;
}











