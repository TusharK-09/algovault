import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── DSA Tracker ─────────────────────────────────────────────────────────────
const TOPICS = [
  { id:"arrays", label:"Arrays + Sliding Window", emoji:"🪟", accent:"#2563eb", level:"Harder Problems", problems:[
    {id:"a1",name:"Minimum Window Substring",difficulty:"Hard",tag:"sliding window",leetcode:"https://leetcode.com/problems/minimum-window-substring/"},
    {id:"a2",name:"Longest Substring with K Distinct",difficulty:"Hard",tag:"sliding window",leetcode:"https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"},
    {id:"a3",name:"Sliding Window Maximum",difficulty:"Hard",tag:"deque",leetcode:"https://leetcode.com/problems/sliding-window-maximum/"},
    {id:"a4",name:"Minimum Size Subarray Sum",difficulty:"Medium",tag:"two pointer",leetcode:"https://leetcode.com/problems/minimum-size-subarray-sum/"},
    {id:"a5",name:"Fruit Into Baskets",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/fruit-into-baskets/"},
    {id:"a6",name:"Permutation in String",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/permutation-in-string/"},
    {id:"a7",name:"Longest Repeating Character Replacement",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/longest-repeating-character-replacement/"},
    {id:"a8",name:"Max Consecutive Ones III",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/max-consecutive-ones-iii/"},
  ]},
  { id:"trees", label:"Trees → BST", emoji:"🌲", accent:"#059669", level:"BST Problems", problems:[
    {id:"t1",name:"Validate Binary Search Tree",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/validate-binary-search-tree/"},
    {id:"t2",name:"Kth Smallest in BST",difficulty:"Medium",tag:"inorder",leetcode:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},
    {id:"t3",name:"BST Iterator",difficulty:"Medium",tag:"inorder",leetcode:"https://leetcode.com/problems/binary-search-tree-iterator/"},
    {id:"t4",name:"Lowest Common Ancestor of BST",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},
    {id:"t5",name:"Delete Node in BST",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/delete-node-in-a-bst/"},
    {id:"t6",name:"Convert Sorted Array to BST",difficulty:"Easy",tag:"BST",leetcode:"https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"},
    {id:"t7",name:"Range Sum of BST",difficulty:"Easy",tag:"DFS",leetcode:"https://leetcode.com/problems/range-sum-of-bst/"},
    {id:"t8",name:"Balance a BST",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/balance-a-binary-search-tree/"},
  ]},
  { id:"hashmap", label:"HashMap", emoji:"🗂️", accent:"#dc2626", level:"Complex Frequency", problems:[
    {id:"h1",name:"Top K Frequent Elements",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/top-k-frequent-elements/"},
    {id:"h2",name:"Group Anagrams",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/group-anagrams/"},
    {id:"h3",name:"Subarray Sum Equals K",difficulty:"Medium",tag:"prefix sum",leetcode:"https://leetcode.com/problems/subarray-sum-equals-k/"},
    {id:"h4",name:"Longest Consecutive Sequence",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/longest-consecutive-sequence/"},
    {id:"h5",name:"Word Pattern",difficulty:"Easy",tag:"bijection",leetcode:"https://leetcode.com/problems/word-pattern/"},
    {id:"h6",name:"Find All Anagrams in String",difficulty:"Medium",tag:"sliding+map",leetcode:"https://leetcode.com/problems/find-all-anagrams-in-a-string/"},
    {id:"h7",name:"4Sum II",difficulty:"Medium",tag:"two maps",leetcode:"https://leetcode.com/problems/4sum-ii/"},
    {id:"h8",name:"Contiguous Array",difficulty:"Medium",tag:"prefix sum",leetcode:"https://leetcode.com/problems/contiguous-array/"},
  ]},
  { id:"bsearch", label:"Binary Search", emoji:"🔍", accent:"#9333ea", level:"Variations", problems:[
    {id:"b1",name:"Find Peak Element",difficulty:"Medium",tag:"peak",leetcode:"https://leetcode.com/problems/find-peak-element/"},
    {id:"b2",name:"Search in Rotated Array",difficulty:"Medium",tag:"rotated",leetcode:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},
    {id:"b3",name:"Search in Rotated Array II",difficulty:"Medium",tag:"rotated",leetcode:"https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"},
    {id:"b4",name:"Find Minimum in Rotated Array",difficulty:"Medium",tag:"rotated",leetcode:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},
    {id:"b5",name:"Find Minimum in Rotated Array II",difficulty:"Hard",tag:"rotated",leetcode:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/"},
    {id:"b6",name:"Koko Eating Bananas",difficulty:"Medium",tag:"search on answer",leetcode:"https://leetcode.com/problems/koko-eating-bananas/"},
    {id:"b7",name:"Capacity to Ship Packages",difficulty:"Medium",tag:"search on answer",leetcode:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"},
    {id:"b8",name:"Split Array Largest Sum",difficulty:"Hard",tag:"search on answer",leetcode:"https://leetcode.com/problems/split-array-largest-sum/"},
  ]},
];

// ─── ADS Subject ─────────────────────────────────────────────────────────────
const ADS_TOPICS = [
  { id:"ads1", label:"Arrays-1 | Sliding Window & Two Pointers", accent:"#2563eb", problems:[
    {id:"s1",name:"Longest Substring Without Repeating Chars",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},
    {id:"s2",name:"Minimum Size Subarray Sum",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/minimum-size-subarray-sum/"},
    {id:"s3",name:"Minimum Window Substring",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/minimum-window-substring/"},
    {id:"s4",name:"3Sum",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/3sum/"},
    {id:"s5",name:"Two Sum II",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},
    {id:"s6",name:"Container With Most Water",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/container-with-most-water/"},
  ]},
  { id:"ads2", label:"Arrays-2 | Frequency & Prefix Arrays", accent:"#059669", problems:[
    {id:"s7",name:"Range Sum Query Immutable",tag:"Prefix Sum",leetcode:"https://leetcode.com/problems/range-sum-query-immutable/"},
    {id:"s8",name:"Subarray Sum Equals K",tag:"Prefix Sum",leetcode:"https://leetcode.com/problems/subarray-sum-equals-k/"},
    {id:"s9",name:"Subarray Sums Divisible by K",tag:"Prefix Sum+Freq",leetcode:"https://leetcode.com/problems/subarray-sums-divisible-by-k/"},
    {id:"s10",name:"Product of Array Except Self",tag:"Prefix Product",leetcode:"https://leetcode.com/problems/product-of-array-except-self/"},
    {id:"s11",name:"Find All Duplicates in Array",tag:"Frequency Array",leetcode:"https://leetcode.com/problems/find-all-duplicates-in-an-array/"},
  ]},
  { id:"ads3", label:"Binary Search", accent:"#9333ea", problems:[
    {id:"s12",name:"Binary Search",tag:"Classic BS",leetcode:"https://leetcode.com/problems/binary-search/"},
    {id:"s13",name:"Search in Rotated Sorted Array",tag:"Classic BS",leetcode:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},
    {id:"s14",name:"Find First and Last Position",tag:"Lower/Upper Bound",leetcode:"https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"},
    {id:"s15",name:"Search Insert Position",tag:"Lower Bound",leetcode:"https://leetcode.com/problems/search-insert-position/"},
    {id:"s16",name:"Find Peak Element",tag:"Classic BS",leetcode:"https://leetcode.com/problems/find-peak-element/"},
    {id:"s17",name:"Koko Eating Bananas",tag:"BS on Answer",leetcode:"https://leetcode.com/problems/koko-eating-bananas/"},
    {id:"s18",name:"Capacity to Ship Packages",tag:"BS on Answer",leetcode:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"},
    {id:"s19",name:"Split Array Largest Sum",tag:"BS on Answer",leetcode:"https://leetcode.com/problems/split-array-largest-sum/"},
  ]},
  { id:"ads4", label:"Array Advanced | Kadane's & Prime Sieve", accent:"#dc2626", problems:[
    {id:"s20",name:"Maximum Subarray",tag:"Kadane's",leetcode:"https://leetcode.com/problems/maximum-subarray/"},
    {id:"s21",name:"Maximum Sum Circular Subarray",tag:"Kadane's",leetcode:"https://leetcode.com/problems/maximum-sum-circular-subarray/"},
    {id:"s22",name:"Count Primes",tag:"Prime Sieve",leetcode:"https://leetcode.com/problems/count-primes/"},
    {id:"s23",name:"Subarray Product Less Than K",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/subarray-product-less-than-k/"},
  ]},
  { id:"ads5", label:"Strings", accent:"#d97706", problems:[
    {id:"s24",name:"Valid Palindrome",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/valid-palindrome/"},
    {id:"s25",name:"Valid Anagram",tag:"Frequency Array",leetcode:"https://leetcode.com/problems/valid-anagram/"},
    {id:"s26",name:"Find All Anagrams in String",tag:"Sliding Window+Freq",leetcode:"https://leetcode.com/problems/find-all-anagrams-in-a-string/"},
    {id:"s27",name:"Permutation in String",tag:"Sliding Window+Freq",leetcode:"https://leetcode.com/problems/permutation-in-string/"},
    {id:"s28",name:"Reverse Words in a String",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/reverse-words-in-a-string/"},
  ]},
  { id:"ads6", label:"Advanced Sliding Window + Deque", accent:"#0891b2", problems:[
    {id:"s29",name:"Sliding Window Maximum",tag:"Monotonic Deque",leetcode:"https://leetcode.com/problems/sliding-window-maximum/"},
    {id:"s30",name:"Longest Substring K Distinct Chars",tag:"Variable Window",leetcode:"https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"},
    {id:"s31",name:"Longest Repeating Character Replacement",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/longest-repeating-character-replacement/"},
  ]},
  { id:"ads7", label:"String Matching Algorithms", accent:"#7c3aed", problems:[
    {id:"s32",name:"Find First Occurrence in String",tag:"KMP",leetcode:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"},
    {id:"s33",name:"Shortest Palindrome",tag:"KMP",leetcode:"https://leetcode.com/problems/shortest-palindrome/"},
    {id:"s34",name:"Longest Happy Prefix",tag:"KMP/Z-Function",leetcode:"https://leetcode.com/problems/longest-happy-prefix/"},
    {id:"s35",name:"Repeated String Match",tag:"Rabin-Karp",leetcode:"https://leetcode.com/problems/repeated-string-match/"},
  ]},
  { id:"ads8", label:"Recursion & Backtracking", accent:"#be185d", problems:[
    {id:"s36",name:"Fibonacci Number",tag:"Basic Recursion",leetcode:"https://leetcode.com/problems/fibonacci-number/"},
    {id:"s37",name:"Pow(x, n)",tag:"Recursion",leetcode:"https://leetcode.com/problems/powx-n/"},
    {id:"s38",name:"Subsets",tag:"Backtracking",leetcode:"https://leetcode.com/problems/subsets/"},
    {id:"s39",name:"Permutations",tag:"Backtracking",leetcode:"https://leetcode.com/problems/permutations/"},
    {id:"s40",name:"N-Queens",tag:"N-Queens",leetcode:"https://leetcode.com/problems/n-queens/"},
    {id:"s41",name:"Combination Sum",tag:"Combination Sum",leetcode:"https://leetcode.com/problems/combination-sum/"},
    {id:"s42",name:"Word Search",tag:"Grid Backtracking",leetcode:"https://leetcode.com/problems/word-search/"},
  ]},
  { id:"ads9", label:"Linked List", accent:"#065f46", problems:[
    {id:"s43",name:"Reverse Linked List",tag:"Reversal",leetcode:"https://leetcode.com/problems/reverse-linked-list/"},
    {id:"s44",name:"Linked List Cycle",tag:"Floyd's Algorithm",leetcode:"https://leetcode.com/problems/linked-list-cycle/"},
    {id:"s45",name:"Linked List Cycle II",tag:"Floyd's Algorithm",leetcode:"https://leetcode.com/problems/linked-list-cycle-ii/"},
    {id:"s46",name:"Middle of Linked List",tag:"Slow/Fast Pointer",leetcode:"https://leetcode.com/problems/middle-of-the-linked-list/"},
    {id:"s47",name:"Merge Two Sorted Lists",tag:"Merge",leetcode:"https://leetcode.com/problems/merge-two-sorted-lists/"},
    {id:"s48",name:"Add Two Numbers",tag:"Math on LL",leetcode:"https://leetcode.com/problems/add-two-numbers/"},
  ]},
  { id:"ads10", label:"Interview Prep (Arrays)", accent:"#92400e", problems:[
    {id:"s49",name:"Next Permutation",tag:"Array Manipulation",leetcode:"https://leetcode.com/problems/next-permutation/"},
    {id:"s50",name:"Merge Intervals",tag:"Sorting+Array",leetcode:"https://leetcode.com/problems/merge-intervals/"},
    {id:"s51",name:"Sort Colors",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/sort-colors/"},
    {id:"s52",name:"Trapping Rain Water",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/trapping-rain-water/"},
    {id:"s53",name:"Best Time to Buy and Sell Stock",tag:"Greedy",leetcode:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},
  ]},
];

// ─── 50 Problem Placement Bank ───────────────────────────────────────────────
const BANK = [
  {id:"q1",name:"Two Sum",lc:"1",pattern:"Array/HashMap",diff:"Easy",link:"https://leetcode.com/problems/two-sum/",init:true},
  {id:"q2",name:"Best Time to Buy and Sell Stock",lc:"121",pattern:"Array",diff:"Easy",link:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",init:true},
  {id:"q3",name:"Contains Duplicate",lc:"217",pattern:"HashMap",diff:"Easy",link:"https://leetcode.com/problems/contains-duplicate/",init:true},
  {id:"q4",name:"Product of Array Except Self",lc:"238",pattern:"Array",diff:"Medium",link:"https://leetcode.com/problems/product-of-array-except-self/",init:true},
  {id:"q5",name:"Maximum Subarray — Kadane",lc:"53",pattern:"Array",diff:"Medium",link:"https://leetcode.com/problems/maximum-subarray/",init:true},
  {id:"q6",name:"Maximum Product Subarray",lc:"152",pattern:"Array",diff:"Medium",link:"https://leetcode.com/problems/maximum-product-subarray/"},
  {id:"q7",name:"Find Min in Rotated Sorted Array",lc:"153",pattern:"Binary Search",diff:"Medium",link:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},
  {id:"q8",name:"Search in Rotated Sorted Array",lc:"33",pattern:"Binary Search",diff:"Medium",link:"https://leetcode.com/problems/search-in-rotated-sorted-array/",init:true},
  {id:"q9",name:"3Sum",lc:"15",pattern:"Two Pointer",diff:"Medium",link:"https://leetcode.com/problems/3sum/"},
  {id:"q10",name:"Container With Most Water",lc:"11",pattern:"Two Pointer",diff:"Medium",link:"https://leetcode.com/problems/container-with-most-water/"},
  {id:"q11",name:"Valid Anagram",lc:"242",pattern:"String",diff:"Easy",link:"https://leetcode.com/problems/valid-anagram/",init:true},
  {id:"q12",name:"Valid Palindrome",lc:"125",pattern:"String",diff:"Easy",link:"https://leetcode.com/problems/valid-palindrome/",init:true},
  {id:"q13",name:"Longest Substring Without Repeating",lc:"3",pattern:"Sliding Window",diff:"Medium",link:"https://leetcode.com/problems/longest-substring-without-repeating-characters/",init:true},
  {id:"q14",name:"Longest Repeating Char Replacement",lc:"424",pattern:"Sliding Window",diff:"Medium",link:"https://leetcode.com/problems/longest-repeating-character-replacement/"},
  {id:"q15",name:"Minimum Window Substring",lc:"76",pattern:"Sliding Window",diff:"Hard",link:"https://leetcode.com/problems/minimum-window-substring/"},
  {id:"q16",name:"Group Anagrams",lc:"49",pattern:"HashMap",diff:"Medium",link:"https://leetcode.com/problems/group-anagrams/",init:true},
  {id:"q17",name:"Longest Common Prefix",lc:"14",pattern:"String",diff:"Easy",link:"https://leetcode.com/problems/longest-common-prefix/",init:true},
  {id:"q18",name:"Reverse Words in a String",lc:"151",pattern:"String",diff:"Medium",link:"https://leetcode.com/problems/reverse-words-in-a-string/",init:true},
  {id:"q19",name:"Reverse Linked List",lc:"206",pattern:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/reverse-linked-list/"},
  {id:"q20",name:"Merge Two Sorted Lists",lc:"21",pattern:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/merge-two-sorted-lists/"},
  {id:"q21",name:"Linked List Cycle",lc:"141",pattern:"Linked List",diff:"Easy",link:"https://leetcode.com/problems/linked-list-cycle/"},
  {id:"q22",name:"Remove Nth Node From End",lc:"19",pattern:"Linked List",diff:"Medium",link:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},
  {id:"q23",name:"Reorder List",lc:"143",pattern:"Linked List",diff:"Medium",link:"https://leetcode.com/problems/reorder-list/"},
  {id:"q24",name:"Maximum Depth of Binary Tree",lc:"104",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/maximum-depth-of-binary-tree/",init:true},
  {id:"q25",name:"Same Tree",lc:"100",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/same-tree/"},
  {id:"q26",name:"Invert Binary Tree",lc:"226",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/invert-binary-tree/"},
  {id:"q27",name:"Binary Tree Level Order",lc:"102",pattern:"Tree BFS",diff:"Medium",link:"https://leetcode.com/problems/binary-tree-level-order-traversal/",init:true},
  {id:"q28",name:"Sum of Left Leaves",lc:"404",pattern:"Tree DFS",diff:"Easy",link:"https://leetcode.com/problems/sum-of-left-leaves/",init:true},
  {id:"q29",name:"Diameter of Binary Tree",lc:"543",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/diameter-of-binary-tree/",init:true},
  {id:"q30",name:"Path Sum",lc:"112",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/path-sum/",init:true},
  {id:"q31",name:"Validate Binary Search Tree",lc:"98",pattern:"BST",diff:"Medium",link:"https://leetcode.com/problems/validate-binary-search-tree/"},
  {id:"q32",name:"Lowest Common Ancestor BST",lc:"235",pattern:"BST",diff:"Medium",link:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},
  {id:"q33",name:"Valid Parentheses",lc:"20",pattern:"Stack",diff:"Easy",link:"https://leetcode.com/problems/valid-parentheses/"},
  {id:"q34",name:"Min Stack",lc:"155",pattern:"Stack",diff:"Medium",link:"https://leetcode.com/problems/min-stack/"},
  {id:"q35",name:"Daily Temperatures",lc:"739",pattern:"Stack",diff:"Medium",link:"https://leetcode.com/problems/daily-temperatures/"},
  {id:"q36",name:"Largest Rectangle in Histogram",lc:"84",pattern:"Stack",diff:"Hard",link:"https://leetcode.com/problems/largest-rectangle-in-histogram/"},
  {id:"q37",name:"Number of Islands",lc:"200",pattern:"Graph BFS/DFS",diff:"Medium",link:"https://leetcode.com/problems/number-of-islands/"},
  {id:"q38",name:"Clone Graph",lc:"133",pattern:"Graph",diff:"Medium",link:"https://leetcode.com/problems/clone-graph/"},
  {id:"q39",name:"Course Schedule",lc:"207",pattern:"Graph Topo",diff:"Medium",link:"https://leetcode.com/problems/course-schedule/"},
  {id:"q40",name:"Pacific Atlantic Water Flow",lc:"417",pattern:"Graph",diff:"Medium",link:"https://leetcode.com/problems/pacific-atlantic-water-flow/"},
  {id:"q41",name:"Climbing Stairs",lc:"70",pattern:"DP",diff:"Easy",link:"https://leetcode.com/problems/climbing-stairs/"},
  {id:"q42",name:"House Robber",lc:"198",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/house-robber/"},
  {id:"q43",name:"Coin Change",lc:"322",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/coin-change/"},
  {id:"q44",name:"Longest Increasing Subsequence",lc:"300",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/longest-increasing-subsequence/"},
  {id:"q45",name:"Unique Paths",lc:"62",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/unique-paths/"},
  {id:"q46",name:"Top K Frequent Elements",lc:"347",pattern:"Heap",diff:"Medium",link:"https://leetcode.com/problems/top-k-frequent-elements/",init:true},
  {id:"q47",name:"Kth Largest Element",lc:"215",pattern:"Heap",diff:"Medium",link:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},
  {id:"q48",name:"Merge K Sorted Lists",lc:"23",pattern:"Heap",diff:"Hard",link:"https://leetcode.com/problems/merge-k-sorted-lists/"},
  {id:"q49",name:"Binary Search",lc:"704",pattern:"Binary Search",diff:"Easy",link:"https://leetcode.com/problems/binary-search/",init:true},
  {id:"q50",name:"Find Peak Element",lc:"162",pattern:"Binary Search",diff:"Medium",link:"https://leetcode.com/problems/find-peak-element/"},
];

const BANK_PATTERNS = [...new Set(BANK.map(q=>q.pattern))];

// ─── Daily Plan ───────────────────────────────────────────────────────────────
const DAILY_PLAN = [
  {date:"23 Mar",day:"Mon",morning:"Read Stack theory",p1:"LC 20 Valid Parentheses",p2:"LC 739 Daily Temperatures",evening:"Stack Problems"},
  {date:"24 Mar",day:"Tue",morning:"Stack — LC 155 Min Stack",p1:"LC 155 Min Stack",p2:"LC 84 Largest Rectangle",evening:"Stack Problems"},
  {date:"25 Mar",day:"Wed",morning:"Read Linked List theory",p1:"LC 206 Reverse Linked List",p2:"LC 876 Middle of List",evening:"Linked List Problems"},
  {date:"26 Mar",day:"Thu",morning:"LC 206 Reverse Linked List",p1:"LC 21 Merge Sorted Lists",p2:"LC 19 Remove Nth Node",evening:"Linked List Problems"},
  {date:"27 Mar",day:"Fri",morning:"LC 21 Merge Sorted Lists",p1:"LC 141 Linked List Cycle",p2:"LC 234 Palindrome Linked List",evening:"Linked List Problems"},
  {date:"28 Mar",day:"Sat",morning:"Read Backtracking intro",p1:"LC 78 Subsets",p2:"LC 90 Subsets II",evening:"Backtracking Problems"},
  {date:"29 Mar",day:"Sun",morning:"LC 78 Subsets",p1:"LC 46 Permutations",p2:"LC 47 Permutations II",evening:"Backtracking Problems"},
  {date:"30 Mar",day:"Mon",morning:"LC 46 Permutations",p1:"LC 39 Combination Sum",p2:"LC 40 Combination Sum II",evening:"Backtracking Problems"},
  {date:"31 Mar",day:"Tue",morning:"Read Graph BFS/DFS theory",p1:"LC 200 Number of Islands",p2:"LC 417 Pacific Atlantic",evening:"Graph Problems"},
  {date:"01 Apr",day:"Wed",morning:"LC 200 Number of Islands",p1:"LC 133 Clone Graph",p2:"LC 207 Course Schedule",evening:"Graph Problems"},
  {date:"02 Apr",day:"Thu",morning:"LC 133 Clone Graph",p1:"LC 695 Max Area of Island",p2:"LC 210 Course Schedule II",evening:"Graph Problems"},
  {date:"03 Apr",day:"Fri",morning:"Read DP — Fibonacci pattern",p1:"LC 70 Climbing Stairs",p2:"LC 746 Min Cost Stairs",evening:"DP Problems"},
  {date:"04 Apr",day:"Sat",morning:"LC 70 Climbing Stairs",p1:"LC 198 House Robber",p2:"LC 62 Unique Paths",evening:"DP Problems"},
  {date:"05 Apr",day:"Sun",morning:"LC 198 House Robber",p1:"LC 213 House Robber II",p2:"LC 63 Unique Paths II",evening:"DP Problems"},
  {date:"06 Apr",day:"Mon",morning:"Read DP — Knapsack pattern",p1:"LC 322 Coin Change",p2:"LC 416 Partition Equal Subset",evening:"DP Knapsack"},
  {date:"07 Apr",day:"Tue",morning:"LC 322 Coin Change",p1:"LC 300 LIS",p2:"LC 518 Coin Change II",evening:"DP Problems"},
  {date:"08 Apr",day:"Wed",morning:"LC 300 LIS",p1:"LC 1143 LCS",p2:"LC 72 Edit Distance",evening:"DP Problems"},
  {date:"09 Apr",day:"Thu",morning:"Read Heap/Priority Queue",p1:"LC 347 Top K Frequent",p2:"LC 973 K Closest Points",evening:"Heap Problems"},
  {date:"10 Apr",day:"Fri",morning:"LC 347 Top K (revisit)",p1:"LC 215 Kth Largest",p2:"LC 1046 Last Stone Weight",evening:"Heap Problems"},
  {date:"11 Apr",day:"Sat",morning:"LC 215 Kth Largest",p1:"LC 23 Merge K Lists",p2:"LC 295 Find Median Stream",evening:"Heap Problems"},
  {date:"12 Apr",day:"Sun",morning:"Read Greedy intro",p1:"LC 455 Assign Cookies",p2:"LC 55 Jump Game",evening:"Greedy Problems"},
  {date:"13 Apr",day:"Mon",morning:"LC 455 Assign Cookies",p1:"LC 435 Non Overlapping Intervals",p2:"LC 45 Jump Game II",evening:"Greedy Problems"},
  {date:"14 Apr",day:"Tue",morning:"LC 121 Best Time Stock (revisit)",p1:"LC 452 Burst Balloons",p2:"LC 134 Gas Station",evening:"Greedy Problems"},
  {date:"15 Apr",day:"Wed",morning:"Aptitude — Pictorial practice",p1:"Pictorial Practice",p2:"IndiaBix Aptitude 20 Qs",evening:"Aptitude Practice"},
  {date:"16 Apr",day:"Thu",morning:"Aptitude — Pictorial practice",p1:"Pictorial Practice",p2:"IndiaBix Aptitude 20 Qs",evening:"Aptitude Practice"},
  {date:"17 Apr",day:"Fri",morning:"Aptitude — Number series",p1:"Number Series Practice",p2:"IndiaBix Aptitude 20 Qs",evening:"Aptitude Practice"},
  {date:"18 Apr",day:"Sat",morning:"SQL — Advanced JOINs",p1:"LC 570 Managers 5 Reports",p2:"LC 178 Rank Scores",evening:"SQL Advanced"},
  {date:"19 Apr",day:"Sun",morning:"SQL — Window Functions",p1:"LC 1341 Movie Rating",p2:"LC 1204 Last Bus Person",evening:"SQL Advanced"},
  {date:"20 Apr",day:"Mon",morning:"SQL — Complex Subqueries",p1:"LC 185 Dept Top 3 Salaries",p2:"LC 1907 Count Salary Cat",evening:"SQL Advanced"},
  {date:"21 Apr",day:"Tue",morning:"SQL — RANK DENSE_RANK",p1:"LC 602 Most Friends",p2:"LC 626 Exchange Seats",evening:"SQL Practice"},
  {date:"22 Apr",day:"Wed",morning:"System Design basics",p1:"Read + Notes",p2:"Read Article",evening:"System Design"},
  {date:"23 Apr",day:"Thu",morning:"System Design — REST vs GraphQL",p1:"Read + Notes",p2:"Read Article",evening:"System Design"},
  {date:"24 Apr",day:"Fri",morning:"OOPS revision",p1:"OOPS MCQ Practice",p2:"Output Based Java",evening:"OOPS Practice"},
  {date:"25 Apr",day:"Sat",morning:"Java Collections deep dive",p1:"Java MCQ Practice",p2:"Output Based Java",evening:"Java Practice"},
  {date:"26 Apr",day:"Sun",morning:"Java Exceptions + Threads basics",p1:"Java MCQ Practice",p2:"Thread+Exception MCQ",evening:"Java Practice"},
  {date:"27 Apr",day:"Mon",morning:"Mock test — 1 hour",p1:"Full Mock Test",p2:"Apply 2 Companies",evening:"Mock + Apply"},
  {date:"28 Apr",day:"Tue",morning:"Weak area revision",p1:"Full Mock Test",p2:"Apply 3 Companies",evening:"Mock + Apply"},
  {date:"29 Apr",day:"Wed",morning:"LinkedIn post + apply",p1:"Apply 3 Companies",p2:"Apply 3 Companies",evening:"Mock + Apply"},
  {date:"30 Apr",day:"Thu",morning:"Mock test — 1 hour",p1:"Full Mock Test",p2:"Apply 3 Companies",evening:"Mock + Apply"},
  {date:"01 May",day:"Fri",morning:"Full revision",p1:"Apply 5 Companies",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"02 May",day:"Sat",morning:"Apply 5 off campus",p1:"LinkedIn Post",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"03 May",day:"Sun",morning:"Mock test — 2 hours",p1:"Full Mock Test",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"04 May",day:"Mon",morning:"Review all patterns",p1:"Apply 5 Companies",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"05 May",day:"Tue",morning:"Apply 5 off campus",p1:"LinkedIn Post",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"06 May",day:"Wed",morning:"Full mock — 3 hours",p1:"Full Mock Test",p2:"Apply 5 Companies",evening:"Mock + Apply"},
  {date:"07 May",day:"Thu",morning:"Weak spots only",p1:"Apply Companies",p2:"Apply Companies",evening:"Apply"},
  {date:"08 May",day:"Fri",morning:"Off campus applications",p1:"LinkedIn",p2:"Apply Companies",evening:"Apply"},
  {date:"09 May",day:"Sat",morning:"Rest + revision",p1:"Mock Test",p2:"Apply Companies",evening:"Apply"},
  {date:"10 May",day:"Sun",morning:"Rest + revision",p1:"Mock Test",p2:"Apply",evening:"Mock test"},
];

// ─── Topic Roadmap ────────────────────────────────────────────────────────────
const ROADMAP = [
  {topic:"✅ Arrays + Strings",timeline:"Done",what:"Kadane's, Two Pointer, Prefix Sum, Sliding Window",done:true},
  {topic:"✅ HashMap + HashSet",timeline:"Done",what:"Frequency count, Two Sum pattern",done:true},
  {topic:"✅ Trees",timeline:"Done",what:"DFS, BFS, Left leaf sum, Level order",done:true},
  {topic:"✅ Binary Search",timeline:"Done",what:"Standard BS, Rotated array",done:true},
  {topic:"✅ Recursion Basics",timeline:"Done",what:"Base case, recursive case, call stack",done:true},
  {topic:"🔄 Stack + Queue",timeline:"Week 1",what:"Valid parens, Min stack, Daily temperatures, Monotonic stack"},
  {topic:"🔄 Linked List",timeline:"Week 1–2",what:"Reverse, cycle detection, merge, slow-fast pointer"},
  {topic:"🔄 Backtracking",timeline:"Week 2",what:"Subsets, permutations, combination sum"},
  {topic:"🔄 Graphs",timeline:"Week 3",what:"BFS/DFS on grid, adjacency list, topological sort"},
  {topic:"🔄 Dynamic Programming",timeline:"Week 3–4",what:"Recursion → memoization → tabulation"},
  {topic:"🔄 Heap/Priority Queue",timeline:"Week 4",what:"Min heap, max heap, K largest/smallest problems"},
  {topic:"🔄 Greedy",timeline:"Week 5",what:"Jump game, interval scheduling, always pick local best"},
  {topic:"🆕 Pictorial Aptitude",timeline:"Week 5–6",what:"Pattern completion, mirror images, sequences — IndiaBix"},
  {topic:"🆕 Advanced SQL",timeline:"Week 5–6",what:"Window functions, RANK, DENSE_RANK, complex subqueries"},
  {topic:"🆕 System Design Basics",timeline:"Week 6–7",what:"REST API, databases, caching, load balancing — basics"},
  {topic:"🔄 OOPS Deep Dive",timeline:"Ongoing",what:"Design patterns, SOLID principles, Java advanced"},
  {topic:"🆕 Off Campus Apply",timeline:"Start NOW",what:"LinkedIn, AngelList, Wellfound — apply 3–5 daily"},
  {topic:"🆕 Mock Tests",timeline:"Weekly",what:"Full timed mock every week — HackerRank + LeetCode contests"},
];

// ─── Off Campus Companies ─────────────────────────────────────────────────────
const OFF_CAMPUS = [
  {id:"oc1",company:"Capgemini",role:"Associate Software Engineer",platform:"Campus/Website"},
  {id:"oc2",company:"Wipro",role:"Project Engineer",platform:"Wipro Website"},
  {id:"oc3",company:"Infosys",role:"Systems Engineer",platform:"InfyTQ"},
  {id:"oc4",company:"TCS",role:"Assistant System Engineer",platform:"TCS NextStep"},
  {id:"oc5",company:"Cognizant",role:"Programmer Analyst",platform:"Cognizant Website"},
  {id:"oc6",company:"HCL Technologies",role:"Graduate Engineer",platform:"HCL Careers"},
  {id:"oc7",company:"Tech Mahindra",role:"Software Engineer",platform:"Tech Mahindra Jobs"},
  {id:"oc8",company:"Accenture",role:"Associate Software Engineer",platform:"Accenture Careers"},
  {id:"oc9",company:"Zoho",role:"Software Developer",platform:"Zoho Careers"},
  {id:"oc10",company:"Freshworks",role:"Software Engineer",platform:"Freshworks Jobs"},
  {id:"oc11",company:"PhonePe",role:"SDE",platform:"LinkedIn"},
  {id:"oc12",company:"Razorpay",role:"SDE",platform:"LinkedIn"},
  {id:"oc13",company:"Postman",role:"SDE",platform:"LinkedIn/Wellfound"},
  {id:"oc14",company:"BrowserStack",role:"SDE",platform:"LinkedIn"},
  {id:"oc15",company:"Slice",role:"SDE",platform:"LinkedIn/Wellfound"},
  {id:"oc16",company:"Groww",role:"SDE",platform:"LinkedIn"},
  {id:"oc17",company:"Zepto",role:"SDE",platform:"LinkedIn"},
  {id:"oc18",company:"Meesho",role:"SDE",platform:"LinkedIn"},
  {id:"oc19",company:"Sprinklr",role:"SDE",platform:"LinkedIn"},
  {id:"oc20",company:"Hasura",role:"SDE",platform:"Wellfound"},
];

// ─── Placement Intel ──────────────────────────────────────────────────────────
const COMPANIES = [
  {name:"Unicommerce",score:94,likelihood:"Very High 🔥",ctc:"7.1",focus:"DSA Medium + Java + SQL",months:"Mar, Apr, May"},
  {name:"Josh Technology Groups",score:86,likelihood:"Very High 🔥",ctc:"10.8",focus:"DSA Medium + Java + SQL",months:"Apr, May, Jul"},
  {name:"Razorpay",score:86,likelihood:"Very High 🔥",ctc:"13.0",focus:"DSA Medium + System Design",months:"Mar, May, Jul"},
  {name:"HighRadius",score:86,likelihood:"Very High 🔥",ctc:"8.0",focus:"DSA + DevOps/Cloud basics",months:"Mar, Apr"},
  {name:"WizCommerce",score:86,likelihood:"Very High 🔥",ctc:"6.0",focus:"DSA Medium + Java + SQL",months:"Mar, Apr"},
  {name:"Innova Solution",score:86,likelihood:"Very High 🔥",ctc:"5.5",focus:"Basic DSA + Projects + OOPS",months:"Mar, Apr"},
  {name:"Oriental Outsourcing",score:86,likelihood:"Very High 🔥",ctc:"7.4",focus:"Basic DSA + Projects showcase",months:"Mar, Apr, Jun"},
  {name:"Reltio",score:78,likelihood:"High 🟡",ctc:"15.0",focus:"DSA Medium + System Design",months:"May"},
  {name:"FICO",score:78,likelihood:"High 🟡",ctc:"11.2",focus:"DSA + DevOps/Cloud basics",months:"Mar"},
  {name:"Samsung Electro Mechanics",score:78,likelihood:"High 🟡",ctc:"9.1",focus:"DSA + Java/Python + Domain",months:"Feb, Apr"},
  {name:"MeetMux",score:70,likelihood:"High 🟡",ctc:"20.0",focus:"DSA Hard + System Design",months:"Aug"},
  {name:"Bajaj Finserv",score:70,likelihood:"High 🟡",ctc:"12.0",focus:"DSA + Java/Python + Domain",months:"Feb, Jun, Jul"},
  {name:"SalesCode.ai",score:70,likelihood:"High 🟡",ctc:"12.6",focus:"DSA Medium + Java + SQL",months:"Feb, Aug"},
  {name:"Microsoft (Pool)",score:55,likelihood:"Medium 🔵",ctc:"50.0",focus:"DSA Hard + OOP + System Design",months:"Jun, Aug, Sep"},
  {name:"Wissen Technology",score:63,likelihood:"High 🟡",ctc:"11.0",focus:"Basic DSA + Projects + OOPS",months:"Jan, Apr, Sep"},
];

const DIFF_STYLE = {Easy:{color:"#059669",bg:"#ecfdf5"},Medium:{color:"#d97706",bg:"#fffbeb"},Hard:{color:"#dc2626",bg:"#fef2f2"}};
const STATUS_COLORS = {"Applied":"#2563eb","Shortlisted":"#d97706","Rejected":"#dc2626","Offered":"#059669","Watching":"#9333ea"};
const DAY_MS = 86400000;
const today = () => new Date().toDateString();
const EMPTY_STREAK = {count:0,last:null,history:[]};

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen({onAuth}) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [mode,setMode]=useState("login"); const [error,setError]=useState("");
  const [loading,setLoading]=useState(false); const [sent,setSent]=useState(false);
  const submit = async () => {
    setError(""); setLoading(true);
    if (mode==="signup") { const {error:e}=await supabase.auth.signUp({email,password}); if(e)setError(e.message);else setSent(true); }
    else { const {data,error:e}=await supabase.auth.signInWithPassword({email,password}); if(e)setError(e.message);else onAuth(data.user); }
    setLoading(false);
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#fafaf9",fontFamily:"'DM Sans',sans-serif",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@900&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,marginBottom:8,letterSpacing:-1}}>Algo<span style={{color:"#2563eb"}}>Vault</span></div>
        <div style={{fontSize:14,color:"#888",marginBottom:36}}>Tushar's placement command center.</div>
        {sent ? <div style={{background:"#ecfdf5",border:"1px solid #a7f3d0",borderRadius:12,padding:20,fontSize:14,color:"#059669"}}>✅ Check your email to confirm, then log in.</div> : <>
          {[["EMAIL","email","you@email.com",email,setEmail],["PASSWORD","password","••••••••",password,setPassword]].map(([l,t,p,v,s])=>(
            <div key={l} style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:600,color:"#888",display:"block",marginBottom:5,letterSpacing:1}}>{l}</label>
              <input type={t} value={v} onChange={e=>s(e.target.value)} placeholder={p} onKeyDown={e=>e.key==="Enter"&&submit()}
                style={{width:"100%",padding:"11px 14px",border:"1.5px solid #e8e5e0",borderRadius:10,fontSize:14,fontFamily:"'DM Sans'",outline:"none",background:"#fff",color:"#1c1c1c"}}/>
            </div>
          ))}
          {error&&<div style={{fontSize:13,color:"#dc2626",marginBottom:12,background:"#fef2f2",padding:"8px 12px",borderRadius:8}}>{error}</div>}
          <button onClick={submit} disabled={loading||!email||!password}
            style={{width:"100%",padding:13,background:loading?"#ccc":"#1c1c1c",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
            {loading?"…":mode==="login"?"Sign In →":"Create Account →"}
          </button>
          <div style={{textAlign:"center",marginTop:14,fontSize:13,color:"#aaa"}}>
            {mode==="login"?"No account? ":"Have one? "}
            <span style={{color:"#2563eb",cursor:"pointer",fontWeight:600}} onClick={()=>{setMode(m=>m==="login"?"signup":"login");setError("");}}>
              {mode==="login"?"Sign up":"Log in"}
            </span>
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── Reusable problem block ───────────────────────────────────────────────────
function TopicBlock({topic, doneMap, onToggle, progMap, onToggleProg, notesMap, onNote, showDiff, expanded, onExpand}) {
  const cnt = topic.problems.filter(p=>doneMap[p.id]).length;
  const isOpen = expanded;
  return (
    <div className="tblock">
      <div className="thdr" onClick={onExpand}>
        <div className="tinfo"><div className="tname">{topic.label}</div>{topic.level&&<div className="tlvl">{topic.level}</div>}</div>
        <div className="tr_">
          <div className="tmbar"><div className="tmfill" style={{width:`${(cnt/topic.problems.length)*100}%`,background:topic.accent}}/></div>
          <div className="tct">{cnt}/{topic.problems.length}</div>
          <div className="tch" style={{transform:isOpen?"rotate(180deg)":"rotate(0)"}}>▼</div>
        </div>
      </div>
      {isOpen && <div className="plist">{topic.problems.map(p=>{
        const isDone=!!doneMap[p.id]; const isProg=progMap&&!!progMap[p.id]&&!isDone; const hasNote=notesMap&&!!(notesMap[p.id]?.trim());
        return (
          <div key={p.id} className={`pitem${isDone?" done":""}`}>
            <button className={`cb${isDone?" on":""}`} onClick={()=>onToggle(p.id)}>{isDone?"✓":""}</button>
            {progMap&&<button className={`pb${isProg?" on":""}`} onClick={()=>onToggleProg(p.id)}>{isProg?"~":""}</button>}
            <span className="pname" style={{textDecoration:isDone?"line-through":"none"}}>{p.name}</span>
            {p.tag&&<span className="ptag">{p.tag}</span>}
            {showDiff&&p.difficulty&&<span className="dchip" style={{color:DIFF_STYLE[p.difficulty].color,background:DIFF_STYLE[p.difficulty].bg}}>{p.difficulty}</span>}
            {notesMap&&<button className={`nbtn${hasNote?" has":""}`} onClick={()=>onNote(p.id)}>✎</button>}
            <a className="lc" href={p.leetcode||p.link} target="_blank" rel="noreferrer">↗</a>
          </div>
        );
      })}</div>}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function AlgoVault() {
  const [user,setUser]=useState(null); const [authChecked,setAuthChecked]=useState(false);
  const [syncing,setSyncing]=useState(false); const [lastSaved,setLastSaved]=useState(null);
  const [done,setDone]=useState({}); const [inProgress,setInProgress]=useState({});
  const [notes,setNotes]=useState({}); const [streak,setStreak]=useState(EMPTY_STREAK);
  const [adsDone,setAdsDone]=useState({}); const [bankDone,setBankDone]=useState({});
  const [companyStatus,setCompanyStatus]=useState({}); const [ocStatus,setOcStatus]=useState({});
  const [dayStatus,setDayStatus]=useState({});
  const [page,setPage]=useState("home");
  const [topicExp,setTopicExp]=useState({arrays:true,trees:false,hashmap:false,bsearch:false});
  const [adsExp,setAdsExp]=useState({});
  const [bankExp,setBankExp]=useState({});
  const [noteOpen,setNoteOpen]=useState(null); const [noteText,setNoteText]=useState("");
  const [filterDiff,setFilterDiff]=useState("All"); const [bankFilter,setBankFilter]=useState("All");
  const [compFilter,setCompFilter]=useState("All");
  const saveTimer=useRef(null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user??null);setAuthChecked(true);});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,session)=>setUser(session?.user??null));
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!user)return;
    (async()=>{
      setSyncing(true);
      const {data}=await supabase.from("progress").select("*").eq("user_id",user.id).single();
      if(data){
        setDone(data.done||{}); setInProgress(data.in_progress||{});
        setNotes(data.notes||{}); setStreak(data.streak||EMPTY_STREAK);
        setAdsDone(data.ads_done||{}); setBankDone(data.bank_done||{});
        setCompanyStatus(data.company_status||{}); setOcStatus(data.oc_status||{});
        setDayStatus(data.day_status||{});
        // Pre-populate bank done from init values if first time
        if(!data.bank_done){
          const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});
          setBankDone(init);
        }
      } else {
        const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});
        setBankDone(init);
      }
      setSyncing(false);
    })();
  },[user]);

  const persist=useCallback((d,ip,n,s,ad,bd,cs,oc,ds)=>{
    if(!user)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      setSyncing(true);
      await supabase.from("progress").upsert({
        user_id:user.id,done:d,in_progress:ip,notes:n,streak:s,
        ads_done:ad,bank_done:bd,company_status:cs,oc_status:oc,day_status:ds,
        updated_at:new Date().toISOString(),
      },{onConflict:"user_id"});
      setSyncing(false);setLastSaved(new Date());
    },800);
  },[user]);

  const allProblems=TOPICS.flatMap(t=>t.problems);
  const allAds=ADS_TOPICS.flatMap(t=>t.problems);
  const totalDone=Object.values(done).filter(Boolean).length;
  const totalAdsDone=Object.values(adsDone).filter(Boolean).length;
  const totalBankDone=Object.values(bankDone).filter(Boolean).length;
  const totalInProg=allProblems.filter(p=>inProgress[p.id]&&!done[p.id]).length;

  const bumpStreak=(d,ip,n,s,ad,bd,cs,oc,ds)=>{
    const ts=today(); const hist=s.history||[];
    if(hist.includes(ts))return s;
    const yest=new Date(Date.now()-DAY_MS).toDateString();
    const nc=s.last===yest?s.count+1:s.last===ts?s.count:1;
    return{count:nc,last:ts,history:[...hist,ts].slice(-30)};
  };

  const markDone=(id)=>{
    const nowDone=!done[id]; const nd={...done,[id]:nowDone};
    let ns=streak;
    if(nowDone)ns=bumpStreak(nd,inProgress,notes,streak,adsDone,bankDone,companyStatus,ocStatus,dayStatus);
    setDone(nd);if(nowDone)setStreak(ns);
    persist(nd,inProgress,notes,ns,adsDone,bankDone,companyStatus,ocStatus,dayStatus);
  };
  const markProg=(id)=>{const np={...inProgress,[id]:!inProgress[id]};setInProgress(np);persist(done,np,notes,streak,adsDone,bankDone,companyStatus,ocStatus,dayStatus);};
  const markAdsDone=(id)=>{const na={...adsDone,[id]:!adsDone[id]};setAdsDone(na);persist(done,inProgress,notes,streak,na,bankDone,companyStatus,ocStatus,dayStatus);};
  const markBankDone=(id)=>{const nb={...bankDone,[id]:!bankDone[id]};setBankDone(nb);persist(done,inProgress,notes,streak,adsDone,nb,companyStatus,ocStatus,dayStatus);};
  const setCompStat=(name,st)=>{const nc={...companyStatus,[name]:st};setCompanyStatus(nc);persist(done,inProgress,notes,streak,adsDone,bankDone,nc,ocStatus,dayStatus);};
  const setOcStat=(id,st)=>{const no={...ocStatus,[id]:st};setOcStatus(no);persist(done,inProgress,notes,streak,adsDone,bankDone,companyStatus,no,dayStatus);};
  const setDayStat=(date,st)=>{const nd={...dayStatus,[date]:st};setDayStatus(nd);persist(done,inProgress,notes,streak,adsDone,bankDone,companyStatus,ocStatus,nd);};
  const openNote=(id)=>{setNoteOpen(id);setNoteText(notes[id]||"");};
  const saveNote=()=>{if(!noteOpen)return;const nn={...notes,[noteOpen]:noteText};setNotes(nn);persist(done,inProgress,nn,streak,adsDone,bankDone,companyStatus,ocStatus,dayStatus);setNoteOpen(null);};
  const signOut=async()=>{await supabase.auth.signOut();setUser(null);};

  const last7=Array.from({length:7},(_,i)=>{const d=new Date(Date.now()-(6-i)*DAY_MS).toDateString();return{d,active:(streak.history||[]).includes(d)};});

  const bankByPattern=BANK_PATTERNS.map(pat=>({
    id:"bp_"+pat.replace(/\W/g,"_"), label:pat, accent:"#2563eb",
    problems:BANK.filter(q=>q.pattern===pat).map(q=>({...q,tag:q.pattern,difficulty:q.diff}))
  }));

  if(!authChecked)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa",fontFamily:"sans-serif"}}>Loading…</div>;
  if(!user)return<AuthScreen onAuth={setUser}/>;

  const NAV=[["home","🏠 Home"],["tracker","DSA Tracker"],["ads","ADS Subject"],["bank","Question Bank"],["daily","Daily Plan"],["plan","Placement Intel"],["stats","Stats"]];

  return (
    <div style={{minHeight:"100vh",background:"#fafaf9",color:"#1c1c1c",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#f0f0ef} ::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}
        .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,250,249,.94);backdrop-filter:blur(12px);border-bottom:1px solid #e8e5e0}
        .nav-in{max-width:1120px;margin:0 auto;padding:0 24px;height:54px;display:flex;align-items:center;justify-content:space-between;gap:8px}
        .logo{font-family:'Playfair Display',serif;font-size:18px;font-weight:900;cursor:pointer;letter-spacing:-.5px;flex-shrink:0}
        .logo span{color:#2563eb}
        .nav-c{display:flex;gap:2px;overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none}
        .nav-c::-webkit-scrollbar{display:none}
        .nl{padding:5px 11px;border-radius:7px;font-size:12px;font-weight:500;color:#666;cursor:pointer;border:none;background:transparent;font-family:'DM Sans';white-space:nowrap;transition:all .15s}
        .nl:hover{color:#1c1c1c;background:#f0ede8} .nl.on{color:#1c1c1c;background:#ece9e4;font-weight:600}
        .nav-r{display:flex;align-items:center;gap:8px;flex-shrink:0}
        .sdot{width:6px;height:6px;border-radius:50%;background:#059669;flex-shrink:0}
        .sdot.sy{background:#d97706;animation:pulse 1s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .soBtn{font-size:11px;color:#aaa;background:transparent;border:1px solid #e8e5e0;border-radius:6px;padding:4px 10px;cursor:pointer;font-family:'DM Sans'}
        .soBtn:hover{color:#dc2626;border-color:#dc2626}
        .page{padding-top:54px}
        .inner{max-width:1120px;margin:0 auto;padding:36px 24px}
        .stitle{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;letter-spacing:-.5px;margin-bottom:20px}
        .card{background:#fff;border:1px solid #e8e5e0;border-radius:13px;padding:22px;margin-bottom:14px}
        .tblock{background:#fff;border:1px solid #e8e5e0;border-radius:12px;margin-bottom:10px;overflow:hidden}
        .thdr{display:flex;align-items:center;padding:15px 18px;cursor:pointer;gap:10px;transition:background .12s}
        .thdr:hover{background:#fafaf9}
        .tinfo{flex:1} .tname{font-size:13px;font-weight:600} .tlvl{font-size:10px;color:#bbb;margin-top:1px}
        .tr_{display:flex;align-items:center;gap:8px}
        .tmbar{width:48px;height:3px;background:#f0ede8;border-radius:2px;overflow:hidden}
        .tmfill{height:100%;border-radius:2px}
        .tct{font-size:11px;color:#bbb;min-width:28px;text-align:right}
        .tch{font-size:9px;color:#ccc;transition:transform .2s}
        .plist{border-top:1px solid #f5f3f0}
        .pitem{display:flex;align-items:center;padding:10px 18px;gap:8px;border-bottom:1px solid #f9f7f5;transition:background .1s}
        .pitem:last-child{border-bottom:none} .pitem:hover{background:#fafaf9} .pitem.done{opacity:.38}
        .cb{width:15px;height:15px;border-radius:4px;border:1.5px solid #ddd;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:8px;color:transparent;transition:all .12s}
        .cb.on{background:#2563eb;border-color:#2563eb;color:#fff}
        .pb{width:15px;height:15px;border-radius:4px;border:1.5px dashed #ddd;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:8px;color:#ccc;transition:all .12s}
        .pb.on{border-color:#d97706;border-style:solid;color:#d97706}
        .pname{flex:1;font-size:12px;color:#333}
        .ptag{font-size:10px;color:#bbb;background:#f5f3f0;padding:2px 6px;border-radius:4px;white-space:nowrap}
        .dchip{font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;white-space:nowrap}
        .nbtn{width:20px;height:20px;border-radius:5px;border:1.5px solid #e8e5e0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:9px;color:#bbb;flex-shrink:0;transition:all .12s}
        .nbtn:hover{border-color:#aaa;color:#555} .nbtn.has{border-color:#f9ca24;color:#d97706;background:#fffbeb}
        .lc{width:20px;height:20px;border-radius:5px;border:1.5px solid #e8e5e0;display:flex;align-items:center;justify-content:center;font-size:9px;color:#bbb;text-decoration:none;flex-shrink:0;transition:all .12s}
        .lc:hover{border-color:#f97316;color:#f97316}
        .ovbar{background:#fff;border:1px solid #e8e5e0;border-radius:12px;padding:18px;margin-bottom:16px}
        .ovbg{height:6px;background:#f0ede8;border-radius:3px}
        .filts{display:flex;gap:4px;flex-wrap:wrap}
        .fb{padding:4px 11px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:1.5px solid #e8e5e0;background:#fff;color:#666;font-family:'DM Sans';transition:all .15s}
        .fb.on{background:#1c1c1c;color:#fff;border-color:#1c1c1c}
        .moverlay{position:fixed;inset:0;background:rgba(0,0,0,.25);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.1)}
        .mta{width:100%;height:110px;border:1.5px solid #e8e5e0;border-radius:8px;padding:10px;font-size:13px;font-family:'DM Sans';resize:none;outline:none;line-height:1.6;color:#333;background:#fafaf9}
        .mta:focus{border-color:#2563eb;background:#fff}
        .macts{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
        .mc{padding:7px 13px;border:1.5px solid #e8e5e0;border-radius:7px;background:transparent;font-size:12px;cursor:pointer;color:#666;font-family:'DM Sans'}
        .ms{padding:7px 15px;border:none;border-radius:7px;background:#1c1c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans'}
        .stat-sel{font-size:11px;border:1.5px solid #e8e5e0;border-radius:5px;padding:2px 5px;background:#fff;font-family:'DM Sans';cursor:pointer;color:#666;outline:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .4s ease both} .fu2{animation:fadeUp .4s ease .07s both} .fu3{animation:fadeUp .4s ease .14s both}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-in">
          <div className="logo" onClick={()=>setPage("home")}>Algo<span>Vault</span></div>
          <div className="nav-c">
            {NAV.map(([id,lbl])=>(
              <button key={id} className={`nl${page===id?" on":""}`} onClick={()=>setPage(id)}>{lbl}</button>
            ))}
          </div>
          <div className="nav-r">
            <div className={`sdot${syncing?" sy":""}`} title={syncing?"Saving…":lastSaved?`Saved ${lastSaved.toLocaleTimeString()}`:"Synced"}/>
            <button className="soBtn" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="page">

        {/* ── HOME ── */}
        {page==="home" && (
          <div className="inner">
            <div style={{paddingTop:24,paddingBottom:32}}>
              <div className="fu" style={{fontSize:11,fontWeight:600,color:"#2563eb",background:"#eff6ff",padding:"3px 11px",borderRadius:20,display:"inline-block",marginBottom:20}}>📌 Tushar's Placement Command Center</div>
              <h1 className="fu2" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(34px,5vw,58px)",fontWeight:900,lineHeight:1.06,letterSpacing:-2}}>One vault.<br /><span style={{color:"#2563eb"}}>Everything</span> you need.</h1>
              <p className="fu3" style={{fontSize:15,color:"#777",marginTop:14,maxWidth:400,lineHeight:1.65,fontWeight:300}}>DSA grind, ADS subject, placement intel, daily plan — all in one place, synced everywhere.</p>
              <div className="fu3" style={{marginTop:24,display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["tracker","DSA Tracker"],["bank","Question Bank"],["daily","Daily Plan"],["plan","Placement Intel"]].map(([p,l])=>(
                  <button key={p} onClick={()=>setPage(p)}
                    style={{padding:"9px 18px",background:p==="tracker"?"#1c1c1c":"transparent",color:p==="tracker"?"#fff":"#555",border:p==="tracker"?"none":"1.5px solid #ddd",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
                    {l} →
                  </button>
                ))}
              </div>
            </div>

            {/* stat cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:16}}>
              {[
                {l:"DSA Solved",v:totalDone,t:TOPICS.flatMap(t=>t.problems).length,c:"#2563eb"},
                {l:"ADS Solved",v:totalAdsDone,t:allAds.length,c:"#059669"},
                {l:"Bank Solved",v:totalBankDone,t:BANK.length,c:"#9333ea"},
                {l:"Day Streak 🔥",v:streak.count,c:"#d97706"},
                {l:"Applied",v:Object.values(ocStatus).filter(s=>s&&s!=="Not Applied").length,c:"#dc2626"},
                {l:"Offers 🎉",v:Object.values(companyStatus).filter(s=>s==="Offered").length,c:"#059669"},
              ].map(({l,v,t,c})=>(
                <div key={l} className="card" style={{padding:"16px 18px"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,color:c,lineHeight:1}}>
                    {v}{t?<span style={{fontSize:14,color:"#ddd",fontWeight:400}}>/{t}</span>:""}
                  </div>
                  <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{l}</div>
                  {t&&<div style={{height:3,background:"#f0ede8",borderRadius:2,marginTop:8}}><div style={{height:"100%",width:`${(v/t)*100}%`,background:c,borderRadius:2}}/></div>}
                </div>
              ))}
            </div>

            {/* quick roadmap summary */}
            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>📚 Study Roadmap — What's Next</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {ROADMAP.slice(0,8).map(r=>(
                  <div key={r.topic} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <div style={{width:80,fontSize:11,color:"#aaa",flexShrink:0,paddingTop:1}}>{r.timeline}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:r.done?"#aaa":"#1c1c1c",textDecoration:r.done?"line-through":"none"}}>{r.topic}</div>
                      <div style={{fontSize:11,color:"#bbb"}}>{r.what}</div>
                    </div>
                  </div>
                ))}
                <div style={{fontSize:11,color:"#2563eb",cursor:"pointer",marginTop:4}} onClick={()=>setPage("tracker")}>See full tracker →</div>
              </div>
            </div>
          </div>
        )}

        {/* ── DSA TRACKER ── */}
        {page==="tracker" && (
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <div className="stitle" style={{marginBottom:0}}>DSA Tracker</div>
              <div className="filts">{["All","Easy","Medium","Hard"].map(f=><button key={f} className={`fb${filterDiff===f?" on":""}`} onClick={()=>setFilterDiff(f)}>{f}</button>)}</div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <span style={{fontSize:12,fontWeight:500,color:"#666"}}>{totalDone} of {TOPICS.flatMap(t=>t.problems).length} solved</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalDone/TOPICS.flatMap(t=>t.problems).length)*100)}%</span>
              </div>
              <div className="ovbg"><div style={{height:"100%",width:`${(totalDone/TOPICS.flatMap(t=>t.problems).length)*100}%`,background:"#2563eb",borderRadius:3,transition:"width .6s"}}/></div>
            </div>
            {TOPICS.map(topic=>{
              const filtered=filterDiff==="All"?topic:{...topic,problems:topic.problems.filter(p=>p.difficulty===filterDiff)};
              if(filtered.problems.length===0)return null;
              return <TopicBlock key={topic.id} topic={filtered} doneMap={done} onToggle={markDone}
                progMap={inProgress} onToggleProg={markProg} notesMap={notes} onNote={openNote}
                showDiff={true} expanded={!!topicExp[topic.id]} onExpand={()=>setTopicExp(e=>({...e,[topic.id]:!e[topic.id]}))} />;
            })}
            <div style={{fontSize:10,color:"#ccc",marginTop:14,display:"flex",gap:14}}>✓ solved · ~ in progress · ✎ notes · ↗ leetcode</div>
          </div>
        )}

        {/* ── ADS SUBJECT ── */}
        {page==="ads" && (
          <div className="inner">
            <div style={{marginBottom:18}}>
              <div className="stitle" style={{marginBottom:4}}>ADS Subject Plan</div>
              <div style={{fontSize:11,color:"#aaa"}}>Algorithm Design & Structures — ST1 Question Bank · {totalAdsDone}/{allAds.length} done</div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <span style={{fontSize:12,color:"#666"}}>{totalAdsDone} of {allAds.length}</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalAdsDone/allAds.length)*100)}%</span>
              </div>
              <div className="ovbg"><div style={{height:"100%",width:`${(totalAdsDone/allAds.length)*100}%`,background:"#059669",borderRadius:3,transition:"width .6s"}}/></div>
            </div>
            {ADS_TOPICS.map(topic=>(
              <TopicBlock key={topic.id} topic={topic} doneMap={adsDone} onToggle={markAdsDone}
                showDiff={false} expanded={!!adsExp[topic.id]} onExpand={()=>setAdsExp(e=>({...e,[topic.id]:!e[topic.id]}))} />
            ))}
          </div>
        )}

        {/* ── QUESTION BANK ── */}
        {page==="bank" && (
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <div>
                <div className="stitle" style={{marginBottom:4}}>Placement Question Bank</div>
                <div style={{fontSize:11,color:"#aaa"}}>50 most asked problems · Pattern-wise · {totalBankDone}/50 done</div>
              </div>
              <div className="filts">
                {["All",...BANK_PATTERNS].map(f=>(
                  <button key={f} className={`fb${bankFilter===f?" on":""}`} onClick={()=>setBankFilter(f)} style={{fontSize:10}}>{f}</button>
                ))}
              </div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <span style={{fontSize:12,color:"#666"}}>{totalBankDone} of 50</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalBankDone/50)*100)}%</span>
              </div>
              <div className="ovbg"><div style={{height:"100%",width:`${(totalBankDone/50)*100}%`,background:"#9333ea",borderRadius:3,transition:"width .6s"}}/></div>
            </div>
            {bankByPattern.filter(g=>bankFilter==="All"||g.label===bankFilter).map(group=>(
              <TopicBlock key={group.id} topic={group} doneMap={bankDone} onToggle={markBankDone}
                showDiff={true} expanded={!!bankExp[group.id]} onExpand={()=>setBankExp(e=>({...e,[group.id]:!e[group.id]}))} />
            ))}
          </div>
        )}

        {/* ── DAILY PLAN ── */}
        {page==="daily" && (
          <div className="inner">
            <div style={{marginBottom:18}}>
              <div className="stitle" style={{marginBottom:4}}>Daily Prep Plan</div>
              <div style={{fontSize:11,color:"#aaa"}}>Mar 23 – May 10 · 3–4 problems/day · Morning + Evening · Ignore dates, follow the sequence</div>
            </div>

            {/* week labels */}
            {[
              {label:"Week 1",focus:"Stack + Queue + Linked List",days:DAILY_PLAN.slice(0,7)},
              {label:"Week 2",focus:"Backtracking + Linked List",days:DAILY_PLAN.slice(7,14)},
              {label:"Week 3",focus:"Graphs + Start DP",days:DAILY_PLAN.slice(14,21)},
              {label:"Week 4",focus:"DP + Heap",days:DAILY_PLAN.slice(21,24)},
              {label:"Week 5",focus:"Greedy + Pictorial Aptitude",days:DAILY_PLAN.slice(24,27)},
              {label:"Week 5–6",focus:"Advanced SQL",days:DAILY_PLAN.slice(27,31)},
              {label:"Week 6–7",focus:"System Design + OOPS + Java",days:DAILY_PLAN.slice(31,36)},
              {label:"Week 7–8",focus:"Mock Tests + Apply heavily",days:DAILY_PLAN.slice(36,48)},
            ].map(week=>(
              <div key={week.label} style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:900}}>{week.label}</div>
                  <div style={{fontSize:11,color:"#aaa",background:"#f5f3f0",padding:"2px 8px",borderRadius:5}}>{week.focus}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {week.days.map(d=>{
                    const st=dayStatus[d.date]||"";
                    const stColor={done:"#059669",partial:"#d97706",skip:"#dc2626"}[st]||"#ccc";
                    return (
                      <div key={d.date} className="card" style={{padding:"13px 16px",display:"flex",gap:14,alignItems:"flex-start",borderLeft:`3px solid ${stColor}`}}>
                        <div style={{flexShrink:0,textAlign:"center",minWidth:42}}>
                          <div style={{fontSize:11,fontWeight:700,color:"#1c1c1c"}}>{d.date}</div>
                          <div style={{fontSize:10,color:"#bbb"}}>{d.day}</div>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:11,color:"#888",marginBottom:5}}>🌅 {d.morning}</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                            {[d.p1,d.p2].filter(Boolean).map((p,i)=>(
                              <span key={i} style={{fontSize:11,background:"#f0ede8",padding:"2px 8px",borderRadius:5,color:"#555"}}>{p}</span>
                            ))}
                          </div>
                          <div style={{fontSize:11,color:"#888",marginTop:5}}>🌆 {d.evening}</div>
                        </div>
                        <select className="stat-sel" value={st} onChange={e=>setDayStat(d.date,e.target.value)}
                          style={{flexShrink:0,borderColor:st?stColor+"66":"#e8e5e0",color:st?stColor:"#aaa"}}>
                          <option value="">Status</option>
                          <option value="done">✅ Done</option>
                          <option value="partial">🔄 Partial</option>
                          <option value="skip">❌ Skip</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PLACEMENT INTEL ── */}
        {page==="plan" && (
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <div>
                <div className="stitle" style={{marginBottom:4}}>Placement Intel</div>
                <div style={{fontSize:11,color:"#aaa"}}>Chitkara predicted companies · Mar–May 2026</div>
              </div>
              <div className="filts">
                {["All","Very High","High","Medium"].map(f=>(
                  <button key={f} className={`fb${compFilter===f?" on":""}`} onClick={()=>setCompFilter(f)}>{f}</button>
                ))}
              </div>
            </div>

            {/* On-campus */}
            <div style={{fontWeight:600,fontSize:13,marginBottom:10,color:"#555"}}>🎯 On-Campus Predictions</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,marginBottom:24}}>
              {COMPANIES.filter(c=>compFilter==="All"||(compFilter==="Very High"&&c.likelihood.includes("Very High"))||(compFilter==="High"&&c.likelihood.includes("High 🟡"))||(compFilter==="Medium"&&c.likelihood.includes("Medium"))).map(c=>{
                const st=companyStatus[c.name]||"";
                return (
                  <div key={c.name} className="card" style={{padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:8}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600}}>{c.name}</div>
                        <div style={{fontSize:10,color:"#aaa",marginTop:2}}>{c.months}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#059669"}}>₹{c.ctc}L</div>
                        <select className="stat-sel" value={st} onChange={e=>setCompStat(c.name,e.target.value)}
                          style={{borderColor:st?STATUS_COLORS[st]+"66":"#e8e5e0",color:st?STATUS_COLORS[st]:"#aaa"}}>
                          <option value="">Track</option>
                          {Object.keys(STATUS_COLORS).map(s=><option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{height:4,background:"#f0ede8",borderRadius:2,marginBottom:8}}>
                      <div style={{height:"100%",width:`${c.score}%`,background:c.score>=80?"#2563eb":c.score>=60?"#d97706":"#9333ea",borderRadius:2}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <span style={{fontSize:10,color:"#555",background:"#f5f3f0",padding:"2px 7px",borderRadius:4}}>{c.likelihood}</span>
                      <span style={{fontSize:10,color:"#aaa"}}>{c.score}/100</span>
                    </div>
                    <div style={{fontSize:11,color:"#666",background:"#f9f7f5",padding:"5px 8px",borderRadius:6}}><span style={{fontWeight:600}}>Prep: </span>{c.focus}</div>
                  </div>
                );
              })}
            </div>

            {/* Off-campus */}
            <div style={{fontWeight:600,fontSize:13,marginBottom:10,color:"#555"}}>💼 Off-Campus Tracker <span style={{fontSize:10,color:"#aaa",fontWeight:400}}>— apply 3–5/day</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {OFF_CAMPUS.map(oc=>{
                const st=ocStatus[oc.id]||"";
                return (
                  <div key={oc.id} className="card" style={{padding:"11px 16px",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600}}>{oc.company}</div>
                      <div style={{fontSize:11,color:"#aaa"}}>{oc.role} · {oc.platform}</div>
                    </div>
                    <select className="stat-sel" value={st} onChange={e=>setOcStat(oc.id,e.target.value)}
                      style={{borderColor:st&&STATUS_COLORS[st]?STATUS_COLORS[st]+"66":"#e8e5e0",color:st&&STATUS_COLORS[st]?STATUS_COLORS[st]:"#aaa"}}>
                      <option value="">Not Applied</option>
                      {Object.keys(STATUS_COLORS).map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STATS ── */}
        {page==="stats" && (
          <div className="inner">
            <div className="stitle">Your Stats</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
              {[
                {l:"DSA Solved",v:totalDone,t:allProblems.length,c:"#2563eb"},
                {l:"ADS Solved",v:totalAdsDone,t:allAds.length,c:"#059669"},
                {l:"Bank Done",v:totalBankDone,t:50,c:"#9333ea"},
                {l:"Streak 🔥",v:streak.count,c:"#d97706"},
                {l:"In Progress",v:totalInProg,c:"#555"},
                {l:"Offers 🎉",v:Object.values(companyStatus).filter(s=>s==="Offered").length,c:"#059669"},
              ].map(({l,v,t,c})=>(
                <div key={l} className="card" style={{padding:18}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,color:c,lineHeight:1}}>
                    {v}{t?<span style={{fontSize:13,color:"#ddd",fontWeight:400}}>/{t}</span>:""}
                  </div>
                  <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>Last 7 Days</div>
              <div style={{display:"flex",gap:8}}>
                {last7.map(({d,active},i)=>{
                  const lbl=["Su","Mo","Tu","We","Th","Fr","Sa"][new Date(d).getDay()];
                  return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                    <div style={{width:24,height:24,borderRadius:6,background:active?"#2563eb":"#f0ede8",transition:"all .2s"}}/>
                    <div style={{fontSize:10,color:"#bbb"}}>{lbl}</div>
                  </div>;
                })}
              </div>
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>Daily Plan Progress</div>
              {[["done","✅ Done","#059669"],["partial","🔄 Partial","#d97706"],["skip","❌ Skip","#dc2626"]].map(([k,l,c])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{width:60,fontSize:12,color:c,fontWeight:500}}>{l}</div>
                  <div style={{flex:1,height:5,background:"#f0ede8",borderRadius:3}}>
                    <div style={{height:"100%",width:`${(Object.values(dayStatus).filter(s=>s===k).length/DAILY_PLAN.length)*100}%`,background:c,borderRadius:3}}/>
                  </div>
                  <div style={{fontSize:11,color:"#aaa",width:40,textAlign:"right"}}>{Object.values(dayStatus).filter(s=>s===k).length}/{DAILY_PLAN.length}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>DSA by Difficulty</div>
              {["Easy","Medium","Hard"].map(d=>{
                const all=allProblems.filter(p=>p.difficulty===d); const s=all.filter(p=>done[p.id]).length;
                return <div key={d} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{width:52,fontSize:12,fontWeight:500,color:DIFF_STYLE[d].color}}>{d}</div>
                  <div style={{flex:1,height:5,background:"#f0ede8",borderRadius:3}}><div style={{height:"100%",width:`${(s/all.length)*100}%`,background:DIFF_STYLE[d].color,borderRadius:3}}/></div>
                  <div style={{fontSize:11,color:"#aaa",width:34,textAlign:"right"}}>{s}/{all.length}</div>
                </div>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* NOTE MODAL */}
      {noteOpen&&(()=>{
        const prob=allProblems.find(p=>p.id===noteOpen);
        return <div className="moverlay" onClick={saveNote}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>Notes — {prob?.name}</div>
            <div style={{fontSize:11,color:"#aaa",marginBottom:11}}>Approach, edge cases, complexity…</div>
            <textarea className="mta" value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Write your notes here..." autoFocus/>
            <div className="macts">
              <button className="mc" onClick={()=>setNoteOpen(null)}>Cancel</button>
              <button className="ms" onClick={saveNote}>Save</button>
            </div>
          </div>
        </div>;
      })()}
    </div>
  );
}