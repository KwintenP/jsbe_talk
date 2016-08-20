import {TOGGLE_TOPBAR} from "./topbar.actions";
import {topbarReducer} from "./topbar.reducer";
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