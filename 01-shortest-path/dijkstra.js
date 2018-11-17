const _ = require('lodash')
const GraphNode = require('../utils/GraphNode')

const length = (node, neighbor, nVisited) => {

}

// 1. Mark all nodes unvisited.
// Create a set of all the unvisited nodes called the unvisited set.
const unvisited = {}
for (let i = 1, l = 6; i <= l; i++) {
  unvisited[`n${i}`] = new GraphNode({n:i, adj: []})
}
unvisited.n6.adj = [unvisited.n4]
unvisited.n4.adj = [unvisited.n5, unvisited.n3]
unvisited.n5.adj = [unvisited.n1, unvisited.n2, unvisited.n4]
unvisited.n3.adj = [unvisited.n2, unvisited.n4]

// 2. Set the initial node as current.
const initialNode = unvisited.n6

// Assign to every node a tentative distance value: set it to zero for
// our initial node and to infinity for all other nodes.
Object.values(unvisited).forEach(each => {
  each.distance = Number.POSITIVE_INFINITY
})
unvisited.n6.distance = 0

while (!_.isEmpty(unvisited)) {
  const minDist = Math.min(...Object.values(unvisited).map(e => e.distance))
  const node = _.find(unvisited, { distance: minDist })
  delete unvisited[`n${node.n}`]
  node.adj.forEach(neighbor => {
    if (unvisited[`n${neighbor.n}`]) {
      const alt = node.distance + length(node, neighbor)
    }
  })
}

// 3. For the current node, consider all of its unvisited neighbors
// and calculate their tentative distances through the current
// node. Compare the newly calculated tentative distance to the
// current assigned value and assign the smaller one. For example,
// if the current node A is marked with a distance of 6, and the edge
// connecting it with a neighbor B has length 2, then the distance to
// B through A will be 6 + 2 = 8. If B was previously marked with a
// distance greater than 8 then change it to 8. Otherwise,
// keep the current value.
