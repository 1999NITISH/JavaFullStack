export interface Question {
  id: number;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topic: string;
  status: 'SOLVED' | 'UNSOLVED';
  isTop150: boolean;
}

// Extensive Topic-Wise Problem Bank
const problemBank: Record<string, { easy: string[], medium: string[], hard: string[] }> = {
  "Arrays & Hashing": {
    easy: ["Two Sum", "Valid Anagram", "Contains Duplicate", "Replace Elements with Greatest Element on Right Side", "Is Subsequence", "Length of Last Word", "Two Sum IV", "Sign of the Product of an Array", "Find Pivot Index", "Find All Numbers Disappeared in an Array", "Maximum Number of Balloons", "Word Pattern", "Design HashSet", "Design HashMap", "Sort Array By Parity", "Kids With the Greatest Number of Candies", "Can Place Flowers", "Majority Element"],
    medium: ["Group Anagrams", "Top K Frequent Elements", "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings", "Longest Consecutive Sequence", "Sort Colors", "Brick Wall", "Best Time to Buy and Sell Stock II", "Subarray Sum Equals K", "Unique Length-3 Palindromic Subsequences", "Minimum Number of Swaps to Make the String Balanced", "Number of Pairs of Interchangeable Rectangles", "Grid Game", "Find All Anagrams in a String", "Find the Duplicate Number"],
    hard: ["First Missing Positive", "Naming a Company", "Maximum Score of a Good Subarray"]
  },
  "Two Pointers": {
    easy: ["Valid Palindrome", "Valid Palindrome II", "Minimum Difference Between Highest and Lowest of K Scores", "Merge Strings Alternately", "Reverse String", "Reverse Vowels of a String", "Remove Element", "Remove Duplicates from Sorted Array"],
    medium: ["Two Sum II - Input Array Is Sorted", "3Sum", "Container With Most Water", "Number of Subsequences That Satisfy the Given Sum Condition", "Rotate Array", "Array With Elements Not Equal to Average of Neighbors", "Boats to Save People", "Strictly Palindromic Number", "4Sum"],
    hard: ["Trapping Rain Water", "Minimum Number of Refueling Stops"]
  },
  "Sliding Window": {
    easy: ["Best Time to Buy and Sell Stock", "Contains Duplicate II", "Defuse the Bomb", "Diet Plan Performance", "Maximum Average Subarray I"],
    medium: ["Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Permutation in String", "Frequency of the Most Frequent Element", "Fruits Into Baskets", "Maximum Number of Vowels in a Substring of Given Length", "Minimum Size Subarray Sum", "Find K Closest Elements", "Subarray Product Less Than K"],
    hard: ["Minimum Window Substring", "Sliding Window Maximum", "Minimum Number of K Consecutive Bit Flips"]
  },
  "Stack": {
    easy: ["Valid Parentheses", "Baseball Game", "Implement Stack using Queues", "Next Greater Element I", "Make The String Great", "Remove All Adjacent Duplicates In String"],
    medium: ["Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Daily Temperatures", "Car Fleet", "Simplify Path", "Decode String", "Remove K Digits", "Asteroid Collision", "132 Pattern", "Online Stock Span", "Flatten Nested List Iterator"],
    hard: ["Largest Rectangle in Histogram", "Maximal Rectangle", "Basic Calculator"]
  },
  "Binary Search": {
    easy: ["Binary Search", "Search Insert Position", "Guess Number Higher or Lower", "Arranging Coins", "Valid Perfect Square", "Find Smallest Letter Greater Than Target", "First Bad Version"],
    medium: ["Search a 2D Matrix", "Koko Eating Bananas", "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array", "Time Based Key-Value Store", "Find First and Last Position of Element in Sorted Array", "Search in Rotated Sorted Array II", "Find Peak Element", "Successful Pairs of Spells and Potions"],
    hard: ["Median of Two Sorted Arrays", "Split Array Largest Sum"]
  },
  "Linked List": {
    easy: ["Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle", "Middle of the Linked List", "Palindrome Linked List", "Remove Linked List Elements", "Intersection of Two Linked Lists"],
    medium: ["Reorder List", "Remove Nth Node From End of List", "Copy List with Random Pointer", "Add Two Numbers", "Find the Duplicate Number", "LRU Cache", "Design Browser History", "Design Linked List", "Swapping Nodes in a Linked List", "Rotate List", "Partition List", "Sort List"],
    hard: ["Merge k Sorted Lists", "Reverse Nodes in k-Group"]
  },
  "Trees": {
    easy: ["Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree", "Path Sum", "Search in a Binary Search Tree", "Minimum Absolute Difference in BST", "Merge Two Binary Trees"],
    medium: ["Lowest Common Ancestor of a BST", "Binary Tree Level Order Traversal", "Binary Tree Right Side View", "Count Good Nodes in Binary Tree", "Validate Binary Search Tree", "Kth Smallest Element in a BST", "Construct Binary Tree from Preorder and Inorder Traversal", "Binary Tree Zigzag Level Order Traversal", "Path Sum II", "Path Sum III", "House Robber III", "Flip Equivalent Binary Trees"],
    hard: ["Binary Tree Maximum Path Sum", "Serialize and Deserialize Binary Tree"]
  },
  "Graphs": {
    easy: ["Island Perimeter", "Verifying an Alien Dictionary", "Find the Town Judge", "Find Center of Star Graph"],
    medium: ["Number of Islands", "Max Area of Island", "Clone Graph", "Walls and Gates", "Rotting Oranges", "Pacific Atlantic Water Flow", "Surrounded Regions", "Course Schedule", "Course Schedule II", "Graph Valid Tree", "Number of Connected Components in an Undirected Graph", "Redundant Connection", "Word Search", "Snakes and Ladders", "Minimum Score of a Path Between Two Cities"],
    hard: ["Word Ladder", "Alien Dictionary", "Cheapest Flights Within K Stops", "Network Delay Time", "Reconstruct Itinerary", "Swim in Rising Water"]
  },
  "Dynamic Programming": {
    easy: ["Climbing Stairs", "Min Cost Climbing Stairs", "Fibonacci Number", "N-th Tribonacci Number", "Pascals Triangle"],
    medium: ["House Robber", "House Robber II", "Longest Palindromic Substring", "Palindromic Substrings", "Decode Ways", "Coin Change", "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence", "Partition Equal Subset Sum", "Triangle", "Unique Paths", "Longest Common Subsequence", "Edit Distance", "Interleaving String"],
    hard: ["Burst Balloons", "Regular Expression Matching", "Distinct Subsequences", "Longest Increasing Path in a Matrix"]
  },
  "Greedy & Math": {
    easy: ["Plus One", "Happy Number", "Ugly Number", "Missing Number", "Power of Two", "Roman to Integer", "Palindrome Number"],
    medium: ["Jump Game", "Jump Game II", "Gas Station", "Hand of Straights", "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String", "Multiply Strings", "Pow(x, n)", "Set Matrix Zeroes", "Spiral Matrix", "Rotate Image"],
    hard: ["N-Queens", "Solve Sudoku", "Candy", "Basic Calculator"]
  }
};

