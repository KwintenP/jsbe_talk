import {TOGGLE_SIDEBAR} from "./sidebar.actions";
import {sidebarReducer} from "./sidebar.reducer";
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