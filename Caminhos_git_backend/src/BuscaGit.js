import 'dotenv/config';
import api from './api';
import Graph from './graph';

class BuscaGit {
  async index(req, res) {
    const graph = new Graph();
    let inicial = {
      login: 'Andre-Eduardo',
      avatar_url: 'https://avatars0.githubusercontent.com/u/31700115?v=4',
    }; // inicial
    let name = 'Andre-Eduardo';
    const procurado = 'fepas';
    let vizinhos = [];

    graph.addNode(inicial);
    let cont = 0;
    let num = 0;
    let camada = 0;
    while (camada <= 2) {
      console.log(num);
      let response = await api.get(`/users/${name}/followers`, {
        auth: {
          username: process.env.USER,
          password: process.env.PASS,
        },
      });

      response.data.map(user => {
        let data = {
          login: user.login,
          avatar_url: user.avatar_url,
        };
        if (
          vizinhos.find(function(element) {
            return element === user.login;
          }) === undefined
        ) {
          //verificando nos repetidos
          vizinhos.push(user.login);

          graph.addNode(data);
        }
        graph.addEdge(inicial['login'], data['login']);
      });

      if (num === 0) {
        num = vizinhos.length - cont;
        camada += 1;
      }
      inicial = {
        login: vizinhos[cont],
      };
      name = vizinhos[cont];
      cont += 1;
      num -= 1;
    }
    console.log(vizinhos);
    return res.json('ola');
  }
}

export default new BuscaGit();
