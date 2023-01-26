import { FC, PropsWithChildren } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'

interface Props {
    entry: Entry;
    color: string;
}

export const EntryCard: FC<PropsWithChildren<Props>> = ({ entry, color }) => {
    return (
        <Card
            sx={{ marginBottom: 1, backgroundColor: color }}
        //eventos drag
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
