class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}

function insertNode() {
  const value = parseInt(document.getElementById('nodeValue').value);
  if (isNaN(value)) {
    alert('Enter a valid number!');
    return;
  }
  root = insert(root, value);
  document.getElementById('nodeValue').value = '';
  drawTree(root);
}

function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

function calculateHeight() {
  const h = height(root);
  document.getElementById('output').innerText = `🌲 Height of Binary Tree: ${h}`;
}

function resetTree() {
  root = null;
  document.getElementById('output').innerText = '';
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Toggle dark mode
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Draw Tree (Simple Canvas Visual)
function drawTree(node, x = 400, y = 40, angle = Math.PI / 2, depth = 0, gap = 100) {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  if (depth === 0) ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!node) return;

  const dx = gap * Math.cos(angle);
  const dy = gap * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(x, y, 18, 0, 2 * Math.PI);
  ctx.fillStyle = document.body.classList.contains('dark') ? '#eee' : '#000';
  ctx.fill();
  ctx.strokeStyle = 'green';
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = '15px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.val, x, y);

  if (node.left) {
    ctx.moveTo(x, y);
    ctx.lineTo(x - dx, y + dy);
    ctx.stroke();
    drawTree(node.left, x - dx, y + dy, angle - 0.4, depth + 1, gap * 0.8);
  }

  if (node.right) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.stroke();
    drawTree(node.right, x + dx, y + dy, angle + 0.4, depth + 1, gap * 0.8);
  }
}
