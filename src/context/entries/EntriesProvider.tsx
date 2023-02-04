import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/api';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const addNewentry = async (description: string) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending',
        //     color: "#8b2d01a4"
        // }

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] Add-Entry', payload: data });
    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: '[Entry] Entry-Updated', payload: data })


            if (showSnackBar)
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }

                });


        } catch (error) {
            console.log(error)
        }
    }

    const refreshEntries = async () => {
        try {
            const { data } = await entriesApi.get<Entry[]>('/entries');
            dispatch({ type: '[Entry] Refresh-Data', payload: data })
        } catch (error) {
            console.log("Entries provider", error)
        }
    }

    useEffect(() => {
        refreshEntries();
    }, [])

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