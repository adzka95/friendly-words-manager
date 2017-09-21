import * as R from "ramda"

export const Modal = {
    ask: (question, positive) => Promise.reject(),
    show: (children) => undefined,
    hide: () => undefined,
    toggle: () => undefined,
    textAsk: (question, defaultText, positive) => Promise.reject(),
    optionAsk: (question, options) => Promise.reject()
}

export const onConfirm = f => R.when(
    ({type}) => type === "confirm",
    ({value}) => f(value)
)

export const initializeModal = R.once(actions => Object.assign(Modal, actions))