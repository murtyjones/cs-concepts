const _ = require('lodash')
const GraphNode = require('../utils/GraphNode')

const getLength = (u, v) => {
  const w = u.adj.filter(e => e.n === v.n)[0]
  return w.w
}

const adjWithDistances = [
  [ {n:1,w:7}, {n:2,w:3} ],
  [ {n:0,w:7}, {n:2,w:1}, {n:3,w:2}, {n:4,w:6} ],
  [ {n:0,w:3}, {n:1,w:1}, {n:3,w:2} ],
  [ {n:1,w:2}, {n:2,w:2}, {n:4,w:4} ],
  [ {n:1,w:6}, {n:3,w:4} ],
]
// create a set of unvisited nodes and place
// all nodes inside of it to start with.
const unvisited = []
for (let i=0, l=4; i <= 4; i++) {
  unvisited.push(
    new GraphNode({ n: i, adj: adjWithDistances[i] })
  )
}

// make every distance infinitely large as we
// don't even know if it's possible to get
// to every node from the starting point
// until we start mapping.
Object.values(unvisited).forEach(each => {
  each.distance = Number.POSITIVE_INFINITY
})
// set our starting node to a distance of zero
unvisited[0].distance = 0

// create a set of visited nodes to add to.
const visited = []

// while some nodes remain unvisited:
while (!!unvisited.length) {
  // find the lowest distance node:
  const minDist = Math.min(...unvisited.map(e => e.distance))
  const minDistIndex = _.findIndex(unvisited, { distance: minDist })
  const n = unvisited.splice(minDistIndex, 1)[0]
  visited.push(n)

  // for that lowest distance node, iterate through
  // its neighbor nodes
  n.adj.forEach(neighbor => {
    const neighborNode = _.find(unvisited, { n: neighbor.n })
    // for a given neighbor node:
    // 1. get the distance between current
    // node and neighbor node ("length").
    // 2. add "length" to the distance
    // of the current node from our initial node
    // 3. if the length btw curr and neigh. node,
    // + the distance of curr node to root node
    // is less than the current neighbor node distance,
    // we know that we can lower the neigh. node distance
    if (neighborNode) {
      const length = getLength(n, neighborNode)
      const alt = n.distance + length
      if (alt < neighborNode.distance) {
        neighborNode.distance = alt
      }
    }
  })
}

visited.forEach(each => console.log(each.n, each.distance))
