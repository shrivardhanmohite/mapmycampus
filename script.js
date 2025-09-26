// Graph: key = location, value = connected locations
const graph = {
  "Porch": ["Entrance"],
  "Entrance": ["Porch", "Corridor_Ground", "Stairs_Ground"],
  
  // Ground Floor
  "Corridor_Ground": ["Entrance", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "Stairs_Ground"],
  "101": ["Corridor_Ground"], "102": ["Corridor_Ground"], 
  "103": ["Corridor_Ground"], "104": ["Corridor_Ground"],
  "105": ["Corridor_Ground"], "106": ["Corridor_Ground"],
  "107": ["Corridor_Ground"], "108": ["Corridor_Ground"],
  "109": ["Corridor_Ground"], "110": ["Corridor_Ground"], 
  "111": ["Corridor_Ground"],

  // Stairs connections
  "Stairs_Ground": ["Corridor_Ground", "Stairs_1st"],
  "Stairs_1st": ["Stairs_Ground", "Corridor_1st", "Stairs_2nd"],
  "Stairs_2nd": ["Stairs_1st", "DrawingHall", "Corridor_2nd", "Stairs_3rd"],
  "Stairs_3rd": ["Stairs_2nd", "Auditorium", "Corridor_3rd", "Stairs_4th"],
  "Stairs_4th": ["Stairs_3rd", "ComputerHall", "Corridor_4th"],

  // Special places
  "DrawingHall": ["Stairs_2nd"],
  "Auditorium": ["Stairs_3rd"],
  "ComputerHall": ["Stairs_4th"],

  // Example 4th floor rooms
  "Corridor_4th": ["Stairs_4th", "417"],
  "417": ["Corridor_4th"],

  // Basement labs
  "Stairs_Basement": ["Corridor_Ground", "Basement_Corridor"],
  "Basement_Corridor": ["Stairs_Basement", "FoodTechLab", "ChemistryLab", "ChemicalLab"],
  "FoodTechLab": ["Basement_Corridor"],
  "ChemistryLab": ["Basement_Corridor"],
  "ChemicalLab": ["Basement_Corridor"],
};

// BFS shortest path
function shortestPath(graph, start, end) {
  let queue = [[start]];
  let visited = new Set([start]);

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) return path;

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return null;
}

// Example usage:
console.log("Path Porch → Room 417:", shortestPath(graph, "Porch", "417"));