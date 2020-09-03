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
    let achou = false;
    graph.addNode(inicial);
    let cont = 0;

    while (cont <= 10) {
      let response = await api.get(`/users/${name}/followers`);

      response.data.map(user => {
        let data = {
          login: user.login,
          avatar_url: user.avatar_url,
        };
        vizinhos.push(user.login);
        graph.addNode(data);
        graph.addEdge(inicial['login'], data['login']);
      });
      inicial = {
        login: vizinhos[cont],
      };
      name = vizinhos[cont];
      cont += 1;
    }
    console.log(vizinhos);
    return res.json('ola');
  }
}

export default new BuscaGit();
