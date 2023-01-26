import { FC, PropsWithChildren, useContext, useMemo } from 'react';
import { EntryStatus } from "@/interfaces"
import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<PropsWithChildren<Props>> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

    return (
        <div>
            <Paper
                sx={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    backgroundColor: 'transparent',
                    height: 'calc(100vh - 250px)',
                    overflowY: 'scroll',
                    padding: '1px 5px',
                }}>
                <List sx={{ opacity: 1 }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} color={entry.color} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
