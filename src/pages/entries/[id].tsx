import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Entry, EntryStatus } from '@/interfaces';
import { Layout } from "@/components/layouts";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {


    const { updateEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }
    const onSave = () => {

        if (inputValue.trim().length === 0) return;

        const entryUpdated: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(entryUpdated, true);

    }

    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid container justifyContent='center' sx={{
                marginTop: 2,
                height: 'calc(100vh - 150px)',

            }}>
                <Grid item xs={12} sm={8} md={6} >
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                        >

                        </CardHeader>

                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            <TextField
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 1
                                }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputChange}
                                helperText={isNotValid && 'Ingrese una tarea'}
                                error={isNotValid}
                            />
                            <FormControl >
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    sx={{ justifyContent: 'center' }}
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: "fixed",
                bottom: 70,
                right: 30,
                backgroundColor: "slateblue"
            }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>

        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;