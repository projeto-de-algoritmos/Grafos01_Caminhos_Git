import api from './api';

class BuscaGit {
  async index(req, res) {
    const name = 'Andre-Eduardo';
    const procurado = 'fepas';
    let achou = false;
    let lista = [];

    const response = await api.get(`/users/${name}/followers`);

    response.data.map(user => {
      lista.push(user.login);
      if (user.login === procurado) {
        achou = true;
      }
    });

    console.log(lista);

    return res.json('ola');
  }
}
export default new BuscaGit();
