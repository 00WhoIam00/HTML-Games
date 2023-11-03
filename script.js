const maze = document.getElementById("maze");

const mazeData = [
  "###################",
  "#                 #",
  "# ### ### ### ### #",
  "# #   #   #   #   #",
  "# # # # # # # # # #",
  "# # # # # # # # # #",
  "# # # # # # # # # #",
  "#   #   #   #   # #",
  "# ### ### ### ### #",
  "#   #           # #",
  "### # ######### # #",
  "#   #         #   #",
  "# ##### ##### ### #",
  "#     #   #   #   #",
  "### # # # # # # ###",
  "#   #   #   # #   #",
  "# ### # ### # ### #",
  "#   #   #   #     #",
  "###################",
];

function createMaze() {
  maze.innerHTML = "";
  for (let row = 0; row < mazeData.length; row++) {
    for (let col = 0; col < mazeData[row].length; col++) {
      const cell = document.createElement("div");
      cell.className = mazeData[row][col] === "#" ? "wall" : "";
      cell.style.left = col * 30 + "px";
      cell.style.top = row * 30 + "px";
      maze.appendChild(cell);
    }
  }
}

createMaze();
