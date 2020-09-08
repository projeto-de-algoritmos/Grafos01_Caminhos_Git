import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import BuscaGit from '../../functions/BuscaGit';

import Graph from 'react-graph-vis';
import { Container, Formulario } from './styles';
import logo from '../../assets/logo.png';

function Dashboard(props) {
  const [node, setNode] = useState([]);
  const [edge, setEdge] = useState([]);
  const [graph, setgraph] = useState({
    nodes: [],
    edges: [],
  });
  const [atualiza, setAtualiza] = useState(false);
  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    nodes: {
      borderWidth: 3,
      size: 30,
      color: {
        border: '#222222',
        background: '#666666',
      },
      font: { color: '#eeeeee' },
    },
    edges: {
      color: 'lightgray',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      await BuscaGit.index(
        props.location.state.user,
        props.location.state.token
      );

      setNode(BuscaGit.getNode());
      setEdge(BuscaGit.getEdge());
    };

    fetchData();
  }, [atualiza]);

  function handleSubmit({ camadas, Usuario_Buscado }) {
    setAtualiza(true);
    const data = {
      nodes: [],
      edges: [],
    };
    console.log(graph.nodes);
    Object.entries(node).forEach(([index, no]) => {
      data.nodes.push({
        id: no.login,
        shape: 'circularImage',
        image: no.image,
      });
    });
    edge.map((k) => {
      data.edges.push(k);
    });

    setgraph(data);
  }
  function gerarCaminho({ origem, buscado }) {
    const data = {
      nodes: [],
      edges: [],
    };
    let no;
    const lista = BuscaGit.BuscaUsuario(origem, buscado);
    console.log(origem);
    if (origem === '') {
      origem = props.location.state.user;
    }
    try {
      console.log(lista);
      lista.map((user) => {
        no = node[user];
        data.nodes.push({
          id: no.login,
          shape: 'circularImage',
          image: no.image,
        });
      });
      for (var i in lista) {
        let j = i;
        console.log(i);

        data.edges.push({
          from: lista[j],
          to: lista[++j],
        });
      }

      console.log(data.edges);
      setgraph(data);
    } catch (e) {
      alert('Usuário não exite no grafo mapeado');
      return;
    }
  }

  return (
    <Container>
      <Formulario>
        <Form onSubmit={gerarCaminho}>
          <Input name="origem" type="fieldName" placeholder="Nó de Origem" />
          <Input
            name="buscado"
            type="fieldName"
            placeholder=" Usuario Buscado"
          />

          <button type="submit">Menor Caminho</button>
        </Form>
        <button type="submit" onClick={handleSubmit}>
          Gerar grafo
        </button>
      </Formulario>
      <Graph graph={graph} options={options} />
    </Container>
  );
}
export default Dashboard;
