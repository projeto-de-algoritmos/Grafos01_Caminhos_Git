import 'dotenv/config';
import api from '../api';
import Graph from './graph';

class BuscaGit {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  async index(login, pass) {
    console.log(login);
    const graph = new Graph();

    var temp = await api.get(`/users/${login}`);
    console.log(temp.data.login);
    var inicial = {
      login: temp.data.login,
      avatar_url: temp.data.avatar_url,
    };
    console.log(inicial);
    let name = temp.data.login;

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
          username: `${login}`,
          password: `${pass}`,
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
