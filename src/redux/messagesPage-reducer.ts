import { actionsType } from "./redux-store";

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    message: string
}

let initialState = {
    Dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Ivan'},
        {id: 3, name: 'Vladimir'},
        {id: 4, name: 'Yuki'},
        {id: 5, name: 'Oli'},
        {id: 6, name: 'Sveta'},
    ] as Array<DialogsType>,
    Messages: [
        {id: 1, message: 'Yo bra'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'AFK'},
        {id: 4, message: 'Bye'},
    ]  as Array<MessagesType> 
}  

export type initialStateType = typeof initialState

const messagesPageReducer = (state: initialStateType = initialState, action: messagesPageActionsType)
: initialStateType => {
    switch (action.type) {
        case 'ADD-NEW-MESSAGE':
            return {
                ...state,
                Messages: [...state.Messages, {id: state.Messages.length + 1, message: action.newMessage}],
            }      
        default:
            return state;
    }
}

type messagesPageActionsType = actionsType<typeof actions>

export const actions = {
    addNewMessageActionCreator: (newMessage: string) => {

        return {
            type: 'ADD-NEW-MESSAGE',
            newMessage
        } as const
    } 
}

export default messagesPageReducer;
