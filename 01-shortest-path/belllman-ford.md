## Bellman-Ford Method

### Goal
To find the shortest path from one node to another in a graph. Similar to
Dijkstra method but allows for negative weights.

### Method
Pick a node as a starting point. Mark it with a distance of zero and mark all
others with a distance of Infinity. Visit each vertex and all of its edges with
neighbors, and lower the neighbor's distance if vertex.distance + edge <
neighbor.distance. When done, go back through every edge and check if
node.distance < (edge_weight + neighbor.distance). If so, throw negative cycle err.

Negative cycle means a cycle that will return to a node to reduce the total path
distance by reducing the path length.

### Algorithm
1. Mark every node unvisited or create a set of unvisited nodes and put all
   inside of it to start with.
2. Pick a starting node.
3. Set all other nodes to have a distance of infinity to start with. Set the
   starting node to a distance of zero.
4. Visit each edge and:
   1. Calculate starting node distance + distance from starting node to
      neighbor node.
   2. Compare this calculation to the neighbor's current distance value, and
      assign the minimum of the two to be the neighbor's distance value.
5. Visit each edge and if node.distance + edge_weight < neighbor.distance, throw
   negative cycle error.

### Pseudocode
```
function bellmanFord(graph, source):
  for vertex in graph:
    vertex.distance = Infinity
    vertex.prev = null

  source.distance = 0

  for vertex in graph:
    for each_edge of vertex:
      tentative_dist = vertex.distance + edge_weight
      if tentative_dist < neighbor.distance:
        neighbor.distance = tentative_dist
        neighbor.prev = vertex

  for each_edge in G:
    if vertex.distance + edge_weight < neighbor.distance
      throw Negative Cycle Error

  return distances, previous
```
