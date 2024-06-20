import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"


const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(response => setRestaurante(response.data.nome))
        }
    }, [parametros])

    const [restaurante, setRestaurante] = useState('')

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: restaurante
            })
        } else {
            http.post('restaurantes/', {
                nome: restaurante
            })

        }

    }

    return (
        <>
            <Box>
                <Container maxWidth='lg' sx={{ marginTop: 1 }}>
                    <Paper sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: '1' }}>
                            <Typography component='h1' variant='h6'>Formulário de restaurantes</Typography>
                            <Box sx={{ width: '100%' }} component='form' onSubmit={onSubmit}>
                                <TextField
                                    value={restaurante}
                                    onChange={e => setRestaurante(e.target.value)}
                                    label='Nome do restaurante'
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: '1' }} type="submit" variant='outlined' fullWidth>Cadastrar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>

    )
}

export default FormularioRestaurante