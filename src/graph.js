class Graph {
  constructor () {
    this.nodes = {};
  }
  // em 'data' deve vir o JSON retornado pelo resultado do GET na api do GitHub.
  addNode (data) {
    let node = {
      'login': data['login'],
      'image': data['avatar_url'],
      'neighbors': [],
      'is_visited': false,
    };

    this.nodes[data['login']] = node;
    console.log(this.nodes[data['login']])
  }

  addEdge (origin, destiny) {
    this.nodes[origin]['neighbors'].push(destiny);
  }

  bfs(origin, destiny) {
    let resulting_tree = {};
    let queue = [];

    this.nodes[origin]['is_visited'] = true; // marcando o nó inicial da busca como visitado.
    queue.push(origin); // adicionando o nó ao final da fila.
    while (queue.length != 0) { // enquanto a fila nao estiver vazia.
      let u = queue.shift(); // retira o primeiro da fila e salva em u.
      console.log('no atual ->', u);
      for (let neighbor of this.nodes[u]['neighbors']) { // para cada vizinho de u.
        console.log('cada vizinho -> ', neighbor);
        if (!this.nodes[neighbor]['is_visited']) { // se o vizinho de u, em questão, não foi visitado ainda então...
          this.nodes[neighbor]['is_visited'] = true; // marcando nó atual como visitado.
          queue.push(neighbor); // adicionando o nó atual à fila.
          
          if (this.nodes[neighbor]['login'] === destiny) // se o no atual for igual ao nó que estou procurando, retorna a árvore BFS.
            return destiny + ' has found!';
          
        }
      }

    }
    

    return 'not found!';
  }

  print () {
    for (var node in this.nodes) {
      console.log(node);
    }
  }


}

/*
Exemplo de JSON que deve vir em data:

{
  "login": "arthurarp",
  "avatar_url": "https://avatars0.githubusercontent.com/u/31700115?v=4",
}


*/

