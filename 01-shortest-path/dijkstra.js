const _ = require('lodash')
const GraphNode = require('../utils/GraphNode')

const getLength = (u, v) => {
  const i = _.findIndex(u.adj, { n: v.n })
  const w = u.adj[i] || {}
  return w.w
}

// 1. Mark all nodes unvisited.
// Create a set of all the unvisited nodes called the unvisited set.
const adjWithDistances = [
  [ {n:1,w:7}, {n:2,w:3} ],
  [ {n:0,w:7}, {n:2,w:1}, {n:3,w:2}, {n:4,w:6} ],
  [ {n:0,w:3}, {n:1,w:1}, {n:3,w:2} ],
  [ {n:2,w:2}, {n:1,w:2}, {n:4,w:4} ],
  [ {n:3,w:4}, {n:1,w:6} ],
]
const unvisited = []
for (let i=0, l=4; i <= 4; i++) {
  unvisited.push(
    new GraphNode({ n: i, adj: adjWithDistances[i] })
  )
}

// 2. Set the initial node as current.
// Assign to every node a tentative distance value: set it to zero for
// our initial node and to infinity for all other nodes.
Object.values(unvisited).forEach(each => {
  each.distance = Number.POSITIVE_INFINITY
})
unvisited[0].distance = 0



// 3. For the current node, consider all of its unvisited neighbors
// and calculate their tentative distances through the current
// node. Compare the newly calculated tentative distance to the
// current assigned value and assign the smaller one. For example,
// if the current node A is marked with a distance of 6, and the edge
// connecting it with a neighbor B has length 2, then the distance to
// B through A will be 6 + 2 = 8. If B was previously marked with a
// distance greater than 8 then change it to 8. Otherwise,
// keep the current value.
const visited = []
while (!!unvisited.length) {
  const minDist = Math.min(...unvisited.map(e => e.distance))
  const minDistIndex = _.findIndex(unvisited, { distance: minDist })
  const n = unvisited.splice(minDistIndex, 1)[0]
  visited.push(n)
  n.adj.forEach(neighbor => {
    const neighborNode = _.find(unvisited, { n: neighbor.n })
    if (neighborNode) {
      const length = getLength(n, neighborNode)
      const alt = n.distance + length
      if (alt < neighborNode.distance) {
        neighborNode.distance = alt
      }
    }
  })
}

visited.forEach(each => console.log(each.distance))
