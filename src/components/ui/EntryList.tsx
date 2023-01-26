import { DragEvent, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"

import { EntryStatus } from "@/interfaces"
import { EntryCard } from "./EntryCard"
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '@/context/ui';
import styles from "./EntryList.module.css"

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<PropsWithChildren<Props>> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')
        console.log({ id })

        const entry = entries.find(e => e._id === id)!
        entry.status = status
        updateEntry(entry)
        endDragging()
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return (
        <div
            className={isDragging ? styles.dragging : ''}
            onDrop={onDropEntry}
            onDragOver={allowDrop}
        >
            <Paper
                sx={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    backgroundColor: 'transparent',
                    height: 'calc(100vh - 250px)',
                    overflowY: 'scroll',
                    padding: '1px 5px',
                }}>
                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
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
