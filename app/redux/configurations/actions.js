import * as configActionsTypes from "./actionTypes"
import {initAction, plainAction} from "../actions"

export const changeConfigsSearchQuery = (newQuery) => ({type: configActionsTypes.listQueryChange, payload: newQuery})
export const changeActiveConfig = (activeConfig) => ({
    type: configActionsTypes.listActiveConfigChange,
    payload: activeConfig
})


const saveConfigFactory = action => (name, config) => ({
    type: action,
    payload: {
        name,
        config
    }
})
export const saveConfig = saveConfigFactory(configActionsTypes.saveConfig)
export const saveConfigFinish = saveConfigFactory(configActionsTypes.saveConfigFulfilled)

export const loadConfigs = plainAction(configActionsTypes.loadingConfigs)
export const loadConfigsFinish = configs => ({type: configActionsTypes.loadingConfigsFulfilled, payload: configs})

export const initLoadConfigs = initAction("LOAD_CONFIGS", () => new Promise(resolve => resolve([
    {
        name: "testowa",
        config: {}
    },
    {
        name: "testowa2",
        config: {}
    }
])))