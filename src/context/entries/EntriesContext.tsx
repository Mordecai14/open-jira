import { createContext } from 'react';
import { Entry } from '@/interfaces';

interface ContextProps {
    entries: Entry[];

    //methods
    addNewentry: (description: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);