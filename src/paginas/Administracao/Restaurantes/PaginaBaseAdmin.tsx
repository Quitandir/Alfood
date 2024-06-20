import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material"
import { Outlet, Link as RouterLink } from 'react-router-dom'

const PaginaBaseAdmin = () => {
    return (
        <>
        
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar sx={{display:'flex', gap:'50px'}}>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            
            <Outlet />
        </>
    )
}

export default PaginaBaseAdmin