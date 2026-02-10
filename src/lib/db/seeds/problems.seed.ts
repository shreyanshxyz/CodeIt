import 'server-only';
import db from '../connection';
import logger from '../../utils/logger';

const problems = [
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
];

export async function seedDatabase(): Promise<void> {
  logger.info('Starting database seeding...');

  try {
    for (const problem of problems) {
      const existing = await db.queryOne(
        'SELECT id FROM problems WHERE id = $1',
        [problem.id]
      );

      if (!existing) {
        await db.query(
          `INSERT INTO problems (
            id, title, description, difficulty, category, starter_code,
            starter_function_name, handler_function, examples, constraints, order_index
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            problem.id,
            problem.title,
            problem.description,
            problem.difficulty,
            problem.category,
            problem.starter_code,
            problem.starter_function_name,
            problem.handler_function,
            JSON.stringify(problem.examples),
            problem.constraints,
            problem.order_index,
          ]
        );

        if (problem.tags && problem.tags.length > 0) {
          for (const tag of problem.tags) {
            await db.query(
              'INSERT INTO problem_tags (problem_id, tag) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [problem.id, tag]
            );
          }
        }

        logger.info(`Seeded problem: ${problem.title}`);
      } else {
        logger.debug(`Problem already exists: ${problem.title}`);
      }
    }

    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Error seeding database', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
}
