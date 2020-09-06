class Graph {
  constructor() {
    this.nodes = {};
    this.bfs_tree = false;
  }
  // em 'data' deve vir o JSON retornado pelo resultado do GET na api do GitHub.
  addNode(data) {
    let node = {
      login: data['login'],
      image: data['avatar_url'],
      neighbors: [],
      degree: 0,
      is_visited: false,
    };

    this.nodes[data['login']] = node;
    //console.log(this.nodes[data['login']]);
  }

  addEdge(origin, destiny) {
    this.nodes[origin]['neighbors'].push(destiny);
    this.nodes[origin]['degree']++;
  }

  bfs(origin, destiny) {
    let resulting_tree = {}; // objeto para armazenar a árvore final.
    resulting_tree[origin] = {
      // adicionando o nó origem como raiz ao resultado final da árvore de busca.
      name: origin,
      parent: null, // esse nó não tem pai, significa que é a raiz da árvore.
      sons: [],
    };
    let queue = []; // fila utilizada no algoritmo bfs.

    this.nodes[origin]['is_visited'] = true; // marcando o nó inicial da busca como visitado.
    queue.push(origin); // adicionando o nó ao final da fila.

    while (queue.length != 0) {
      // enquanto a fila nao estiver vazia.
      let u = queue.shift(); // retira o primeiro da fila e salva em u.
      console.log('cada no -> ', u);
      for (let neighbor of this.nodes[u]['neighbors']) {
        // para cada vizinho de u.

        if (!this.nodes[neighbor]['is_visited']) {
          // se o vizinho de u, em questão, não foi visitado ainda então...
          console.log('vizinhos nao visitados ->> ', neighbor);
          var tree_node = {
            // criando o nó do vizinho de u na árvore.
            name: neighbor,
            parent: u,
            sons: [],
          };
          resulting_tree[neighbor] = tree_node; // adicionando o nó, criado acima, na árvore.
          resulting_tree[u]['sons'].push(neighbor); // adicionando a aresta u -> tree_node na árvore.
          queue.push(neighbor); // adicionando o nó atual à fila.
          this.nodes[neighbor]['is_visited'] = true; // marcando nó atual como visitado.

          if (this.nodes[neighbor]['login'] === destiny) { // se o no atual for igual ao nó que estou procurando, retorna a árvore BFS.
            graph.setBfsTree(resulting_tree);
            return resulting_tree;
          }
        }
      }
    }

    for (let node in this.nodes) // loop para setar a propriedade 'is_visited' de todos os elementos para falso, para realizar uma nova busca.
      this.nodes[node]['is_visited'] = false;

    return {}; // se não encontrar retorna um objeto vazio ( apagando o nó inicial que havia sido colocado na árvore resposta no começo ).
  }
  
  getNodes() {
    return this.nodes; // retornando todos os nós do grafo
  }

  getEdges() {
    let edges = [];
    for (let node in this.nodes) {
      for(let edge of this.nodes[node]['neighbors']) {
        let new_edge = {
          origin: node,
          destiny: edge,
        }
        edges.push(new_edge);
      }
    }

    return edges;
  }

  setBfsTree(tree) {
    this.bfs_tree = tree; // recebendo a árvore resposta se a busca em largura for executada;
  }

  path(origin, destiny) {
    let tree = this.bfs_tree;  // pegando a árvore gerada pelo resultado da busca em largura.
    
    if (this.bfs_tree === false) {
      console.log('You need to run bfs function before!');
      return {};
    }
    else if (Object.getOwnPropertyNames(tree).length === 0) { // verificando se não é um objeto vazio.
      console.log('There is not a path!');
      return {};
    }

    let shortest_path = []; // estrutura para armazenar a lista do menor caminho.
    shortest_path.unshift(destiny); // adiciona o nó procurado na lista.
    shortest_path.unshift(tree[destiny]['parent']); // adicionando o nó mãe de destiny na lista, pois tem q ser no mínimo 2 nós de resposta.

    let aux = tree[tree[destiny]['parent']]['parent']; // variável auxiliar guarda o nó mãe do nó mãe de destiny;

    while (aux != null) {
      // se o nó mãe do nó mãe da pessoa procurada for diferente de nulo, então ainda não chegou no nó raiz da árvore (nó origem).
      shortest_path.unshift(aux); // adiciona o nó mãe do nó mãe da pessoa procurada na lista de menor caminho entre os nós em questão.

      aux = tree[aux]['parent']; // nó auxiliar recebe um parente acima do nó adicionado à lista de menor caminho, e assim sucessivamente até encontrar a raiz.
    }

    return shortest_path; // retornando a lista de menor caminho.
  }

  print() {
    console.log(this.nodes);
  }

}

module.exports = Graph;


/*
Exemplo de JSON que deve vir em data:

{
  "login": "arthurarp",
  "avatar_url": "https://avatars0.githubusercontent.com/u/31700115?v=4",
}


*/
