import {Tweet} from "../entities/tweet.entity";
import {Action} from "@ngrx/store";
import {TOGGLE_SIDEBAR, TOGGLE_TOPBAR, ADD_TWEET, SET_TWEETS, REMOVE_TWEET, TOGGLE_STAR_TWEET} from "../actions";
import {Object} from "es6-shim";
export const rootReducer = {
    sidebarCollapsed: sidebarReducer,
    topbarCollapsed: topbarReducer,
    tweets: tweetsReducer
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
            return state.filter(filterTweet => filterTweet.id !== id)
        case TOGGLE_STAR_TWEET:
            ({id} = action.payload);
            return state.map(
                mapTweet =>
                    mapTweet.id === id ?
                        Object.assign({}, mapTweet, {starred: !mapTweet.starred}) :
                        mapTweet
            );
        case SET_TWEETS:
            ({tweets} = action.payload);
            return [...tweets];
        default:
            return state;
    }
}