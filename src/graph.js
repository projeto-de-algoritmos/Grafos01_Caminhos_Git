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
    // let resulting_tree = {}
    let queue = [];
    this.nodes[origin]['is_visited'] = true; // marcando o nó inicial da busca como visitado.
    for (var node of this.nodes[origin]['neighbors']) { // para todo nó de G
      if (this.nodes[node]['is_visited']) // ainda não explorado.
        continue; // se ja tiver explorado passa pro próximo.
      
      queue.push(node); // adicionando o nó ao final da fila.
      this.nodes[node]['is_visited'] = true; // marcando o nó como visitado.
      console.log('>>>>>>>>>> fila', queue)

      while (queue !== []) { // enquanto a fila nao estiver vazia.
        let u = queue.shift(); // retira o primeiro da fila e salva em u.
        console.log(u);

        for (let neighbor of this.nodes[u]['neighbors']) { // para cada vizinho de u.
          if (!this.nodes[neighbor]['is_visited']) { // se o vizinho de u, em questão, não foi visitado ainda então...
            if (this.nodes[neighbor] == destiny)
              return destiny + ' found!';
              this.nodes[neighbor]['is_visited'] = true;
              queue.push(neighbor);
            /* var node_tree = {

            }
            resulting_tree[this.nodes[neighbor]['login']] =
          */
            
          }
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

