import { DragEvent, FC, PropsWithChildren } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'
import { useContext } from 'react';
import { UIContext } from '@/context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<PropsWithChildren<Props>> = ({ entry }) => {
    console.log(entry.color)

    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)

        startDragging();
    }

    const onDragEnd = () => {
        endDragging();
    }

    return (
        <Card
            sx={{
                marginBottom: 1,
                // backgroundColor: entry.color,
                position: "relative", zIndex: 999
            }}
            //eventos drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: "pre-line" }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>Hace 30 min.</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
