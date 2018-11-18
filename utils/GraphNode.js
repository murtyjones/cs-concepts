class GraphNode {
  constructor(p) {
    this.n = p.n
    this.adj = p.adj || []
    this.visited = false
  }
}

module.exports = GraphNode
