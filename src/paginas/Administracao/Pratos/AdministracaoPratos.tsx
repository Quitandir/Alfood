import { useEffect, useState } from "react"
import IPrato from "../../../interfaces/IPrato"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

const AdministracaPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => setPratos(response.data))
    }, [])

    const excluir = (pratoExcluido: IPrato) => {
        http.delete(`pratos/${pratoExcluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoExcluido.id)
                setPratos(listaPratos)
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato => (
                        <TableRow sx={{ verticalAlign: 'baseline' }}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target='_blank' rel="noreferrer">Ver imagem</a>
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell sx={{ maxWidth: '40px' }}>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaPratos