import 'dotenv/config';
import api from '../api';
import Graph from './graph';

class BuscaGit {
  constructor() {
    this.nodes = {};
    this.edges = {};
    this.graph = new Graph();
  }

  async index(login, token) {
    console.log(token);

    var temp = await api.get(`/users/${login}`);
    console.log(temp.data.login);
    console.log(temp.data.token);
    var inicial = {
      login: temp.data.login,
      avatar_url: temp.data.avatar_url,
    };
    console.log(inicial);
    let name = temp.data.login;
    let vizinhos = [];
    let cont = 0;
    let num = 0;
    let camada = 0;
    this.graph.addNode(inicial);

    while (camada <= 2) {
      console.log(num);
      let response = await api.get(`/users/${name}/followers`, {
        headers: {
          Authorization: `token ${token}`,
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

          this.graph.addNode(data);
        }

        this.graph.addEdge(inicial['login'], data['login']);
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
    this.nodes = this.graph.getNodes();
    this.edges = this.graph.getEdges();
    console.log(this.edges);
    return;
  }
  getNode() {
    return this.nodes;
  }
  getEdge() {
    return this.edges;
  }
  BuscaUsuario(origem, destino) {
    console.log([origem, destino]);

    console.log(this.graph.bfs(origem, destino));
    this.graph.bfs(origem, destino);
    return this.graph.path(origem, destino);
  }
}

export default new BuscaGit();
