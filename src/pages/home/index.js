import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import BuscaGit from '../../functions/BuscaGit';

import Graph from 'react-graph-vis';
import { Container } from './styles';
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
        props.location.state.login,
        props.location.state.pass
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
    console.log(data);
    setgraph(data);
  }
  return (
    <Container>
      {console.log(node)}

      <Form onSubmit={handleSubmit}>
        <Input
          name="camadas"
          type="fieldName"
          placeholder=" Numero de camadas"
        />
        <Input
          name="Usuario_Buscado"
          type="fieldName"
          placeholder=" Usuario Buscado"
        />

        <button type="submit">Buscar</button>
      </Form>
      <Graph graph={graph} options={options} />
    </Container>
  );
}
export default Dashboard;