import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DRIVES = [{"co":"Sprinkle Data","dt":"17 Mar 2023","role":"Data Analyst","loc":"Bangalore","ctc":7.5,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Iztri","dt":"17 Mar 2023","role":"Front end Developer","loc":"Bangalore","ctc":6.0,"stip":15,"placed":null,"rem":"2024 Startup and 10hr Office","type":"Startup"},{"co":"JP Morgan Chase (Pool Hiring)","dt":"24 Mar 2024","role":"Summer Internship","loc":"Bangalore, Mumbai","ctc":19.8,"stip":75,"placed":6,"rem":"Intership on the Basis of Hackathon (Full Day Hackathon On Site)","type":"MnC"},{"co":"Microsoft (Pool Hiring)","dt":"23 Aug 2024","role":"Summer Internship -Software Developer","loc":"Bangalore, Hyderabad","ctc":50.0,"stip":125,"placed":3,"rem":"Top 100 Students CGPA Sorted (Batch 22 - Above 9.4)","type":"MnC"},{"co":"UiPath (Only Female Students)","dt":"23 Aug 2024","role":"Summer Internship","loc":"Bangalore","ctc":null,"stip":150,"placed":null,"rem":"Very Tough Questions","type":"MnC"},{"co":"Microsoft (Pool Hiring)","dt":"17 Sep 2024","role":"Summer Internship - Tech Consultant","loc":"Bangalore, Hyderabad","ctc":null,"stip":25,"placed":2,"rem":"","type":"MnC"},{"co":"Google (Off Campus - Diversity Hiring)","dt":"28 Sep 2024","role":"Summer Internship","loc":"Bangalore","ctc":null,"stip":125,"placed":1,"rem":"Under Google Girl Program","type":"MnC"},{"co":"Service Now (Only Female Students)","dt":"15 Nov 2024","role":"Associate Software Engineer","loc":"Hyderabad","ctc":43.0,"stip":89,"placed":6,"rem":"Very Easy to Crack (Just Asked Basic Puzzles, Basic OOPS and Basic Coding Ques)","type":"MnC"},{"co":"JP Morgan Chase (2nd Time)","dt":"03 Jan 2025","role":"Software Engineering Program","loc":"Bangalore, Mumbai","ctc":19.8,"stip":75,"placed":2,"rem":"CGPA Based Sorting (Above 8.5) - A Tip please submit your paper after 30 minutes no matter you did it early or took the whole time 2 from 4th year were selected and 7 for Summer Internship","type":"MnC"},{"co":"Service Now (Only Female Students)","dt":"15 Jan 2025","role":"Software Engineer Intern","loc":"Bangalore, Gurugram","ctc":15.0,"stip":40,"placed":28,"rem":"Based on 10th and 12th Boards (85 + Average)","type":"MnC"},{"co":"Fico","dt":"15 Jan 2025","role":"Devops Engineering Enablement - Intern","loc":"Bangalore","ctc":11.2,"stip":30,"placed":2,"rem":"Selection on the Basis of Time Submission in an Virtual Open Book OA (Tab Switching and no Camera) - Very Bad Shortlisting","type":""},{"co":"Fico","dt":"15 Jan 2025","role":"Software Developer Intern","loc":"Bangalore","ctc":9.0,"stip":34,"placed":6,"rem":"LIterally They came to campus after 2 months they released their forms","type":""},{"co":"Orange Business","dt":"15 Jan 2025","role":"Software Engineer Intern","loc":"Gurugram","ctc":8.0,"stip":20,"placed":7,"rem":"Easy Interview, Might increase the CTC if you are selected","type":"MnC"},{"co":"PlaySimple Games","dt":"15 Jan 2025","role":"Associate Software Engineer","loc":"Bangalore","ctc":14.0,"stip":30,"placed":2,"rem":"Based on 10th and 12th Boards (80+ Both)","type":"Startup"},{"co":"Optmyzr","dt":"17 Jan 2025","role":"Software Development Engineer Testing","loc":"Hyderabad","ctc":30.0,"stip":35,"placed":null,"rem":"Weired Luck Based Process No Offer After HR Round Literally Ghosted After that","type":"MnC"},{"co":"Optmyzr","dt":"17 Jan 2025","role":"Software Development Engineer","loc":"Hyderabad","ctc":35.0,"stip":45,"placed":null,"rem":"Weired Luck Based Process No Offer After HR Round Literally Ghosted After that","type":"MnC"},{"co":"Neilsen (2nd Time)","dt":"18 Jan 2025","role":"Software Engineer Intern","loc":"Bangalore","ctc":15.0,"stip":40,"placed":24,"rem":"Based on 10th and 12th Boards (85+ Average)","type":"MnC"},{"co":"Invoice Cloud","dt":"21 Jan 2025","role":"Trainee Software Engineer","loc":"Hyderabad","ctc":8.0,"stip":40,"placed":10,"rem":"Majorily Development Based","type":"International Startup"},{"co":"Otipy","dt":"23 Jan 2025","role":"Software Developer Intern","loc":"Gurugram","ctc":12.0,"stip":25,"placed":6,"rem":"Based on 10th and 12th Boards (90+ Average)","type":"Startup"},{"co":"Juspay","dt":"23 Jan 2025","role":"Software Developer Engineering","loc":"Bangalore","ctc":27.0,"stip":40,"placed":4,"rem":"Harshpreet (Lets Help Co Founder) Got Placed in it","type":"MnC"},{"co":"Juspay","dt":"23 Jan 2025","role":"Product Engineer","loc":"Bangalore","ctc":21.0,"stip":40,"placed":1,"rem":"One of the Toughest Companies to Crack in Chitkara","type":"MnC"},{"co":"Telaverge Communications","dt":"24 Jan 2025","role":"Software Engineer - Research and Development","loc":"Bangalore","ctc":7.0,"stip":20,"placed":1,"rem":"Self Projects Based","type":"International Startup"},{"co":"Vivnovation","dt":"24 Jan 2025","role":"Customer/Tech Support - Intern","loc":"Remote","ctc":20.0,"stip":15,"placed":10,"rem":"Call Center & Large gap b/w Stipend and CTC (Not good)","type":"Miscellaneous"},{"co":"Wissen Technology","dt":"26 Jan 2025","role":"Tech Intern","loc":"Bangalore","ctc":11.0,"stip":25,"placed":6,"rem":"Code on Pen and Paper in Coding Assessment","type":"International Startup"},{"co":"PlaySimple Games","dt":"27 Jan 2025","role":"Associate Business Analyst","loc":"Bangalore","ctc":14.0,"stip":30,"placed":3,"rem":"Based on 10th and 12th Boards (85+ Average), Tough Interviews.","type":"Startup"},{"co":"Pando","dt":"28 Jan 2025","role":"Business Development Respresentative","loc":"Chennai","ctc":8.0,"stip":25,"placed":null,"rem":"Company Ghosted","type":"International Startup"},{"co":"Caelius Consulting","dt":"03 Feb 2025","role":"Technical Associate","loc":"Mohali, Hyderabad","ctc":12.0,"stip":15,"placed":6,"rem":"Very Iffy Company with Undefined Role","type":"International Startup"},{"co":"Gokloud","dt":"05 Feb 2025","role":"Junior Full Stack Developer","loc":"Bangalore","ctc":9.0,"stip":25,"placed":9,"rem":"They hired 6 Girls 3 boys in which after 3 months they fired those 3 boys stating it as a performace issue but nobody knows the truth","type":"Startup"},{"co":"Guenstiger (eLitmus)","dt":"06 Feb 2025","role":"Software Engineer","loc":"Bangalore","ctc":10.0,"stip":33,"placed":5,"rem":"Easy Interview Questions","type":"Normal"},{"co":"WNS (Only For CSE AI)","dt":"08 Feb 2025","role":"Apprentice","loc":"Gurugram","ctc":6.7,"stip":35,"placed":6,"rem":"Easy to Crack (Medium OA and Easy Interview)","type":"MnC"},{"co":"Samsung Electro Mechanics","dt":"10 Feb 2025","role":"Software Developer Intern","loc":"Bangalore","ctc":10.0,"stip":35,"placed":null,"rem":"Employbility Scores 150+. (For Batch 2022 ) - Q3","type":"MnC"},{"co":"Phillips (Only Female Students)","dt":"12 Feb 2025","role":"Software Intern","loc":"Bangalore","ctc":11.5,"stip":45,"placed":10,"rem":"Diversity Hiring","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"Machine Learning","loc":"Bangalore","ctc":9.0,"stip":35,"placed":1,"rem":"Open For All","type":"MnC"},{"co":"Bajaj Finserv","dt":"13 Feb 2025","role":"Full Stack and Sales Force Intern","loc":"Pune","ctc":12.0,"stip":35,"placed":14,"rem":"Hackathon Based","type":"Normal"},{"co":"Techolution","dt":"13 Feb 2025","role":"Project Management Intern","loc":"Hyderabad","ctc":8.0,"stip":30,"placed":null,"rem":"","type":"International Startup"},{"co":"HelpShift","dt":"17 Feb 2025","role":"Technical Support and Implementation Engineer","loc":"Pune","ctc":8.5,"stip":35,"placed":5,"rem":"","type":"International Startup"},{"co":"CredResolve","dt":"17 Feb 2025","role":"Associate Product Manager Interns","loc":"Gurugram","ctc":7.0,"stip":15,"placed":1,"rem":"","type":"Startup"},{"co":"Increff","dt":"17 Feb 2025","role":"Professional Services Team","loc":"Bangalore","ctc":14.0,"stip":29,"placed":2,"rem":"Diveristy Hiring - Not Mentioned (107 Shortlisted in Batch 22 All are Femals)","type":"International Startup"},{"co":"Dell (Internship Only)","dt":"20 Feb 2025","role":"Data Engineer","loc":"Bangalore","ctc":null,"stip":35,"placed":1,"rem":"","type":"MnC"},{"co":"Ikarus 3D","dt":"20 Feb 2025","role":"Software Developer Associate","loc":"Mohali","ctc":12.0,"stip":20,"placed":4,"rem":"6 Hours Hackathon for building Web Project in Realtime","type":"Startup"},{"co":"Emerson (NI - National Instruments)","dt":"21 Feb 2025","role":"Software Engineer Intern","loc":"Bangalore","ctc":14.7,"stip":45,"placed":2,"rem":"Worst Placement Process","type":"MnC"},{"co":"Bajaj Finserv","dt":"25 Jul 2025","role":"Java Salesforce","loc":"Pune","ctc":12.0,"stip":35,"placed":null,"rem":"","type":"Normal"},{"co":"Unicommerce","dt":"17 Mar 2025","role":"Intern - Enterprise Onboarding","loc":"Gurugram","ctc":5.0,"stip":20,"placed":3,"rem":"","type":"Normal"},{"co":"HighRadius","dt":"26 Mar 2025","role":"Consulting","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":5,"rem":"","type":""},{"co":"HighRadius","dt":"26 Mar 2025","role":"S&M (Sales / Marketing)","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":6,"rem":"","type":""},{"co":"Josh Technology Group","dt":"19 Mar 2025","role":"Front end Developer","loc":"Gurugram","ctc":12.9,"stip":22,"placed":4,"rem":"","type":"Normal"},{"co":"MAQ Software","dt":"24 Mar 2025","role":"Associate Software Engineer","loc":"Noida","ctc":6.0,"stip":25,"placed":14,"rem":"","type":"MnC"},{"co":"WizCommerce","dt":"20 Mar 2025","role":"Product Management","loc":"Bangalore","ctc":6.0,"stip":20,"placed":1,"rem":"","type":"International Startup"},{"co":"Razorpay","dt":"19 Mar 2025","role":"Intern - Incident Analyst","loc":"Bangalore","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"Normal"},{"co":"Blinkit","dt":"30 May 2025","role":"Business Analyst Intern","loc":"Gurugram","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Leadsquared","dt":"03 Apr 2025","role":"KAM Intern","loc":"Bangalore, Noida","ctc":5.0,"stip":27,"placed":null,"rem":"","type":"Normal"},{"co":"Coding Ninjas","dt":"07 Aug 2025","role":"Business Development / Sales Intern","loc":"Gurugram","ctc":3.0,"stip":25,"placed":14,"rem":"","type":""},{"co":"Innovaccer","dt":"04 Aug 2025","role":"Growth Marketing Intern","loc":"Noida","ctc":6.5,"stip":20,"placed":null,"rem":"","type":""},{"co":"OYO Rooms","dt":"16 Jul 2025","role":"Graduate Trainee Business Analyst","loc":"Gurugram","ctc":9.0,"stip":40,"placed":1,"rem":"","type":"MnC"},{"co":"Autodesk","dt":"23 May 2025","role":"SDE","loc":"Bangalore, Pune","ctc":44.0,"stip":55,"placed":2,"rem":"Completely luck based. Asked basic questions on Memo and tabulations","type":"MnC"},{"co":"Morgan Stanley","dt":"24 Apr 2025","role":"Cyber Track Apprenticeship Program","loc":"Bangalore, Mumbai","ctc":null,"stip":87,"placed":9,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"Product Management Code","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Zeotap","dt":"09 Apr 2025","role":"Product Management Intern","loc":"Bangalore","ctc":12.0,"stip":65,"placed":null,"rem":"CGPA above 8.5","type":"MnC"},{"co":"1DigitalStack","dt":"22 Jul 2025","role":"Business Analyst Intern","loc":"Gurugram","ctc":6.6,"stip":21,"placed":11,"rem":"Finally this company came and took 11 people in single role","type":"International Startup"}];

const DRIVE_TYPES = ["All","MnC","Normal","Startup","International Startup","International","Miscellaneous"];
const APP_STAGES = ["Shortlisted for OA","OA Done","OA Cleared","Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at OA","Rejected at Interview","Rejected at HR","Ghosted"];
const STAGE_COLORS = {"Shortlisted for OA":"#9333ea","OA Done":"#2563eb","OA Cleared":"#0891b2","Interview R1":"#d97706","Interview R2":"#d97706","Interview R3":"#d97706","HR Round":"#059669","Offered":"#059669","Rejected at OA":"#dc2626","Rejected at Interview":"#dc2626","Rejected at HR":"#dc2626","Ghosted":"#999"};
const PLATFORMS = ["Campus Portal","LinkedIn","Wellfound","Company Website","Referral","eLitmus","HackerRank","Other"];

const LEARN_PATTERNS = [{"id":"arrays","tier":1,"label":"Arrays + Prefix Sum","emoji":"📊","accent":"#2563eb","days":"2-3 days","placement":"🔴 Every OA","simpleExplanation":"Prefix sum matlab ek aisa array banao jahan har index pe 0 se us index tak ka sum stored ho. Phir kisi bhi range [l,r] ka sum ek second mein milega: prefix[r] - prefix[l-1].","template":"// PREFIX SUM\nint[] prefix = new int[n+1];\nfor(int i=0;i<n;i++) prefix[i+1] = prefix[i] + nums[i];\n// sum of range [l,r] = prefix[r+1] - prefix[l]\n\n// KADANE'S (max subarray)\nint maxSum = nums[0], curr = nums[0];\nfor(int i=1;i<n;i++){\n    curr = Math.max(nums[i], curr+nums[i]);\n    maxSum = Math.max(maxSum, curr);\n}","whenToUse":"'subarray sum', 'range query', 'maximum subarray'","problems":[{"id":"ar1","name":"Running Sum of 1D Array","lc":"1480","diff":"Easy","tag":"prefix sum","link":"https://leetcode.com/problems/running-sum-of-1d-array/"},{"id":"ar2","name":"Find Pivot Index","lc":"724","diff":"Easy","tag":"prefix sum","link":"https://leetcode.com/problems/find-pivot-index/"},{"id":"ar3","name":"Maximum Subarray","lc":"53","diff":"Medium","tag":"kadane's","link":"https://leetcode.com/problems/maximum-subarray/"},{"id":"ar4","name":"Product of Array Except Self","lc":"238","diff":"Medium","tag":"prefix+suffix","link":"https://leetcode.com/problems/product-of-array-except-self/"},{"id":"ar5","name":"Subarray Sum Equals K","lc":"560","diff":"Medium","tag":"prefix+hashmap","link":"https://leetcode.com/problems/subarray-sum-equals-k/"},{"id":"ar6","name":"Maximum Sum Circular Subarray","lc":"918","diff":"Medium","tag":"kadane's variant","link":"https://leetcode.com/problems/maximum-sum-circular-subarray/"}],"free":true},{"id":"hashmap","tier":1,"label":"HashMap / Frequency","emoji":"🗂️","accent":"#b45309","days":"1-2 days","placement":"🔴 Every OA","simpleExplanation":"HashMap = fast lookup. Jab bhi 'count karo', 'find pair', 'kya seen tha pehle' aaye — HashMap.","template":"// FREQUENCY MAP\nMap<Integer,Integer> freq = new HashMap<>();\nfor(int n:nums) freq.merge(n,1,Integer::sum);\n\n// TWO SUM PATTERN\nMap<Integer,Integer> seen = new HashMap<>();\nfor(int i=0;i<n;i++){\n    int comp = target-nums[i];\n    if(seen.containsKey(comp)) return new int[]{seen.get(comp),i};\n    seen.put(nums[i],i);\n}","whenToUse":"'find pair/triplet', 'count frequency', 'check if seen before'","problems":[{"id":"hm1","name":"Two Sum","lc":"1","diff":"Easy","tag":"complement lookup","link":"https://leetcode.com/problems/two-sum/"},{"id":"hm2","name":"Valid Anagram","lc":"242","diff":"Easy","tag":"frequency map","link":"https://leetcode.com/problems/valid-anagram/"},{"id":"hm3","name":"Group Anagrams","lc":"49","diff":"Medium","tag":"freq map key","link":"https://leetcode.com/problems/group-anagrams/"},{"id":"hm4","name":"Subarray Sum Equals K","lc":"560","diff":"Medium","tag":"prefix+map","link":"https://leetcode.com/problems/subarray-sum-equals-k/"},{"id":"hm5","name":"Longest Consecutive Sequence","lc":"128","diff":"Medium","tag":"hashset","link":"https://leetcode.com/problems/longest-consecutive-sequence/"},{"id":"hm6","name":"Top K Frequent Elements","lc":"347","diff":"Medium","tag":"freq+heap","link":"https://leetcode.com/problems/top-k-frequent-elements/"}],"free":true},{"id":"twoptr","tier":1,"label":"Two Pointers","emoji":"👆👆","accent":"#0891b2","days":"2-3 days","placement":"🔴 Every OA","simpleExplanation":"Do pointer — left aur right. Sorted array hai? Opposite ends se shuru karo.","template":"// OPPOSITE ENDS\nint l=0, r=n-1;\nwhile(l<r){\n    int sum=arr[l]+arr[r];\n    if(sum==target){l++;r--;}\n    else if(sum<target) l++;\n    else r--;\n}","whenToUse":"Sorted array + pair sum, linked list middle/cycle, remove duplicates","problems":[{"id":"tp1","name":"Valid Palindrome","lc":"125","diff":"Easy","tag":"opposite ends","link":"https://leetcode.com/problems/valid-palindrome/"},{"id":"tp2","name":"Two Sum II","lc":"167","diff":"Easy","tag":"opposite ends","link":"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},{"id":"tp3","name":"3Sum","lc":"15","diff":"Medium","tag":"sort+two ptr","link":"https://leetcode.com/problems/3sum/"},{"id":"tp4","name":"Container With Most Water","lc":"11","diff":"Medium","tag":"opposite ends","link":"https://leetcode.com/problems/container-with-most-water/"},{"id":"tp5","name":"Middle of Linked List","lc":"876","diff":"Easy","tag":"fast/slow","link":"https://leetcode.com/problems/middle-of-the-linked-list/"},{"id":"tp6","name":"Linked List Cycle II","lc":"142","diff":"Medium","tag":"fast/slow","link":"https://leetcode.com/problems/linked-list-cycle-ii/"}],"free":true},{"id":"sliding","tier":1,"label":"Sliding Window","emoji":"🪟","accent":"#7c3aed","days":"3-4 days","placement":"🔴 Every OA","simpleExplanation":"Window = subarray ka ek range. Right se add karo. Jab window invalid ho jaaye, left se hatao.","template":"// VARIABLE WINDOW\nint left=0, result=0;\nMap<Character,Integer> map=new HashMap<>();\nfor(int right=0;right<s.length();right++){\n    map.merge(s.charAt(right),1,Integer::sum);\n    while(windowInvalid(map)){\n        map.merge(s.charAt(left),-1,Integer::sum);\n        left++;\n    }\n    result=Math.max(result, right-left+1);\n}","whenToUse":"'longest/shortest subarray/substring', 'subarray with condition'","problems":[{"id":"sw1","name":"Maximum Average Subarray I","lc":"643","diff":"Easy","tag":"fixed window","link":"https://leetcode.com/problems/maximum-average-subarray-i/"},{"id":"sw2","name":"Longest Substring Without Repeating","lc":"3","diff":"Medium","tag":"variable window","link":"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},{"id":"sw3","name":"Max Consecutive Ones III","lc":"1004","diff":"Medium","tag":"variable window","link":"https://leetcode.com/problems/max-consecutive-ones-iii/"},{"id":"sw4","name":"Permutation in String","lc":"567","diff":"Medium","tag":"fixed window+freq","link":"https://leetcode.com/problems/permutation-in-string/"},{"id":"sw5","name":"Minimum Window Substring","lc":"76","diff":"Hard","tag":"variable window","link":"https://leetcode.com/problems/minimum-window-substring/"}],"free":true},{"id":"bsearch","tier":1,"label":"Binary Search","emoji":"🔍","accent":"#9333ea","days":"3-4 days","placement":"🔴 High","simpleExplanation":"Sorted array hai, aur answer dhundhna hai? lo aur hi rakho, mid check karo.","template":"// CLASSIC BS\nint lo=0, hi=n-1;\nwhile(lo<=hi){\n    int mid=lo+(hi-lo)/2;\n    if(arr[mid]==target) return mid;\n    else if(arr[mid]<target) lo=mid+1;\n    else hi=mid-1;\n}","whenToUse":"Sorted array search, find boundary, 'minimum X such that condition holds'","problems":[{"id":"bs1","name":"Binary Search","lc":"704","diff":"Easy","tag":"classic","link":"https://leetcode.com/problems/binary-search/"},{"id":"bs2","name":"Search Insert Position","lc":"35","diff":"Easy","tag":"lower bound","link":"https://leetcode.com/problems/search-insert-position/"},{"id":"bs3","name":"Koko Eating Bananas","lc":"875","diff":"Medium","tag":"BS on answer","link":"https://leetcode.com/problems/koko-eating-bananas/"},{"id":"bs4","name":"Split Array Largest Sum","lc":"410","diff":"Hard","tag":"BS on answer","link":"https://leetcode.com/problems/split-array-largest-sum/"}],"free":true},{"id":"stack","tier":2,"label":"Stack / Monotonic Stack","emoji":"📚","accent":"#dc2626","days":"2-3 days","placement":"🟡 Interviews","simpleExplanation":"Stack = last in first out. Monotonic stack ka idea: ek stack maintain karo jo hamesha increasing ya decreasing ho.","template":"// MONOTONIC STACK\nStack<Integer> st=new Stack<>();\nint[] res=new int[n];\nfor(int i=0;i<n;i++){\n    while(!st.isEmpty()&&arr[st.peek()]<arr[i])\n        res[st.pop()]=arr[i];\n    st.push(i);\n}","whenToUse":"'next greater/smaller element', 'valid parentheses', 'largest rectangle'","problems":[{"id":"st1","name":"Valid Parentheses","lc":"20","diff":"Easy","tag":"stack","link":"https://leetcode.com/problems/valid-parentheses/"},{"id":"st2","name":"Min Stack","lc":"155","diff":"Medium","tag":"design","link":"https://leetcode.com/problems/min-stack/"},{"id":"st3","name":"Daily Temperatures","lc":"739","diff":"Medium","tag":"monotonic stack","link":"https://leetcode.com/problems/daily-temperatures/"},{"id":"st4","name":"Largest Rectangle in Histogram","lc":"84","diff":"Hard","tag":"monotonic stack","link":"https://leetcode.com/problems/largest-rectangle-in-histogram/"}],"free":false},{"id":"dp","tier":3,"label":"Dynamic Programming","emoji":"🧠","accent":"#0f766e","days":"6-7 days","placement":"🔴 High","simpleExplanation":"DP = recursion + memory. Pehle brute force recursion likho. Phir dekho: same subproblem baar baar solve ho raha hai? Memo table banao.","template":"// 1D DP\nint[] dp=new int[n];\ndp[0]=nums[0];\ndp[1]=Math.max(nums[0],nums[1]);\nfor(int i=2;i<n;i++)\n    dp[i]=Math.max(dp[i-1], dp[i-2]+nums[i]);\n\n// COIN CHANGE\nint[] dp=new int[amount+1];\nArrays.fill(dp,amount+1);\ndp[0]=0;\nfor(int i=1;i<=amount;i++)\n    for(int coin:coins)\n        if(coin<=i) dp[i]=Math.min(dp[i],dp[i-coin]+1);","whenToUse":"'minimum/maximum ways', 'count paths', 'optimal selection'","problems":[{"id":"dp1","name":"Climbing Stairs","lc":"70","diff":"Easy","tag":"1D DP","link":"https://leetcode.com/problems/climbing-stairs/"},{"id":"dp2","name":"House Robber","lc":"198","diff":"Medium","tag":"1D DP","link":"https://leetcode.com/problems/house-robber/"},{"id":"dp3","name":"Coin Change","lc":"322","diff":"Medium","tag":"unbounded knapsack","link":"https://leetcode.com/problems/coin-change/"},{"id":"dp4","name":"Longest Increasing Subsequence","lc":"300","diff":"Medium","tag":"sequence DP","link":"https://leetcode.com/problems/longest-increasing-subsequence/"}],"free":false},{"id":"graphs","tier":3,"label":"Graphs — DFS / BFS","emoji":"🕸️","accent":"#1d4ed8","days":"4-5 days","placement":"🟡 Mid-level","simpleExplanation":"Graph = nodes + edges. Grid bhi ek graph hai. DFS: ek direction mein jaate raho. BFS: shortest path ke liye.","template":"// DFS ON GRID\nint[] dr={0,0,1,-1}; int[] dc={1,-1,0,0};\nvoid dfs(int r, int c){\n    if(r<0||r>=rows||c<0||c>=cols) return;\n    if(visited[r][c]) return;\n    visited[r][c]=true;\n    for(int d=0;d<4;d++) dfs(r+dr[d],c+dc[d]);\n}","whenToUse":"'number of islands', 'shortest path', 'course schedule'","problems":[{"id":"gr1","name":"Number of Islands","lc":"200","diff":"Medium","tag":"grid DFS","link":"https://leetcode.com/problems/number-of-islands/"},{"id":"gr2","name":"Rotting Oranges","lc":"994","diff":"Medium","tag":"multi-source BFS","link":"https://leetcode.com/problems/rotting-oranges/"},{"id":"gr3","name":"Course Schedule","lc":"207","diff":"Medium","tag":"topo sort","link":"https://leetcode.com/problems/course-schedule/"}],"free":false}];

const TOPICS = [
  { id:"arrays", label:"Arrays + Sliding Window", emoji:"🪟", accent:"#2563eb", level:"Harder Problems", problems:[
    {id:"a1",name:"Minimum Window Substring",difficulty:"Hard",tag:"sliding window",leetcode:"https://leetcode.com/problems/minimum-window-substring/"},
    {id:"a2",name:"Longest Substring with K Distinct",difficulty:"Hard",tag:"sliding window",leetcode:"https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"},
    {id:"a3",name:"Sliding Window Maximum",difficulty:"Hard",tag:"deque",leetcode:"https://leetcode.com/problems/sliding-window-maximum/"},
    {id:"a4",name:"Minimum Size Subarray Sum",difficulty:"Medium",tag:"two pointer",leetcode:"https://leetcode.com/problems/minimum-size-subarray-sum/"},
    {id:"a5",name:"Fruit Into Baskets",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/fruit-into-baskets/"},
    {id:"a6",name:"Permutation in String",difficulty:"Medium",tag:"sliding window",leetcode:"https://leetcode.com/problems/permutation-in-string/"},
  ]},
  { id:"trees", label:"Trees → BST", emoji:"🌲", accent:"#059669", level:"BST Problems", problems:[
    {id:"t1",name:"Validate Binary Search Tree",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/validate-binary-search-tree/"},
    {id:"t2",name:"Kth Smallest in BST",difficulty:"Medium",tag:"inorder",leetcode:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},
    {id:"t3",name:"Lowest Common Ancestor of BST",difficulty:"Medium",tag:"BST",leetcode:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},
    {id:"t4",name:"Convert Sorted Array to BST",difficulty:"Easy",tag:"BST",leetcode:"https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"},
  ]},
  { id:"hashmap", label:"HashMap", emoji:"🗂️", accent:"#dc2626", level:"Complex Frequency", problems:[
    {id:"h1",name:"Top K Frequent Elements",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/top-k-frequent-elements/"},
    {id:"h2",name:"Group Anagrams",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/group-anagrams/"},
    {id:"h3",name:"Subarray Sum Equals K",difficulty:"Medium",tag:"prefix sum",leetcode:"https://leetcode.com/problems/subarray-sum-equals-k/"},
    {id:"h4",name:"Longest Consecutive Sequence",difficulty:"Medium",tag:"frequency",leetcode:"https://leetcode.com/problems/longest-consecutive-sequence/"},
  ]},
  { id:"bsearch", label:"Binary Search", emoji:"🔍", accent:"#9333ea", level:"Variations", problems:[
    {id:"b1",name:"Find Peak Element",difficulty:"Medium",tag:"peak",leetcode:"https://leetcode.com/problems/find-peak-element/"},
    {id:"b2",name:"Search in Rotated Array",difficulty:"Medium",tag:"rotated",leetcode:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},
    {id:"b3",name:"Koko Eating Bananas",difficulty:"Medium",tag:"search on answer",leetcode:"https://leetcode.com/problems/koko-eating-bananas/"},
    {id:"b4",name:"Split Array Largest Sum",difficulty:"Hard",tag:"search on answer",leetcode:"https://leetcode.com/problems/split-array-largest-sum/"},
  ]},
];

// Starter Sheet — first 3 topics FREE, rest LOCKED
const STARTER_FREE = [
  { id:"s_arrays1", label:"Arrays — Basics", accent:"#2563eb", free:true, problems:[
    {id:"sf1",name:"Two Sum",tag:"HashMap",leetcode:"https://leetcode.com/problems/two-sum/"},
    {id:"sf2",name:"Best Time to Buy and Sell Stock",tag:"Array",leetcode:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},
    {id:"sf3",name:"Contains Duplicate",tag:"HashMap",leetcode:"https://leetcode.com/problems/contains-duplicate/"},
    {id:"sf4",name:"Maximum Subarray",tag:"Kadane's",leetcode:"https://leetcode.com/problems/maximum-subarray/"},
    {id:"sf5",name:"Product of Array Except Self",tag:"Prefix",leetcode:"https://leetcode.com/problems/product-of-array-except-self/"},
  ]},
  { id:"s_strings1", label:"Strings — Basics", accent:"#059669", free:true, problems:[
    {id:"sf6",name:"Valid Anagram",tag:"Frequency",leetcode:"https://leetcode.com/problems/valid-anagram/"},
    {id:"sf7",name:"Valid Palindrome",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/valid-palindrome/"},
    {id:"sf8",name:"Longest Substring Without Repeating",tag:"Sliding Window",leetcode:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},
    {id:"sf9",name:"Reverse Words in a String",tag:"String",leetcode:"https://leetcode.com/problems/reverse-words-in-a-string/"},
  ]},
  { id:"s_linkedlist1", label:"Linked List — Basics", accent:"#0891b2", free:true, problems:[
    {id:"sf10",name:"Reverse Linked List",tag:"Reversal",leetcode:"https://leetcode.com/problems/reverse-linked-list/"},
    {id:"sf11",name:"Linked List Cycle",tag:"Floyd's",leetcode:"https://leetcode.com/problems/linked-list-cycle/"},
    {id:"sf12",name:"Middle of Linked List",tag:"Fast/Slow",leetcode:"https://leetcode.com/problems/middle-of-the-linked-list/"},
    {id:"sf13",name:"Merge Two Sorted Lists",tag:"Merge",leetcode:"https://leetcode.com/problems/merge-two-sorted-lists/"},
  ]},
];

const STARTER_LOCKED = [
  { id:"s_arrays2", label:"Arrays — Advanced", accent:"#7c3aed", problems:[
    {id:"sl1",name:"3Sum",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/3sum/"},
    {id:"sl2",name:"Container With Most Water",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/container-with-most-water/"},
    {id:"sl3",name:"Trapping Rain Water",tag:"Two Pointers",leetcode:"https://leetcode.com/problems/trapping-rain-water/"},
    {id:"sl4",name:"Subarray Sum Equals K",tag:"Prefix+Map",leetcode:"https://leetcode.com/problems/subarray-sum-equals-k/"},
  ]},
  { id:"s_trees", label:"Trees — DFS/BFS", accent:"#16a34a", problems:[
    {id:"sl5",name:"Maximum Depth of Binary Tree",tag:"DFS",leetcode:"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},
    {id:"sl6",name:"Binary Tree Level Order Traversal",tag:"BFS",leetcode:"https://leetcode.com/problems/binary-tree-level-order-traversal/"},
    {id:"sl7",name:"Diameter of Binary Tree",tag:"DFS",leetcode:"https://leetcode.com/problems/diameter-of-binary-tree/"},
    {id:"sl8",name:"Lowest Common Ancestor",tag:"DFS",leetcode:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"},
  ]},
  { id:"s_dp", label:"Dynamic Programming", accent:"#0f766e", problems:[
    {id:"sl9",name:"Climbing Stairs",tag:"1D DP",leetcode:"https://leetcode.com/problems/climbing-stairs/"},
    {id:"sl10",name:"House Robber",tag:"1D DP",leetcode:"https://leetcode.com/problems/house-robber/"},
    {id:"sl11",name:"Coin Change",tag:"Knapsack",leetcode:"https://leetcode.com/problems/coin-change/"},
    {id:"sl12",name:"Longest Increasing Subsequence",tag:"Sequence DP",leetcode:"https://leetcode.com/problems/longest-increasing-subsequence/"},
  ]},
  { id:"s_backtrack", label:"Backtracking", accent:"#be185d", problems:[
    {id:"sl13",name:"Subsets",tag:"Backtracking",leetcode:"https://leetcode.com/problems/subsets/"},
    {id:"sl14",name:"Permutations",tag:"Backtracking",leetcode:"https://leetcode.com/problems/permutations/"},
    {id:"sl15",name:"Combination Sum",tag:"Backtracking",leetcode:"https://leetcode.com/problems/combination-sum/"},
  ]},
];

const BANK = [
  {id:"q1",name:"Two Sum",lc:"1",pattern:"Array/HashMap",diff:"Easy",link:"https://leetcode.com/problems/two-sum/",init:true},
  {id:"q2",name:"Best Time to Buy and Sell Stock",lc:"121",pattern:"Array",diff:"Easy",link:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",init:true},
  {id:"q3",name:"Contains Duplicate",lc:"217",pattern:"HashMap",diff:"Easy",link:"https://leetcode.com/problems/contains-duplicate/",init:true},
  {id:"q4",name:"Product of Array Except Self",lc:"238",pattern:"Array",diff:"Medium",link:"https://leetcode.com/problems/product-of-array-except-self/",init:true},
  {id:"q5",name:"Maximum Subarray",lc:"53",pattern:"Array",diff:"Medium",link:"https://leetcode.com/problems/maximum-subarray/",init:true},
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
  {id:"q25",name:"Invert Binary Tree",lc:"226",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/invert-binary-tree/"},
  {id:"q26",name:"Diameter of Binary Tree",lc:"543",pattern:"Tree",diff:"Easy",link:"https://leetcode.com/problems/diameter-of-binary-tree/",init:true},
  {id:"q27",name:"Binary Tree Level Order",lc:"102",pattern:"Tree BFS",diff:"Medium",link:"https://leetcode.com/problems/binary-tree-level-order-traversal/",init:true},
  {id:"q28",name:"Validate Binary Search Tree",lc:"98",pattern:"BST",diff:"Medium",link:"https://leetcode.com/problems/validate-binary-search-tree/"},
  {id:"q29",name:"Valid Parentheses",lc:"20",pattern:"Stack",diff:"Easy",link:"https://leetcode.com/problems/valid-parentheses/"},
  {id:"q30",name:"Min Stack",lc:"155",pattern:"Stack",diff:"Medium",link:"https://leetcode.com/problems/min-stack/"},
  {id:"q31",name:"Daily Temperatures",lc:"739",pattern:"Stack",diff:"Medium",link:"https://leetcode.com/problems/daily-temperatures/"},
  {id:"q32",name:"Number of Islands",lc:"200",pattern:"Graph BFS/DFS",diff:"Medium",link:"https://leetcode.com/problems/number-of-islands/"},
  {id:"q33",name:"Course Schedule",lc:"207",pattern:"Graph Topo",diff:"Medium",link:"https://leetcode.com/problems/course-schedule/"},
  {id:"q34",name:"Climbing Stairs",lc:"70",pattern:"DP",diff:"Easy",link:"https://leetcode.com/problems/climbing-stairs/"},
  {id:"q35",name:"House Robber",lc:"198",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/house-robber/"},
  {id:"q36",name:"Coin Change",lc:"322",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/coin-change/"},
  {id:"q37",name:"Longest Increasing Subsequence",lc:"300",pattern:"DP",diff:"Medium",link:"https://leetcode.com/problems/longest-increasing-subsequence/"},
  {id:"q38",name:"Top K Frequent Elements",lc:"347",pattern:"Heap",diff:"Medium",link:"https://leetcode.com/problems/top-k-frequent-elements/",init:true},
  {id:"q39",name:"Kth Largest Element",lc:"215",pattern:"Heap",diff:"Medium",link:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},
  {id:"q40",name:"Binary Search",lc:"704",pattern:"Binary Search",diff:"Easy",link:"https://leetcode.com/problems/binary-search/",init:true},
  {id:"q41",name:"Find Peak Element",lc:"162",pattern:"Binary Search",diff:"Medium",link:"https://leetcode.com/problems/find-peak-element/"},
  {id:"q42",name:"Subsets",lc:"78",pattern:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/subsets/"},
  {id:"q43",name:"Permutations",lc:"46",pattern:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/permutations/"},
  {id:"q44",name:"Word Search",lc:"79",pattern:"Backtracking",diff:"Medium",link:"https://leetcode.com/problems/word-search/"},
  {id:"q45",name:"Implement Trie",lc:"208",pattern:"Trie",diff:"Medium",link:"https://leetcode.com/problems/implement-trie-prefix-tree/"},
  {id:"q46",name:"Number of Provinces",lc:"547",pattern:"Union Find",diff:"Medium",link:"https://leetcode.com/problems/number-of-provinces/"},
  {id:"q47",name:"Single Number",lc:"136",pattern:"Bit Manipulation",diff:"Easy",link:"https://leetcode.com/problems/single-number/"},
  {id:"q48",name:"Missing Number",lc:"268",pattern:"Bit Manipulation",diff:"Easy",link:"https://leetcode.com/problems/missing-number/"},
  {id:"q49",name:"Pacific Atlantic Water Flow",lc:"417",pattern:"Graph",diff:"Medium",link:"https://leetcode.com/problems/pacific-atlantic-water-flow/"},
  {id:"q50",name:"Merge K Sorted Lists",lc:"23",pattern:"Heap",diff:"Hard",link:"https://leetcode.com/problems/merge-k-sorted-lists/"},
];
const BANK_PATTERNS = [...new Set(BANK.map(q=>q.pattern))];

const DIFF_STYLE = {Easy:{color:"#059669",bg:"#ecfdf5"},Medium:{color:"#d97706",bg:"#fffbeb"},Hard:{color:"#dc2626",bg:"#fef2f2"}};
const DAY_MS = 86400000;
const todayStr = () => new Date().toDateString();
const EMPTY_STREAK = {count:0,last:null,history:[]};

// ─── Auth ──────────────────────────────────────────────────────────────────────
function AuthScreen({onAuth}) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [mode,setMode]=useState("login"); const [error,setError]=useState("");
  const [loading,setLoading]=useState(false); const [sent,setSent]=useState(false);
  const submit = async () => {
    setError(""); setLoading(true);
    if(mode==="signup"){const{error:e}=await supabase.auth.signUp({email,password});if(e)setError(e.message);else setSent(true);}
    else{const{data,error:e}=await supabase.auth.signInWithPassword({email,password});if(e)setError(e.message);else onAuth(data.user);}
    setLoading(false);
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#fafaf9",fontFamily:"'DM Sans',sans-serif",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@900&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,marginBottom:8,letterSpacing:-1}}>Algo<span style={{color:"#2563eb"}}>Vault</span></div>
        <div style={{fontSize:14,color:"#888",marginBottom:36}}>Chitkara's placement prep hub.</div>
        {sent?<div style={{background:"#ecfdf5",border:"1px solid #a7f3d0",borderRadius:12,padding:20,fontSize:14,color:"#059669"}}>✅ Check your email to confirm, then log in.</div>:<>
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

// ─── Lock Screen ───────────────────────────────────────────────────────────────
function LockScreen({title, subtitle}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 20px",textAlign:"center"}}>
      <div style={{fontSize:40,marginBottom:16}}>🔒</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,marginBottom:8}}>{title}</div>
      <div style={{fontSize:14,color:"#888",marginBottom:24,maxWidth:340}}>{subtitle}</div>
      <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"16px 24px",fontSize:13,color:"#92400e",marginBottom:20}}>
        💳 Pay <strong>₹49</strong> once — unlock forever
      </div>
      <div style={{fontSize:12,color:"#aaa",background:"#f5f3f0",padding:"10px 16px",borderRadius:8}}>
        📩 Pay via UPI → WhatsApp screenshot → get access within 1 hour
      </div>
    </div>
  );
}

// ─── Reusable TopicBlock ───────────────────────────────────────────────────────
function TopicBlock({topic,doneMap,onToggle,progMap,onToggleProg,notesMap,onNote,showDiff,expanded,onExpand,locked}) {
  const cnt=topic.problems.filter(p=>doneMap[p.id]).length;
  return (
    <div className="tblock" style={{opacity:locked?0.6:1}}>
      <div className="thdr" onClick={onExpand}>
        <div className="tinfo">
          <div className="tname">{topic.label} {locked&&"🔒"}</div>
          {topic.level&&<div className="tlvl">{topic.level}</div>}
        </div>
        <div className="tr_">
          <div className="tmbar"><div className="tmfill" style={{width:`${(cnt/topic.problems.length)*100}%`,background:topic.accent}}/></div>
          <div className="tct">{cnt}/{topic.problems.length}</div>
          <div className="tch" style={{transform:expanded?"rotate(180deg)":"rotate(0)"}}>▼</div>
        </div>
      </div>
      {expanded&&<div className="plist">{topic.problems.map(p=>{
        const isDone=!!doneMap[p.id]; const isProg=progMap&&!!progMap[p.id]&&!isDone; const hasNote=notesMap&&!!(notesMap[p.id]?.trim());
        return (
          <div key={p.id} className={`pitem${isDone?" done":""}`} style={{pointerEvents:locked?"none":"auto"}}>
            <button className={`cb${isDone?" on":""}`} onClick={()=>!locked&&onToggle(p.id)}>{isDone?"✓":""}</button>
            {progMap&&<button className={`pb${isProg?" on":""}`} onClick={()=>!locked&&onToggleProg(p.id)}>{isProg?"~":""}</button>}
            <span className="pname" style={{textDecoration:isDone?"line-through":"none"}}>{p.name}</span>
            {p.tag&&<span className="ptag">{p.tag}</span>}
            {showDiff&&p.difficulty&&<span className="dchip" style={{color:DIFF_STYLE[p.difficulty]?.color,background:DIFF_STYLE[p.difficulty]?.bg}}>{p.difficulty}</span>}
            {notesMap&&!locked&&<button className={`nbtn${hasNote?" has":""}`} onClick={()=>onNote(p.id)}>✎</button>}
            <a className="lc" href={p.leetcode||p.link} target="_blank" rel="noreferrer">↗</a>
          </div>
        );
      })}</div>}
    </div>
  );
}

// ─── OA Prep (Pattern Learning) ────────────────────────────────────────────────
function OAPrepPage({isPremium, learnDone, setLearnDone, persist, done, inProgress, notes, streak, adsDone, bankDone, dayStatus, applications, starterDone}) {
  const [expanded,setExpanded] = useState({});
  const [showTpl,setShowTpl] = useState({});

  const toggleDone = (id) => {
    const nl = {...learnDone,[id]:!learnDone[id]};
    setLearnDone(nl);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,applications,nl,starterDone);
  };

  const totalDone = Object.values(learnDone).filter(Boolean).length;
  const totalProblems = LEARN_PATTERNS.reduce((s,p)=>s+p.problems.length,0);

  if(!isPremium) {
    return (
      <div className="inner">
        <div className="stitle" style={{marginBottom:4}}>OA Prep</div>
        <div style={{fontSize:11,color:"#aaa",marginBottom:20}}>Company-wise OA patterns — crack any online assessment</div>
        
        {/* Preview of what's inside */}
        <div className="card" style={{marginBottom:16,background:"#f8f4ff",border:"1px solid #e9d5ff"}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:"#7c3aed"}}>🎯 What's inside OA Prep</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:12,color:"#555"}}>
            {["Arrays + Prefix Sum — Every OA","HashMap / Frequency — Every OA","Two Pointers — Every OA","Sliding Window — Every OA","Binary Search — High frequency","Stack / Monotonic Stack","Dynamic Programming","Graphs — DFS / BFS"].map(p=>(
              <div key={p} style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:"#7c3aed"}}>🔒</span>{p}
              </div>
            ))}
          </div>
        </div>
        <LockScreen title="OA Prep is Premium" subtitle="Get full access to all OA patterns, templates, and 80+ problems with one-time payment." />
      </div>
    );
  }

  return (
    <div className="inner">
      <div style={{marginBottom:20}}>
        <div className="stitle" style={{marginBottom:4}}>OA Prep</div>
        <div style={{fontSize:11,color:"#aaa"}}>{LEARN_PATTERNS.length} patterns · {totalProblems} problems</div>
      </div>
      <div className="ovbar" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
          <span style={{fontSize:12,color:"#666"}}>{totalDone}/{totalProblems} problems done</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalDone/totalProblems)*100)}%</span>
        </div>
        <div className="ovbg"><div style={{height:"100%",width:`${(totalDone/totalProblems)*100}%`,background:"linear-gradient(90deg,#2563eb,#9333ea)",borderRadius:3,transition:"width .6s"}}/></div>
      </div>
      {LEARN_PATTERNS.map(pattern=>(
        <PatternCard key={pattern.id} pattern={pattern} learnDone={learnDone}
          onToggle={toggleDone} expanded={!!expanded[pattern.id]}
          onExpand={()=>setExpanded(e=>({...e,[pattern.id]:!e[pattern.id]}))}
          showTpl={!!showTpl[pattern.id]} onToggleTpl={()=>setShowTpl(s=>({...s,[pattern.id]:!s[pattern.id]}))}/>
      ))}
    </div>
  );
}

function PatternCard({pattern,learnDone,onToggle,expanded,onExpand,showTpl,onToggleTpl}) {
  const done = pattern.problems.filter(p=>learnDone[p.id]).length;
  const pct = (done/pattern.problems.length)*100;
  const diffStyle = {Easy:{color:"#059669",bg:"#ecfdf5"},Medium:{color:"#d97706",bg:"#fffbeb"},Hard:{color:"#dc2626",bg:"#fef2f2"}};
  return (
    <div style={{background:"#fff",border:`1px solid ${expanded?pattern.accent+"44":"#e8e5e0"}`,borderRadius:13,marginBottom:10,overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",padding:"14px 18px",cursor:"pointer",gap:12}} onClick={onExpand}>
        <div style={{fontSize:22,flexShrink:0}}>{pattern.emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700}}>{pattern.label}</div>
          <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:pattern.accent,background:pattern.accent+"15",padding:"1px 7px",borderRadius:4,fontWeight:600}}>{pattern.placement}</span>
            <span style={{fontSize:10,color:"#aaa"}}>~{pattern.days}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:52,height:4,background:"#f0ede8",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:pattern.accent,borderRadius:2}}/>
          </div>
          <span style={{fontSize:11,color:"#bbb",minWidth:28,textAlign:"right"}}>{done}/{pattern.problems.length}</span>
          <span style={{fontSize:9,color:"#ccc",transition:"transform .2s",transform:expanded?"rotate(180deg)":"rotate(0)"}}>▼</span>
        </div>
      </div>
      {expanded&&(
        <div style={{borderTop:"1px solid #f5f3f0"}}>
          <div style={{padding:"14px 18px",background:"#fafaf9",borderBottom:"1px solid #f0ede8"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>💡 Simple Explanation</div>
            <div style={{fontSize:12,color:"#444",lineHeight:1.7}}>{pattern.simpleExplanation}</div>
            <div style={{marginTop:8,fontSize:11,color:"#888"}}><span style={{fontWeight:600}}>When to use: </span>{pattern.whenToUse}</div>
          </div>
          <div style={{padding:"10px 18px",borderBottom:"1px solid #f0ede8"}}>
            <button onClick={onToggleTpl} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"1.5px solid "+pattern.accent+"44",borderRadius:7,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600,color:pattern.accent,fontFamily:"'DM Sans'"}}>
              {showTpl?"▼ Hide Template":"▶ See Template"}
            </button>
            {showTpl&&(
              <div style={{marginTop:10,background:"#1e1e2e",borderRadius:8,padding:"14px 16px",overflow:"auto"}}>
                <pre style={{fontSize:11,color:"#cdd6f4",lineHeight:1.6,margin:0,fontFamily:"monospace",whiteSpace:"pre-wrap"}}>{pattern.template}</pre>
              </div>
            )}
          </div>
          <div>
            {pattern.problems.map(p=>{
              const isDone=!!learnDone[p.id]; const ds=diffStyle[p.diff];
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",padding:"10px 18px",gap:9,borderBottom:"1px solid #f9f7f5",background:isDone?"#f9f7f5":"#fff",opacity:isDone?.5:1}}>
                  <button onClick={()=>onToggle(p.id)} style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${isDone?pattern.accent:"#ddd"}`,background:isDone?pattern.accent:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:8,color:isDone?"#fff":"transparent"}}>
                    {isDone?"✓":""}
                  </button>
                  <span style={{flex:1,fontSize:12,color:"#333",textDecoration:isDone?"line-through":"none"}}>{p.name}</span>
                  <span style={{fontSize:9,color:"#bbb",background:"#f5f3f0",padding:"2px 6px",borderRadius:4}}>{p.tag}</span>
                  <span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,color:ds?.color,background:ds?.bg}}>{p.diff}</span>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{width:19,height:19,borderRadius:4,border:"1.5px solid #e8e5e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#bbb",textDecoration:"none",flexShrink:0}}>↗</a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Starter Sheet Page ────────────────────────────────────────────────────────
function StarterSheetPage({isPremium, starterDone, setStarterDone, persist, done, inProgress, notes, streak, adsDone, bankDone, dayStatus, applications, learnDone}) {
  const [freeExp, setFreeExp] = useState({s_arrays1:true});
  const [lockedExp, setLockedExp] = useState({});

  const allFreeProblems = STARTER_FREE.flatMap(t=>t.problems);
  const allLockedProblems = STARTER_LOCKED.flatMap(t=>t.problems);
  const freeDone = allFreeProblems.filter(p=>starterDone[p.id]).length;
  const lockedDone = allLockedProblems.filter(p=>starterDone[p.id]).length;

  const toggle = (id) => {
    const ns = {...starterDone,[id]:!starterDone[id]};
    setStarterDone(ns);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,applications,learnDone,ns);
  };

  return (
    <div className="inner">
      <div style={{marginBottom:16}}>
        <div className="stitle" style={{marginBottom:4}}>Starter Sheet</div>
        <div style={{fontSize:11,color:"#aaa"}}>Beginner-friendly DSA — start here before OA Prep</div>
      </div>

      {/* Free section */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{height:2,flex:1,background:"#059669"+"33"}}/>
        <div style={{fontSize:12,fontWeight:700,color:"#059669"}}>✅ Free — {freeDone}/{allFreeProblems.length} done</div>
        <div style={{height:2,flex:1,background:"#059669"+"33"}}/>
      </div>
      {STARTER_FREE.map(topic=>(
        <TopicBlock key={topic.id} topic={topic} doneMap={starterDone} onToggle={toggle}
          showDiff={false} expanded={!!freeExp[topic.id]} onExpand={()=>setFreeExp(e=>({...e,[topic.id]:!e[topic.id]}))} locked={false}/>
      ))}

      {/* Locked section */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,marginTop:20}}>
        <div style={{height:2,flex:1,background:"#7c3aed"+"33"}}/>
        <div style={{fontSize:12,fontWeight:700,color:"#7c3aed"}}>{isPremium?"🔓 Premium Unlocked":"🔒 Premium — Unlock for ₹49"}</div>
        <div style={{height:2,flex:1,background:"#7c3aed"+"33"}}/>
      </div>

      {!isPremium && (
        <div style={{background:"#f8f4ff",border:"1px solid #e9d5ff",borderRadius:12,padding:"16px 20px",marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:600,color:"#7c3aed",marginBottom:6}}>Unlock Advanced Topics + OA Prep</div>
          <div style={{fontSize:12,color:"#888",marginBottom:12}}>DP, Trees, Backtracking, Graphs + full OA pattern library</div>
          <div style={{fontSize:12,color:"#92400e",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"8px 14px",display:"inline-block"}}>
            📩 Pay <strong>₹49</strong> via UPI → WhatsApp screenshot → access within 1 hr
          </div>
        </div>
      )}

      {STARTER_LOCKED.map(topic=>(
        <TopicBlock key={topic.id} topic={topic} doneMap={starterDone} onToggle={toggle}
          showDiff={false} expanded={isPremium?!!lockedExp[topic.id]:false}
          onExpand={()=>isPremium&&setLockedExp(e=>({...e,[topic.id]:!e[topic.id]}))}
          locked={!isPremium}/>
      ))}

      {isPremium && (
        <div style={{fontSize:11,color:"#aaa",textAlign:"center",marginTop:8}}>
          Premium unlocked · {lockedDone}/{allLockedProblems.length} advanced done
        </div>
      )}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function AlgoVault() {
  const [user,setUser]=useState(null); const [authChecked,setAuthChecked]=useState(false);
  const [syncing,setSyncing]=useState(false); const [lastSaved,setLastSaved]=useState(null);
  const [isPremium,setIsPremium]=useState(false);
  const [done,setDone]=useState({}); const [inProgress,setInProgress]=useState({});
  const [notes,setNotes]=useState({}); const [streak,setStreak]=useState(EMPTY_STREAK);
  const [adsDone,setAdsDone]=useState({}); const [bankDone,setBankDone]=useState({});
  const [learnDone,setLearnDone]=useState({}); const [starterDone,setStarterDone]=useState({});
  const [applications,setApplications]=useState([]);
  const [dayStatus,setDayStatus]=useState({});
  const [todayLog,setTodayLog]=useState({text:'',done:false,date:''});
  const [logDraft,setLogDraft]=useState('');
  const [page,setPage]=useState("home");
  const [planTab,setPlanTab]=useState("drives");
  const [topicExp,setTopicExp]=useState({arrays:true});
  const [bankExp,setBankExp]=useState({}); const [bankFilter,setBankFilter]=useState("All");
  const [filterDiff,setFilterDiff]=useState("All");
  const [driveSearch,setDriveSearch]=useState(""); const [driveType,setDriveType]=useState("All");
  const [driveMinCtc,setDriveMinCtc]=useState(0); const [expandedDrive,setExpandedDrive]=useState(null);
  const [showAddApp,setShowAddApp]=useState(false); const [editingApp,setEditingApp]=useState(null);
  const [appForm,setAppForm]=useState({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});
  const [noteOpen,setNoteOpen]=useState(null); const [noteText,setNoteText]=useState("");
  const saveTimer=useRef(null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user??null);setAuthChecked(true);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_e,session)=>setUser(session?.user??null));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!user)return;
    (async()=>{
      setSyncing(true);
      const{data}=await supabase.from("progress").select("*").eq("user_id",user.id).single();
      if(data){
        setDone(data.done||{}); setInProgress(data.in_progress||{});
        setNotes(data.notes||{}); setStreak(data.streak||EMPTY_STREAK);
        setAdsDone(data.ads_done||{}); setDayStatus(data.day_status||{});
        setApplications(data.applications||[]);
        setLearnDone(data.learn_done||{});
        setStarterDone(data.starter_done||{});
        setIsPremium(data.is_premium||false);
        const savedLog=data.today_log||{text:'',done:false,date:''};
        const today_=new Date().toDateString();
        if(savedLog.date!==today_){setTodayLog({text:'',done:false,date:today_});setLogDraft('');}
        else{setTodayLog(savedLog);setLogDraft(savedLog.text||'');}
        if(data.bank_done){setBankDone(data.bank_done);}
        else{const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});setBankDone(init);}
      } else {
        const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});setBankDone(init);
      }
      setSyncing(false);
    })();
  },[user]);

  const persist=useCallback((d,ip,n,s,ad,bd,ds,apps,ld,sd)=>{
    if(!user)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      setSyncing(true);
      await supabase.from("progress").upsert({
        user_id:user.id,done:d,in_progress:ip,notes:n,streak:s,
        ads_done:ad,bank_done:bd,day_status:ds,applications:apps,
        learn_done:ld,starter_done:sd,today_log:todayLog,
        updated_at:new Date().toISOString(),
      },{onConflict:"user_id"});
      setSyncing(false);setLastSaved(new Date());
    },800);
  },[user, todayLog]);

  const allProblems=TOPICS.flatMap(t=>t.problems);
  const totalDone=Object.values(done).filter(Boolean).length;
  const totalBankDone=Object.values(bankDone).filter(Boolean).length;
  const totalLearnDone=Object.values(learnDone).filter(Boolean).length;
  const totalStarterDone=Object.values(starterDone).filter(Boolean).length;

  const bumpStreak=(s)=>{
    const ts=todayStr(); const hist=s.history||[];
    if(hist.includes(ts))return s;
    const yest=new Date(Date.now()-DAY_MS).toDateString();
    const nc=s.last===yest?s.count+1:1;
    return{count:nc,last:ts,history:[...hist,ts].slice(-30)};
  };

  const markDone=(id)=>{const nowDone=!done[id];const nd={...done,[id]:nowDone};let ns=streak;if(nowDone)ns=bumpStreak(streak);setDone(nd);if(nowDone)setStreak(ns);persist(nd,inProgress,notes,ns,adsDone,bankDone,dayStatus,applications,learnDone,starterDone);};
  const markProg=(id)=>{const np={...inProgress,[id]:!inProgress[id]};setInProgress(np);persist(done,np,notes,streak,adsDone,bankDone,dayStatus,applications,learnDone,starterDone);};
  const markBankDone=(id)=>{const nb={...bankDone,[id]:!bankDone[id]};setBankDone(nb);persist(done,inProgress,notes,streak,adsDone,nb,dayStatus,applications,learnDone,starterDone);};

  const saveLog=(text,isDoneFlag)=>{
    const newLog={text,done:isDoneFlag,date:new Date().toDateString()};
    setTodayLog(newLog);
    if(!user)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      setSyncing(true);
      await supabase.from('progress').upsert({user_id:user.id,done,in_progress:inProgress,notes,streak,ads_done:adsDone,bank_done:bankDone,day_status:dayStatus,applications,learn_done:learnDone,starter_done:starterDone,today_log:newLog,updated_at:new Date().toISOString()},{onConflict:'user_id'});
      setSyncing(false);setLastSaved(new Date());
    },600);
  };

  const openNote=(id)=>{setNoteOpen(id);setNoteText(notes[id]||"");};
  const saveNote=()=>{if(!noteOpen)return;const nn={...notes,[noteOpen]:noteText};setNotes(nn);persist(done,inProgress,nn,streak,adsDone,bankDone,dayStatus,applications,learnDone,starterDone);setNoteOpen(null);};
  const signOut=async()=>{await supabase.auth.signOut();setUser(null);};

  const saveApp=()=>{
    if(!appForm.company.trim())return;
    let newApps;
    if(editingApp!==null){newApps=applications.map((a,i)=>i===editingApp?{...appForm,id:a.id}:a);}
    else{newApps=[...applications,{...appForm,id:Date.now().toString()}];}
    setApplications(newApps);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,newApps,learnDone,starterDone);
    setShowAddApp(false);setEditingApp(null);
    setAppForm({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});
  };
  const deleteApp=(idx)=>{const newApps=applications.filter((_,i)=>i!==idx);setApplications(newApps);persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,newApps,learnDone,starterDone);};
  const editApp=(idx)=>{setAppForm(applications[idx]);setEditingApp(idx);setShowAddApp(true);};

  const last7=Array.from({length:7},(_,i)=>{const d=new Date(Date.now()-(6-i)*DAY_MS).toDateString();return{d,active:(streak.history||[]).includes(d)};});
  const bankByPattern=BANK_PATTERNS.map(pat=>({id:"bp_"+pat.replace(/\W/g,"_"),label:pat,accent:"#2563eb",problems:BANK.filter(q=>q.pattern===pat).map(q=>({...q,tag:q.pattern,difficulty:q.diff}))}));

  const filteredDrives=DRIVES.filter(d=>{
    const q=driveSearch.toLowerCase();
    const matchQ=!q||(d.co.toLowerCase().includes(q)||d.role.toLowerCase().includes(q)||d.loc.toLowerCase().includes(q));
    const matchT=driveType==="All"||d.type===driveType;
    const matchC=!driveMinCtc||!d.ctc||(d.ctc>=driveMinCtc);
    return matchQ&&matchT&&matchC;
  });

  const pipeline={
    applied:applications.length,
    oa:applications.filter(a=>["OA Done","OA Cleared","Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at Interview","Rejected at HR"].includes(a.currentStage)).length,
    interview:applications.filter(a=>["Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at HR"].includes(a.currentStage)).length,
    offered:applications.filter(a=>a.currentStage==="Offered").length,
  };

  if(!authChecked)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa"}}>Loading…</div>;
  if(!user)return<AuthScreen onAuth={setUser}/>;

  const NAV=[["home","🏠"],["tracker","DSA"],["starter","Starter"],["oa","OA Prep"],["bank","Bank"],["plan","Placement"]];

  return (
    <div style={{minHeight:"100vh",background:"#fafaf9",color:"#1c1c1c",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#f0ede8} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px}
        .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,250,249,.95);backdrop-filter:blur(12px);border-bottom:1px solid #e8e5e0}
        .nav-in{max-width:1120px;margin:0 auto;padding:0 20px;height:52px;display:flex;align-items:center;justify-content:space-between;gap:8px}
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
        .page{padding-top:52px}
        .inner{max-width:1120px;margin:0 auto;padding:32px 20px}
        .stitle{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;letter-spacing:-.5px;margin-bottom:18px}
        .card{background:#fff;border:1px solid #e8e5e0;border-radius:12px;padding:20px;margin-bottom:12px}
        .tblock{background:#fff;border:1px solid #e8e5e0;border-radius:11px;margin-bottom:9px;overflow:hidden}
        .thdr{display:flex;align-items:center;padding:14px 18px;cursor:pointer;gap:10px;transition:background .12s}
        .thdr:hover{background:#fafaf9}
        .tinfo{flex:1} .tname{font-size:13px;font-weight:600} .tlvl{font-size:10px;color:#bbb;margin-top:1px}
        .tr_{display:flex;align-items:center;gap:8px}
        .tmbar{width:46px;height:3px;background:#f0ede8;border-radius:2px;overflow:hidden}
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
        .ptag{font-size:9px;color:#bbb;background:#f5f3f0;padding:2px 6px;border-radius:4px;white-space:nowrap}
        .dchip{font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;white-space:nowrap}
        .nbtn{width:19px;height:19px;border-radius:4px;border:1.5px solid #e8e5e0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:9px;color:#bbb;flex-shrink:0;transition:all .12s}
        .nbtn:hover{border-color:#aaa;color:#555} .nbtn.has{border-color:#f9ca24;color:#d97706;background:#fffbeb}
        .lc{width:19px;height:19px;border-radius:4px;border:1.5px solid #e8e5e0;display:flex;align-items:center;justify-content:center;font-size:9px;color:#bbb;text-decoration:none;flex-shrink:0;transition:all .12s}
        .lc:hover{border-color:#f97316;color:#f97316}
        .ovbar{background:#fff;border:1px solid #e8e5e0;border-radius:11px;padding:16px;margin-bottom:14px}
        .ovbg{height:6px;background:#f0ede8;border-radius:3px}
        .filts{display:flex;gap:4px;flex-wrap:wrap}
        .fb{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:1.5px solid #e8e5e0;background:#fff;color:#666;font-family:'DM Sans';transition:all .15s}
        .fb.on{background:#1c1c1c;color:#fff;border-color:#1c1c1c}
        .sel{border:1.5px solid #e8e5e0;border-radius:8px;padding:8px 10px;font-size:12px;font-family:'DM Sans';background:#fff;color:#555;outline:none;cursor:pointer}
        .tab-row{display:flex;gap:0;border-bottom:2px solid #f0ede8;margin-bottom:20px}
        .tab-btn{padding:10px 20px;font-size:13px;font-weight:500;color:#aaa;cursor:pointer;border:none;background:transparent;border-bottom:2px solid transparent;margin-bottom:-2px;font-family:'DM Sans';transition:all .15s}
        .tab-btn.on{color:#1c1c1c;font-weight:600;border-bottom-color:#2563eb}
        .moverlay{position:fixed;inset:0;background:rgba(0,0,0,.3);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,.12)}
        .mta{width:100%;height:90px;border:1.5px solid #e8e5e0;border-radius:8px;padding:10px;font-size:12px;font-family:'DM Sans';resize:none;outline:none;color:#333;background:#fafaf9}
        .macts{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
        .mc{padding:7px 13px;border:1.5px solid #e8e5e0;border-radius:7px;background:transparent;font-size:12px;cursor:pointer;color:#666;font-family:'DM Sans'}
        .ms{padding:7px 15px;border:none;border-radius:7px;background:#1c1c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans'}
        .drive-row{display:flex;align-items:flex-start;padding:11px 16px;gap:10px;border-bottom:1px solid #f9f7f5;cursor:pointer;transition:background .1s}
        .drive-row:hover{background:#fafaf9}
        .drive-exp{padding:10px 16px 14px;background:#fafaf9;border-bottom:1px solid #f0ede8;font-size:12px;color:#555;line-height:1.7}
      `}</style>

      <nav className="nav">
        <div className="nav-in">
          <div className="logo" onClick={()=>setPage("home")}>Algo<span>Vault</span></div>
          <div className="nav-c">
            {NAV.map(([id,lbl])=>(
              <button key={id} className={`nl${page===id?" on":""}`} onClick={()=>setPage(id)}>
                {lbl}{(id==="oa"||id==="starter")&&!isPremium?" 🔒":""}
              </button>
            ))}
          </div>
          <div className="nav-r">
            {isPremium&&<span style={{fontSize:10,background:"#ecfdf5",color:"#059669",border:"1px solid #a7f3d0",padding:"2px 8px",borderRadius:20,fontWeight:600}}>Premium ✓</span>}
            <div className={`sdot${syncing?" sy":""}`}/>
            <button className="soBtn" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="page">

        {/* HOME */}
        {page==="home"&&(
          <div className="inner">
            <div style={{paddingTop:20,paddingBottom:28}}>
              <div style={{fontSize:11,fontWeight:600,color:"#2563eb",background:"#eff6ff",padding:"3px 11px",borderRadius:20,display:"inline-block",marginBottom:18}}>📌 Chitkara Placement Prep</div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,lineHeight:1.06,letterSpacing:-2}}>One vault.<br/><span style={{color:"#2563eb"}}>Everything</span> you need.</h1>
              <div style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["tracker","DSA Tracker"],["starter","Starter Sheet"],["oa","OA Prep"],["bank","Question Bank"],["plan","Placement Intel"]].map(([p,l])=>(
                  <button key={p} onClick={()=>setPage(p)}
                    style={{padding:"8px 16px",background:p==="starter"?"#1c1c1c":"transparent",color:p==="starter"?"#fff":"#555",border:p==="starter"?"none":"1.5px solid #ddd",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
                    {l} →
                  </button>
                ))}
              </div>
            </div>

            {!isPremium&&(
              <div className="card" style={{background:"linear-gradient(135deg,#f8f4ff,#eff6ff)",border:"1px solid #e9d5ff",marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:6,color:"#7c3aed"}}>🔒 Unlock Premium — ₹49 one-time</div>
                <div style={{fontSize:12,color:"#666",marginBottom:10}}>Get full Starter Sheet + OA Prep patterns + 80+ problems</div>
                <div style={{fontSize:12,color:"#92400e",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"8px 14px"}}>
                  📩 Pay via UPI → send screenshot on WhatsApp → access within 1 hour
                </div>
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:9,marginBottom:14}}>
              {[
                {l:"DSA Solved",v:totalDone,t:allProblems.length,c:"#2563eb"},
                {l:"Starter Done",v:totalStarterDone,t:STARTER_FREE.flatMap(t=>t.problems).length+STARTER_LOCKED.flatMap(t=>t.problems).length,c:"#059669"},
                {l:"OA Patterns",v:totalLearnDone,t:LEARN_PATTERNS.reduce((s,p)=>s+p.problems.length,0),c:"#7c3aed"},
                {l:"Bank Solved",v:totalBankDone,t:BANK.length,c:"#9333ea"},
                {l:"Streak 🔥",v:streak.count,c:"#d97706"},
                {l:"Offers 🎉",v:applications.filter(a=>a.currentStage==="Offered").length,c:"#059669"},
              ].map(({l,v,t,c})=>(
                <div key={l} className="card" style={{padding:"14px 16px"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:c,lineHeight:1}}>
                    {v}{t?<span style={{fontSize:12,color:"#ddd",fontWeight:400}}>/{t}</span>:""}
                  </div>
                  <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{l}</div>
                  {t&&<div style={{height:3,background:"#f0ede8",borderRadius:2,marginTop:7}}><div style={{height:"100%",width:`${(v/t)*100}%`,background:c,borderRadius:2}}/></div>}
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:13,color:todayLog.done?"#059669":"#1c1c1c"}}>📝 Today's Plan {todayLog.done&&"✅"}</div>
                <div style={{fontSize:10,color:"#bbb"}}>{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'})}</div>
              </div>
              <textarea value={logDraft} onChange={e=>setLogDraft(e.target.value)} onBlur={e=>saveLog(e.target.value,todayLog.done)}
                placeholder={"Write today's 3 tasks...\n1. LC 704 Binary Search\n2. Starter Sheet — Arrays\n3. Apply to Razorpay"}
                style={{width:"100%",minHeight:90,border:"1.5px solid #e8e5e0",borderRadius:8,padding:"10px 12px",fontSize:12,fontFamily:"'DM Sans'",resize:"vertical",outline:"none",lineHeight:1.7,color:"#333",background:todayLog.done?"#f0fdf4":"#fafaf9"}}/>
              <div style={{display:"flex",gap:8,marginTop:8,justifyContent:"flex-end"}}>
                <button onClick={()=>saveLog(logDraft,false)} style={{padding:"5px 12px",background:"transparent",border:"1.5px solid #e8e5e0",borderRadius:7,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans'",color:"#555"}}>Save</button>
                <button onClick={()=>saveLog(logDraft,!todayLog.done)} style={{padding:"5px 12px",background:todayLog.done?"#dc2626":"#059669",border:"none",borderRadius:7,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans'",color:"#fff",fontWeight:600}}>
                  {todayLog.done?"Unmark":"✅ Done"}
                </button>
              </div>
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:12,display:"flex",justifyContent:"space-between"}}>
                <span>📋 Pipeline</span>
                <span style={{fontSize:11,color:"#2563eb",cursor:"pointer"}} onClick={()=>{setPage("plan");setPlanTab("mylog");}}>View all →</span>
              </div>
              <div style={{display:"flex",gap:0}}>
                {[["Applied",pipeline.applied,"#2563eb"],["OA",pipeline.oa,"#9333ea"],["Interview",pipeline.interview,"#d97706"],["Offered 🎉",pipeline.offered,"#059669"]].map(([l,v,c],i,arr)=>(
                  <div key={l} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRight:i<arr.length-1?"1px solid #f0ede8":"none"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:v>0?c:"#ddd"}}>{v}</div>
                    <div style={{fontSize:10,color:"#aaa",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Last 7 Days</div>
              <div style={{display:"flex",gap:8}}>
                {last7.map(({d,active},i)=>{
                  const lbl=["Su","Mo","Tu","We","Th","Fr","Sa"][new Date(d).getDay()];
                  return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{width:24,height:24,borderRadius:6,background:active?"#2563eb":"#f0ede8"}}/>
                    <div style={{fontSize:10,color:"#bbb"}}>{lbl}</div>
                  </div>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* DSA TRACKER */}
        {page==="tracker"&&(
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div className="stitle" style={{marginBottom:0}}>DSA Tracker</div>
              <div className="filts">{["All","Easy","Medium","Hard"].map(f=><button key={f} className={`fb${filterDiff===f?" on":""}`} onClick={()=>setFilterDiff(f)}>{f}</button>)}</div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
                <span style={{fontSize:12,color:"#666"}}>{totalDone}/{allProblems.length} solved</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalDone/allProblems.length)*100)}%</span>
              </div>
              <div className="ovbg"><div style={{height:"100%",width:`${(totalDone/allProblems.length)*100}%`,background:"#2563eb",borderRadius:3,transition:"width .6s"}}/></div>
            </div>
            {TOPICS.map(topic=>{
              const filtered=filterDiff==="All"?topic:{...topic,problems:topic.problems.filter(p=>p.difficulty===filterDiff)};
              if(!filtered.problems.length)return null;
              return <TopicBlock key={topic.id} topic={filtered} doneMap={done} onToggle={markDone}
                progMap={inProgress} onToggleProg={markProg} notesMap={notes} onNote={openNote}
                showDiff={true} expanded={!!topicExp[topic.id]} onExpand={()=>setTopicExp(e=>({...e,[topic.id]:!e[topic.id]}))} />;
            })}
          </div>
        )}

        {/* STARTER SHEET */}
        {page==="starter"&&(
          <StarterSheetPage isPremium={isPremium} starterDone={starterDone} setStarterDone={setStarterDone}
            persist={persist} done={done} inProgress={inProgress} notes={notes} streak={streak}
            adsDone={adsDone} bankDone={bankDone} dayStatus={dayStatus} applications={applications} learnDone={learnDone}/>
        )}

        {/* OA PREP */}
        {page==="oa"&&(
          <OAPrepPage isPremium={isPremium} learnDone={learnDone} setLearnDone={setLearnDone}
            persist={persist} done={done} inProgress={inProgress} notes={notes} streak={streak}
            adsDone={adsDone} bankDone={bankDone} dayStatus={dayStatus} applications={applications} starterDone={starterDone}/>
        )}

        {/* QUESTION BANK */}
        {page==="bank"&&(
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div><div className="stitle" style={{marginBottom:3}}>Question Bank</div><div style={{fontSize:11,color:"#aaa"}}>50 most asked · {totalBankDone}/50 done</div></div>
              <div className="filts">{["All",...BANK_PATTERNS].map(f=><button key={f} className={`fb${bankFilter===f?" on":""}`} onClick={()=>setBankFilter(f)} style={{fontSize:10}}>{f}</button>)}</div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
                <span style={{fontSize:12,color:"#666"}}>{totalBankDone}/50</span>
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

        {/* PLACEMENT */}
        {page==="plan"&&(
          <div className="inner">
            <div className="stitle" style={{marginBottom:16}}>Placement Intel</div>
            <div className="tab-row">
              <button className={`tab-btn${planTab==="drives"?" on":""}`} onClick={()=>setPlanTab("drives")}>🏢 Drive Database <span style={{fontSize:10,color:"#bbb",marginLeft:4}}>{DRIVES.length}</span></button>
              <button className={`tab-btn${planTab==="mylog"?" on":""}`} onClick={()=>setPlanTab("mylog")}>📋 My Applications <span style={{fontSize:10,color:"#bbb",marginLeft:4}}>{applications.length}</span></button>
            </div>

            {planTab==="drives"&&(
              <>
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
                  <input value={driveSearch} onChange={e=>setDriveSearch(e.target.value)} placeholder="Search company, role, location…"
                    style={{flex:"1 1 200px",padding:"8px 12px",border:"1.5px solid #e8e5e0",borderRadius:8,fontSize:12,fontFamily:"'DM Sans'",outline:"none"}}/>
                  <select className="sel" value={driveType} onChange={e=>setDriveType(e.target.value)}>{DRIVE_TYPES.map(t=><option key={t}>{t}</option>)}</select>
                  <select className="sel" value={driveMinCtc} onChange={e=>setDriveMinCtc(Number(e.target.value))}>
                    <option value={0}>Any CTC</option><option value={8}>8+ LPA</option><option value={12}>12+ LPA</option><option value={20}>20+ LPA</option>
                  </select>
                  <span style={{fontSize:11,color:"#aaa"}}>{filteredDrives.length} drives</span>
                </div>
                <div className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto auto",gap:0,padding:"8px 16px",background:"#f9f7f5",borderBottom:"1px solid #f0ede8",fontSize:10,fontWeight:600,color:"#aaa",letterSpacing:.5}}>
                    <span>COMPANY · ROLE</span><span>LOCATION · DATE</span><span style={{textAlign:"right"}}>CTC</span><span style={{textAlign:"right",marginLeft:12}}>PLACED</span>
                  </div>
                  <div style={{maxHeight:500,overflowY:"auto"}}>
                    {filteredDrives.map((d,i)=>(
                      <div key={i}>
                        <div className="drive-row" onClick={()=>setExpandedDrive(expandedDrive===i?null:i)}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:600}}>{d.co}</div>
                            <div style={{fontSize:11,color:"#888",marginTop:1}}>{d.role}</div>
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:11,color:"#555"}}>{d.loc}</div>
                            <div style={{fontSize:10,color:"#bbb"}}>{d.dt}</div>
                          </div>
                          <div style={{textAlign:"right",fontSize:12,fontWeight:700,color:d.ctc>=15?"#059669":d.ctc>=10?"#d97706":"#555",marginRight:12,flexShrink:0}}>{d.ctc?`₹${d.ctc}L`:"—"}</div>
                          <div style={{textAlign:"right",fontSize:11,color:d.placed>0?"#2563eb":"#ddd",minWidth:28,flexShrink:0}}>{d.placed!=null?d.placed:"—"}</div>
                        </div>
                        {expandedDrive===i&&(
                          <div className="drive-exp">
                            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:d.rem?8:0}}>
                              {d.type&&<span><b>Type:</b> {d.type}</span>}
                              {d.stip&&<span><b>Stipend:</b> ₹{d.stip}K/mo</span>}
                              {d.placed!=null&&<span><b>Placed:</b> {d.placed}</span>}
                            </div>
                            {d.rem&&<div style={{background:"#fff3cd",padding:"6px 10px",borderRadius:6,fontSize:11,color:"#856404",borderLeft:"3px solid #ffc107"}}>💡 {d.rem}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredDrives.length===0&&<div style={{padding:"24px 16px",fontSize:12,color:"#aaa",textAlign:"center"}}>No drives match</div>}
                  </div>
                </div>
              </>
            )}

            {planTab==="mylog"&&(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#555"}}>{applications.length} applications</div>
                  <button onClick={()=>{setEditingApp(null);setAppForm({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});setShowAddApp(true);}}
                    style={{padding:"7px 14px",background:"#1c1c1c",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
                    + Add
                  </button>
                </div>
                {applications.length===0?(
                  <div className="card" style={{textAlign:"center",padding:"32px 20px",color:"#aaa"}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>No applications yet</div>
                  </div>
                ):(
                  <div className="card" style={{padding:0,overflow:"hidden"}}>
                    {applications.map((app,idx)=>{
                      const stColor=STAGE_COLORS[app.currentStage]||"#aaa";
                      return (
                        <div key={app.id||idx} style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr auto auto auto",gap:0,padding:"11px 16px",borderBottom:"1px solid #f9f7f5",alignItems:"center"}}>
                          <div style={{fontSize:13,fontWeight:600}}>{app.company}</div>
                          <div style={{fontSize:12,color:"#666"}}>{app.role||"—"}</div>
                          <div><span style={{fontSize:10,fontWeight:600,color:stColor,background:stColor+"18",padding:"3px 8px",borderRadius:20}}>{app.currentStage}</span></div>
                          <div style={{fontSize:11,color:"#bbb",marginRight:8}}>{app.dateApplied||"—"}</div>
                          <button onClick={()=>editApp(idx)} style={{background:"transparent",border:"1px solid #e8e5e0",borderRadius:5,padding:"3px 8px",fontSize:10,cursor:"pointer",color:"#666",marginRight:4}}>Edit</button>
                          <button onClick={()=>deleteApp(idx)} style={{background:"transparent",border:"1px solid #fecaca",borderRadius:5,padding:"3px 8px",fontSize:10,cursor:"pointer",color:"#dc2626"}}>Del</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ADD APP MODAL */}
      {showAddApp&&(
        <div className="moverlay" onClick={()=>setShowAddApp(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>{editingApp!==null?"Edit":"Log Application"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["Company *","company","text"],["Role","role","text"],["Date Applied","dateApplied","date"]].map(([lbl,key,type])=>(
                <div key={key}>
                  <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4,fontWeight:600}}>{lbl}</label>
                  <input type={type} value={appForm[key]} onChange={e=>setAppForm(f=>({...f,[key]:e.target.value}))}
                    style={{width:"100%",padding:"8px 10px",border:"1.5px solid #e8e5e0",borderRadius:7,fontSize:12,fontFamily:"'DM Sans'",outline:"none",background:"#fff"}}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4,fontWeight:600}}>Platform</label>
                <select value={appForm.platform} onChange={e=>setAppForm(f=>({...f,platform:e.target.value}))} className="sel" style={{width:"100%"}}>
                  {PLATFORMS.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4,fontWeight:600}}>Current Stage</label>
                <select value={appForm.currentStage} onChange={e=>setAppForm(f=>({...f,currentStage:e.target.value}))} className="sel" style={{width:"100%",borderColor:STAGE_COLORS[appForm.currentStage]+"88",color:STAGE_COLORS[appForm.currentStage]}}>
                  {APP_STAGES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11,color:"#888",display:"block",marginBottom:4,fontWeight:600}}>Notes</label>
                <textarea className="mta" value={appForm.notes} onChange={e=>setAppForm(f=>({...f,notes:e.target.value}))} placeholder="Any notes…"/>
              </div>
            </div>
            <div className="macts">
              <button className="mc" onClick={()=>setShowAddApp(false)}>Cancel</button>
              <button className="ms" onClick={saveApp} disabled={!appForm.company.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* NOTE MODAL */}
      {noteOpen&&(()=>{
        const prob=allProblems.find(p=>p.id===noteOpen);
        return <div className="moverlay" onClick={saveNote}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>Notes — {prob?.name}</div>
            <textarea className="mta" style={{height:110}} value={noteText} onChange={e=>setNoteText(e.target.value)} autoFocus/>
            <div className="macts"><button className="mc" onClick={()=>setNoteOpen(null)}>Cancel</button><button className="ms" onClick={saveNote}>Save</button></div>
          </div>
        </div>;
      })()}
    </div>
  );
}