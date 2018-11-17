class GraphNode {
  constructor(p) {
    this.n = p.n
    this.adj = p.adj || []
  }
}

module.exports = GraphNode
