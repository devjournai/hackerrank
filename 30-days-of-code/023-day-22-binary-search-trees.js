this.levelOrder = function (root) {
  if (root === null) return;

  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    let current = queue.shift();

    process.stdout.write(current.data + " ");

    if (current.left !== null) {
      queue.push(current.left);
    }

    if (current.right !== null) {
      queue.push(current.right);
    }
  }
};
