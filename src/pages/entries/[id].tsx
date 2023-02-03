import { capitalize, Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "@/components/layouts";
import { EntryStatus } from '@/interfaces';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

export const EntryPage = () => {
    return (
        <Layout title=".........">
            <Grid container justifyContent='center' sx={{
                marginTop: 2,
                height: 'calc(100vh - 150px)',

            }}>
                <Grid item xs={12} sm={8} md={6} >
                    <Card>
                        <CardHeader title='Entrada:' subheader={`Creada hace ... un rato`}>

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
                            />
                            <FormControl >
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    sx={{ justifyContent: 'center' }}

                                    row
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

export default EntryPage;