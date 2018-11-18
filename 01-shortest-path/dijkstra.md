## Dijkstra Method

### Goal
To find the shortest path from one node to another.

### Method
Pick a node as a starting point. Mark it with a distance of zero and mark all
others with a distance of Infinity. Visit every neighbor of that node, see how far
away it is, and save that distance. Then, pick the lowest distance, non-visited
node, and repeat the process, adding the distance between the neighbor node to
the current node's distance from the initial node, and so on.

### Algorithm
1. Mark every node unvisited or create a set of unvisited nodes and put all
   inside of it to start with.
2. Pick a starting node.
3. Set all other nodes to have a distance of infinity to start with. Set the
   starting node to a distance of zero.
4. Visit from our "starting" node, and for each of its immediate neighbors:
   1. Calculate starting node distance + distance from starting node to
      neighbor node.
   2. Compare this calculation to the neighbor's current distance value, and
      assign the minimum of the two to be the neighbor's distance value.
5. Repeat step 4 + sub steps, with the "starting" node being the one with the
   lowest distance value that has not yet been visited. Repeat until the
   destination node has been visited.

### Pseudocode
```
function dijkstra(graph):
  for each in graph:
    each.distance = Infinity
  graph[0].distance = 0

  unvisited = graph
  visited = []
  while unvisited is not empty:
    n = node in unvisited set with the lowest distance value

    remove n from unvisited and place into visited

    for each_neighbor of n:
      tentative_dist = n.distance + (distance between n and each_neighbor)
      if (tentative_dist < each_neighbor.distance)
        each_neighbor.distance = tentative_dist

  return visited
```
