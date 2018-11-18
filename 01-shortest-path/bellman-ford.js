const _ = require('lodash')
const GraphNode = require('../utils/GraphNode')

const vertexEdges = [
  [ {n:1,w:7}, {n:2,w:3} ],
  [ {n:0,w:7}, {n:2,w:1}, {n:3,w:2}, {n:4,w:6} ],
  [ {n:0,w:3}, {n:1,w:1}, {n:3,w:2} ],
  [ {n:1,w:2}, {n:2,w:2}, {n:4,w:4} ],
  [ {n:1,w:6}, {n:3,w:4} ],
]

const vertices = []
for (let i=0, l=vertexEdges.length; i < l; i++) {
  vertices.push(new GraphNode({ n: i, adj: vertexEdges[i] }))
}

// make every distance infinitely large as we
// don't even know if it's possible to get
// to every node from the starting point
// until we start mapping.
vertices.forEach(vtx => { vtx.distance = Number.POSITIVE_INFINITY })
// set our starting node to a distance of zero
vertices[0].distance = 0


for (let i=0, jl=vertexEdges.length - 1; i < jl; i++) {
  const vertex = vertices[i]
  for (let j=0, jl=vertexEdges[i].length; j < jl; j++) {
    const edge = vertexEdges[i][j]
    const neighbor = vertices.filter(e => e.n === edge.n)[0]
    const tentative_dist = vertex.distance + edge.w
    if (tentative_dist < neighbor.distance) {
      neighbor.distance = tentative_dist
      neighbor.prev = vertex.n
    }
  }
}

for (let i=0, jl=vertexEdges.length - 1; i < jl; i++) {
  const vertex = vertices[i]
  for (let j=0, jl=vertexEdges[i].length; j < jl; j++) {
    const edge = vertexEdges[i][j]
    const neighbor = vertices.filter(e => e.n === edge.n)[0]
    if (vertex.distance + edge.w < neighbor.distance)
      throw 'Graph contains negative weighed cycle'
  }
}


vertices.forEach(e => console.log(e.n, e.distance))
