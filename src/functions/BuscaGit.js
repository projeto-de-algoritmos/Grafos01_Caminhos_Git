import 'dotenv/config';
import api from '../api';
import Graph from './graph';

class BuscaGit {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  async index(request) {
    const graph = new Graph();
    // let inicial = {
    //   login: 'Andre-Eduardo',
    //   avatar_url: 'https://avatars0.githubusercontent.com/u/31700115?v=4',
    // }; // inicial
    var temp = await api.get(`/users/${inicio.user}`);

    var inicial = {
      login: temp.login,
      avatar_url: temp.avatar_url,
    };
    let name = 'Andre-Eduardo';

    let vizinhos = [];

    graph.addNode(inicial);
    let cont = 0;
    let num = 0;
    let camada = 0;
    while (camada <= 1) {
      console.log(num);
      let response = await api.get(`/users/${name}/followers?per_page=10`, {
        // pega ate os 100 primeiros seguidores
        auth: {
          username: process.env.USER,
          password: process.env.PASS,
        },
      });

      response.data.map((user) => {
        let data = {
          login: user.login,
          avatar_url: user.avatar_url,
        };
        if (
          vizinhos.find(function (element) {
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

    // console.log(vizinhos);
    this.nodes = graph.getNodes();
    this.edges = graph.getEdges();
    return;
  }
  getNode() {
    return this.nodes;
  }
  getEdge() {
    return this.edges;
  }
}

export default new BuscaGit();