export const dsaQuestions: Question[] = [];
let idCounter = 1;

// Loop through the custom problem bank to generate realistic questions
for (const [topic, difficulties] of Object.entries(problemBank)) {
  // Easy
  for (const title of difficulties.easy) {
    dsaQuestions.push({
      id: idCounter++,
      title,
      difficulty: 'EASY',
      topic,
      status: idCounter % 6 === 0 ? 'SOLVED' : 'UNSOLVED',
      isTop150: idCounter <= 150
    });
  }
  // Medium
  for (const title of difficulties.medium) {
    dsaQuestions.push({
      id: idCounter++,
      title,
      difficulty: 'MEDIUM',
      topic,
      status: idCounter % 8 === 0 ? 'SOLVED' : 'UNSOLVED',
      isTop150: idCounter <= 150
    });
  }
  // Hard
  for (const title of difficulties.hard) {
    dsaQuestions.push({
      id: idCounter++,
      title,
      difficulty: 'HARD',
      topic,
      status: 'UNSOLVED',
      isTop150: idCounter <= 150
    });
  }
}

// Generate the remaining questions to precisely hit exactly 400 questions
// We will reuse topics and generate increasingly advanced conceptual questions
const remainingCount = 400 - dsaQuestions.length;
const advancedTopics = Object.keys(problemBank);
const advDifficulties: ('MEDIUM' | 'HARD')[] = ['MEDIUM', 'HARD', 'HARD', 'MEDIUM'];

for (let i = 0; i < remainingCount; i++) {
  const t = advancedTopics[i % advancedTopics.length];
  dsaQuestions.push({
    id: idCounter++,
    title: `Advanced ${t} Algorithm Implementation ${i + 1}`,
    difficulty: advDifficulties[i % advDifficulties.length],
    topic: t,
    status: 'UNSOLVED',
    isTop150: false
  });
}

// Dynamically extract unique topics
export const uniqueTopics = Array.from(new Set(dsaQuestions.map(q => q.topic)));
