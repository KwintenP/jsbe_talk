import {Tweet} from "../entities/tweet.entity";
import {REMOVE_TWEET, ADD_TWEET, SET_TWEETS, TOGGLE_STAR_TWEET} from "./tweet.actions";
import {tweetsReducer} from "./tweet.reducer";
const deepFreeze = require("deep-freeze");
import * as _ from "lodash";
describe("reducer: tweetsReducer", () => {
    describe("on ADD_TWEET", () => {
        it("should add a tweet to the current list of tweets", () => {
            let tweet: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", true, false, 0, 0);
            let initialState: Array<Tweet> = [tweet];
            deepFreeze(initialState);

            let tweetToAdd: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);

            let payload: any = {tweet: tweetToAdd}

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: ADD_TWEET,
                    payload
                });

            expect(changedState.length).toBe(2);
            expect(changedState[1]).toBe(payload.tweet);
        });
    });

    describe("on REMOVE_TWEET", () => {
        it("should remove the tweet by id from the list of tweets", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", true, false, 0, 0);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);
            let initialState: Array<Tweet> = [tweet1, tweet2];
            deepFreeze(initialState);

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: REMOVE_TWEET,
                    payload: {
                        id: 1
                    }
                }
            );

            expect(changedState.length).toBe(1);
            expect(changedState[0]).toBe(tweet2);
        });
    });

    describe("TOGGLE_STAR_TWEET", () => {
        it("should star the tweet that was passed in the payload if it was true", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false, false, 0, 0);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);
            let initialState: Array<Tweet> = [tweet1, tweet2];
            deepFreeze(initialState);

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: TOGGLE_STAR_TWEET,
                    payload: {
                        id: 1
                    }
                });
        });

        it("should unstar the tweet that was passed in the payload if it was true", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false, false, 0, 0);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);
        });
    });

    describe("SET_TWEETS", () => {
        it("should set all the tweets and remove other tweets as well", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false, false, 0, 0);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);
            let initialState: Array<Tweet> = [];

            let tweets: Array<Tweet> = [tweet1, tweet2];
            let changedState: Array<Tweet> = tweetsReducer(
                initialState,
                {
                    type: SET_TWEETS,
                    payload: {
                        tweets: tweets
                    }
                }
            );

            _.each(changedState, (tweet: Tweet, index: number) => {
                expect(tweet).toBe(tweets[index]);
            });
        });
    });

    describe("on case INIT", () => {
        it("should return the initial state", () => {
            let changedState: Array<Tweet> = tweetsReducer(undefined, {type: "INIT"});

            expect(changedState.length).toBe(0);
        });
    });

    describe("on case UNKNOWN", () => {
        it("should return the ", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false, false, 0, 0);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true, false, 0, 0);
            let initialState: Array<Tweet> = [tweet1, tweet2];

            let changedState: Array<Tweet> = tweetsReducer(initialState, {type: "UNKNOWN_STATE"});

            _.each(changedState, (tweet: Tweet, index: number) => {
                expect(tweet).toBe(initialState[index]);
            });
        });
    });

});