import {MainPageState} from "../applicationState";
import {TOGGLE_SIDEBAR} from "./sidebar.actions";
import {mainPageReducer} from "./mainpage.reducer";
import {TOGGLE_TOPBAR} from "./topbar.actions";
let deepfreeze = require("deep-freeze");
describe("reducer: mainPageReducer", () => {
    describe("on case: TOOGLE_SIDEBAR", () => {
        it("should set the toggleSidebar to false", () => {
            let initialState: MainPageState = {
                sidebarCollapsed: true,
                topbarCollapsed: false
            };
            deepfreeze(initialState);

            let result: MainPageState = mainPageReducer(initialState, {type: TOGGLE_SIDEBAR});

            expect(result.sidebarCollapsed).toBeFalsy();
        });

        it("should set the toggleSidebar to true", () => {
            let initialState: MainPageState = {
                sidebarCollapsed: false,
                topbarCollapsed: false
            };
            deepfreeze(initialState);

            let result: MainPageState = mainPageReducer(initialState, {type: TOGGLE_SIDEBAR});

            expect(result.sidebarCollapsed).toBeTruthy();
        });
    });

    describe("on case: TOOGLE_TOPBAR", () => {
        it("should set the togbarCollapsed to true", () => {
            let initialState: MainPageState = {
                sidebarCollapsed: true,
                topbarCollapsed: false
            };
            deepfreeze(initialState);

            let result: MainPageState = mainPageReducer(initialState, {type: TOGGLE_TOPBAR});

            expect(result.topbarCollapsed).toBeTruthy();
        });

        it("should set the togbarCollapsed to false", () => {
            let initialState: MainPageState = {
                sidebarCollapsed: true,
                topbarCollapsed: true
            };
            deepfreeze(initialState);

            let result: MainPageState = mainPageReducer(initialState, {type: TOGGLE_TOPBAR});

            expect(result.topbarCollapsed).toBeFalsy();
        });
    });
});
