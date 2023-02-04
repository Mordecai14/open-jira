import { DragEvent, FC, PropsWithChildren } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'
import { useContext } from 'react';
import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<PropsWithChildren<Props>> = ({ entry }) => {
    // console.log(entry.color)
    const router = useRouter()

    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)

        startDragging();
    }

    const onDragEnd = () => {
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
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
            onClick={onClick}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: "pre-line" }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
