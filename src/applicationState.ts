import {Tweet} from "./entities/tweet.entity";

export interface ApplicationState {
    ui: UiState,
    data: DataState
}

export interface UiState {
    mainPage: MainPageState;
}

export interface DataState {
    tweets: Array<Tweet>;
}

export interface MainPageState {
    sidebarCollapsed: boolean;
    topbarCollapsed: boolean;
}

