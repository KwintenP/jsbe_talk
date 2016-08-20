import {UiState} from "../applicationState";
import {Action} from "@ngrx/store";
import {TOGGLE_SIDEBAR} from "./sidebar.actions";
import {TOGGLE_TOPBAR} from "./topbar.actions";
import {mainPageReducer} from "./mainpage.reducer";

let initialUIState: UiState = {
    mainPage: {
        sidebarCollapsed: false,
        topbarCollapsed: false
    }
}

export function uiReducer(state: UiState = initialUIState, action: Action): UiState {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
        case TOGGLE_TOPBAR:
            return Object.assign({}, state, {mainPage: mainPageReducer(state.mainPage, action)});
        default:
            return state;
    }
}