// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from "react";

type State = {
    currentStep: number;
    name: string;
    level: 0 | 1;
    email: string;
    github: string;
}
type Action = {
    type: FormAction
    payload: any;
}

const initialData: State = {
    currentStep: 0,
    name: '',
    level: 0,
    email: '',
    github: ''
}
type ContextType = {
    state: State;
    dispatch: (Action: Action) => void;
}
type FormProviderProps = {
    children: ReactNode
}

//  Context
const FormContext = createContext<ContextType | undefined>(undefined)

// Reduce
export enum FormAction {
    setCurrentStep,
    setName,
    setLevel,
    setEmail,
    setGithub
}
const formReduce = (state: State, action: Action) => {
    switch(action.type) {
        case FormAction.setCurrentStep:
            return {...state, currentStep: action.payload}
        case FormAction.setName:
            return {...state, name: action.payload}
        case FormAction.setLevel:
            return {...state, level: action.payload}
        case FormAction.setEmail:
            return {...state, email: action.payload}
        case FormAction.setGithub:
            return {...state, github: action.payload}
        default:
            return state;
    }   
}

//  Provider
export const FormProvider = ({children}: FormProviderProps) => {
    const [state, dispatch] = useReducer(formReduce, initialData)
    const value = {state, dispatch}
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

//  Context Hook
export const useForm = () => {
    const context = useContext(FormContext);
    if(context === undefined) {
        throw new Error('useForm precisa ser usado dentro do FormProvider')
    }
    return context
}