import {Action} from "@ngrx/store";
import {TOGGLE_SIDEBAR} from "./sidebar.actions";

export function sidebarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return !state;
        default:
            return state;
    }
}