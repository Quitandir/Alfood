import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
                setRestaurantes(listaRestaurantes)
            })
    }

    return (
        <TableContainer component={Paper} sx={{ width: '80%', margin: '50px auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow sx={{ verticalAlign: 'baseline' }}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell sx={{maxWidth: '40px'}}>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes