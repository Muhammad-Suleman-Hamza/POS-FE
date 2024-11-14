import { tokens } from "../theme";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { useTheme } from "@mui/material";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid
            container
            component="main"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        >
            <Grid
                item
                square
                elevation={1}
                component={Paper}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary[400],
                }}
            >
                <PropagateLoader
                    loading={true}
                    color={'orange'}
                    data-testid="loader"
                    aria-label="Loading Spinner"
                />
            </Grid>
        </Grid>
    );
}

export default Loader;
