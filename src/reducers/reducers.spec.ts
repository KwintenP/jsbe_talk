import {sidebarReducer, tweetsReducer, topbarReducer} from "./reducers";
import {TOGGLE_SIDEBAR, TOGGLE_TOPBAR, ADD_TWEET, REMOVE_TWEET, TOGGLE_STAR_TWEET, SET_TWEETS} from "../actions";
import {Tweet} from "../entities/tweet.entity";
import * as _ from "lodash";
let deepfreeze = require("deep-freeze");

describe("reducer: sidebarReducer", () => {
    describe("on case TOOGLE_SIDEBAR", () => {
        it("should update the state to true if the initial was false", () => {
            let initialState: boolean = false;

            let changedState: boolean = sidebarReducer(initialState, {type: TOGGLE_SIDEBAR});

            expect(changedState).toBeTruthy();
        });

        it("should update the state to false if the initial was true", () => {
            let initialState: boolean = true;

            let changedState: boolean = sidebarReducer(initialState, {type: TOGGLE_SIDEBAR});

            expect(changedState).toBeFalsy();
        });
    });

    describe("on case INIT", () => {
        it("should return the initial state", () => {
            let initialState: boolean = sidebarReducer(undefined, {type: "INIT"});

            expect(initialState).toBeFalsy();
        });
    });

    describe("on case UNKOWN_STATE", () => {
        it("should return the default state", () => {
            let initialState: boolean = true;

            let changedState: boolean = sidebarReducer(initialState, {type: "UNKNOWN_ACTION"});

            expect(changedState).toBeTruthy();
        });
    });
});

describe("reducer: topbarReducer", () => {
    describe("on case TOOGLE_TOPBAR", () => {
        it("should update the state to true if the initial was false", () => {
            let initialState: boolean = false;

            let changedStated: boolean = topbarReducer(initialState, {type: TOGGLE_TOPBAR});

            expect(changedStated).toBeTruthy();
        });


        it("should update the state to false if the initial was true", () => {
            let initialState: boolean = true;

            let changedState: boolean = topbarReducer(initialState, {type: TOGGLE_TOPBAR});

            expect(changedState).toBeFalsy();
        });
    });

    describe("on case INIT", () => {
        it("should return the initial state", () => {
            let initialState: boolean = topbarReducer(undefined, {type: "INIT"});

            expect(initialState).toBeFalsy();
        });
    });

    describe("on case UNKNOWN_ACTION", () => {
        it("should return the default state", () => {
            let initialState: boolean = true;

            let changedState: boolean = topbarReducer(initialState, {type: "UNKNOWN_ACTION"});

            expect(changedState).toBeTruthy();
        });
    });
});

describe("reducer: tweetsReducer", () => {
    describe("on ADD_TWEET", () => {
        it("should add a tweet to the current list of tweets", () => {
            let tweet: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", true);
            let initialState: Array<Tweet> = [tweet];
            deepfreeze(initialState);

            let tweetToAdd: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);

            let payload: any = {tweet: tweetToAdd}

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: ADD_TWEET,
                    payload
                });

            expect(changedState.length).toBe(2);
            expect(changedState[1]).toBe(payload.tweet)
        });
    });

    describe("on REMOVE_TWEET", () => {
        it("should remove the tweet by id from the list of tweets", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", true);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);
            let initialState: Array<Tweet> = [tweet1, tweet2];
            deepfreeze(initialState);

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
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);
            let initialState: Array<Tweet> = [tweet1, tweet2];
            deepfreeze(initialState);

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: TOGGLE_STAR_TWEET,
                    payload: {
                        id: 1
                    }
                });

            expect(changedState[0].starred).toBeTruthy();
        });

        it("should unstar the tweet that was passed in the payload if it was false", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", true);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);
            let initialState: Array<Tweet> = [tweet1, tweet2];
            deepfreeze(initialState);

            let changedState: Array<Tweet> = tweetsReducer(initialState,
                {
                    type: TOGGLE_STAR_TWEET,
                    payload: {
                        id: 1
                    }
                });

            expect(changedState[0].starred).toBeFalsy();
        });
    });

    describe("SET_TWEETS", () => {
        it("should set all the tweets and remove other tweets as well", () => {
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);
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
            let tweet1: Tweet = new Tweet(1, "@KwintenP", "Giving a talk at JSBE", false);
            let tweet2: Tweet = new Tweet(3, "@JS_BE", "Giving a meetup, yeaj", true);
            let initialState: Array<Tweet> = [tweet1, tweet2];

            let changedState: Array<Tweet> = tweetsReducer(initialState, {type: "UNKNOWN_STATE"});

            _.each(changedState, (tweet: Tweet, index: number) => {
                console.log("test");
                expect(tweet).toBe(initialState[index]);
            });
        });
    });
});