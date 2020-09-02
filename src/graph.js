class Graph {
  constructor() {
    this.nodes = {};
  }

  // em 'data' deve vir o JSON retornado pelo resultado do GET na api do GitHub.
  addNode(data) {
    let node = {
      image: data['avatar_url'],
      neighbors: [],
    };

    this.nodes[data['login']] = node;
  }

  addEdge(origin, destiny) {
    this.nodes[origin]['neighbors'].push(destiny);
  }

  print() {
    console.log(this.nodes);
  }
}

/*
Exemplo de JSON que deve vir em data:

{
  "login": "arthurarp",
  "avatar_url": "https://avatars0.githubusercontent.com/u/31700115?v=4",
}


*/
