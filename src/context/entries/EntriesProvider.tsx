import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendietes: Culpa est fugiat sint deserunt reprehenderit mollit esse ut ut do labore.',
            status: 'pending',
            createdAt: Date.now(),
            color: "#8b2d01a4"
        },
        {
            _id: uuidv4(),
            description: 'En progreso: Et nostrud Lorem amet voluptate velit occaecat ipsum.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
            color: "#2300fb59"

        },
        {
            _id: uuidv4(),
            description: 'Terminada: Pariatur sunt nostrud nostrud elit non quis fugiat voluptate consequat.',
            status: 'finish',
            createdAt: Date.now() - 10000,
            color: "#00800075"
        }
    ],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewentry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending',
            color: "#8b2d01a4"
        }
        dispatch({ type: '[Entry] Add-Entry', payload: newEntry })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] Entry-Updated', payload: entry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            //methods
            addNewentry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};