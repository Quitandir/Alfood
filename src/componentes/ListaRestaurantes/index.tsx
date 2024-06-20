import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';


interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState<string>('id')


  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {
        ordering: ordem
      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca

    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {

    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>

      <Box >
        <FormControl component='form' onSubmit={buscar} sx={{maxWidthwidth: '600px', display: 'flex', flexDirection: 'row', gap: '1em'}}>

          <input 
            type="text" 
            value={busca} 
            onChange={evento => setBusca(evento.target.value)}
          />

          <Select
            labelId="ordem"
            id="ordem"
            value={ordem}
            onChange={evento => setOrdem(evento.target.value)}
            variant="outlined"
            
          >
            <MenuItem value={'id'} defaultChecked>Ordem de cadastro</MenuItem>
            <MenuItem value={'nome'}>Ordem alfabética</MenuItem>
          </Select>

          <Button type='submit' variant="outlined">buscar</Button>
        </FormControl>
      </Box>

      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

      <Box display='flex' gap='50px'>
        {<Button variant='outlined' onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
          Página Anterior
        </Button>}
        {<Button variant='outlined' onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
          Próxima página
        </Button>}

      </Box>
    </section>)
}

export default ListaRestaurantes