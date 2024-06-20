import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"
import { useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"
import { styled } from '@mui/system'

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')

    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const parametros = useParams();

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`).then((response) => {
                setNomePrato(response.data.nome);
                setDescricao(response.data.descricao);
                setTag(response.data.tag);
                setRestaurante(response.data.restaurante.toString());
            });
        }
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const CustomLabel = styled('label')({
        borderRadius: '4px',
        border: '1px solid rgba(25, 118, 210, 0.5)',
        color: '#1976d2',
        padding: '12px',
        textTransform: 'uppercase',
        fontWeight: '500',
        cursor: 'pointer'
    })

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)

        formData.append('tag', tag)

        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(erro => console.log(erro))

    }

    return (
        <Box sx={{ marginTop: 1 }}>
            <Container maxWidth='lg' sx={{ marginTop: 1 }}>
                <Paper sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                        <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomePrato}
                                onChange={evento => setNomePrato(evento.target.value)}
                                label="Nome do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                            />
                            <TextField
                                value={descricao}
                                onChange={evento => setDescricao(evento.target.value)}
                                label="Descrição do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                            />

                            <FormControl margin="dense" fullWidth >
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                                    {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                        {tag.value}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl margin="dense" fullWidth >
                                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                        {restaurante.nome}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <CustomLabel htmlFor="file-upload">
                                Escolher arquivo
                                <input type="file" id='file-upload' onChange={selecionarArquivo} style={{display: 'none'}}/>
                            </CustomLabel>
                            <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>

    )
}

export default FormularioPrato