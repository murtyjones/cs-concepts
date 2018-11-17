const _ = require('lodash')
const GraphNode = require('../utils/GraphNode')

const length = (node, neighbor) => {

}

// 1. Mark all nodes unvisited.
// Create a set of all the unvisited nodes called the unvisited set.
const adjWithDistances = [
  [ {n:1,w:3}, {n:2,w:2}, {n:4,w:4} ],
  [ {n:0,w:3}, {n:2,w:8} ],
  [ {n:0,w:2}, {n:1,w:8}, {n:3,w:1} ],
  [ {n:2,w:1}, {n:4,w:3} ],
  [ {n:0,w:4}, {n:3,w:3} ],
]
const unvisited = []
for (let i=0, l=4; i <= 4; i++) {
  unvisited.push(
    new GraphNode({ n: i, adj: adjWithDistances[i] })
  )
}

// 2. Set the initial node as current.
// Assign to every node a tentative distance value: set it to zero for
// our initial node and to infinity for all other unvisited.
Object.values(unvisited).forEach(each => {
  each.distance = Number.POSITIVE_INFINITY
})
const initialNode = unvisited[0]
initialNode.distance = 0



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
  const n = unvisited[minDistIndex]
  unvisited.splice(minDistIndex, 1)
  visited.push(n)
  n.adj.forEach(neighbor => {
    const alt = n.distance + neighbor.w
    const neighborNode = unvisited[neighbor.n]
    console.log(neighborNode)
    if (neighborNode && alt < neighborNode.distance) {
      neighborNode.distance = alt
    }
  })
}

console.log(visited)
