export const problems = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    description: `<p class='mt-3'>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use the same element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
    difficulty: 'Easy' as const,
    category: 'Array',
    starter_code: `function twoSum(nums,target){
};`,
    starter_function_name: 'function twoSum(',
    handler_function: `function handlerTwoSum(fn) {
  const nums = [
    [2, 7, 11, 15],
    [3, 2, 4],
    [3, 3],
  ];
  const targets = [9, 6, 6];
  const answers = [
    [0, 1],
    [1, 2],
    [0, 1],
  ];
  for (let i = 0; i < nums.length; i++) {
    const result = fn(nums[i], targets[i]);
    if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums = [2,7,11,15], target = 9', outputText: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { id: 2, inputText: 'nums = [3,2,4], target = 6', outputText: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
      { id: 3, inputText: 'nums = [3,3], target = 6', outputText: '[0,1]' },
    ],
    constraints: `<li class='mt-2'><code>2 ≤ nums.length ≤ 10</code></li> <li class='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li> <li class='mt-2'><code>-10 ≤ target ≤ 10</code></li><li class='mt-2 text-sm'><strong>Only one valid answer exists.</strong></li>`,
    order_index: 1,
    tags: ['Array', 'Hash Table'],
  },
  {
    id: 'reverse-linked-list',
    title: '2. Reverse Linked List',
    description: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
    difficulty: 'Medium' as const,
    category: 'Linked List',
    starter_code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function reverseLinkedList(head) {
};`,
    starter_function_name: 'function reverseLinkedList(',
    handler_function: `function handlerReverseLinkedList(fn) {
  class LinkedList {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function createLinkedList(values) {
    const head = new LinkedList(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new LinkedList(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }
  
  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
  
  const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
  const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
  
  for (let i = 0; i < tests.length; i++) {
    const list = createLinkedList(tests[i]);
    const result = fn(list);
    if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'head = [1,2,3,4,5]', outputText: '[5,4,3,2,1]' },
      { id: 2, inputText: 'head = [1,2,3]', outputText: '[3,2,1]' },
      { id: 3, inputText: 'head = [1]', outputText: '[1]' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li><li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
    order_index: 2,
    tags: ['Linked List', 'Recursion'],
  },
  {
    id: 'jump-game',
    title: '3. Jump Game',
    description: `<p class='mt-3'>
  You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
  and each element in the array represents your maximum jump length at that position.
</p>
<p class='mt-3'>
  Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
</p>`,
    difficulty: 'Medium' as const,
    category: 'Dynamic Programming',
    starter_code: `function canJump(nums) {
};`,
    starter_function_name: 'function canJump(',
    handler_function: `function handlerJumpGame(fn) {
  const tests = [
    [2, 3, 1, 1, 4],
    [3, 2, 1, 0, 4],
    [2, 0, 0],
    [2, 5, 0, 0],
  ];
  const answers = [true, false, true, true];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums = [2,3,1,1,4]', outputText: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { id: 2, inputText: 'nums = [3,2,1,0,4]', outputText: 'false', explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li><li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
    order_index: 3,
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
  },
  {
    id: 'valid-parentheses',
    title: '4. Valid Parentheses',
    description: `<p class='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul> <li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li class='mt-3'>Open brackets must be closed in the correct order.</li><li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li></ul>`,
    difficulty: 'Easy' as const,
    category: 'Stack',
    starter_code: `function validParentheses(s) {
};`,
    starter_function_name: 'function validParentheses(',
    handler_function: `function handlerValidParentheses(fn) {
  const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
  const answers = [true, true, false, false, true];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 's = "()"', outputText: 'true' },
      { id: 2, inputText: 's = "()[]{}"', outputText: 'true' },
      { id: 3, inputText: 's = "(]"', outputText: 'false' },
      { id: 4, inputText: 's = "([)]"', outputText: 'false' },
    ],
    constraints: `<li class='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li><li class='mt-2 '><code>s</code> consists of parentheses only <code class="text-md">'()[]{}'</code>.</li>`,
    order_index: 4,
    tags: ['String', 'Stack'],
  },
  {
    id: 'search-a-2d-matrix',
    title: '5. Search a 2D Matrix',
    description: `<p class='mt-3'>Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix. This matrix has the following properties:</p><li class="mt-3">Integers in each row are sorted from left to right.</li><li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li><p class='mt-3'>Given <code>matrix</code>, an <code>m x n</code> matrix, and <code>target</code>, return <code>true</code> if <code>target</code> is in the matrix, and <code>false</code> otherwise.</p>`,
    difficulty: 'Hard' as const,
    category: 'Binary Search',
    starter_code: `function searchMatrix(matrix, target) {
};`,
    starter_function_name: 'function searchMatrix',
    handler_function: `function handlerSearch2DMatrix(fn) {
  const tests = [
    {
      matrix: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      target: 3,
    },
    {
      matrix: [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      target: 13,
    },
  ];
  const answers = [true, false];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i].matrix, tests[i].target);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', outputText: 'true' },
      { id: 2, inputText: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', outputText: 'false' },
      { id: 3, inputText: 'matrix = [[1]], target = 1', outputText: 'true' },
    ],
    constraints: `<li class='mt-2'><code>m == matrix.length</code></li><li class='mt-2'><code>n == matrix[i].length</code></li><li class='mt-2'><code>1 <= m, n <= 100</code></li><li class='mt-2'><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>`,
    order_index: 5,
    tags: ['Array', 'Binary Search', 'Matrix'],
  },
  {
    id: 'maximum-subarray',
    title: '6. Maximum Subarray',
    difficulty: 'Easy' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</p>`,
    starter_code: `function maxSubArray(nums) {
};`,
    starter_function_name: 'function maxSubArray(',
    handler_function: `function handlerMaxSubArray(fn) {
  const tests = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1],
    [5, 4, -1, 7, 8],
  ];
  const answers = [6, 1, 23];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', outputText: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { id: 2, inputText: 'nums = [1]', outputText: '1', explanation: 'The subarray [1] has the largest sum 1.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li><li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
    order_index: 6,
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
  },
  {
    id: 'best-time-to-buy-sell',
    title: '7. Best Time to Buy and Sell Stock',
    difficulty: 'Easy' as const,
    category: 'Array',
    description: `<p class='mt-3'>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.</p><p class='mt-3'>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p><p class='mt-3'>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.</p>`,
    starter_code: `function maxProfit(prices) {
};`,
    starter_function_name: 'function maxProfit(',
    handler_function: `function handlerMaxProfit(fn) {
  const tests = [
    [7, 1, 5, 3, 6, 4],
    [7, 6, 4, 3, 1],
    [1, 2],
  ];
  const answers = [5, 0, 1];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'prices = [7,1,5,3,6,4]', outputText: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { id: 2, inputText: 'prices = [7,6,4,3,1]', outputText: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li><li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
    order_index: 7,
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
  },
  {
    id: 'merge-two-sorted-lists',
    title: '8. Merge Two Sorted Lists',
    difficulty: 'Easy' as const,
    category: 'Linked List',
    description: `<p class='mt-3'>Merge two sorted linked lists and return it as a <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>`,
    starter_code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function mergeTwoLists(l1, l2) {
};`,
    starter_function_name: 'function mergeTwoLists(',
    handler_function: `function handlerMergeTwoLists(fn) {
  class LinkedList {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function createLinkedList(values) {
    if (!values.length) return null;
    const head = new LinkedList(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new LinkedList(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }
  
  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
  
  const tests = [
    { l1: [1, 2, 4], l2: [1, 3, 4] },
    { l1: [], l2: [] },
    { l1: [], l2: [0] },
  ];
  const answers = [[1, 1, 2, 3, 4, 4], [], [0]];
  
  for (let i = 0; i < tests.length; i++) {
    const list1 = createLinkedList(tests[i].l1);
    const list2 = createLinkedList(tests[i].l2);
    const result = fn(list1, list2);
    if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'l1 = [1,2,4], l2 = [1,3,4]', outputText: '[1,1,2,3,4,4]' },
      { id: 2, inputText: 'l1 = [], l2 = []', outputText: '[]' },
      { id: 3, inputText: 'l1 = [], l2 = [0]', outputText: '[0]' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li><li class='mt-2'><code>-100 <= Node.val <= 100</code></li><li class='mt-2'>Both <code>l1</code> and <code>l2</code> are sorted in <strong>non-decreasing</strong> order.</li>`,
    order_index: 8,
    tags: ['Linked List', 'Recursion'],
  },
  {
    id: 'climbing-stairs',
    title: '9. Climbing Stairs',
    difficulty: 'Easy' as const,
    category: 'Dynamic Programming',
    description: `<p class='mt-3'>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p><p class='mt-3'>Each time you can either climb <strong>1 or 2 steps</strong>. In how many distinct ways can you climb to the top?</p>`,
    starter_code: `function climbStairs(n) {
};`,
    starter_function_name: 'function climbStairs(',
    handler_function: `function handlerClimbStairs(fn) {
  const tests = [2, 3, 4, 5];
  const answers = [2, 3, 5, 8];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'n = 2', outputText: '2', explanation: 'There are two ways to climb to the top: 1+1 or 2.' },
      { id: 2, inputText: 'n = 3', outputText: '3', explanation: 'There are three ways: 1+1+1, 1+2, or 2+1.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 45</code></li>`,
    order_index: 9,
    tags: ['Dynamic Programming', 'Math'],
  },
  {
    id: 'binary-tree-inorder',
    title: '10. Binary Tree Inorder Traversal',
    difficulty: 'Easy' as const,
    category: 'Tree',
    description: `<p class='mt-3'>Given the <code>root</code> of a binary tree, return <em>the inorder traversal of its nodes' values</em>.</p>`,
    starter_code: `
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
function inorderTraversal(root) {
};`,
    starter_function_name: 'function inorderTraversal(',
    handler_function: `function handlerInorderTraversal(fn) {
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }
  
  function createTree(arr) {
    if (!arr.length) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    return root;
  }
  
  const tests = [
    [1, null, 2, 3],
    [],
    [1],
  ];
  const answers = [[1, 3, 2], [], [1]];
  
  for (let i = 0; i < tests.length; i++) {
    const tree = createTree(tests[i]);
    const result = fn(tree);
    if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'root = [1,null,2,3]', outputText: '[1,3,2]' },
      { id: 2, inputText: 'root = []', outputText: '[]' },
      { id: 3, inputText: 'root = [1]', outputText: '[1]' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li><li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
    order_index: 10,
    tags: ['Tree', 'Stack', 'Binary Tree'],
  },
  {
    id: 'symmetric-tree',
    title: '11. Symmetric Tree',
    difficulty: 'Easy' as const,
    category: 'Tree',
    description: `<p class='mt-3'>Given the <code>root</code> of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).</p>`,
    starter_code: `
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
function isSymmetric(root) {
};`,
    starter_function_name: 'function isSymmetric(',
    handler_function: `function handlerIsSymmetric(fn) {
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }
  
  function createTree(arr) {
    if (!arr.length) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    return root;
  }
  
  const tests = [
    [1, 2, 2, 3, 4, 4, 3],
    [1, 2, 2, null, 3, null, 3],
    [],
  ];
  const answers = [true, false, true];
  
  for (let i = 0; i < tests.length; i++) {
    const tree = createTree(tests[i]);
    const result = fn(tree);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'root = [1,2,2,3,4,4,3]', outputText: 'true' },
      { id: 2, inputText: 'root = [1,2,2,null,3,null,3]', outputText: 'false' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li><li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
    order_index: 11,
    tags: ['Tree', 'Breadth-First Search', 'Depth-First Search', 'Binary Tree'],
  },
  {
    id: 'plus-one',
    title: '12. Plus One',
    difficulty: 'Easy' as const,
    category: 'Array',
    description: `<p class='mt-3'>You are given a <strong>large integer</strong> represented as an integer array <code>digits</code>, where each <code>digits[i]</code> is the <code>i</code>th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order.</p><p class='mt-3'>Increment the large integer by one and return <em>the resulting array of digits</em>.</p>`,
    starter_code: `function plusOne(digits) {
};`,
    starter_function_name: 'function plusOne(',
    handler_function: `function handlerPlusOne(fn) {
  const tests = [
    [1, 2, 3],
    [4, 3, 2, 1],
    [9],
    [9, 9],
  ];
  const answers = [[1, 2, 4], [4, 3, 2, 2], [1, 0], [1, 0, 0]];
  for (let i = 0; i < tests.length; i++) {
    const result = fn([...tests[i]]);
    if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'digits = [1,2,3]', outputText: '[1,2,4]', explanation: 'The array represents the integer 123. Incrementing by 1 gives 124.' },
      { id: 2, inputText: 'digits = [4,3,2,1]', outputText: '[4,3,2,2]', explanation: 'The array represents 4321. Incrementing gives 4322.' },
      { id: 3, inputText: 'digits = [9]', outputText: '[1,0]', explanation: 'The array represents 9. Incrementing gives 10.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= digits.length <= 100</code></li><li class='mt-2'><code>0 <= digits[i] <= 9</code></li><li class='mt-2'>The integer does not contain any leading zeros.</li>`,
    order_index: 12,
    tags: ['Array', 'Math'],
  },
  {
    id: 'add-two-numbers',
    title: '13. Add Two Numbers',
    difficulty: 'Medium' as const,
    category: 'Linked List',
    description: `<p class='mt-3'>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p><p class='mt-3'>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>`,
    starter_code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function addTwoNumbers(l1, l2) {
};`,
    starter_function_name: 'function addTwoNumbers(',
    handler_function: `function handlerAddTwoNumbers(fn) {
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }
  
  function createLinkedList(values) {
    if (!values.length) return null;
    const head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new ListNode(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }
  
  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
    return values;
  }
  
  const tests = [
    { l1: [2, 4, 3], l2: [5, 6, 4] },
    { l1: [0], l2: [0] },
    { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
  ];
  const answers = [[7, 0, 8], [0], [8, 9, 9, 9, 0, 0, 0, 1]];
  
  for (let i = 0; i < tests.length; i++) {
    const list1 = createLinkedList(tests[i].l1);
    const list2 = createLinkedList(tests[i].l2);
    const result = fn(list1, list2);
    if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'l1 = [2,4,3], l2 = [5,6,4]', outputText: '[7,0,8]', explanation: '342 + 465 = 807' },
      { id: 2, inputText: 'l1 = [0], l2 = [0]', outputText: '[0]' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li><li class='mt-2'><code>0 <= Node.val <= 9</code></li><li class='mt-2'>It is guaranteed that the list represents a number that does not have leading zeros.</li>`,
    order_index: 13,
    tags: ['Linked List', 'Math', 'Recursion'],
  },
  {
    id: 'longest-substring',
    title: '14. Longest Substring Without Repeating Characters',
    difficulty: 'Medium' as const,
    category: 'String',
    description: `<p class='mt-3'>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>`,
    starter_code: `function lengthOfLongestSubstring(s) {
};`,
    starter_function_name: 'function lengthOfLongestSubstring(',
    handler_function: `function handlerLongestSubstring(fn) {
  const tests = ["abcabcbb", "bbbbb", "pwwkew", ""];
  const answers = [3, 1, 3, 0];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 's = "abcabcbb"', outputText: '3', explanation: 'The longest substring without repeating characters is "abc", length 3.' },
      { id: 2, inputText: 's = "bbbbb"', outputText: '1', explanation: 'The longest substring is "b", length 1.' },
      { id: 3, inputText: 's = "pwwkew"', outputText: '3', explanation: 'The longest substring is "wke", length 3. Note that "kew" is also valid.' },
    ],
    constraints: `<li class='mt-2'><code>0 <= s.length <= 5 * 10^4</code></li><li class='mt-2'><code>s</code> consists of English letters, digits, symbols and spaces.</li>`,
    order_index: 14,
    tags: ['Hash Table', 'String', 'Sliding Window'],
  },
  {
    id: 'container-with-most-water',
    title: '15. Container With Most Water',
    difficulty: 'Medium' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given <code>n</code> non-negative integers <code>a1, a2, ..., an</code> , where each represents a point at coordinate <code>(i, ai)</code>. <code>n</code> vertical lines are drawn such that the two endpoints of the line <code>i</code> is at <code>(i, 0)</code> and <code>(i, ai)</code>.</p><p class='mt-3'>Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.</p>`,
    starter_code: `function maxArea(height) {
};`,
    starter_function_name: 'function maxArea(',
    handler_function: `function handlerMaxArea(fn) {
  const tests = [
    [1, 8, 6, 2, 5, 4, 8, 3, 7],
    [1, 1],
    [4, 3, 2, 1, 4],
  ];
  const answers = [49, 1, 16];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'height = [1,8,6,2,5,4,8,3,7]', outputText: '49', explanation: 'The max area of water is 49 (between indices 1 and 8).' },
      { id: 2, inputText: 'height = [1,1]', outputText: '1' },
    ],
    constraints: `<li class='mt-2'><code>n == height.length</code></li><li class='mt-2'><code>2 <= n <= 10^4</code></li><li class='mt-2'><code>0 <= height[i] <= 10^4</code></li>`,
    order_index: 15,
    tags: ['Array', 'Two Pointers', 'Greedy'],
  },
  {
    id: '3sum',
    title: '16. 3Sum',
    difficulty: 'Medium' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p class='mt-3'>Notice that the solution set must not contain duplicate triplets.</p>`,
    starter_code: `function threeSum(nums) {
};`,
    starter_function_name: 'function threeSum(',
    handler_function: `function handlerThreeSum(fn) {
  function sortAndStringify(arr) {
    return JSON.stringify(arr.map(x => x.slice().sort((a, b) => a - b)).sort((a, b) => {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
      }
      return 0;
    }));
  }
  
  const tests = [
    [-1, 0, 1, 2, -1, -4],
    [],
    [0],
  ];
  const answers = [
    [[-1, -1, 2], [-1, 0, 1]],
    [],
    [],
  ];
  
  for (let i = 0; i < tests.length; i++) {
    const result = fn([...tests[i]]);
    const sortedResult = sortAndStringify(result);
    const sortedAnswer = sortAndStringify(answers[i]);
    if (sortedResult !== sortedAnswer) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums = [-1,0,1,2,-1,-4]', outputText: '[[-1,-1,2],[-1,0,1]]' },
      { id: 2, inputText: 'nums = []', outputText: '[]' },
      { id: 3, inputText: 'nums = [0]', outputText: '[]' },
    ],
    constraints: `<li class='mt-2'><code>0 <= nums.length <= 3000</code></li><li class='mt-2'><code>-10^5 <= nums[i] <= 10^5</code></li>`,
    order_index: 16,
    tags: ['Array', 'Two Pointers', 'Sorting'],
  },
  {
    id: 'remove-nth-node',
    title: '17. Remove Nth Node From End of List',
    difficulty: 'Medium' as const,
    category: 'Linked List',
    description: `<p class='mt-3'>Given the <code>head</code> of a linked list, remove the <code>nth</code> node from the end of the list and return its head.</p>`,
    starter_code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function removeNthFromEnd(head, n) {
};`,
    starter_function_name: 'function removeNthFromEnd(',
    handler_function: `function handlerRemoveNthFromEnd(fn) {
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }
  
  function createLinkedList(values) {
    if (!values.length) return null;
    const head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new ListNode(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }
  
  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
    return values;
  }
  
  const tests = [
    { list: [1, 2, 3, 4, 5], n: 2 },
    { list: [1], n: 1 },
    { list: [1, 2], n: 1 },
  ];
  const answers = [[1, 2, 3, 5], [], [1]];
  
  for (let i = 0; i < tests.length; i++) {
    const list = createLinkedList(tests[i].list);
    const result = fn(list, tests[i].n);
    if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'head = [1,2,3,4,5], n = 2', outputText: '[1,2,3,5]' },
      { id: 2, inputText: 'head = [1], n = 1', outputText: '[]' },
      { id: 3, inputText: 'head = [1,2], n = 1', outputText: '[1]' },
    ],
    constraints: `<li class='mt-2'>The number of nodes in the list is <code>sz</code>.</li><li class='mt-2'><code>1 <= sz <= 30</code></li><li class='mt-2'><code>0 <= Node.val <= 100</code></li><li class='mt-2'><code>1 <= n <= sz</code></li>`,
    order_index: 17,
    tags: ['Linked List', 'Two Pointers'],
  },
  {
    id: 'generate-parentheses',
    title: '18. Generate Parentheses',
    difficulty: 'Medium' as const,
    category: 'Backtracking',
    description: `<p class='mt-3'>Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p>`,
    starter_code: `function generateParenthesis(n) {
};`,
    starter_function_name: 'function generateParenthesis(',
    handler_function: `function handlerGenerateParenthesis(fn) {
  const tests = [3, 1, 2];
  const answers = [
    ["((()))", "(()())", "(())()", "()(())", "()()()"],
    ["()"],
    ["(())", "()()"],
  ];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    const sortedResult = [...result].sort();
    const sortedAnswer = [...answers[i]].sort();
    if (JSON.stringify(sortedResult) !== JSON.stringify(sortedAnswer)) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'n = 3', outputText: '["((()))","(()())","(())()","()(())","()()()"]' },
      { id: 2, inputText: 'n = 1', outputText: '["()"]' },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 8</code></li>`,
    order_index: 18,
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
  },
  {
    id: 'merge-intervals',
    title: '19. Merge Intervals',
    difficulty: 'Medium' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given an array of <code>intervals</code> where <code>intervals[i] = [start_i, end_i]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>`,
    starter_code: `function merge(intervals) {
};`,
    starter_function_name: 'function merge(',
    handler_function: `function handlerMerge(fn) {
  const tests = [
    [[1, 3], [2, 6], [8, 10], [15, 18]],
    [[1, 4], [4, 5]],
    [[1, 4], [0, 4]],
  ];
  const answers = [
    [[1, 6], [8, 10], [15, 18]],
    [[1, 5]],
    [[0, 4]],
  ];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (JSON.stringify(result) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', outputText: '[[1,6],[8,10],[15,18]]', explanation: 'Intervals [1,3] and [2,6] overlap, merge into [1,6].' },
      { id: 2, inputText: 'intervals = [[1,4],[4,5]]', outputText: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= intervals.length <= 10^4</code></li><li class='mt-2'><code>intervals[i].length == 2</code></li><li class='mt-2'><code>0 <= start_i <= end_i <= 10^4</code></li>`,
    order_index: 19,
    tags: ['Array', 'Sorting'],
  },
  {
    id: 'unique-paths',
    title: '20. Unique Paths',
    difficulty: 'Medium' as const,
    category: 'Dynamic Programming',
    description: `<p class='mt-3'>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p><p class='mt-3'>Given the two integers <code>m</code> and <code>n</code>, return the number of possible unique paths that the robot can take to reach the bottom-right corner.</p>`,
    starter_code: `function uniquePaths(m, n) {
};`,
    starter_function_name: 'function uniquePaths(',
    handler_function: `function handlerUniquePaths(fn) {
  const tests = [
    { m: 3, n: 7 },
    { m: 3, n: 2 },
    { m: 7, n: 3 },
  ];
  const answers = [28, 3, 28];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i].m, tests[i].n);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'm = 3, n = 7', outputText: '28' },
      { id: 2, inputText: 'm = 3, n = 2', outputText: '3', explanation: 'The unique paths are: Right → Down → Down, Down → Right → Down, Down → Down → Right.' },
    ],
    constraints: `<li class='mt-2'><code>1 <= m, n <= 100</code></li>`,
    order_index: 20,
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
  },
  {
    id: 'sort-colors',
    title: '21. Sort Colors',
    difficulty: 'Medium' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong>in-place</strong> so that objects of the same color are adjacent, with the colors in the order red, white, and blue.</p><p class='mt-3'>We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.</p><p class='mt-3'>You must solve this problem without using the library's sort function.</p>`,
    starter_code: `function sortColors(nums) {
};`,
    starter_function_name: 'function sortColors(',
    handler_function: `function handlerSortColors(fn) {
  const tests = [
    [2, 0, 2, 1, 1, 0],
    [2, 0, 1],
    [0],
  ];
  const answers = [[0, 0, 1, 1, 2, 2], [0, 1, 2], [0]];
  for (let i = 0; i < tests.length; i++) {
    const arr = [...tests[i]];
    fn(arr);
    if (JSON.stringify(arr) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums = [2,0,2,1,1,0]', outputText: '[0,0,1,1,2,2]' },
      { id: 2, inputText: 'nums = [2,0,1]', outputText: '[0,1,2]' },
    ],
    constraints: `<li class='mt-2'><code>n == nums.length</code></li><li class='mt-2'><code>1 <= n <= 300</code></li><li class='mt-2'><code>nums[i]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>`,
    order_index: 21,
    tags: ['Array', 'Two Pointers', 'Sorting'],
  },
  {
    id: 'median-of-two-sorted-arrays',
    title: '22. Median of Two Sorted Arrays',
    difficulty: 'Hard' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the median of the two sorted arrays.</p><p class='mt-3'>The overall run time complexity should be <code>O(log (m+n))</code>.</p>`,
    starter_code: `function findMedianSortedArrays(nums1, nums2) {
};`,
    starter_function_name: 'function findMedianSortedArrays(',
    handler_function: `function handlerFindMedian(fn) {
  const tests = [
    { nums1: [1, 3], nums2: [2] },
    { nums1: [1, 2], nums2: [3, 4] },
    { nums1: [0, 0], nums2: [0, 0] },
  ];
  const answers = [2.0, 2.5, 0.0];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i].nums1, tests[i].nums2);
    if (Math.abs(result - answers[i]) > 0.0001) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'nums1 = [1,3], nums2 = [2]', outputText: '2.0' },
      { id: 2, inputText: 'nums1 = [1,2], nums2 = [3,4]', outputText: '2.5' },
    ],
    constraints: `<li class='mt-2'><code>nums1.length == m</code></li><li class='mt-2'><code>nums2.length == n</code></li><li class='mt-2'><code>0 <= m <= 1000</code></li><li class='mt-2'><code>0 <= n <= 1000</code></li><li class='mt-2'><code>1 <= m + n <= 2000</code></li><li class='mt-2'><code>-10^6 <= nums1[i], nums2[i] <= 10^6</code></li>`,
    order_index: 22,
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
  },
  {
    id: 'regular-expression-matching',
    title: '23. Regular Expression Matching',
    difficulty: 'Hard' as const,
    category: 'String',
    description: `<p class='mt-3'>Given an input string <code>s</code> and a pattern <code>p</code>, implement regular expression matching with support for '.' and '*' where:</p><ul class='mt-3'><li><code>.</code> Matches any single character.</li><li><code>*</code> Matches zero or more of the preceding element.</li></ul><p class='mt-3'>The matching should cover the <strong>entire</strong> input string (not partial).</p>`,
    starter_code: `function isMatch(s, p) {
};`,
    starter_function_name: 'function isMatch(',
    handler_function: `function handlerIsMatch(fn) {
  const tests = [
    { s: "aa", p: "a" },
    { s: "aa", p: "a*" },
    { s: "ab", p: ".*" },
  ];
  const answers = [false, true, true];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i].s, tests[i].p);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 's = "aa", p = "a"', outputText: 'false', explanation: 'Pattern "a" matches only "a", but input is "aa".' },
      { id: 2, inputText: 's = "aa", p = "a*"', outputText: 'true', explanation: '"*" matches zero or more "a"s.' },
      { id: 3, inputText: 's = "ab", p = ".*"', outputText: 'true', explanation: ".* matches any character any number of times." },
    ],
    constraints: `<li class='mt-2'><code>1 <= s.length <= 20</code></li><li class='mt-2'><code>1 <= p.length <= 30</code></li><li class='mt-2'><code>s</code> contains only lowercase English letters.</li><li class='mt-2'><code>p</code> contains only lowercase English letters, '.', and '*'.</li><li class='mt-2'>It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.</li>`,
    order_index: 23,
    tags: ['String', 'Dynamic Programming', 'Recursion'],
  },
  {
    id: 'merge-k-sorted-lists',
    title: '24. Merge k Sorted Lists',
    difficulty: 'Hard' as const,
    category: 'Linked List',
    description: `<p class='mt-3'>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p><p class='mt-3'>Merge all the linked-lists into one sorted linked-list and return it.</p>`,
    starter_code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function mergeKLists(lists) {
};`,
    starter_function_name: 'function mergeKLists(',
    handler_function: `function handlerMergeKLists(fn) {
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }
  
  function createLinkedList(values) {
    if (!values.length) return null;
    const head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new ListNode(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }
  
  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
    return values;
  }
  
  const tests = [
    [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ],
    [],
    [[]],
  ];
  const answers = [[1, 1, 2, 3, 4, 4, 5, 6], [], []];
  
  for (let i = 0; i < tests.length; i++) {
    const listOfLists = tests[i].map(createLinkedList);
    const result = fn(listOfLists);
    if (JSON.stringify(getListValues(result)) !== JSON.stringify(answers[i])) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'lists = [[1,4,5],[1,3,4],[2,6]]', outputText: '[1,1,2,3,4,4,5,6]' },
      { id: 2, inputText: 'lists = []', outputText: '[]' },
      { id: 3, inputText: 'lists = [[]]', outputText: '[]' },
    ],
    constraints: `<li class='mt-2'><code>k == lists.length</code></li><li class='mt-2'><code>0 <= k <= 10^4</code></li><li class='mt-2'><code>0 <= lists[i].length <= 500</code></li><li class='mt-2'><code>-10^4 <= lists[i][j] <= 10^4</code></li><li class='mt-2'>Each <code>lists[i]</code> is sorted in ascending order.</li><li class='mt-2'>The sum of <code>lists[i].length</code> will not exceed <code>10^4</code>.</li>`,
    order_index: 24,
    tags: ['Linked List', 'Divide and Conquer', 'Priority Queue', 'Merge Sort'],
  },
  {
    id: 'trapping-rain-water',
    title: '25. Trapping Rain Water',
    difficulty: 'Hard' as const,
    category: 'Array',
    description: `<p class='mt-3'>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>`,
    starter_code: `function trap(height) {
};`,
    starter_function_name: 'function trap(',
    handler_function: `function handlerTrap(fn) {
  const tests = [
    [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    [4, 2, 0, 3, 2, 5],
    [5, 4, 1, 2],
  ];
  const answers = [6, 9, 1];
  for (let i = 0; i < tests.length; i++) {
    const result = fn(tests[i]);
    if (result !== answers[i]) {
      throw new Error('Test case ' + (i + 1) + ' failed');
    }
  }
  return true;
}`,
    examples: [
      { id: 1, inputText: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', outputText: '6', explanation: 'The elevation map traps 6 units of rain water.' },
      { id: 2, inputText: 'height = [4,2,0,3,2,5]', outputText: '9' },
    ],
    constraints: `<li class='mt-2'><code>n == height.length</code></li><li class='mt-2'><code>1 <= n <= 2 * 10^4</code></li><li class='mt-2'><code>0 <= height[i] <= 10^5</code></li>`,
    order_index: 25,
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
  },
];
