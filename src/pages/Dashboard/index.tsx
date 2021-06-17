import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from "./styles";

interface ICampeao {
  id: string;
  ano: string;
  sede: string;
  campeao: string;
}

interface INovoCampeao {
  ano: string;
  sede: string;
  campeao: string;
}

const Dashboard: React.FC = () => {
  const [ano, setAno] = useState('');
  const [sede, setSede] = useState('');
  const [campeao, setCampeao] = useState('');
  const [campeoes, setCampeoes] = useState<ICampeao[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/worldcup',
    })
      .then((response: AxiosResponse<ICampeao[]>) => {
        setCampeoes(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  function deletarCampeao(campeao_id: string): void {
    axios({
      method: 'delete',
      url: `http://localhost:3333/worldcup/${campeao_id}`,
    })
      .then((response: AxiosResponse<ICampeao>) => {
        const outrosCampeoes = campeoes.filter(campeao => {
          return campeao.id !== campeao_id;
        });
        setCampeoes(outrosCampeoes);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function submitForm(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    /* criando o objeto disciplina para poder adicionar no array e tipando com Idisciplina */
    const obj: INovoCampeao = {
      ano,
      sede,
      campeao,
    };

    axios({
      method: 'post',
      url: 'http://localhost:3333/worldcup',
      data: obj,
    })
      .then((response: AxiosResponse<ICampeao>) => {
        const novoCampeao: ICampeao = {
          id: response.data.id,
          ano: response.data.ano,
          sede: response.data.sede,
          campeao: response.data.campeao,
        };
        setCampeoes([...campeoes, novoCampeao]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <form onSubmit={submitForm} >
        <label>Ano da Copa Mundo</label>
        <input type='text' name='ano' value={ano} onChange={(e: any) => { setAno(e.target.value); }} placeholder='Ano da Copa Mundo' />
        <label>Sede da Copa do Mundo</label>
        <input type='text' name='sede' value={sede} onChange={(e: any) => { setSede(e.target.value); }} placeholder='Sede da Copa do Mundo' />
        <label>Campeao Mundial</label>
        <input type='text' name='campeao' value={campeao} onChange={(e: any) => { setCampeao(e.target.value); }} placeholder='Campeao Mundial' />
        <button type="submit">Salvar</button>
      </form>

      <table>
        <thead>
          <tr>
            <td>ano</td>
            <td>sede</td>
            <td>campeao</td>
            <td> </td>
          </tr>
        </thead>

        <tbody>
          {campeoes.map(item => {
            return (
              <tr key={item.id}>
                <td> {item.ano} </td>
                <td> {item.sede} </td>
                <td> {item.campeao} </td>
                <td>
                  <button type="button">
                    <Link to={`/detalhes/${item.campeao}`}>Detalhes</Link>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deletarCampeao(item.id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  )
}

export default Dashboard



