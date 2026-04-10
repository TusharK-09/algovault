import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DRIVES = [{"co":"Sprinkle Data","dt":"17 Mar 2023","role":"Data Analyst","loc":"Bangalore","ctc":7.5,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Iztri","dt":"17 Mar 2023","role":"Front end Developer","loc":"Bangalore","ctc":6.0,"stip":15,"placed":null,"rem":"2024 Startup and 10hr Office","type":"Startup"},{"co":"JP Morgan Chase (Pool Hiring)","dt":"24 Mar 2024","role":"Summer Internship","loc":"Bangalore, Mumbai","ctc":19.8,"stip":75,"placed":6,"rem":"Intership on the Basis of Hackathon (Full Day Hackathon On Site)","type":"MnC"},{"co":"Microsoft (Pool Hiring)","dt":"23 Aug 2024","role":"Summer Internship -Software Developer","loc":"Bangalore, Hyderabad","ctc":50.0,"stip":125,"placed":3,"rem":"Top 100 Students CGPA Sorted (Batch 22 - Above 9.4)","type":"MnC"},{"co":"UiPath (Only Female Students)","dt":"23 Aug 2024","role":"Summer Internship","loc":"Bangalore","ctc":null,"stip":150,"placed":null,"rem":"Very Tough Questions","type":"MnC"},{"co":"Microsoft (Pool Hiring)","dt":"17 Sep 2024","role":"Summer Internship - Tech Consultant","loc":"Bangalore, Hyderabad","ctc":null,"stip":25,"placed":2,"rem":"","type":"MnC"},{"co":"Google (Off Campus - Diversity Hiring)","dt":"28 Sep 2024","role":"Summer Internship","loc":"Bangalore","ctc":null,"stip":125,"placed":1,"rem":"Under Google Girl Program","type":"MnC"},{"co":"Service Now (Only Female Students)","dt":"15 Nov 2024","role":"Associate Software Engineer","loc":"Hyderabad","ctc":43.0,"stip":89,"placed":6,"rem":"Very Easy to Crack (Just Asked Basic Puzzles, Basic OOPS and Basic Coding Ques)","type":"MnC"},{"co":"JP Morgan Chase (2nd Time)","dt":"03 Jan 2025","role":"Software Engineering Program","loc":"Bangalore, Mumbai","ctc":19.8,"stip":75,"placed":2,"rem":"CGPA Based Sorting (Above 8.5) - A Tip please submit your paper after 30 minutes no matter you did it early or took the whole time 2 from 4th year were selected and 7 for Summer Internship","type":"MnC"},{"co":"Service Now (Only Female Students)","dt":"15 Jan 2025","role":"Software Engineer Intern","loc":"Bangalore, Gurugram","ctc":15.0,"stip":40,"placed":28,"rem":"Based on 10th and 12th Boards (85 + Average)","type":"MnC"},{"co":"Fico","dt":"15 Jan 2025","role":"Devops Engineering Enablement - Intern","loc":"Bangalore","ctc":11.2,"stip":30,"placed":2,"rem":"Selection on the Basis of Time Submission in an Virtual Open Book OA (Tab Switching and no Camera) - Very Bad Shortlisting","type":""},{"co":"Fico","dt":"15 Jan 2025","role":"Software Developer Intern","loc":"Bangalore","ctc":9.0,"stip":34,"placed":6,"rem":"LIterally They came to campus after 2 months they released their forms","type":""},{"co":"Orange Business","dt":"15 Jan 2025","role":"Software Engineer Intern","loc":"Gurugram","ctc":8.0,"stip":20,"placed":7,"rem":"Easy Interview, Might increase the CTC if you are selected","type":"MnC"},{"co":"PlaySimple Games","dt":"15 Jan 2025","role":"Associate Software Engineer","loc":"Bangalore","ctc":14.0,"stip":30,"placed":2,"rem":"Based on 10th and 12th Boards (80+ Both)","type":"Startup"},{"co":"Optmyzr","dt":"17 Jan 2025","role":"Software Development Engineer Testing","loc":"Hyderabad","ctc":30.0,"stip":35,"placed":null,"rem":"Weired Luck Based Process No Offer After HR Round Literally Ghosted After that","type":"MnC"},{"co":"Optmyzr","dt":"17 Jan 2025","role":"Software Development Engineer","loc":"Hyderabad","ctc":35.0,"stip":45,"placed":null,"rem":"Weired Luck Based Process No Offer After HR Round Literally Ghosted After that","type":"MnC"},{"co":"Neilsen (2nd Time)","dt":"18 Jan 2025","role":"Software Engineer Intern","loc":"Bangalore","ctc":15.0,"stip":40,"placed":24,"rem":"Based on 10th and 12th Boards (85+ Average)","type":"MnC"},{"co":"Invoice Cloud","dt":"21 Jan 2025","role":"Trainee Software Engineer","loc":"Hyderabad","ctc":8.0,"stip":40,"placed":10,"rem":"Majorily Development Based","type":"International Startup"},{"co":"Otipy","dt":"23 Jan 2025","role":"Software Developer Intern","loc":"Gurugram","ctc":12.0,"stip":25,"placed":6,"rem":"Based on 10th and 12th Boards (90+ Average)","type":"Startup"},{"co":"Juspay","dt":"23 Jan 2025","role":"Software Developer Engineering","loc":"Bangalore","ctc":27.0,"stip":40,"placed":4,"rem":"Harshpreet (Lets Help Co Founder) Got Placed in it","type":"MnC"},{"co":"Juspay","dt":"23 Jan 2025","role":"Product Engineer","loc":"Bangalore","ctc":21.0,"stip":40,"placed":1,"rem":"One of the Toughest Companies to Crack in Chitkara","type":"MnC"},{"co":"Telaverge Communications","dt":"24 Jan 2025","role":"Software Engineer - Research and Development","loc":"Bangalore","ctc":7.0,"stip":20,"placed":1,"rem":"Self Projects Based","type":"International Startup"},{"co":"Vivnovation","dt":"24 Jan 2025","role":"Customer/Tech Support - Intern","loc":"Remote","ctc":20.0,"stip":15,"placed":10,"rem":"Call Center & Large gap b/w Stipend and CTC (Not good)","type":"Miscellaneous"},{"co":"Wissen Technology","dt":"26 Jan 2025","role":"Tech Intern","loc":"Bangalore","ctc":11.0,"stip":25,"placed":6,"rem":"Code on Pen and Paper in Coding Assessment","type":"International Startup"},{"co":"PlaySimple Games","dt":"27 Jan 2025","role":"Associate Business Analyst","loc":"Bangalore","ctc":14.0,"stip":30,"placed":3,"rem":"Based on 10th and 12th Boards (85+ Average), Tough Interviews.","type":"Startup"},{"co":"Pando","dt":"28 Jan 2025","role":"Business Development Respresentative","loc":"Chennai","ctc":8.0,"stip":25,"placed":null,"rem":"Company Ghosted","type":"International Startup"},{"co":"Caelius Consulting","dt":"03 Feb 2025","role":"Technical Associate","loc":"Mohali, Hyderabad","ctc":12.0,"stip":15,"placed":6,"rem":"Very Iffy Company with Undefined Role","type":"International Startup"},{"co":"Gokloud","dt":"05 Feb 2025","role":"Junior Full Stack Developer","loc":"Bangalore","ctc":9.0,"stip":25,"placed":9,"rem":"They hired 6 Girls 3 boys in which after 3 months they fired those 3 boys stating it as a performace issue but nobody knows the truth","type":"Startup"},{"co":"Guenstiger (eLitmus)","dt":"06 Feb 2025","role":"Software Engineer","loc":"Bangalore","ctc":10.0,"stip":33,"placed":5,"rem":"Easy Interview Questions","type":"Normal"},{"co":"WNS (Only For CSE AI)","dt":"08 Feb 2025","role":"Apprentice","loc":"Gurugram","ctc":6.7,"stip":35,"placed":6,"rem":"Easy to Crack (Medium OA and Easy Interview)","type":"MnC"},{"co":"Samsung Electro Mechanics","dt":"10 Feb 2025","role":"Software Developer Intern","loc":"Bangalore","ctc":10.0,"stip":35,"placed":null,"rem":"Employbility Scores 150+. (For Batch 2022 ) - Q3","type":"MnC"},{"co":"Phillips (Only Female Students)","dt":"12 Feb 2025","role":"Software Intern","loc":"Bangalore","ctc":11.5,"stip":45,"placed":10,"rem":"Diversity Hiring","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"Machine Learning","loc":"Bangalore","ctc":9.0,"stip":35,"placed":1,"rem":"Open For All","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"C# .Net / WPF (Full Stack Developer)","loc":"Bangalore","ctc":9.0,"stip":35,"placed":null,"rem":"Open For All","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"UI/UX Developer","loc":"Bangalore","ctc":9.0,"stip":35,"placed":null,"rem":"Open For All","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"VC++ MFC (Full Stack Developer)","loc":"Bangalore","ctc":9.0,"stip":35,"placed":1,"rem":"Open For All","type":"MnC"},{"co":"Samsung Electro Mechanics (2nd Time)","dt":"13 Feb 2025","role":"Quality Control (Automation)","loc":"Bangalore","ctc":9.0,"stip":35,"placed":1,"rem":"Open For All","type":"MnC"},{"co":"Bajaj Finserv","dt":"13 Feb 2025","role":"Full Stack and Sales Force Intern","loc":"Pune","ctc":12.0,"stip":35,"placed":14,"rem":"Hackathon Based","type":"Normal"},{"co":"Clear Feed","dt":"13 Feb 2025","role":"SDE Intern","loc":"Bangalore","ctc":11.0,"stip":50,"placed":null,"rem":"They Ghosted and opened their jobs at Linked in After that","type":"Startup"},{"co":"Techolution","dt":"13 Feb 2025","role":"Project Management Intern","loc":"Hyderabad","ctc":8.0,"stip":30,"placed":null,"rem":"","type":"International Startup"},{"co":"Techolution","dt":"13 Feb 2025","role":"AI Intern","loc":"Hyderabad","ctc":8.0,"stip":30,"placed":null,"rem":"","type":"International Startup"},{"co":"Techolution","dt":"13 Feb 2025","role":"Python Developer Intern","loc":"Hyderabad","ctc":8.0,"stip":30,"placed":null,"rem":"","type":"International Startup"},{"co":"Fico (2nd Time)","dt":"14 Feb 2025","role":"Cloud Engineering Intern","loc":"Bangalore","ctc":9.0,"stip":30,"placed":null,"rem":"They came again for this role with better offer and less specifications","type":""},{"co":"Tech Mahindra","dt":"14 Feb 2025","role":"Developer / Software Engineer","loc":"Mohali, Hyderabad","ctc":4.5,"stip":30,"placed":null,"rem":"","type":"Normal"},{"co":"HelpShift","dt":"17 Feb 2025","role":"Technical Support and Implementation Engineer","loc":"Pune","ctc":8.5,"stip":35,"placed":5,"rem":"","type":"International Startup"},{"co":"CredResolve","dt":"17 Feb 2025","role":"Associate Product Manager Interns","loc":"Gurugram","ctc":7.0,"stip":15,"placed":1,"rem":"","type":"Startup"},{"co":"CredResolve","dt":"17 Feb 2025","role":"Backend Developer","loc":"Gurugram","ctc":7.0,"stip":15,"placed":1,"rem":"","type":"Startup"},{"co":"CredResolve","dt":"17 Feb 2025","role":"Frontend Developer","loc":"Gurugram","ctc":7.0,"stip":15,"placed":2,"rem":"","type":"Startup"},{"co":"CredResolve","dt":"17 Feb 2025","role":"Flutter Developer","loc":"Gurugram","ctc":7.0,"stip":15,"placed":1,"rem":"","type":"Startup"},{"co":"eLitmus","dt":"17 Feb 2025","role":"Software Developer","loc":"Bangalore","ctc":12.1,"stip":29,"placed":null,"rem":"","type":"Normal"},{"co":"eLitmus","dt":"17 Feb 2025","role":"Associate Consultant","loc":"Bangalore","ctc":9.0,"stip":29,"placed":null,"rem":"","type":"Normal"},{"co":"Increff","dt":"17 Feb 2025","role":"Professional Services Team","loc":"Bangalore","ctc":14.0,"stip":29,"placed":2,"rem":"Diveristy Hiring - Not Mentioned (107 Shortlisted in Batch 22 All are Femals)","type":"International Startup"},{"co":"Pando (2nd Time)","dt":"17 Feb 2025","role":"Customer Success Consultant","loc":"Chennai","ctc":8.0,"stip":25,"placed":null,"rem":"They Ghosted for the 2nd Time too","type":"International Startup"},{"co":"Dell (Internship Only)","dt":"20 Feb 2025","role":"Data Engineer","loc":"Bangalore","ctc":null,"stip":35,"placed":1,"rem":"","type":"MnC"},{"co":"Ikarus 3D","dt":"20 Feb 2025","role":"Software Developer Associate","loc":"Mohali","ctc":12.0,"stip":20,"placed":4,"rem":"6 Hours Hackathon for building Web Project in Realtime","type":"Startup"},{"co":"Emerson (NI - National Instruments)","dt":"21 Feb 2025","role":"Software Engineer Intern","loc":"Bangalore","ctc":14.7,"stip":45,"placed":2,"rem":"Worst Placement Process - They literally gave Wrong Boiler plate in OA and asked System design in HR round for a Male candidate while Normal HR ques for Female Candidate","type":"MnC"},{"co":"BeeHyv","dt":"21 Feb 2025","role":"Developer","loc":"Hyderabad","ctc":4.0,"stip":25,"placed":3,"rem":"","type":"International Startup"},{"co":"BeeHyv","dt":"21 Feb 2025","role":"Tech Support","loc":"Hyderabad","ctc":4.0,"stip":25,"placed":2,"rem":"","type":"International Startup"},{"co":"BeeHyv","dt":"21 Feb 2025","role":"Developer Testing","loc":"Hyderabad","ctc":4.0,"stip":25,"placed":2,"rem":"","type":"International Startup"},{"co":"1DigitalStack","dt":"22 Feb 2025","role":"Bussiness Intern","loc":"Gurugram","ctc":6.0,"stip":20,"placed":1,"rem":"","type":"International Startup"},{"co":"Consultadd","dt":"25 Feb 2025","role":"Software Engineer Intern","loc":"Pune","ctc":8.0,"stip":40,"placed":null,"rem":"Founded to be a Fraud Company, Can't be proved Ofcourse Please Be aware","type":"Miscellaneous"},{"co":"24/7","dt":"26 Feb 2025","role":"Software Developer Intern","loc":"Pune","ctc":5.0,"stip":25,"placed":3,"rem":"","type":"International Startup"},{"co":"DDN","dt":"26 Feb 2025","role":"Interns","loc":"Pune","ctc":7.5,"stip":40,"placed":10,"rem":"7.5 is base salary Around 10 LPA is CTC (They literally selected 12 candidates for final offer then rejected two of them after that)","type":"MnC"},{"co":"SalesCode.ai","dt":"28 Feb 2025","role":"Software Engineer Trainee (Full Stack Developer)","loc":"Gurugram","ctc":12.6,"stip":null,"placed":2,"rem":"Stipend is Actually Not Mentioned Anywhere","type":"Startup"},{"co":"SalesCode.ai","dt":"28 Feb 2025","role":"Business Analyst","loc":"Gurugram","ctc":12.6,"stip":null,"placed":2,"rem":"Stipend is Actually Not Mentioned Anywhere","type":"Startup"},{"co":"SalesCode.ai","dt":"28 Feb 2025","role":"Technical Project Associate","loc":"Gurugram","ctc":12.6,"stip":null,"placed":null,"rem":"Stipend is Actually Not Mentioned Anywhere","type":"Startup"},{"co":"SalesCode.ai","dt":"28 Feb 2025","role":"Software Test Engineer Trainee","loc":"Gurugram","ctc":12.6,"stip":null,"placed":2,"rem":"Stipend is Actually Not Mentioned Anywhere","type":"Startup"},{"co":"SalesCode.ai","dt":"28 Feb 2025","role":"Global Business Developer","loc":"Gurugram","ctc":12.6,"stip":null,"placed":null,"rem":"Stipend is Actually Not Mentioned Anywhere","type":"Startup"},{"co":"GreyB","dt":"28 Feb 2025","role":"Software Developer Engineering Testing","loc":"Mohali","ctc":7.0,"stip":20,"placed":2,"rem":"","type":"International Startup"},{"co":"Iris Bussiness Services","dt":"04 Mar 2025","role":"Developer / Software Engineer","loc":"Surat","ctc":7.0,"stip":25,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Iris Bussiness Services","dt":"04 Mar 2025","role":"Sales Representative","loc":"Surat","ctc":7.0,"stip":25,"placed":1,"rem":"","type":"Miscellaneous"},{"co":"Alert Enterprise","dt":"04 Mar 2025","role":"Devops, Quality Management, Customer Success","loc":"Chandigarh","ctc":6.0,"stip":20,"placed":null,"rem":"They came again with better offer","type":"International Startup"},{"co":"Rapidise","dt":"04 Mar 2025","role":"Customer/Tech Support","loc":"Ahmedabad","ctc":6.0,"stip":25,"placed":4,"rem":"","type":"International Startup"},{"co":"WNS (2nd Time Open for All)","dt":"04 Mar 2025","role":"Interns","loc":"Gurugram","ctc":6.7,"stip":25,"placed":1,"rem":"2nd Time But Open to All","type":"MnC"},{"co":"Northern Arc","dt":"04 Mar 2025","role":"Associate Technology","loc":"Bangalore","ctc":7.0,"stip":24,"placed":null,"rem":"ELitmus (Below 95% Above 85 - 87%) - 160 Students were shortlisted - They literally selected No One","type":"Miscellaneous"},{"co":"Incentius","dt":"04 Mar 2025","role":"Bussiness and Solution Developer Intern","loc":"Pune","ctc":6.5,"stip":15,"placed":1,"rem":"","type":"Normal"},{"co":"QuriousBit Games","dt":"04 Mar 2025","role":"Associate Software Engineer","loc":"Bangalore","ctc":8.0,"stip":33,"placed":1,"rem":"10th and 12th - 85% and CGPA 8.5 and Elitmus","type":"Startup"},{"co":"FICO (3rd Time)","dt":"05 Mar 2025","role":"Software Engineer, Software Quality Assurance, Cyber","loc":"Bangalore","ctc":11.2,"stip":30,"placed":10,"rem":"They Literally Rejected 20 Students out of 30 after taking HR Round on the basis of Round - UI Site Drawing with Pen and Paper (Round 3 of FICO)","type":"MnC"},{"co":"Spyne","dt":"05 Mar 2025","role":"Software Engineer Intern","loc":"Gurugram","ctc":10.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"eLitmus (2nd Time)","dt":"05 Mar 2025","role":"Associate Consultant","loc":"Bangalore","ctc":9.0,"stip":29,"placed":null,"rem":"","type":"Normal"},{"co":"Procol","dt":"05 Mar 2025","role":"Software Engineer","loc":"Gurugram","ctc":10.0,"stip":35,"placed":5,"rem":"Top 30 Employbility Test  (181 was cutoff) (Only 10 out of 30 Passed the test so Company Blacklisted the college then out of no where they came and took Interview of 4)","type":"International Startup"},{"co":"Rippling (Internship Only)","dt":"05 Mar 2025","role":"Frontend Role","loc":"Bangalore","ctc":null,"stip":100,"placed":5,"rem":"Frontend Online Assessments (Easy but lengthy)","type":"MnC"},{"co":"1DigitalStack (2nd Time)","dt":"06 Mar 2025","role":"Database Developer Role","loc":"Gurugram","ctc":7.0,"stip":25,"placed":null,"rem":"10th and 12th - 80% and CGPA 9 Above","type":"International Startup"},{"co":"PeopleHum Technologies","dt":"06 Mar 2025","role":"Software Engineering Intern","loc":"Bangalore","ctc":7.0,"stip":28,"placed":3,"rem":"10th and 12th - 80% and CGPA 8 Above","type":"MnC"},{"co":"Varaha","dt":"08 Mar 2025","role":"Multiple Roles","loc":"Bangalore","ctc":10.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Plum","dt":"09 Mar 2025","role":"Multiple Roles","loc":"Bangalore","ctc":7.0,"stip":null,"placed":10,"rem":"","type":"Startup"},{"co":"FICO (4th Time)","dt":"10 Mar 2025","role":"Cloud Engineering - GTS -Intern","loc":"Bangalore","ctc":11.2,"stip":30,"placed":1,"rem":"","type":"MnC"},{"co":"FICO (5th Time)","dt":"10 Mar 2025","role":"Devops, SRE, Cloud","loc":"Bangalore","ctc":11.2,"stip":30,"placed":3,"rem":"They randomly selected students directly for Interview after OA and Students hadn't known about it but still they selected only 2 one is for SRE and other is for Cloud","type":"MnC"},{"co":"FICO (6th Time)","dt":"12 Mar 2025","role":"Software Engineering","loc":"Bangalore","ctc":11.2,"stip":30,"placed":2,"rem":"Indirectly Diversity Hiring","type":"MnC"},{"co":"Oriental Outsourcing","dt":"12 Mar 2025","role":"MERN and UI/UX","loc":"Kharar","ctc":6.0,"stip":10,"placed":null,"rem":"They cancelled this drive and came back with better role and offer","type":"Miscellaneous"},{"co":"FICO (6th Time)","dt":"12 Mar 2025","role":"Site Reliability Engineering","loc":"Bangalore","ctc":11.2,"stip":30,"placed":4,"rem":"Indirectly Diversity Hiring","type":"MnC"},{"co":"Keystone Global - Vosmos","dt":"12 Mar 2025","role":"Trainee Developer","loc":"New Delhi","ctc":8.0,"stip":24,"placed":2,"rem":"eLitmus - They randomly selected 2 students from 15 which were shortlisted for Interviews and futher gave them offers","type":"MnC"},{"co":"Emicon Advisory Services","dt":"13 Mar 2025","role":"Interns","loc":"Mohali","ctc":6.0,"stip":10,"placed":5,"rem":"3 Year Bond with No holidays at all","type":"Miscellaneous"},{"co":"Unicommerce","dt":"17 Mar 2025","role":"Intern - Enterprise Onboarding","loc":"Gurugram","ctc":5.0,"stip":20,"placed":3,"rem":"","type":"Normal"},{"co":"Ikarus 3D (2nd Time)","dt":"18 Mar 2025","role":"AI/ML Associate","loc":"Mohali","ctc":8.0,"stip":20,"placed":2,"rem":"1 was SDE in it and 1 was AIML","type":"Startup"},{"co":"DBS Tech India","dt":"18 Mar 2025","role":"Apprenticeship Program","loc":"Hyderabad","ctc":null,"stip":9,"placed":null,"rem":"9K is only at work form home After 8 Months There will be a Test on which Internship will be extended and be given 36K","type":"MnC"},{"co":"Innova Solution","dt":"18 Mar 2025","role":"SDE","loc":"Hyderabad, Chennai","ctc":5.5,"stip":20,"placed":24,"rem":"10th and 12th above 75%","type":"MnC"},{"co":"Innova Solution","dt":"18 Mar 2025","role":"Quality Engineer","loc":"Hyderabad, Chennai","ctc":5.5,"stip":20,"placed":18,"rem":"10th and 12th above 75%","type":"MnC"},{"co":"Indus Valley Partners","dt":"18 Mar 2025","role":"Associate Engineer","loc":"Noida","ctc":7.2,"stip":null,"placed":5,"rem":"","type":"MnC"},{"co":"Razorpay","dt":"19 Mar 2025","role":"Intern - Incident Analyst / Problem Analyst","loc":"Bangalore","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"Normal"},{"co":"Gokloud (2nd Time)","dt":"19 Mar 2025","role":"Quality Assurance","loc":"Bangalore","ctc":6.5,"stip":20,"placed":4,"rem":"","type":"Startup"},{"co":"Zouma Consulting Services","dt":"19 Mar 2025","role":"Zoho Developer","loc":"Mohali","ctc":6.0,"stip":15,"placed":3,"rem":"Indirectly Diversity Hiring","type":"MnC"},{"co":"Josh Technology Group","dt":"19 Mar 2025","role":"Front end Developer","loc":"Gurugram","ctc":12.9,"stip":22,"placed":4,"rem":"","type":"Normal"},{"co":"Unicommerce (2nd Time)","dt":"19 Mar 2025","role":"Quality Assurance Intern","loc":"Gurugram","ctc":6.0,"stip":20,"placed":1,"rem":"10th and 12th above 80%","type":"Normal"},{"co":"Tailored AI","dt":"20 Mar 2025","role":"SDE 1 - Backend","loc":"Bangalore","ctc":12.0,"stip":29,"placed":null,"rem":"eLitmus","type":"Startup"},{"co":"Tailored AI","dt":"20 Mar 2025","role":"SDE 1 - Frontend","loc":"Bangalore","ctc":12.0,"stip":29,"placed":null,"rem":"eLitmus","type":"Startup"},{"co":"WizCommerce","dt":"20 Mar 2025","role":"SDE - Backend","loc":"Bangalore","ctc":6.0,"stip":20,"placed":3,"rem":"","type":"International Startup"},{"co":"WizCommerce","dt":"20 Mar 2025","role":"SDE - Frontnend","loc":"Bangalore","ctc":6.0,"stip":20,"placed":3,"rem":"","type":"International Startup"},{"co":"WizCommerce","dt":"20 Mar 2025","role":"Product Management","loc":"Bangalore","ctc":6.0,"stip":20,"placed":1,"rem":"","type":"International Startup"},{"co":"Josh Technology Group (2nd Time)","dt":"21 Mar 2025","role":"Software Developer","loc":"Gurugram","ctc":15.3,"stip":22,"placed":1,"rem":"","type":"Normal"},{"co":"Josh Technology Group (2nd Time)","dt":"21 Mar 2025","role":"Software Quality Assurance","loc":"Gurugram","ctc":15.3,"stip":22,"placed":1,"rem":"","type":"Normal"},{"co":"Hippo Homes","dt":"24 Mar 2025","role":"Node.js Developer","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"MAQ Software","dt":"24 Mar 2025","role":"Associate Software Engineer","loc":"Noida","ctc":6.0,"stip":25,"placed":14,"rem":"","type":"MnC"},{"co":"Vetic","dt":"25 Mar 2025","role":"Full Stack Developer","loc":"Gurugram","ctc":8.0,"stip":20,"placed":5,"rem":"","type":"Startup"},{"co":"AFFORD Medical Technologies","dt":"26 Mar 2025","role":"Full Stack Developer","loc":"Hyderabad","ctc":7.0,"stip":25,"placed":1,"rem":"","type":"Normal"},{"co":"HighRadius","dt":"26 Mar 2025","role":"Consulting","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":5,"rem":"","type":""},{"co":"HighRadius","dt":"26 Mar 2025","role":"S&M (Sales / Marketing)","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":6,"rem":"","type":""},{"co":"Infinitra","dt":"28 Mar 2025","role":"QA Medical Coder","loc":"Remote","ctc":4.0,"stip":18,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Infinitra","dt":"28 Mar 2025","role":"Jr Automation Engineer","loc":"Remote","ctc":4.0,"stip":18,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Infinitra","dt":"28 Mar 2025","role":"Executive Assistant","loc":"Remote","ctc":4.0,"stip":18,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Infinitra","dt":"28 Mar 2025","role":"Brand Strategist","loc":"Remote","ctc":4.0,"stip":18,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Pallav","dt":"01 Apr 2025","role":"Java Devloper Intern","loc":"Gurugram","ctc":10.0,"stip":35,"placed":null,"rem":"They selected on the basis of 10th and 12th without taking OA directly for Interviews","type":"Startup"},{"co":"AppSqadz Software","dt":"01 Apr 2025","role":"AWS - DevOps Engineer","loc":"Noida","ctc":5.5,"stip":null,"placed":1,"rem":"","type":"MnC"},{"co":"Leadsquared","dt":"03 Apr 2025","role":"KAM Intern","loc":"Bangalore, Noida","ctc":5.0,"stip":27,"placed":null,"rem":"","type":"Normal"},{"co":"Oraczen.AI","dt":"04 Apr 2025","role":"Data Science Intern","loc":"Hyderabad","ctc":7.0,"stip":20,"placed":2,"rem":"","type":"International Startup"},{"co":"Wissen Technology (2nd Time - Referal Based)","dt":"04 Apr 2025","role":"Java Devloper Intern","loc":"Bangalore, Hyderabad","ctc":11.0,"stip":25,"placed":3,"rem":"Company came out of no where taking referalls from previously selected students","type":"International Startup"},{"co":"Datagenie","dt":"07 Apr 2025","role":"Gen AI Interns","loc":"Remote","ctc":8.0,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Datagenie","dt":"07 Apr 2025","role":"Datascience","loc":"Remote","ctc":8.0,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Samsung Electro Mechanics (3rd Time)","dt":"08 Apr 2025","role":"Python Interns","loc":"Bangalore","ctc":9.0,"stip":null,"placed":2,"rem":"","type":"MnC"},{"co":"Leadsquared (2nd Time)","dt":"08 Apr 2025","role":"Sales Representative","loc":"Bangalore, Noida","ctc":7.2,"stip":27,"placed":null,"rem":"","type":"Normal"},{"co":"Dazn","dt":"08 Apr 2025","role":"Java Devloper Intern","loc":"Hyderabad","ctc":8.0,"stip":20,"placed":null,"rem":"","type":"MnC"},{"co":"Zeotap","dt":"09 Apr 2025","role":"Software Intern","loc":"Bangalore","ctc":12.0,"stip":65,"placed":1,"rem":"CGPA above 8.5","type":"MnC"},{"co":"Zeotap","dt":"09 Apr 2025","role":"Product Management Intern","loc":"Bangalore","ctc":12.0,"stip":65,"placed":null,"rem":"CGPA above 8.5","type":"MnC"},{"co":"Tiket.com","dt":"10 Apr 2025","role":"SQA Intern","loc":"Noida","ctc":7.0,"stip":28,"placed":2,"rem":"10th and 12th 85%+ and CGPA 8.5+","type":"Miscellaneous"},{"co":"Silverpush","dt":"11 Apr 2025","role":"Software Trainee","loc":"Gurugram","ctc":8.0,"stip":29,"placed":3,"rem":"eLitmus","type":"MnC"},{"co":"Oriental Outsourcing (2nd Time)","dt":"12 Apr 2025","role":"Developer Interns","loc":"Kharar","ctc":7.0,"stip":20,"placed":4,"rem":"","type":"Miscellaneous"},{"co":"Affinsys","dt":"13 Apr 2025","role":"Solution Sales Specialist - International","loc":"Bangalore","ctc":8.2,"stip":20,"placed":4,"rem":"","type":"International Startup"},{"co":"OneBanc","dt":"15 Apr 2025","role":"Android Developer","loc":"Gurugram","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"OneBanc","dt":"15 Apr 2025","role":"iOS Developer","loc":"Gurugram","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"OneBanc","dt":"15 Apr 2025","role":"Full Stack Developer","loc":"Gurugram","ctc":8.0,"stip":25,"placed":3,"rem":"","type":"Startup"},{"co":"OneBanc","dt":"15 Apr 2025","role":"UI/UX Developer","loc":"Gurugram","ctc":8.0,"stip":25,"placed":2,"rem":"","type":"Startup"},{"co":"OneBanc","dt":"15 Apr 2025","role":"Data Science","loc":"Gurugram","ctc":8.0,"stip":25,"placed":1,"rem":"","type":"Startup"},{"co":"Lenovo","dt":"15 Apr 2025","role":"Digital Analyst Intern","loc":"Bangalore","ctc":8.0,"stip":33,"placed":null,"rem":"","type":"MnC"},{"co":"Innova Solution (2nd Time)","dt":"15 Apr 2025","role":"SDE","loc":"Hyderabad, Chennai","ctc":5.5,"stip":20,"placed":null,"rem":"42 students taken at once (1st time + 2nd Time)","type":"MnC"},{"co":"Innova Solution (2nd Time)","dt":"15 Apr 2025","role":"Quality Engineer","loc":"Hyderabad, Chennai","ctc":5.5,"stip":20,"placed":null,"rem":"42 students taken at once (1st time + 2nd Time)","type":"MnC"},{"co":"IRIS Carbon","dt":"16 Apr 2025","role":"Sales Development Interns","loc":"Hyderabad","ctc":6.5,"stip":25,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"WizCommerce (2nd Time)","dt":"17 Apr 2025","role":"SDE - Backend","loc":"Bangalore","ctc":6.0,"stip":20,"placed":1,"rem":"","type":"International Startup"},{"co":"WizCommerce (2nd Time)","dt":"17 Apr 2025","role":"SDE - Testing","loc":"Bangalore","ctc":6.0,"stip":20,"placed":1,"rem":"","type":"International Startup"},{"co":"Unicommerce (3rd Time)","dt":"17 Apr 2025","role":"SE - Backend","loc":"Bangalore","ctc":10.0,"stip":30,"placed":1,"rem":"","type":"Normal"},{"co":"ZopSmart","dt":"18 Apr 2025","role":"Software Development Engineer","loc":"Bangalore","ctc":10.0,"stip":30,"placed":6,"rem":"","type":"Startup"},{"co":"Unthinkable Solutions","dt":"21 Apr 2025","role":"Tech Intern","loc":"Gurugram","ctc":5.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"STGI Technologies","dt":"21 Apr 2025","role":"UI Development Engineer","loc":"Panchkula","ctc":7.0,"stip":35,"placed":7,"rem":"","type":"Miscellaneous"},{"co":"STGI Technologies","dt":"21 Apr 2025","role":"QA","loc":"Panchkula","ctc":7.0,"stip":35,"placed":2,"rem":"","type":"Miscellaneous"},{"co":"STGI Technologies","dt":"21 Apr 2025","role":"Cloud","loc":"Panchkula","ctc":7.0,"stip":35,"placed":1,"rem":"","type":"Miscellaneous"},{"co":"STGI Technologies","dt":"21 Apr 2025","role":"Dot Net Development","loc":"Panchkula","ctc":7.0,"stip":35,"placed":1,"rem":"","type":"Miscellaneous"},{"co":"STGI Technologies","dt":"21 Apr 2025","role":"Backend Django Developer","loc":"Panchkula","ctc":7.0,"stip":35,"placed":2,"rem":"","type":"Miscellaneous"},{"co":"Josh Technology Groups","dt":"22 Apr 2025","role":"Bussiness Analyist Intern","loc":"Gurugram","ctc":10.2,"stip":20,"placed":null,"rem":"","type":""},{"co":"CloudEQ","dt":"22 Apr 2025","role":"Devops Intern","loc":"Chandigarh","ctc":5.5,"stip":15,"placed":null,"rem":"","type":"MnC"},{"co":"KocharTech","dt":"23 Apr 2025","role":"Tech Intern","loc":"Amritsar","ctc":6.0,"stip":15,"placed":7,"rem":"","type":""},{"co":"KocharTech","dt":"23 Apr 2025","role":"Non Tech Intern","loc":"Amritsar","ctc":6.0,"stip":15,"placed":3,"rem":"","type":""},{"co":"Wipro","dt":"23 Apr 2025","role":"Undefined","loc":"Bangalore","ctc":5.5,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Utrade Solutions","dt":"23 Apr 2025","role":"Developer / Software Engineer","loc":"Chandigarh","ctc":8.0,"stip":22,"placed":3,"rem":"","type":"Normal"},{"co":"Utrade Solutions","dt":"23 Apr 2025","role":"Quality Analyst / Software Test Engineer","loc":"Chandigarh","ctc":7.0,"stip":18,"placed":2,"rem":"","type":"Normal"},{"co":"WizCommerce (3rd Time)","dt":"23 Apr 2025","role":"Cloud Intern","loc":"Bangalore","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"WizCommerce (3rd Time)","dt":"23 Apr 2025","role":"SRE Intern","loc":"Bangalore","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"Morgan Stanley","dt":"24 Apr 2025","role":"Cyber Track Apprenticeship Program","loc":"Bangalore, Mumbai","ctc":null,"stip":87,"placed":9,"rem":"","type":"MnC"},{"co":"HighRadius","dt":"28 Apr 2025","role":"SAAS Sales","loc":"Hyderabad","ctc":8.0,"stip":null,"placed":3,"rem":"","type":""},{"co":"HighRadius","dt":"28 Apr 2025","role":"Marketing","loc":"Hyderabad","ctc":8.0,"stip":null,"placed":2,"rem":"","type":""},{"co":"AAJ Enterprises","dt":"28 Apr 2025","role":"Software Developer","loc":"Noida","ctc":5.0,"stip":20,"placed":3,"rem":"","type":"Normal"},{"co":"Alert Enterprise","dt":"29 Apr 2025","role":"Trainee: Development (DevOps)","loc":"Chandigarh","ctc":5.0,"stip":20,"placed":5,"rem":"","type":"International Startup"},{"co":"WizCommerce (4th Time)","dt":"30 Apr 2025","role":"Backend Intern","loc":"Bangalore","ctc":6.0,"stip":20,"placed":null,"rem":"Came Back with better offer","type":"International Startup"},{"co":"Formi","dt":"01 May 2025","role":"Demand Generation Interns","loc":"Bangalore","ctc":8.0,"stip":30,"placed":null,"rem":"Came back with more roles","type":"Startup"},{"co":"Myntra","dt":"01 May 2025","role":"Software Developer Interns","loc":"Bangalore","ctc":18.0,"stip":null,"placed":null,"rem":"Its Pool hiring so they didn't accepting applications from some colleges","type":"Normal"},{"co":"Ibis Dubai and The Retreat plan","dt":"02 May 2025","role":"IT Intern and Reservation Intern","loc":"Dubai","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"International"},{"co":"Copoint data","dt":"03 May 2025","role":"Interns","loc":"Gurugram","ctc":7.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"Verse Innovation","dt":"05 May 2025","role":"Performance Marketing Intern","loc":"Delhi","ctc":5.0,"stip":30,"placed":4,"rem":"","type":"Normal"},{"co":"EPACK","dt":"05 May 2025","role":"SDE Intern","loc":"Noida","ctc":8.0,"stip":30,"placed":1,"rem":"1 in each role","type":"Normal"},{"co":"EPACK","dt":"05 May 2025","role":"AI Intern","loc":"Noida","ctc":8.0,"stip":30,"placed":1,"rem":"1 in each role","type":"Normal"},{"co":"Covalience","dt":"06 May 2025","role":"Intern","loc":"Mohali","ctc":5.5,"stip":14,"placed":null,"rem":"","type":"International Startup"},{"co":"Gokloud","dt":"07 May 2025","role":"Software Developer (Java)","loc":"Bangalore","ctc":10.0,"stip":20,"placed":1,"rem":"","type":"Startup"},{"co":"Phone Pe","dt":"07 May 2025","role":"IT Audits and Risk Assessment","loc":"Bangalore","ctc":5.0,"stip":null,"placed":null,"rem":"","type":"Normal"},{"co":"Formi (2nd Time)","dt":"08 May 2025","role":"Multiple Profiles","loc":"Bangalore","ctc":8.0,"stip":27,"placed":3,"rem":"2 Demand Generation Intern 1 Some Technical Role","type":"Startup"},{"co":"Infutrix Technologies","dt":"09 May 2025","role":"AI/ML Engineer","loc":"Mohali","ctc":9.0,"stip":15,"placed":null,"rem":"","type":"Startup"},{"co":"Kapture CX","dt":"12 May 2025","role":"Management Trainee - AI Ops","loc":"Bangalore","ctc":8.0,"stip":35,"placed":null,"rem":"","type":"Normal"},{"co":"Unicommerce (4th Time)","dt":"12 May 2025","role":"SE Intern","loc":"Gurugram","ctc":10.0,"stip":30,"placed":3,"rem":"JD's files are corrupt thats why can't able to upload them","type":"Normal"},{"co":"Unicommerce (4th Time)","dt":"12 May 2025","role":"QA Intern","loc":"Gurugram","ctc":7.0,"stip":20,"placed":2,"rem":"JD's files are corrupt thats why can't able to upload them","type":"Normal"},{"co":"Unicommerce (4th Time)","dt":"12 May 2025","role":"Product Intern and Software Engineer Intern","loc":"Gurugram","ctc":7.0,"stip":20,"placed":1,"rem":"JD's files are corrupt thats why can't able to upload them","type":"Normal"},{"co":"Unicommerce (4th Time)","dt":"12 May 2025","role":"TA Intern","loc":"Gurugram","ctc":4.0,"stip":15,"placed":1,"rem":"JD's files are corrupt thats why can't able to upload them","type":"Normal"},{"co":"Unicommerce (5th Time)","dt":"13 May 2025","role":"UI Intern","loc":"Gurugram","ctc":7.0,"stip":20,"placed":2,"rem":"","type":"Normal"},{"co":"Indus Valley Partners","dt":"13 May 2025","role":"Associate Engineer","loc":"Noida","ctc":7.7,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"LG Soft","dt":"14 May 2025","role":"Tech Interns","loc":"Bangalore","ctc":7.5,"stip":30,"placed":2,"rem":"","type":"MnC"},{"co":"High Radius","dt":"14 May 2025","role":"Interns","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":null,"rem":"","type":"MnC"},{"co":"ZopDev","dt":"15 May 2025","role":"SDE 1","loc":"Bangalore","ctc":10.0,"stip":30,"placed":5,"rem":"","type":"Startup"},{"co":"OLX India","dt":"15 May 2025","role":"Tech Intern","loc":"Gurugram","ctc":8.4,"stip":30,"placed":6,"rem":"","type":"Normal"},{"co":"Josh Technology Groups","dt":"16 May 2025","role":"Associate Software Developer","loc":"Gurugram","ctc":12.4,"stip":22,"placed":1,"rem":"","type":""},{"co":"Arrise.com","dt":"16 May 2025","role":"SD Interns","loc":"Hyderabad","ctc":10.0,"stip":30,"placed":11,"rem":"","type":"Normal"},{"co":"IGT Solutions","dt":"19 May 2025","role":"Interns","loc":"Remote","ctc":4.8,"stip":20,"placed":3,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"Software Engineering","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"Software Development in Test","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"DevOps Engineer","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"Product Management Code","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"UX Desigining","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"Reltio","dt":"21 May 2025","role":"Technical Project Management","loc":"Bangalore","ctc":15.0,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"CodeNation","dt":"21 May 2025","role":"Software Development Engineer","loc":"Remote","ctc":30.0,"stip":75,"placed":null,"rem":"","type":"International Startup"},{"co":"Edoofa","dt":"21 May 2025","role":"Academic Conseller","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Edoofa","dt":"21 May 2025","role":"Academic Hapiness Officer","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Edoofa","dt":"21 May 2025","role":"Associate KAM","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"SpringWorks","dt":"21 May 2025","role":"Case Analysis Intern","loc":"Remote","ctc":5.0,"stip":21,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Convexicon India","dt":"21 May 2025","role":"Full Stack Developer","loc":"Gurugram","ctc":6.0,"stip":20,"placed":4,"rem":"","type":"Startup"},{"co":"Convexicon India","dt":"21 May 2025","role":"AIML Intern","loc":"Gurugram","ctc":6.0,"stip":20,"placed":3,"rem":"","type":"Startup"},{"co":"Tiket.com","dt":"21 May 2025","role":"SQA (Automation + Mannual)","loc":"Noida","ctc":7.0,"stip":28,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Peakmind","dt":"22 May 2025","role":"Software Development Intern","loc":"Bangalore","ctc":8.0,"stip":25,"placed":2,"rem":"","type":"Miscellaneous"},{"co":"Razorpay","dt":"23 May 2025","role":"Product Support Engineers","loc":"Bangalore","ctc":11.0,"stip":50,"placed":null,"rem":"","type":"Normal"},{"co":"YT Money Productions","dt":"23 May 2025","role":"AI Engineer / AI Product Engineer","loc":"Mohali","ctc":6.0,"stip":35,"placed":null,"rem":"","type":""},{"co":"YT Money Productions","dt":"23 May 2025","role":"IP Support and Network Security Intern","loc":"Mohali","ctc":4.0,"stip":17,"placed":null,"rem":"","type":""},{"co":"Loop AI","dt":"23 May 2025","role":"SE Intern","loc":"Bangalore","ctc":22.0,"stip":50,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Autodesk","dt":"23 May 2025","role":"SDE","loc":"Bangalore, Pune","ctc":44.0,"stip":55,"placed":2,"rem":"Completely luck based. Asked basic questions on Memo and tabulations and basic DSA questions","type":"MnC"},{"co":"Blinkit","dt":"30 May 2025","role":"Business Analyst Intern","loc":"Gurugram","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Vimo India Pvt Ltd","dt":"02 Jun 2025","role":"Data Science Engineer","loc":"Pune, Gurugram","ctc":10.0,"stip":50,"placed":null,"rem":"","type":"International Startup"},{"co":"RSqareSoft Technologies","dt":"02 Jun 2025","role":"Software Engineering Intern","loc":"Pune","ctc":4.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Josh Technology","dt":"04 Jun 2025","role":"Analyst - Outcome Based Learning","loc":"Gurugram","ctc":9.8,"stip":20,"placed":null,"rem":"","type":""},{"co":"DYSON","dt":"04 Jun 2025","role":"Dyson service Engineer","loc":"Mumbai, Chennai, Kerela","ctc":6.0,"stip":40,"placed":null,"rem":"","type":"MnC"},{"co":"Clickpost","dt":"04 Jun 2025","role":"Product Intern","loc":"Bangalore","ctc":11.0,"stip":50,"placed":1,"rem":"","type":"Startup"},{"co":"Clickpost","dt":"04 Jun 2025","role":"Software Engineer Intern","loc":"Bangalore","ctc":11.0,"stip":50,"placed":1,"rem":"","type":"Startup"},{"co":"Web Cue LLC","dt":"05 Jun 2025","role":"Software Development Intern","loc":"Mohali","ctc":5.0,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Web Cue LLC","dt":"05 Jun 2025","role":"Digital Marketing Intern","loc":"Mohali","ctc":5.0,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Kaara Tech","dt":"06 Jun 2025","role":"Customer Success Associate","loc":"Hyderabad","ctc":6.1,"stip":25,"placed":null,"rem":"","type":"MnC"},{"co":"Pratishthan Software","dt":"06 Jun 2025","role":"Software Engineer","loc":"Bangalore","ctc":6.2,"stip":25,"placed":null,"rem":"E Litmus","type":"Startup"},{"co":"Bajaj Finserv","dt":"07 Jun 2025","role":"Technology Intern Java","loc":"Pune","ctc":12.0,"stip":35,"placed":null,"rem":"","type":"Normal"},{"co":"Morgan Stanley","dt":"11 Jun 2025","role":"Apprenticeship Program","loc":"Bangalore, Mumbai","ctc":null,"stip":87,"placed":10,"rem":"","type":"MnC"},{"co":"U Shin","dt":"11 Jun 2025","role":"Undefined","loc":"Gurugram","ctc":4.2,"stip":null,"placed":null,"rem":"","type":""},{"co":"Alucor","dt":"12 Jun 2025","role":"IT Intern","loc":"Dubai","ctc":null,"stip":35,"placed":null,"rem":"","type":"International"},{"co":"MPL Gaming","dt":"12 Jun 2025","role":"Sofware Development Engineer","loc":"Bangalore","ctc":12.0,"stip":40,"placed":null,"rem":"","type":"Normal"},{"co":"Virtusa","dt":"17 Jun 2025","role":"IT Intern","loc":"Gurugram","ctc":6.0,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Wiz Commerce (5th Time)","dt":"17 Jun 2025","role":"Software Development Engineer Intern - Frontend","loc":"Bangalore","ctc":7.0,"stip":20,"placed":9,"rem":"Role Is actually not fixed, students can be divided into both frontend and backend","type":""},{"co":"Cadera Infotech Private Limited","dt":"17 Jun 2025","role":"IT Trainees","loc":"Noida","ctc":8.0,"stip":15,"placed":15,"rem":"","type":"Startup"},{"co":"Math Co","dt":"19 Jun 2025","role":"Trainee Analyst","loc":"Bangalore","ctc":7.0,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Oriental Outsourcing","dt":"20 Jun 2025","role":"MERN Stack Developer","loc":"Kharar","ctc":8.0,"stip":18,"placed":1,"rem":"","type":"Miscellaneous"},{"co":"Oriental Outsourcing","dt":"20 Jun 2025","role":"Web Designer","loc":"Kharar","ctc":8.0,"stip":18,"placed":1,"rem":"","type":"Miscellaneous"},{"co":"Oriental Outsourcing","dt":"20 Jun 2025","role":"iOS Developer","loc":"Kharar","ctc":8.0,"stip":18,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Synechron","dt":"20 Jun 2025","role":"Tech Interns","loc":"Pune, Hyderbad, Bangalore, Chennai","ctc":7.0,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Callease AI","dt":"20 Jun 2025","role":"Tech Interns","loc":"Ahmedabad","ctc":7.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"Microsoft (Pool Hiring)","dt":"20 Jun 2025","role":"SEFA Program","loc":"Bangalore, Hyderabad","ctc":null,"stip":125,"placed":null,"rem":"","type":"MnC"},{"co":"AceVector Group (Snapdeal/Unicommerce)","dt":"23 Jun 2025","role":"Software Engineer in Test (QA - Automation)","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"SMS-Magic","dt":"23 Jun 2025","role":"Sales Development Interns","loc":"Bangalore","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"International Startup"},{"co":"Juleo","dt":"24 Jun 2025","role":"Backend Intern","loc":"Gurugram","ctc":12.0,"stip":24,"placed":null,"rem":"","type":"Startup"},{"co":"Innovatiview","dt":"25 Jun 2025","role":"Inside Sales and Customer Relationship Management","loc":"Noida","ctc":4.0,"stip":15,"placed":null,"rem":"","type":"Normal"},{"co":"Infosys HackWithInfy","dt":"26 Jun 2025","role":"Specialist Programmer","loc":"Bangalore","ctc":9.5,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Sprouts","dt":"28 Jun 2025","role":"Automation QA Engineer Intern","loc":"Bangalore, Chandigarh","ctc":null,"stip":15,"placed":null,"rem":"CTC is not mentioned","type":"International Startup"},{"co":"Sprouts","dt":"28 Jun 2025","role":"Hybrid QA (Mannual + Automation) - Intern","loc":"Bangalore, Chandigarh","ctc":null,"stip":15,"placed":null,"rem":"CTC is not mentioned","type":"International Startup"},{"co":"Sprouts","dt":"28 Jun 2025","role":"Product Management Intern","loc":"Bangalore, Chandigarh","ctc":null,"stip":15,"placed":null,"rem":"CTC is not mentioned (25k if you got placed in Bangalore 15k for Chandigarh)","type":"International Startup"},{"co":"NovoInvent","dt":"30 Jun 2025","role":"Application development Intern","loc":"Chandigarh, Noida, Remote","ctc":6.0,"stip":20,"placed":8,"rem":"","type":"Startup"},{"co":"Kloudgin","dt":"30 Jun 2025","role":"Intern Java Developer","loc":"Hyderabad","ctc":7.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"High Radius","dt":"30 Jun 2025","role":"Intern Business Analytics","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":null,"rem":"","type":"MnC"},{"co":"Thrax Management","dt":"01 Jul 2025","role":"Project Interns","loc":"Remote","ctc":null,"stip":125,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Zouma Consulting Services","dt":"01 Jul 2025","role":"Content Writer","loc":"Mohali","ctc":3.5,"stip":15,"placed":null,"rem":"CTC depends on performance","type":"MnC"},{"co":"Zouma Consulting Services","dt":"01 Jul 2025","role":"Video Shoot","loc":"Mohali","ctc":3.5,"stip":15,"placed":null,"rem":"CTC depends on performance","type":"MnC"},{"co":"Zouma Consulting Services","dt":"01 Jul 2025","role":"Garphic Designer","loc":"Mohali","ctc":3.5,"stip":15,"placed":null,"rem":"CTC depends on performance","type":"MnC"},{"co":"Cotiviti (Edifecs)","dt":"01 Jul 2025","role":"Associate Operations Engineer","loc":"Mohali","ctc":7.2,"stip":null,"placed":2,"rem":"JDs are corrupted so haven't able to add it","type":"MnC"},{"co":"Cotiviti (Edifecs)","dt":"01 Jul 2025","role":"Associate PMO Analyst","loc":"Mohali","ctc":7.2,"stip":null,"placed":null,"rem":"JDs are corrupted so haven't able to add it","type":"MnC"},{"co":"Cotiviti (Edifecs)","dt":"01 Jul 2025","role":"Associate Implementation Engineer","loc":"Mohali","ctc":7.2,"stip":null,"placed":1,"rem":"JDs are corrupted so haven't able to add it (Sepefici to MCA Students)","type":"MnC"},{"co":"Airbus","dt":"03 Jul 2025","role":"AI Intern","loc":"Bangalore","ctc":null,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Ubona Technologies","dt":"03 Jul 2025","role":"Internship","loc":"Bangalore","ctc":8.5,"stip":24,"placed":1,"rem":"","type":"Normal"},{"co":"Razorpay","dt":"04 Jul 2025","role":"Intern - Software Development","loc":"Bangalore","ctc":27.0,"stip":50,"placed":1,"rem":"","type":"Normal"},{"co":"Edgewise Technology","dt":"04 Jul 2025","role":"Software Development Intern","loc":"Bangalore","ctc":7.2,"stip":24,"placed":3,"rem":"","type":"MnC"},{"co":"Ecolabs","dt":"07 Jul 2025","role":"Entry Level Software Developer","loc":"Bangalore","ctc":9.0,"stip":null,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"EPAM","dt":"08 Jul 2025","role":"Intern","loc":"Pune, Hyderbad, Bangalore, Chennai","ctc":8.5,"stip":null,"placed":27,"rem":"","type":"Miscellaneous"},{"co":"Ivanti Technlogy","dt":"09 Jul 2025","role":"Tech writer","loc":"Bangalore","ctc":8.0,"stip":35,"placed":1,"rem":"","type":"MnC"},{"co":"Ivanti Technlogy","dt":"09 Jul 2025","role":"Engineering Intern","loc":"Bangalore","ctc":12.0,"stip":35,"placed":1,"rem":"","type":"MnC"},{"co":"Nutanix","dt":"09 Jul 2025","role":"Intern, Remote Resident Expert","loc":"Pune","ctc":14.3,"stip":40,"placed":null,"rem":"","type":"MnC"},{"co":"GreyB","dt":"09 Jul 2025","role":"Research Analyst","loc":"Gurugram","ctc":7.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"Centelli","dt":"09 Jul 2025","role":"Software Developer","loc":"Panchkula","ctc":5.2,"stip":null,"placed":null,"rem":"","type":"International Startup"},{"co":"Appreciate Wealth","dt":"10 Jul 2025","role":"Quality Assurance","loc":"Noida","ctc":9.0,"stip":22,"placed":6,"rem":"JDs are corrupted so haven't able to add it","type":"Startup"},{"co":"Appreciate Wealth","dt":"10 Jul 2025","role":"Full Stack SDE","loc":"Noida","ctc":9.0,"stip":22,"placed":6,"rem":"JDs are corrupted so haven't able to add it","type":"Startup"},{"co":"Appreciate Wealth","dt":"10 Jul 2025","role":"Frontend SDE","loc":"Noida","ctc":9.0,"stip":22,"placed":6,"rem":"JDs are corrupted so haven't able to add it","type":"Startup"},{"co":"Appreciate Wealth","dt":"10 Jul 2025","role":"Product Management","loc":"Noida","ctc":9.0,"stip":22,"placed":6,"rem":"JDs are corrupted so haven't able to add it","type":"Startup"},{"co":"Appreciate Wealth","dt":"10 Jul 2025","role":"Data Scientist","loc":"Noida","ctc":9.0,"stip":22,"placed":6,"rem":"JDs are corrupted so haven't able to add it","type":"Startup"},{"co":"Kapture CX","dt":"10 Jul 2025","role":"Machine Learning Intern","loc":"Bangalore","ctc":8.3,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Innovatiview","dt":"11 Jul 2025","role":"Multiple Profiles","loc":"Noida","ctc":4.0,"stip":15,"placed":null,"rem":"","type":"Normal"},{"co":"Cotiviti (Edifecs)","dt":"12 Jul 2025","role":"Associate Operations Engineer","loc":"Mohali","ctc":7.2,"stip":null,"placed":null,"rem":"JDs are corrupted so haven't able to add it","type":"MnC"},{"co":"XPERI","dt":"12 Jul 2025","role":"Software Engineer Intern and SDE Intern","loc":"Bangalore","ctc":14.0,"stip":50,"placed":2,"rem":"JDs are corrupted so haven't able to add it (1 each role)","type":"MnC"},{"co":"YASH Technologies","dt":"12 Jul 2025","role":"Tech Intern","loc":"Delhi","ctc":7.0,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"RTS Corp","dt":"14 Jul 2025","role":"Software Trainee","loc":"Mohali","ctc":5.0,"stip":15,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Coforge","dt":"14 Jul 2025","role":"Graduate Engineer Trainee.","loc":"Noida","ctc":4.2,"stip":21,"placed":null,"rem":"","type":"MnC"},{"co":"Octro Inc","dt":"14 Jul 2025","role":"C++ Full Stack Developers","loc":"Noida","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Octro Inc","dt":"14 Jul 2025","role":"Nodejs Developer","loc":"Noida","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Octro Inc","dt":"14 Jul 2025","role":"DevOps","loc":"Noida","ctc":6.0,"stip":21,"placed":null,"rem":"","type":"Normal"},{"co":"Octro Inc","dt":"14 Jul 2025","role":"Data Engineer","loc":"Noida","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Octro Inc","dt":"14 Jul 2025","role":"Java Engineer","loc":"Noida","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"pando","dt":"14 Jul 2025","role":"Product Management Intern","loc":"Chennai","ctc":7.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"pando","dt":"14 Jul 2025","role":"Onboarding Intern","loc":"Chennai","ctc":7.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"pando","dt":"14 Jul 2025","role":"Bussiness Development Engineering","loc":"Chennai","ctc":7.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"Tech Verito","dt":"15 Jul 2025","role":"Software Engineering","loc":"Pune","ctc":5.0,"stip":null,"placed":null,"rem":"","type":"Startup"},{"co":"Zepto","dt":"15 Jul 2025","role":"AUT - Depty Delivery Hub Manager","loc":"Delhi","ctc":4.5,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"Emicon Advisory Services","dt":"15 Jul 2025","role":"Intern","loc":"Mohali","ctc":6.0,"stip":null,"placed":12,"rem":"","type":"Miscellaneous"},{"co":"Josh Technology Groups","dt":"16 Jul 2025","role":"Analyst - Outcome Based Learning","loc":"Gurugram","ctc":9.8,"stip":20,"placed":null,"rem":"","type":""},{"co":"OYO Rooms","dt":"16 Jul 2025","role":"Associate Software Development Engineer","loc":"Gurugram","ctc":12.5,"stip":50,"placed":null,"rem":"","type":"MnC"},{"co":"OYO Rooms","dt":"16 Jul 2025","role":"Graduate Trainee Business Analyst","loc":"Gurugram","ctc":9.0,"stip":40,"placed":1,"rem":"","type":"MnC"},{"co":"Agrsoft Pvt Ltd","dt":"17 Jul 2025","role":"Programmer Analyst","loc":"Gujrat","ctc":7.1,"stip":21,"placed":null,"rem":"","type":"International Startup"},{"co":"Locofast","dt":"18 Jul 2025","role":"Frontend Developer","loc":"New Delhi, Jaipur, Noida","ctc":9.0,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Alert Enterprise","dt":"18 Jul 2025","role":"Trainee (Development (DB), Quality Management)","loc":"Chandigarh","ctc":6.0,"stip":20,"placed":null,"rem":"","type":"International Startup"},{"co":"XPERI","dt":"20 Jul 2025","role":"Android Developer","loc":"Bangalore","ctc":14.0,"stip":50,"placed":1,"rem":"","type":"MnC"},{"co":"XPERI","dt":"20 Jul 2025","role":"Quality Assurance","loc":"Bangalore","ctc":14.0,"stip":50,"placed":1,"rem":"","type":"MnC"},{"co":"Altudo","dt":"21 Jul 2025","role":"Junior Associate","loc":"Gurugram","ctc":4.0,"stip":25,"placed":null,"rem":"","type":"MnC"},{"co":"Unicommerce","dt":"21 Jul 2025","role":"Devops Intern","loc":"Gurugram","ctc":7.5,"stip":20,"placed":null,"rem":"","type":"Normal"},{"co":"1DigitalStack","dt":"22 Jul 2025","role":"Business Analyst Intern","loc":"Gurugram","ctc":6.6,"stip":21,"placed":11,"rem":"Finally this company came and took 11 people in single role - Business Analyst","type":"International Startup"},{"co":"Hike","dt":"23 Jul 2025","role":"Data Engineer","loc":"Remote","ctc":42.6,"stip":40,"placed":null,"rem":"CTC has a lot of variables please do check the JD before you get mesmerized by the big number","type":"Normal"},{"co":"Hike","dt":"23 Jul 2025","role":"SDE Devops","loc":"Remote","ctc":42.6,"stip":40,"placed":null,"rem":"CTC has a lot of variables please do check the JD before you get mesmerized by the big number","type":"Normal"},{"co":"AceVector Group (Snapdeal/Unicommerce)","dt":"23 Jul 2025","role":"Software Engineer in Test (QA - Automation)","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Coforge","dt":"23 Jul 2025","role":"Graduate Engineer Trainee.","loc":"Noida","ctc":4.2,"stip":null,"placed":null,"rem":"Bond of 2 years with 1.5 L","type":"MnC"},{"co":"Kapture CX","dt":"23 Jul 2025","role":"Tech Internship","loc":"Bangalore","ctc":8.4,"stip":25,"placed":1,"rem":"","type":"Normal"},{"co":"Freight Tiger","dt":"23 Jul 2025","role":"Software Intern","loc":"Bangalore, Gurugram","ctc":8.0,"stip":20,"placed":5,"rem":"","type":"Startup"},{"co":"Razorpay","dt":"23 Jul 2025","role":"Product Support Engineers","loc":"Bangalore","ctc":8.0,"stip":40,"placed":null,"rem":"","type":"Normal"},{"co":"Twinline Business Solutions","dt":"24 Jul 2025","role":"Data Analyst & QA","loc":"Gurugram","ctc":4.4,"stip":20,"placed":null,"rem":"","type":"Startup"},{"co":"Infinte Locus","dt":"25 Jul 2025","role":"Full Stack Developer","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":"International Startup"},{"co":"Bajaj Finserv","dt":"25 Jul 2025","role":"Java Salesforce","loc":"Pune","ctc":12.0,"stip":35,"placed":null,"rem":"","type":"Normal"},{"co":"Bajaj Finserv","dt":"25 Jul 2025","role":"Full Stack","loc":"Pune","ctc":12.0,"stip":35,"placed":null,"rem":"","type":"Normal"},{"co":"Pharmacoevidence Pvt. Ltd.","dt":"25 Jul 2025","role":"Intern Software Engineer","loc":"Mohali","ctc":7.0,"stip":25,"placed":null,"rem":"","type":"Startup"},{"co":"RSqaureSoft Technologies","dt":"25 Jul 2025","role":"Software Engineering Intern","loc":"Pune","ctc":4.0,"stip":10,"placed":null,"rem":"2 year service Bond","type":""},{"co":"Pelatro","dt":"28 Jul 2025","role":"Engineer Trainee","loc":"Bangalore","ctc":6.5,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Zeta","dt":"28 Jul 2025","role":"Full Stack Developer","loc":"Bangalore","ctc":16.0,"stip":60,"placed":null,"rem":"","type":"MnC"},{"co":"BridgeLabz Solutions","dt":"28 Jul 2025","role":"Fellowship Program","loc":"Mumbai, Remote","ctc":4.0,"stip":null,"placed":229,"rem":"Its a Tie up (No pay remote training)","type":"Startup"},{"co":"CELEBAL Technologies","dt":"29 Jul 2025","role":"Data Science / Data Engineering","loc":"Pune, Jaipur, Noida","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"MnC"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Business Development Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Marketing Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Product Management Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Machine Learning Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"React.js Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Node.js Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Python Djanogo Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Createbytes","dt":"30 Jul 2025","role":"Video Editor Intern","loc":"Gurugram","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"Startup"},{"co":"Dentsu","dt":"30 Jul 2025","role":"Associate Business Analyst","loc":"Pune, Mumbai","ctc":5.0,"stip":15,"placed":null,"rem":"","type":"MnC"},{"co":"Lumen Technologies","dt":"31 Jul 2025","role":"Tech Interns","loc":"PAN India","ctc":7.0,"stip":30,"placed":null,"rem":"","type":"MnC"},{"co":"SpringWorks","dt":"01 Aug 2025","role":"Case Analysis Intern (Operations)","loc":"Remote","ctc":4.0,"stip":21,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"SpringWorks","dt":"01 Aug 2025","role":"Support Intern","loc":"Remote","ctc":4.0,"stip":21,"placed":null,"rem":"","type":"Miscellaneous"},{"co":"Bluebash Consulting Pvt. Ltd.","dt":"02 Aug 2025","role":"AI/ML Engineer","loc":"Mohali","ctc":4.0,"stip":10,"placed":null,"rem":"","type":""},{"co":"HASHIRA","dt":"03 Aug 2025","role":"Software Developer","loc":"Hyderabad","ctc":22.0,"stip":21,"placed":null,"rem":"","type":""},{"co":"Innovaccer","dt":"04 Aug 2025","role":"Growth Marketing Intern","loc":"Noida","ctc":6.5,"stip":20,"placed":null,"rem":"","type":""},{"co":"SalesCode.ai","dt":"05 Aug 2025","role":"Software Test Engineer Trainee (QA)","loc":"Gurugram","ctc":12.6,"stip":null,"placed":null,"rem":"","type":"Startup"},{"co":"Copoint","dt":"06 Aug 2025","role":"Internship","loc":"Gurugram","ctc":7.0,"stip":20,"placed":null,"rem":"","type":""},{"co":"Majid AI Futtaim Group","dt":"06 Aug 2025","role":"Tech Interns","loc":"Gurugram","ctc":10.0,"stip":30,"placed":null,"rem":"","type":""},{"co":"Pansophic Technologies","dt":"07 Aug 2025","role":"Junior Python Developer","loc":"Mohali","ctc":5.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Coding Ninjas","dt":"07 Aug 2025","role":"Business Development / Sales Intern","loc":"Gurugram","ctc":3.0,"stip":25,"placed":14,"rem":"","type":""},{"co":"Data Troops","dt":"07 Aug 2025","role":"SDE","loc":"Mohali","ctc":4.0,"stip":20,"placed":null,"rem":"","type":""},{"co":"Testingxperts","dt":"08 Aug 2025","role":"Graduate Engineer Trainee","loc":"Chandigarh","ctc":4.4,"stip":15,"placed":null,"rem":"","type":""},{"co":"Cognizant","dt":"08 Aug 2025","role":"Undefined","loc":"PAN India","ctc":4.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Artech Infosystems","dt":"08 Aug 2025","role":"Archtech Infosystems","loc":"Noida","ctc":4.7,"stip":null,"placed":null,"rem":"","type":""},{"co":"Buyhatke","dt":"09 Aug 2025","role":"Backend - Software Engineer Intern","loc":"Bangalore","ctc":12.0,"stip":50,"placed":null,"rem":"","type":""},{"co":"H&R Block India Pvt. Ltd.","dt":"09 Aug 2025","role":"Associate Software Engineer","loc":"Kerela","ctc":5.4,"stip":null,"placed":null,"rem":"","type":""},{"co":"Betasoft Solutions Pvt. Ltd.","dt":"09 Aug 2025","role":"Junior Software Developer","loc":"Mohali","ctc":5.0,"stip":15,"placed":null,"rem":"","type":""},{"co":"Betasoft Solutions Pvt. Ltd.","dt":"09 Aug 2025","role":"Software Developer Trainee","loc":"Mohali","ctc":5.0,"stip":15,"placed":null,"rem":"","type":""},{"co":"Scaler by Interview Bit","dt":"10 Aug 2025","role":"SDE Intern","loc":"PAN India","ctc":22.0,"stip":35,"placed":null,"rem":"","type":""},{"co":"Mahindra Comviva","dt":"10 Aug 2025","role":"SQA (Software Quality Analyst)","loc":"Gurugram","ctc":5.5,"stip":null,"placed":null,"rem":"","type":""},{"co":"Faclon Labs","dt":"10 Aug 2025","role":"SDE and Data Science Interns","loc":"Mumbai","ctc":7.0,"stip":20,"placed":null,"rem":"","type":""},{"co":"Aurasell AI Technologies Pvt. Ltd.","dt":"11 Aug 2025","role":"Software Engineering Intern","loc":"Bangalore","ctc":15.0,"stip":21,"placed":null,"rem":"","type":""},{"co":"UNLOX","dt":"12 Aug 2025","role":"React Native Developer","loc":"Bangalore","ctc":4.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"CELEBAL Technologies","dt":"12 Aug 2025","role":"Data Science / Data Engineering","loc":"PAN India","ctc":6.0,"stip":10,"placed":null,"rem":"","type":"MnC"},{"co":"Mu Sigma Bsiness Sigma Solutions","dt":"12 Aug 2025","role":"Interns","loc":"Bangalore","ctc":5.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Qubits Infotech Solutions","dt":"12 Aug 2025","role":"Associate Software Engineer","loc":"Bangalore","ctc":5.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Saltmine","dt":"13 Aug 2025","role":"Engineering Interns - Full Stack","loc":"Bangalore","ctc":10.0,"stip":30,"placed":null,"rem":"","type":""},{"co":"UNLOX","dt":"13 Aug 2025","role":"Full Stack Developer Intern","loc":"Bangalore","ctc":4.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Mahindra Comviva","dt":"14 Aug 2025","role":"Developer","loc":"PAN India","ctc":3.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"Mahindra Comviva","dt":"14 Aug 2025","role":"Tester","loc":"PAN India","ctc":3.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"Mahindra Comviva","dt":"14 Aug 2025","role":"Global Customer Support","loc":"PAN India","ctc":3.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"Cvent","dt":"14 Aug 2025","role":"Intern","loc":"Gurugram","ctc":6.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"BNP Paribas India","dt":"14 Aug 2025","role":"Intern","loc":"Bangalore","ctc":7.5,"stip":25,"placed":null,"rem":"","type":""},{"co":"Caizin","dt":"18 Aug 2025","role":"Interns","loc":"Pune","ctc":6.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Josh Technology Groups","dt":"19 Aug 2025","role":"Software Developer","loc":"Gurugram","ctc":13.2,"stip":22,"placed":null,"rem":"","type":""},{"co":"Josh Technology Groups","dt":"19 Aug 2025","role":"Frontend Developer","loc":"Gurugram","ctc":13.2,"stip":22,"placed":null,"rem":"","type":""},{"co":"MyUpchar","dt":"20 Aug 2025","role":"Software Engineer - Ruby on Rails","loc":"Delhi","ctc":4.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Blinkit","dt":"20 Aug 2025","role":"Business Analyst Intern","loc":"Punjab","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"Normal"},{"co":"Infocera IT Solutions","dt":"21 Aug 2025","role":"Full Stack Developer","loc":"New Delhi","ctc":5.5,"stip":20,"placed":null,"rem":"","type":""},{"co":"Deloitte India","dt":"21 Aug 2025","role":"SAP Analyst","loc":"PAN India","ctc":7.6,"stip":25,"placed":null,"rem":"","type":""},{"co":"Intelligaia","dt":"22 Aug 2025","role":"MERN Stack Developer","loc":"Panchkula","ctc":4.5,"stip":12,"placed":null,"rem":"","type":""},{"co":"Sprouts","dt":"23 Aug 2025","role":"Sales Intern","loc":"Bangalore","ctc":8.0,"stip":25,"placed":null,"rem":"","type":"International Startup"},{"co":"VR Expert","dt":"23 Aug 2025","role":"Intern Unreal Enginer Artist","loc":"Mohali","ctc":null,"stip":null,"placed":null,"rem":"","type":""},{"co":"High Radius","dt":"23 Aug 2025","role":"Account Based Marketing","loc":"Hyderabad","ctc":8.0,"stip":22,"placed":null,"rem":"","type":"MnC"},{"co":"Capgemini","dt":"25 Aug 2025","role":"Software Engineer","loc":"PAN India","ctc":4.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Capgemini","dt":"26 Aug 2025","role":"PLM","loc":"PAN India","ctc":4.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Capgemini","dt":"26 Aug 2025","role":"4G / 5G Writeless","loc":"PAN India","ctc":4.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Draup Businness Solutions","dt":"26 Aug 2025","role":"Marketing Intern","loc":"Bangalore","ctc":7.0,"stip":30,"placed":null,"rem":"","type":""},{"co":"Tredence","dt":"26 Aug 2025","role":"Tredence","loc":"PAN India","ctc":10.0,"stip":null,"placed":null,"rem":"","type":""},{"co":"Josh Technology Groups","dt":"26 Aug 2025","role":"Software Quality Analyst","loc":"Gurugram","ctc":5.8,"stip":20,"placed":null,"rem":"","type":""},{"co":"Gynsys","dt":"26 Aug 2025","role":"Software Engineer Trainee: Gen AI","loc":"Bangalore","ctc":8.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Gynsys","dt":"26 Aug 2025","role":"Software Engineer Trainee: SAP","loc":"Bangalore","ctc":8.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Gynsys","dt":"26 Aug 2025","role":"Software Engineer Trainee: Application Dev","loc":"Bangalore","ctc":8.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Gynsys","dt":"26 Aug 2025","role":"Software Engineer Trainee: Salesforce Dev","loc":"Bangalore","ctc":8.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"Movate","dt":"28 Aug 2025","role":"Undefined","loc":"Bangalore","ctc":9.0,"stip":25,"placed":null,"rem":"","type":""},{"co":"BootesNull","dt":"29 Aug 2025","role":"AI & Generative Models Intern","loc":"Mohali","ctc":4.2,"stip":15,"placed":null,"rem":"","type":""},{"co":"NB Media and YT","dt":"30 Aug 2025","role":"AI Content Created (Intern - Female)","loc":"Mohali","ctc":6.0,"stip":35,"placed":null,"rem":"","type":""},{"co":"AU Small Finance","dt":"30 Aug 2025","role":"Graduate Engineer Trainee","loc":"Jaipur","ctc":5.0,"stip":15,"placed":null,"rem":"","type":""},{"co":"MeetMux","dt":"30 Aug 2025","role":"AIML Dev Intern","loc":"PAN India","ctc":20.0,"stip":100,"placed":null,"rem":"","type":""},{"co":"MeetMux","dt":"30 Aug 2025","role":"iOS Dev Intern","loc":"PAN India","ctc":20.0,"stip":100,"placed":null,"rem":"","type":""},{"co":"MeetMux","dt":"30 Aug 2025","role":"Product Developer Intern","loc":"PAN India","ctc":20.0,"stip":100,"placed":null,"rem":"","type":""},{"co":"MeetMux","dt":"30 Aug 2025","role":"Marketing Intern","loc":"PAN India","ctc":20.0,"stip":100,"placed":null,"rem":"","type":""},{"co":"Dentsu","dt":"01 Sep 2025","role":"Analyst","loc":"PAN India","ctc":5.0,"stip":null,"placed":null,"rem":"","type":"MnC"},{"co":"Wissen Technology","dt":"02 Sep 2025","role":"Tech Interns","loc":"Bangalore, Hyderabad, Pune, Mumbai","ctc":11.0,"stip":25,"placed":null,"rem":"","type":"International Startup"},{"co":"Coditas Solutions","dt":"02 Sep 2025","role":"Intern SDE","loc":"Pune","ctc":4.5,"stip":11,"placed":null,"rem":"","type":""}];

const DRIVE_TYPES = ["All","MnC","Normal","Startup","International Startup","International","Miscellaneous"];
const APP_STAGES = ["Shortlisted for OA","OA Done","OA Cleared","Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at OA","Rejected at Interview","Rejected at HR","Ghosted"];
const STAGE_COLORS = {"Shortlisted for OA":"#9333ea","OA Done":"#2563eb","OA Cleared":"#0891b2","Interview R1":"#d97706","Interview R2":"#d97706","Interview R3":"#d97706","HR Round":"#059669","Offered":"#059669","Rejected at OA":"#dc2626","Rejected at Interview":"#dc2626","Rejected at HR":"#dc2626","Ghosted":"#999"};
const PLATFORMS = ["Campus Portal","LinkedIn","Wellfound","Company Website","Referral","eLitmus","HackerRank","Other"];
const LEARN_PATTERNS = [{"id":"arrays","tier":1,"label":"Arrays + Prefix Sum","emoji":"\ud83d\udcca","accent":"#2563eb","days":"2-3 days","placement":"\ud83d\udd34 Every OA","simpleExplanation":"Prefix sum matlab ek aisa array banao jahan har index pe 0 se us index tak ka sum stored ho. Phir kisi bhi range [l,r] ka sum ek second mein milega: prefix[r] - prefix[l-1]. Ye trick tab use karo jab 'subarray sum' ya 'range sum' dikhega.","template":"// PREFIX SUM\nint[] prefix = new int[n+1];\nfor(int i=0;i<n;i++) prefix[i+1] = prefix[i] + nums[i];\n// sum of range [l,r] = prefix[r+1] - prefix[l]\n\n// KADANE'S (max subarray)\nint maxSum = nums[0], curr = nums[0];\nfor(int i=1;i<n;i++){\n    curr = Math.max(nums[i], curr+nums[i]);\n    maxSum = Math.max(maxSum, curr);\n}","whenToUse":"'subarray sum', 'range query', 'maximum subarray' \u2014 prefix sum or Kadane's","problems":[{"id":"ar1","name":"Running Sum of 1D Array","lc":"1480","diff":"Easy","tag":"prefix sum","link":"https://leetcode.com/problems/running-sum-of-1d-array/"},{"id":"ar2","name":"Find Pivot Index","lc":"724","diff":"Easy","tag":"prefix sum","link":"https://leetcode.com/problems/find-pivot-index/"},{"id":"ar3","name":"Maximum Subarray","lc":"53","diff":"Medium","tag":"kadane's","link":"https://leetcode.com/problems/maximum-subarray/"},{"id":"ar4","name":"Product of Array Except Self","lc":"238","diff":"Medium","tag":"prefix+suffix","link":"https://leetcode.com/problems/product-of-array-except-self/"},{"id":"ar5","name":"Subarray Sum Equals K","lc":"560","diff":"Medium","tag":"prefix+hashmap","link":"https://leetcode.com/problems/subarray-sum-equals-k/"},{"id":"ar6","name":"Maximum Sum Circular Subarray","lc":"918","diff":"Medium","tag":"kadane's variant","link":"https://leetcode.com/problems/maximum-sum-circular-subarray/"}]},{"id":"hashmap","tier":1,"label":"HashMap / Frequency","emoji":"\ud83d\uddc2\ufe0f","accent":"#b45309","days":"1-2 days","placement":"\ud83d\udd34 Every OA","simpleExplanation":"HashMap = fast lookup. Jab bhi 'count karo', 'find pair', 'kya seen tha pehle' aaye \u2014 HashMap. Two Sum ka logic: target - nums[i] already dekha kya? Frequency map: har element ko count karo, phir kaam karo.","template":"// FREQUENCY MAP\nMap<Integer,Integer> freq = new HashMap<>();\nfor(int n:nums) freq.merge(n,1,Integer::sum);\n\n// TWO SUM PATTERN\nMap<Integer,Integer> seen = new HashMap<>();\nfor(int i=0;i<n;i++){\n    int comp = target-nums[i];\n    if(seen.containsKey(comp)) return new int[]{seen.get(comp),i};\n    seen.put(nums[i],i);\n}\n\n// PREFIX SUM + MAP (subarray sum=k)\nMap<Integer,Integer> pre = new HashMap<>();\npre.put(0,1); int sum=0,res=0;\nfor(int n:nums){\n    sum+=n;\n    res+=pre.getOrDefault(sum-k,0);\n    pre.merge(sum,1,Integer::sum);\n}","whenToUse":"'find pair/triplet', 'count frequency', 'check if seen before', 'subarray with sum k'","problems":[{"id":"hm1","name":"Two Sum","lc":"1","diff":"Easy","tag":"complement lookup","link":"https://leetcode.com/problems/two-sum/"},{"id":"hm2","name":"Valid Anagram","lc":"242","diff":"Easy","tag":"frequency map","link":"https://leetcode.com/problems/valid-anagram/"},{"id":"hm3","name":"Group Anagrams","lc":"49","diff":"Medium","tag":"freq map key","link":"https://leetcode.com/problems/group-anagrams/"},{"id":"hm4","name":"Subarray Sum Equals K","lc":"560","diff":"Medium","tag":"prefix+map","link":"https://leetcode.com/problems/subarray-sum-equals-k/"},{"id":"hm5","name":"Longest Consecutive Sequence","lc":"128","diff":"Medium","tag":"hashset","link":"https://leetcode.com/problems/longest-consecutive-sequence/"},{"id":"hm6","name":"Top K Frequent Elements","lc":"347","diff":"Medium","tag":"freq+heap","link":"https://leetcode.com/problems/top-k-frequent-elements/"}]},{"id":"twoptr","tier":1,"label":"Two Pointers","emoji":"\ud83d\udc46\ud83d\udc46","accent":"#0891b2","days":"2-3 days","placement":"\ud83d\udd34 Every OA","simpleExplanation":"Do pointer \u2014 left aur right. Sorted array hai? Opposite ends se shuru karo. Sum chota hai? left badho. Sum bada hai? right chhoto. Linked list mein fast/slow pointer \u2014 fast 2 step, slow 1 step. Jab fast null ho, slow middle pe hoga.","template":"// OPPOSITE ENDS\nint l=0, r=n-1;\nwhile(l<r){\n    int sum=arr[l]+arr[r];\n    if(sum==target){/* found */l++;r--;}\n    else if(sum<target) l++;\n    else r--;\n}\n\n// FAST/SLOW (cycle/middle)\nListNode slow=head, fast=head;\nwhile(fast!=null && fast.next!=null){\n    slow=slow.next;\n    fast=fast.next.next;\n    if(slow==fast) return true;\n}\n\n// SAME DIRECTION (remove dups)\nint slow=0;\nfor(int fast=1;fast<n;fast++)\n    if(arr[fast]!=arr[slow]) arr[++slow]=arr[fast];","whenToUse":"Sorted array + pair sum, linked list middle/cycle, remove duplicates in-place","problems":[{"id":"tp1","name":"Valid Palindrome","lc":"125","diff":"Easy","tag":"opposite ends","link":"https://leetcode.com/problems/valid-palindrome/"},{"id":"tp2","name":"Two Sum II","lc":"167","diff":"Easy","tag":"opposite ends","link":"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},{"id":"tp3","name":"3Sum","lc":"15","diff":"Medium","tag":"sort+two ptr","link":"https://leetcode.com/problems/3sum/"},{"id":"tp4","name":"Container With Most Water","lc":"11","diff":"Medium","tag":"opposite ends","link":"https://leetcode.com/problems/container-with-most-water/"},{"id":"tp5","name":"Middle of Linked List","lc":"876","diff":"Easy","tag":"fast/slow","link":"https://leetcode.com/problems/middle-of-the-linked-list/"},{"id":"tp6","name":"Linked List Cycle II","lc":"142","diff":"Medium","tag":"fast/slow","link":"https://leetcode.com/problems/linked-list-cycle-ii/"},{"id":"tp7","name":"Trapping Rain Water","lc":"42","diff":"Hard","tag":"two pointers","link":"https://leetcode.com/problems/trapping-rain-water/"}]},{"id":"sliding","tier":1,"label":"Sliding Window","emoji":"\ud83e\ude9f","accent":"#7c3aed","days":"3-4 days","placement":"\ud83d\udd34 Every OA","simpleExplanation":"Window = subarray ka ek range. Right se add karo. Jab window invalid ho jaaye (jaise 2 se zyada distinct chars, ya sum > k), left se hatao jab tak valid na ho. Phir max/min update karo. Simple rule: RIGHT se EXPAND, LEFT se SHRINK.","template":"// FIXED WINDOW (size k)\nint sum=0;\nfor(int i=0;i<k;i++) sum+=arr[i];\nint max=sum;\nfor(int i=k;i<n;i++){\n    sum+=arr[i]-arr[i-k];\n    max=Math.max(max,sum);\n}\n\n// VARIABLE WINDOW\nint left=0, result=0;\nMap<Character,Integer> map=new HashMap<>();\nfor(int right=0;right<s.length();right++){\n    map.merge(s.charAt(right),1,Integer::sum); // add right\n    while(windowInvalid(map)){                  // SHRINK while invalid\n        map.merge(s.charAt(left),-1,Integer::sum);\n        if(map.get(s.charAt(left))==0) map.remove(s.charAt(left));\n        left++;\n    }\n    result=Math.max(result, right-left+1);      // update answer\n}","whenToUse":"'longest/shortest subarray/substring', 'subarray with condition', 'max sum subarray of size k'","problems":[{"id":"sw1","name":"Maximum Average Subarray I","lc":"643","diff":"Easy","tag":"fixed window","link":"https://leetcode.com/problems/maximum-average-subarray-i/"},{"id":"sw2","name":"Longest Substring Without Repeating","lc":"3","diff":"Medium","tag":"variable window","link":"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},{"id":"sw3","name":"Max Consecutive Ones III","lc":"1004","diff":"Medium","tag":"variable window","link":"https://leetcode.com/problems/max-consecutive-ones-iii/"},{"id":"sw4","name":"Permutation in String","lc":"567","diff":"Medium","tag":"fixed window+freq","link":"https://leetcode.com/problems/permutation-in-string/"},{"id":"sw5","name":"Longest Repeating Char Replacement","lc":"424","diff":"Medium","tag":"variable window","link":"https://leetcode.com/problems/longest-repeating-character-replacement/"},{"id":"sw6","name":"Fruit Into Baskets","lc":"904","diff":"Medium","tag":"at most k distinct","link":"https://leetcode.com/problems/fruit-into-baskets/"},{"id":"sw7","name":"Minimum Window Substring","lc":"76","diff":"Hard","tag":"variable window","link":"https://leetcode.com/problems/minimum-window-substring/"}]},{"id":"bsearch","tier":1,"label":"Binary Search","emoji":"\ud83d\udd0d","accent":"#9333ea","days":"3-4 days","placement":"\ud83d\udd34 High","simpleExplanation":"Sorted array hai, aur answer dhundhna hai? lo aur hi rakho, mid check karo. Answer se chhota hai? lo = mid+1. Bada hai? hi = mid-1. BS on Answer: jab 'minimum speed', 'max days', 'split array' dikhega \u2014 answer pe binary search karo. Agar X kaam karta hai, kya X+1 bhi karta hai? Haan? Toh monotonic \u2014 BS karo.","template":"// CLASSIC BS\nint lo=0, hi=n-1;\nwhile(lo<=hi){\n    int mid=lo+(hi-lo)/2;\n    if(arr[mid]==target) return mid;\n    else if(arr[mid]<target) lo=mid+1;\n    else hi=mid-1;\n}\n\n// LOWER BOUND (first position >= target)\nint lo=0, hi=n;\nwhile(lo<hi){\n    int mid=lo+(hi-lo)/2;\n    if(arr[mid]<target) lo=mid+1;\n    else hi=mid;\n}\nreturn lo;\n\n// BS ON ANSWER\nint lo=minPossible, hi=maxPossible;\nwhile(lo<hi){\n    int mid=lo+(hi-lo)/2;\n    if(canAchieve(mid)) hi=mid;   // minimize\n    else lo=mid+1;\n}\nreturn lo;","whenToUse":"Sorted array search, find boundary, 'minimum X such that condition holds', rotated array","problems":[{"id":"bs1","name":"Binary Search","lc":"704","diff":"Easy","tag":"classic","link":"https://leetcode.com/problems/binary-search/"},{"id":"bs2","name":"Search Insert Position","lc":"35","diff":"Easy","tag":"lower bound","link":"https://leetcode.com/problems/search-insert-position/"},{"id":"bs3","name":"Find First and Last Position","lc":"34","diff":"Medium","tag":"lower+upper bound","link":"https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"},{"id":"bs4","name":"Search in Rotated Sorted Array","lc":"33","diff":"Medium","tag":"rotated","link":"https://leetcode.com/problems/search-in-rotated-sorted-array/"},{"id":"bs5","name":"Find Minimum in Rotated Array","lc":"153","diff":"Medium","tag":"rotated","link":"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},{"id":"bs6","name":"Find Peak Element","lc":"162","diff":"Medium","tag":"peak","link":"https://leetcode.com/problems/find-peak-element/"},{"id":"bs7","name":"Koko Eating Bananas","lc":"875","diff":"Medium","tag":"BS on answer","link":"https://leetcode.com/problems/koko-eating-bananas/"},{"id":"bs8","name":"Split Array Largest Sum","lc":"410","diff":"Hard","tag":"BS on answer","link":"https://leetcode.com/problems/split-array-largest-sum/"}]},{"id":"sorting","tier":1,"label":"Sorting","emoji":"\ud83d\udd22","accent":"#059669","days":"1-2 days","placement":"\ud83d\udd34 Always needed","simpleExplanation":"Sorting seedha nahi poochha jaata but har jagah use hota hai. 3Sum ke liye pehle sort karo. Intervals ke liye sort karo. Custom comparator: 2 strings ko compare karna ho toh a+b vs b+a karo. Arrays.sort() O(nlogn) hai \u2014 yahi use karo.","template":"// BUILT-IN SORT\nArrays.sort(arr); // ascending\nArrays.sort(arr, Collections.reverseOrder()); // descending\n\n// CUSTOM COMPARATOR\nArrays.sort(arr, (a,b) -> a[0]-b[0]); // sort by first element\nArrays.sort(strs, (a,b) -> (a+b).compareTo(b+a)); // for largest number\n\n// MERGE INTERVALS PATTERN\nArrays.sort(intervals, (a,b)->a[0]-b[0]);\nList<int[]> res = new ArrayList<>();\nfor(int[] curr:intervals){\n    if(res.isEmpty()||res.get(res.size()-1)[1]<curr[0])\n        res.add(curr);\n    else\n        res.get(res.size()-1)[1]=Math.max(res.get(res.size()-1)[1],curr[1]);\n}","whenToUse":"Before two pointers, merge intervals, custom ordering problems, 'arrange to maximize/minimize'","problems":[{"id":"so1","name":"Sort Colors","lc":"75","diff":"Medium","tag":"3-way partition","link":"https://leetcode.com/problems/sort-colors/"},{"id":"so2","name":"Merge Intervals","lc":"56","diff":"Medium","tag":"sort+merge","link":"https://leetcode.com/problems/merge-intervals/"},{"id":"so3","name":"Largest Number","lc":"179","diff":"Medium","tag":"custom comparator","link":"https://leetcode.com/problems/largest-number/"},{"id":"so4","name":"Meeting Rooms II","lc":"253","diff":"Medium","tag":"sort+heap","link":"https://leetcode.com/problems/meeting-rooms-ii/"},{"id":"so5","name":"Non-overlapping Intervals","lc":"435","diff":"Medium","tag":"greedy+sort","link":"https://leetcode.com/problems/non-overlapping-intervals/"}]},{"id":"stack","tier":2,"label":"Stack / Monotonic Stack","emoji":"\ud83d\udcda","accent":"#dc2626","days":"2-3 days","placement":"\ud83d\udfe1 Interviews","simpleExplanation":"Stack = last in first out. Monotonic stack ka idea: ek stack maintain karo jo hamesha increasing ya decreasing ho. Jab bhi naya element purane se bada ho \u2014 pop karo aur answer record karo (next greater element mil gaya!). Daily temperatures exactly yehi hai.","template":"// MONOTONIC STACK (next greater element)\nStack<Integer> st=new Stack<>();\nint[] res=new int[n];\nfor(int i=0;i<n;i++){\n    while(!st.isEmpty()&&arr[st.peek()]<arr[i])\n        res[st.pop()]=arr[i]; // arr[i] is next greater\n    st.push(i);\n}\n\n// VALID PARENTHESES\nStack<Character> st=new Stack<>();\nfor(char c:s.toCharArray()){\n    if(c=='(') st.push(c);\n    else if(!st.isEmpty()&&matches(st.peek(),c)) st.pop();\n    else return false;\n}\nreturn st.isEmpty();\n\n// MIN STACK\nStack<int[]> st=new Stack<>(); // [val, currentMin]\nvoid push(int val){\n    int min=st.isEmpty()?val:Math.min(val,st.peek()[1]);\n    st.push(new int[]{val,min});\n}","whenToUse":"'next greater/smaller element', 'valid parentheses', 'largest rectangle', need O(1) min/max","problems":[{"id":"st1","name":"Valid Parentheses","lc":"20","diff":"Easy","tag":"stack","link":"https://leetcode.com/problems/valid-parentheses/"},{"id":"st2","name":"Min Stack","lc":"155","diff":"Medium","tag":"design","link":"https://leetcode.com/problems/min-stack/"},{"id":"st3","name":"Next Greater Element I","lc":"496","diff":"Easy","tag":"monotonic stack","link":"https://leetcode.com/problems/next-greater-element-i/"},{"id":"st4","name":"Daily Temperatures","lc":"739","diff":"Medium","tag":"monotonic stack","link":"https://leetcode.com/problems/daily-temperatures/"},{"id":"st5","name":"Car Fleet","lc":"853","diff":"Medium","tag":"monotonic stack","link":"https://leetcode.com/problems/car-fleet/"},{"id":"st6","name":"Asteroid Collision","lc":"735","diff":"Medium","tag":"stack simulation","link":"https://leetcode.com/problems/asteroid-collision/"},{"id":"st7","name":"Largest Rectangle in Histogram","lc":"84","diff":"Hard","tag":"monotonic stack","link":"https://leetcode.com/problems/largest-rectangle-in-histogram/"}]},{"id":"linkedlist","tier":2,"label":"Linked List","emoji":"\ud83d\udd17","accent":"#0f766e","days":"2-3 days","placement":"\ud83d\udfe1 Interviews","simpleExplanation":"Linked list mein pointers hi sab kuch hain. Reverse karna? Teeno pointers: prev, curr, next. Cycle detect? Fast/slow. kth from end? Do pointer \u2014 pehle wala k aage bhejo, phir dono saath chalao. Merge sorted lists? Dummy node banao aur chote ko attach karte jao.","template":"// REVERSE LINKED LIST\nListNode prev=null, curr=head;\nwhile(curr!=null){\n    ListNode next=curr.next;\n    curr.next=prev;\n    prev=curr;\n    curr=next;\n}\nreturn prev;\n\n// FIND kTH FROM END\nListNode fast=head, slow=head;\nfor(int i=0;i<k;i++) fast=fast.next;\nwhile(fast!=null){slow=slow.next;fast=fast.next;}\nreturn slow;\n\n// MERGE TWO SORTED\nListNode dummy=new ListNode(0), curr=dummy;\nwhile(l1!=null&&l2!=null){\n    if(l1.val<l2.val){curr.next=l1;l1=l1.next;}\n    else{curr.next=l2;l2=l2.next;}\n    curr=curr.next;\n}\ncurr.next=(l1!=null)?l1:l2;\nreturn dummy.next;","whenToUse":"Any linked list problem \u2014 reverse, cycle, merge, find middle, remove nth node","problems":[{"id":"ll1","name":"Reverse Linked List","lc":"206","diff":"Easy","tag":"three pointers","link":"https://leetcode.com/problems/reverse-linked-list/"},{"id":"ll2","name":"Merge Two Sorted Lists","lc":"21","diff":"Easy","tag":"dummy node","link":"https://leetcode.com/problems/merge-two-sorted-lists/"},{"id":"ll3","name":"Remove Nth Node From End","lc":"19","diff":"Medium","tag":"two pointers","link":"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},{"id":"ll4","name":"Reorder List","lc":"143","diff":"Medium","tag":"find mid+reverse+merge","link":"https://leetcode.com/problems/reorder-list/"},{"id":"ll5","name":"Add Two Numbers","lc":"2","diff":"Medium","tag":"simulation","link":"https://leetcode.com/problems/add-two-numbers/"},{"id":"ll6","name":"LRU Cache","lc":"146","diff":"Medium","tag":"doubly LL+hashmap","link":"https://leetcode.com/problems/lru-cache/"},{"id":"ll7","name":"Merge K Sorted Lists","lc":"23","diff":"Hard","tag":"heap+LL","link":"https://leetcode.com/problems/merge-k-sorted-lists/"}]},{"id":"trees","tier":2,"label":"Trees \u2014 DFS / BFS","emoji":"\ud83c\udf32","accent":"#16a34a","days":"3-4 days","placement":"\ud83d\udd34 High","simpleExplanation":"Tree mein 2 cheezein hain: DFS (depth first, recursion se) aur BFS (level by level, queue se). DFS ke liye socho: function kya return karega? Base case kya hai? Phir left aur right ka kaam karo aur merge karo. BFS ke liye: queue mein root daalo, level size yaad rakho, loop chalao.","template":"// DFS (recursive)\nint dfs(TreeNode node){\n    if(node==null) return 0;          // base case\n    int left=dfs(node.left);           // left ka kaam\n    int right=dfs(node.right);         // right ka kaam\n    return Math.max(left,right)+1;     // merge + return\n}\n\n// BFS (level order)\nQueue<TreeNode> q=new LinkedList<>();\nq.offer(root);\nwhile(!q.isEmpty()){\n    int size=q.size();                 // current level size\n    for(int i=0;i<size;i++){\n        TreeNode node=q.poll();\n        // process node\n        if(node.left!=null) q.offer(node.left);\n        if(node.right!=null) q.offer(node.right);\n    }\n}","whenToUse":"DFS: height, path sum, diameter, any recursive tree problem. BFS: level order, shortest path, right side view","problems":[{"id":"tr1","name":"Maximum Depth of Binary Tree","lc":"104","diff":"Easy","tag":"DFS","link":"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},{"id":"tr2","name":"Invert Binary Tree","lc":"226","diff":"Easy","tag":"DFS","link":"https://leetcode.com/problems/invert-binary-tree/"},{"id":"tr3","name":"Diameter of Binary Tree","lc":"543","diff":"Easy","tag":"DFS","link":"https://leetcode.com/problems/diameter-of-binary-tree/"},{"id":"tr4","name":"Binary Tree Level Order Traversal","lc":"102","diff":"Medium","tag":"BFS","link":"https://leetcode.com/problems/binary-tree-level-order-traversal/"},{"id":"tr5","name":"Binary Tree Right Side View","lc":"199","diff":"Medium","tag":"BFS","link":"https://leetcode.com/problems/binary-tree-right-side-view/"},{"id":"tr6","name":"Path Sum II","lc":"113","diff":"Medium","tag":"DFS+backtrack","link":"https://leetcode.com/problems/path-sum-ii/"},{"id":"tr7","name":"Lowest Common Ancestor","lc":"236","diff":"Medium","tag":"DFS","link":"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"},{"id":"tr8","name":"Binary Tree Max Path Sum","lc":"124","diff":"Hard","tag":"DFS","link":"https://leetcode.com/problems/binary-tree-maximum-path-sum/"}]},{"id":"bst","tier":2,"label":"BST","emoji":"\ud83c\udf33","accent":"#15803d","days":"2-3 days","placement":"\ud83d\udd34 High","simpleExplanation":"BST mein ek property hoti hai: left < root < right. Inorder traversal = sorted array. Yahi sab kuch hai. Kth smallest chahiye? Inorder karo, kth element return karo. Validate BST? Min aur max pass karo. LCA in BST? Dono nodes ke beech wala node hi answer hai.","template":"// INORDER (gives sorted order)\nvoid inorder(TreeNode node){\n    if(node==null) return;\n    inorder(node.left);\n    // process node.val\n    inorder(node.right);\n}\n\n// VALIDATE BST\nboolean valid(TreeNode node, long min, long max){\n    if(node==null) return true;\n    if(node.val<=min||node.val>=max) return false;\n    return valid(node.left,min,node.val)&&valid(node.right,node.val,max);\n}\n\n// LCA IN BST\nTreeNode lca(TreeNode root,TreeNode p,TreeNode q){\n    if(p.val<root.val&&q.val<root.val) return lca(root.left,p,q);\n    if(p.val>root.val&&q.val>root.val) return lca(root.right,p,q);\n    return root; // root is between p and q\n}","whenToUse":"BST: kth smallest, validate, LCA, insert/delete, convert sorted array to BST","problems":[{"id":"bst1","name":"Validate Binary Search Tree","lc":"98","diff":"Medium","tag":"min/max range","link":"https://leetcode.com/problems/validate-binary-search-tree/"},{"id":"bst2","name":"Kth Smallest in BST","lc":"230","diff":"Medium","tag":"inorder","link":"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},{"id":"bst3","name":"Lowest Common Ancestor of BST","lc":"235","diff":"Medium","tag":"BST property","link":"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},{"id":"bst4","name":"Convert Sorted Array to BST","lc":"108","diff":"Easy","tag":"divide+conquer","link":"https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"},{"id":"bst5","name":"Delete Node in BST","lc":"450","diff":"Medium","tag":"BST","link":"https://leetcode.com/problems/delete-node-in-a-bst/"}]},{"id":"recursion","tier":2,"label":"Recursion","emoji":"\ud83d\udd04","accent":"#6d28d9","days":"1-2 days","placement":"\ud83d\udfe1 Foundation","simpleExplanation":"Recursion = function apne aap ko call karta hai chhote problem pe. 3 cheezein socho: 1) Base case kya hai (kab rukna hai)? 2) Chhota problem kya hai? 3) Chhote ka answer use karke bada kaise solve karein? Hamesha base case pehle likho.","template":"// RECURSION TEMPLATE\nreturnType solve(params){\n    if(baseCase) return baseAnswer;  // HAMESHA PEHLE\n    // chhote problem solve karo\n    returnType sub = solve(smallerParams);\n    // sub use karke answer banao\n    return buildAnswer(sub);\n}\n\n// EXAMPLE: Power(x,n)\ndouble power(double x, int n){\n    if(n==0) return 1;\n    if(n<0) return 1/power(x,-n);\n    if(n%2==0){\n        double half=power(x,n/2);\n        return half*half;  // fast power\n    }\n    return x*power(x,n-1);\n}","whenToUse":"Tree problems, divide and conquer, any problem where you can break into identical subproblems","problems":[{"id":"re1","name":"Fibonacci Number","lc":"509","diff":"Easy","tag":"basic recursion","link":"https://leetcode.com/problems/fibonacci-number/"},{"id":"re2","name":"Power(x, n)","lc":"50","diff":"Medium","tag":"fast power","link":"https://leetcode.com/problems/powx-n/"},{"id":"re3","name":"Reverse Linked List (recursive)","lc":"206","diff":"Easy","tag":"recursion","link":"https://leetcode.com/problems/reverse-linked-list/"},{"id":"re4","name":"Merge Two Sorted Lists (recursive)","lc":"21","diff":"Easy","tag":"recursion","link":"https://leetcode.com/problems/merge-two-sorted-lists/"},{"id":"re5","name":"K-th Symbol in Grammar","lc":"779","diff":"Medium","tag":"tree recursion","link":"https://leetcode.com/problems/k-th-symbol-in-grammar/"}]},{"id":"backtrack","tier":2,"label":"Backtracking","emoji":"\ud83c\udf00","accent":"#be185d","days":"3-4 days","placement":"\ud83d\udfe1 Interviews","simpleExplanation":"Backtracking = try karo, nahi chala toh wapas aao. Template: choose \u2192 explore \u2192 unchoose. Decision tree banao mentally. Subsets mein: har element ko include karo ya nahi? Permutations mein: har position pe koi bhi element rakh sakte ho jo abhi use nahi hua.","template":"// BACKTRACKING TEMPLATE\nvoid backtrack(params, List<Integer> curr, List<List<Integer>> res){\n    if(baseCase){\n        res.add(new ArrayList<>(curr)); // COPY karo, reference nahi\n        return;\n    }\n    for(choice : choices){\n        curr.add(choice);         // CHOOSE\n        backtrack(next, curr, res); // EXPLORE\n        curr.remove(curr.size()-1); // UNCHOOSE\n    }\n}\n\n// SUBSETS\nvoid bt(int start, List<Integer> curr){\n    res.add(new ArrayList<>(curr));\n    for(int i=start;i<nums.length;i++){\n        curr.add(nums[i]);\n        bt(i+1, curr);\n        curr.remove(curr.size()-1);\n    }\n}","whenToUse":"'all subsets/permutations/combinations', 'find all solutions', N-Queens, Sudoku, Word Search","problems":[{"id":"bt1","name":"Subsets","lc":"78","diff":"Medium","tag":"backtracking","link":"https://leetcode.com/problems/subsets/"},{"id":"bt2","name":"Permutations","lc":"46","diff":"Medium","tag":"backtracking","link":"https://leetcode.com/problems/permutations/"},{"id":"bt3","name":"Combination Sum","lc":"39","diff":"Medium","tag":"backtracking","link":"https://leetcode.com/problems/combination-sum/"},{"id":"bt4","name":"Subsets II (duplicates)","lc":"90","diff":"Medium","tag":"sort+skip dups","link":"https://leetcode.com/problems/subsets-ii/"},{"id":"bt5","name":"Word Search","lc":"79","diff":"Medium","tag":"grid backtrack","link":"https://leetcode.com/problems/word-search/"},{"id":"bt6","name":"N-Queens","lc":"51","diff":"Hard","tag":"backtracking","link":"https://leetcode.com/problems/n-queens/"}]},{"id":"graphs","tier":3,"label":"Graphs \u2014 DFS / BFS","emoji":"\ud83d\udd78\ufe0f","accent":"#1d4ed8","days":"4-5 days","placement":"\ud83d\udfe1 Mid-level","simpleExplanation":"Graph = nodes + edges. Grid bhi ek graph hai (har cell ek node, 4 neighbors). DFS: ek direction mein jaate raho jab tak ho sake. BFS: shortest path ke liye, level by level explore karo. Topological sort: dependency order \u2014 kaunsa pehle karna hai? In-degree 0 wala pehle.","template":"// DFS ON GRID\nint[] dr={0,0,1,-1}; int[] dc={1,-1,0,0};\nvoid dfs(int r, int c){\n    if(r<0||r>=rows||c<0||c>=cols) return; // out of bounds\n    if(visited[r][c]||grid[r][c]=='0') return; // already seen or water\n    visited[r][c]=true;\n    for(int d=0;d<4;d++) dfs(r+dr[d],c+dc[d]);\n}\n\n// BFS (shortest path)\nQueue<int[]> q=new LinkedList<>();\nq.offer(new int[]{start,0}); visited[start]=true;\nwhile(!q.isEmpty()){\n    int[] cur=q.poll();\n    if(cur[0]==target) return cur[1];\n    for(int nb:graph.get(cur[0]))\n        if(!visited[nb]){visited[nb]=true;q.offer(new int[]{nb,cur[1]+1});}\n}\n\n// TOPOLOGICAL SORT (Kahn's)\nint[] indegree=new int[n];\n// build indegree array\nQueue<Integer> q=new LinkedList<>();\nfor(int i=0;i<n;i++) if(indegree[i]==0) q.offer(i);\nwhile(!q.isEmpty()){\n    int node=q.poll(); // process\n    for(int nb:graph.get(node)) if(--indegree[nb]==0) q.offer(nb);\n}","whenToUse":"'number of islands', 'connected components', 'shortest path', 'course schedule', 'dependencies'","problems":[{"id":"gr1","name":"Number of Islands","lc":"200","diff":"Medium","tag":"grid DFS","link":"https://leetcode.com/problems/number-of-islands/"},{"id":"gr2","name":"Max Area of Island","lc":"695","diff":"Medium","tag":"grid DFS","link":"https://leetcode.com/problems/max-area-of-island/"},{"id":"gr3","name":"Rotting Oranges","lc":"994","diff":"Medium","tag":"multi-source BFS","link":"https://leetcode.com/problems/rotting-oranges/"},{"id":"gr4","name":"Clone Graph","lc":"133","diff":"Medium","tag":"BFS+hashmap","link":"https://leetcode.com/problems/clone-graph/"},{"id":"gr5","name":"Course Schedule","lc":"207","diff":"Medium","tag":"topo sort","link":"https://leetcode.com/problems/course-schedule/"},{"id":"gr6","name":"Course Schedule II","lc":"210","diff":"Medium","tag":"topo sort","link":"https://leetcode.com/problems/course-schedule-ii/"},{"id":"gr7","name":"Pacific Atlantic Water Flow","lc":"417","diff":"Medium","tag":"multi-source DFS","link":"https://leetcode.com/problems/pacific-atlantic-water-flow/"}]},{"id":"heap","tier":3,"label":"Heap / Priority Queue","emoji":"\u26f0\ufe0f","accent":"#d97706","days":"2-3 days","placement":"\ud83d\udfe1 Mid-level","simpleExplanation":"Heap = hamesha min ya max top pe. K largest chahiye? Min heap of size k use karo \u2014 andar aane wala chota element khud bahar ho jaata hai, sirf bade bachte hain. Two heaps: lower half mein max heap, upper half mein min heap \u2014 median milti rehti hai.","template":"// MIN HEAP\nPriorityQueue<Integer> minH=new PriorityQueue<>();\n// MAX HEAP\nPriorityQueue<Integer> maxH=new PriorityQueue<>(Collections.reverseOrder());\n\n// K LARGEST (min heap of size k)\nPriorityQueue<Integer> pq=new PriorityQueue<>();\nfor(int num:nums){\n    pq.offer(num);\n    if(pq.size()>k) pq.poll(); // remove smallest\n}\n// pq has k largest\n\n// CUSTOM (sort by frequency)\nPriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->b[1]-a[1]); // max freq first\nfor(Map.Entry<Integer,Integer> e:freq.entrySet())\n    pq.offer(new int[]{e.getKey(),e.getValue()});","whenToUse":"'K largest/smallest', 'top K frequent', 'merge K sorted', 'find median', 'task scheduler'","problems":[{"id":"hp1","name":"Kth Largest Element","lc":"215","diff":"Medium","tag":"min heap","link":"https://leetcode.com/problems/kth-largest-element-in-an-array/"},{"id":"hp2","name":"K Closest Points to Origin","lc":"973","diff":"Medium","tag":"max heap","link":"https://leetcode.com/problems/k-closest-points-to-origin/"},{"id":"hp3","name":"Top K Frequent Elements","lc":"347","diff":"Medium","tag":"heap+freq","link":"https://leetcode.com/problems/top-k-frequent-elements/"},{"id":"hp4","name":"Task Scheduler","lc":"621","diff":"Medium","tag":"greedy+heap","link":"https://leetcode.com/problems/task-scheduler/"},{"id":"hp5","name":"Find Median from Data Stream","lc":"295","diff":"Hard","tag":"two heaps","link":"https://leetcode.com/problems/find-median-from-data-stream/"},{"id":"hp6","name":"Merge K Sorted Lists","lc":"23","diff":"Hard","tag":"heap","link":"https://leetcode.com/problems/merge-k-sorted-lists/"}]},{"id":"greedy","tier":3,"label":"Greedy","emoji":"\ud83d\udcb0","accent":"#ca8a04","days":"2-3 days","placement":"\ud83d\udfe1 Mid-level","simpleExplanation":"Greedy = abhi jo best dikh raha hai woh lo, baad ki mat socho. Jump Game: kya main is position se aage ja sakta hoon? Har step pe maximum reach track karo. Intervals: kaunsa khatam hoga pehle? Usse raho \u2014 maximum non-overlapping milenge.","template":"// JUMP GAME PATTERN\nint maxReach=0;\nfor(int i=0;i<n;i++){\n    if(i>maxReach) return false; // cannot reach i\n    maxReach=Math.max(maxReach, i+nums[i]);\n}\nreturn true;\n\n// INTERVAL SCHEDULING (max non-overlapping)\nArrays.sort(intervals,(a,b)->a[1]-b[1]); // sort by END time\nint count=1, end=intervals[0][1];\nfor(int i=1;i<n;i++){\n    if(intervals[i][0]>=end){ // no overlap\n        count++;\n        end=intervals[i][1];\n    }\n}","whenToUse":"'maximum events', 'minimum cost', 'can you reach end', interval scheduling, always sort first","problems":[{"id":"gr_1","name":"Jump Game","lc":"55","diff":"Medium","tag":"greedy","link":"https://leetcode.com/problems/jump-game/"},{"id":"gr_2","name":"Jump Game II","lc":"45","diff":"Medium","tag":"greedy","link":"https://leetcode.com/problems/jump-game-ii/"},{"id":"gr_3","name":"Gas Station","lc":"134","diff":"Medium","tag":"greedy","link":"https://leetcode.com/problems/gas-station/"},{"id":"gr_4","name":"Non-overlapping Intervals","lc":"435","diff":"Medium","tag":"interval greedy","link":"https://leetcode.com/problems/non-overlapping-intervals/"},{"id":"gr_5","name":"Hand of Straights","lc":"846","diff":"Medium","tag":"greedy+sort","link":"https://leetcode.com/problems/hand-of-straights/"}]},{"id":"dp","tier":3,"label":"Dynamic Programming","emoji":"\ud83e\udde0","accent":"#0f766e","days":"6-7 days","placement":"\ud83d\udd34 High","simpleExplanation":"DP = recursion + memory. Pehle brute force recursion likho. Phir dekho: same subproblem baar baar solve ho raha hai? Memo table banao. DP[i] ka matlab clearly define karo \u2014 yahi sab kuch hai. 1D DP: sirf pichle 1-2 values chahiye. 2D DP: do strings/arrays compare karna ho.","template":"// 1D DP (house robber pattern)\nint[] dp=new int[n];\ndp[0]=nums[0];\ndp[1]=Math.max(nums[0],nums[1]);\nfor(int i=2;i<n;i++)\n    dp[i]=Math.max(dp[i-1],         // skip current\n                  dp[i-2]+nums[i]); // rob current\n\n// COIN CHANGE (unbounded knapsack)\nint[] dp=new int[amount+1];\nArrays.fill(dp,amount+1);  // infinity\ndp[0]=0;\nfor(int i=1;i<=amount;i++)\n    for(int coin:coins)\n        if(coin<=i) dp[i]=Math.min(dp[i],dp[i-coin]+1);\n\n// 2D DP (LCS)\nint[][] dp=new int[m+1][n+1];\nfor(int i=1;i<=m;i++)\n    for(int j=1;j<=n;j++)\n        dp[i][j]=(s1[i-1]==s2[j-1])?\n            dp[i-1][j-1]+1:\n            Math.max(dp[i-1][j],dp[i][j-1]);","whenToUse":"'minimum/maximum ways', 'count paths', 'can you achieve X', 'optimal selection' \u2014 overlapping subproblems","problems":[{"id":"dp1","name":"Climbing Stairs","lc":"70","diff":"Easy","tag":"1D DP","link":"https://leetcode.com/problems/climbing-stairs/"},{"id":"dp2","name":"House Robber","lc":"198","diff":"Medium","tag":"1D DP","link":"https://leetcode.com/problems/house-robber/"},{"id":"dp3","name":"Unique Paths","lc":"62","diff":"Medium","tag":"2D DP","link":"https://leetcode.com/problems/unique-paths/"},{"id":"dp4","name":"Coin Change","lc":"322","diff":"Medium","tag":"unbounded knapsack","link":"https://leetcode.com/problems/coin-change/"},{"id":"dp5","name":"Longest Increasing Subsequence","lc":"300","diff":"Medium","tag":"sequence DP","link":"https://leetcode.com/problems/longest-increasing-subsequence/"},{"id":"dp6","name":"Partition Equal Subset Sum","lc":"416","diff":"Medium","tag":"0/1 knapsack","link":"https://leetcode.com/problems/partition-equal-subset-sum/"},{"id":"dp7","name":"Longest Common Subsequence","lc":"1143","diff":"Medium","tag":"2D DP","link":"https://leetcode.com/problems/longest-common-subsequence/"},{"id":"dp8","name":"Word Break","lc":"139","diff":"Medium","tag":"DP+hashset","link":"https://leetcode.com/problems/word-break/"}]},{"id":"trie","tier":4,"label":"Trie","emoji":"\ud83c\udf10","accent":"#0369a1","days":"2 days","placement":"\ud83d\udfe2 High-end","simpleExplanation":"Trie = prefix tree. Har node ek character represent karta hai. Words store karne ke liye. Search aur prefix check dono O(word length) mein hote hain. Dictionary problems, autocomplete \u2014 trie use karo.","template":"// TRIE NODE\nclass TrieNode{\n    TrieNode[] children=new TrieNode[26];\n    boolean isEnd=false;\n}\n\nclass Trie{\n    TrieNode root=new TrieNode();\n    void insert(String word){\n        TrieNode cur=root;\n        for(char c:word.toCharArray()){\n            int i=c-'a';\n            if(cur.children[i]==null) cur.children[i]=new TrieNode();\n            cur=cur.children[i];\n        }\n        cur.isEnd=true;\n    }\n    boolean search(String word){\n        TrieNode cur=root;\n        for(char c:word.toCharArray()){\n            int i=c-'a';\n            if(cur.children[i]==null) return false;\n            cur=cur.children[i];\n        }\n        return cur.isEnd;\n    }\n}","whenToUse":"'implement dictionary', 'prefix search', 'word search with wildcards', 'autocomplete'","problems":[{"id":"ti1","name":"Implement Trie","lc":"208","diff":"Medium","tag":"trie design","link":"https://leetcode.com/problems/implement-trie-prefix-tree/"},{"id":"ti2","name":"Design Add and Search Words","lc":"211","diff":"Medium","tag":"trie+DFS","link":"https://leetcode.com/problems/design-add-and-search-words-data-structure/"},{"id":"ti3","name":"Word Search II","lc":"212","diff":"Hard","tag":"trie+backtrack","link":"https://leetcode.com/problems/word-search-ii/"},{"id":"ti4","name":"Replace Words","lc":"648","diff":"Medium","tag":"trie","link":"https://leetcode.com/problems/replace-words/"}]},{"id":"unionfind","tier":4,"label":"Union Find (DSU)","emoji":"\ud83d\udd00","accent":"#7c3aed","days":"2 days","placement":"\ud83d\udfe2 High-end","simpleExplanation":"Union Find = group banao. Do nodes ek group mein hain kya? Find se check karo. Unhe jodna hai? Union karo. Path compression se super fast ho jaata hai. Connected components, cycle detection in undirected graph \u2014 DSU use karo.","template":"// UNION FIND\nint[] parent, rank;\nvoid init(int n){\n    parent=new int[n]; rank=new int[n];\n    for(int i=0;i<n;i++) parent[i]=i;\n}\nint find(int x){ // path compression\n    if(parent[x]!=x) parent[x]=find(parent[x]);\n    return parent[x];\n}\nbool union(int x, int y){ // union by rank\n    int px=find(x), py=find(y);\n    if(px==py) return false; // already connected\n    if(rank[px]<rank[py]) parent[px]=py;\n    else if(rank[px]>rank[py]) parent[py]=px;\n    else{parent[py]=px;rank[px]++;}\n    return true;\n}","whenToUse":"Connected components, cycle detection, 'are these two nodes connected', Kruskal's MST","problems":[{"id":"uf1","name":"Number of Provinces","lc":"547","diff":"Medium","tag":"DSU","link":"https://leetcode.com/problems/number-of-provinces/"},{"id":"uf2","name":"Redundant Connection","lc":"684","diff":"Medium","tag":"cycle detection","link":"https://leetcode.com/problems/redundant-connection/"},{"id":"uf3","name":"Accounts Merge","lc":"721","diff":"Medium","tag":"DSU","link":"https://leetcode.com/problems/accounts-merge/"},{"id":"uf4","name":"Graph Valid Tree","lc":"261","diff":"Medium","tag":"DSU","link":"https://leetcode.com/problems/graph-valid-tree/"}]},{"id":"bits","tier":4,"label":"Bit Manipulation","emoji":"\u26a1","accent":"#475569","days":"1-2 days","placement":"\ud83d\udfe2 High-end","simpleExplanation":"Bits mein sochna. XOR ka magic: a XOR a = 0. Toh array mein ek element ko XOR karo \u2014 jo sirf ek baar aaya woh bachega. n & (n-1) se rightmost set bit remove hoti hai \u2014 isse count karo kitne bits set hain. Odd/even: n & 1.","template":"// COMMON BIT TRICKS\nint n=5;       // 101 in binary\nn & 1          // 1 (odd check)\nn >> 1         // 2 (divide by 2)\nn << 1         // 10 (multiply by 2)\nn & (n-1)      // removes lowest set bit\nn ^ n          // 0 (XOR with itself)\na ^ b ^ a      // = b (XOR cancel)\n\n// COUNT SET BITS\nint count=0;\nwhile(n>0){count+=n&1;n>>=1;}\n// OR\nInteger.bitCount(n);\n\n// FIND SINGLE NUMBER (XOR all)\nint res=0;\nfor(int n:nums) res^=n;\nreturn res; // only non-duplicate survives","whenToUse":"'single number', 'count bits', 'power of 2', bitmasking for subsets","problems":[{"id":"bi1","name":"Single Number","lc":"136","diff":"Easy","tag":"XOR","link":"https://leetcode.com/problems/single-number/"},{"id":"bi2","name":"Number of 1 Bits","lc":"191","diff":"Easy","tag":"bit count","link":"https://leetcode.com/problems/number-of-1-bits/"},{"id":"bi3","name":"Reverse Bits","lc":"190","diff":"Easy","tag":"bit ops","link":"https://leetcode.com/problems/reverse-bits/"},{"id":"bi4","name":"Missing Number","lc":"268","diff":"Easy","tag":"XOR/math","link":"https://leetcode.com/problems/missing-number/"}]}];

// ─── All other data ────────────────────────────────────────────────────────────
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
  {date:"15 Apr",day:"Wed",morning:"Aptitude — Pictorial practice",p1:"Pictorial Practice",p2:"IndiaBix 20 Qs",evening:"Aptitude Practice"},
  {date:"16 Apr",day:"Thu",morning:"Aptitude — Pictorial practice",p1:"Pictorial Practice",p2:"IndiaBix 20 Qs",evening:"Aptitude Practice"},
  {date:"17 Apr",day:"Fri",morning:"Aptitude — Number series",p1:"Number Series Practice",p2:"IndiaBix 20 Qs",evening:"Aptitude Practice"},
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
        <div style={{fontSize:14,color:"#888",marginBottom:36}}>Tushar's placement command center.</div>
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

// ─── Reusable TopicBlock ───────────────────────────────────────────────────────
function TopicBlock({topic,doneMap,onToggle,progMap,onToggleProg,notesMap,onNote,showDiff,expanded,onExpand}) {
  const cnt=topic.problems.filter(p=>doneMap[p.id]).length;
  return (
    <div className="tblock">
      <div className="thdr" onClick={onExpand}>
        <div className="tinfo"><div className="tname">{topic.label}</div>{topic.level&&<div className="tlvl">{topic.level}</div>}</div>
        <div className="tr_">
          <div className="tmbar"><div className="tmfill" style={{width:`${(cnt/topic.problems.length)*100}%`,background:topic.accent}}/></div>
          <div className="tct">{cnt}/{topic.problems.length}</div>
          <div className="tch" style={{transform:expanded?"rotate(180deg)":"rotate(0)"}}>▼</div>
        </div>
      </div>
      {expanded&&<div className="plist">{topic.problems.map(p=>{
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


// ─── LEARN PAGE ────────────────────────────────────────────────────────────────
function LearnPage({learnDone,setLearnDone,persist,done,inProgress,notes,streak,adsDone,bankDone,dayStatus,applications}) {
  const [expanded,setExpanded] = useState({arrays:true});
  const [showTpl,setShowTpl] = useState({});
  const [activeTier,setActiveTier] = useState(0);

  const totalLearnProblems = LEARN_PATTERNS.reduce((s,p)=>s+p.problems.length,0);
  const totalLearnDone = Object.values(learnDone).filter(Boolean).length;

  const toggleDone = (id) => {
    const nl = {...learnDone,[id]:!learnDone[id]};
    setLearnDone(nl);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,applications,nl);
  };

  const tierColors = {1:"#dc2626",2:"#d97706",3:"#2563eb",4:"#059669"};
  const tierLabels = {1:"Tier 1 — Every OA",2:"Tier 2 — Interviews",3:"Tier 3 — Mid-level",4:"Tier 4 — High-end"};
  const tiers = [0,1,2,3,4];

  const filteredPatterns = activeTier===0 ? LEARN_PATTERNS : LEARN_PATTERNS.filter(p=>p.tier===activeTier);

  return (
    <div className="inner">
      {/* Header */}
      <div style={{marginBottom:20}}>
        <div className="stitle" style={{marginBottom:4}}>Pattern Learning Lab</div>
        <div style={{fontSize:11,color:"#aaa"}}>19 patterns · {totalLearnProblems} problems · Learn one pattern at a time, master it before moving on</div>
      </div>

      {/* Overall progress */}
      <div className="ovbar" style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
          <span style={{fontSize:12,fontWeight:500,color:"#666"}}>{totalLearnDone} of {totalLearnProblems} problems done</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalLearnDone/totalLearnProblems)*100)}%</span>
        </div>
        <div className="ovbg">
          <div style={{height:"100%",width:`${(totalLearnDone/totalLearnProblems)*100}%`,background:"linear-gradient(90deg,#2563eb,#9333ea)",borderRadius:3,transition:"width .6s"}}/>
        </div>
      </div>

      {/* How to use guide */}
      <div className="card" style={{background:"#fffbeb",border:"1px solid #fde68a",marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:"#92400e"}}>📖 How to Use This Page — Route Map</div>
        <div style={{display:"flex",flexDirection:"column",gap:7,fontSize:12,color:"#78350f"}}>
          {[
            ["Step 1","Start from Tier 1 Pattern 1. Don't skip. Do ALL problems in one pattern before next."],
            ["Step 2","Click the pattern card → read the Simple Explanation first (2 min)."],
            ["Step 3","Click 'See Template' → read + understand the code skeleton (5 min). Don't memorize, understand WHY."],
            ["Step 4","Solve Easy problems first (30 min each). If stuck >20 min, see hint on LC."],
            ["Step 5","Medium problems: attempt without help first. Spend max 45 min. Then see solution."],
            ["Step 6","After completing a pattern → wait 2 days → revisit first 2 problems of that pattern. Still remember? Move on."],
            ["Rule","Current plan = Tier 1 → Tier 2 → Tier 3. Skip Tier 4 until Tier 3 is 80% done."],
          ].map(([step,desc])=>(
            <div key={step} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{background:"#fef3c7",padding:"1px 7px",borderRadius:4,fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{step}</span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier filter */}
      <div className="filts" style={{marginBottom:16}}>
        <button className={`fb${activeTier===0?" on":""}`} onClick={()=>setActiveTier(0)}>All Tiers</button>
        {[1,2,3,4].map(t=>(
          <button key={t} className={`fb${activeTier===t?" on":""}`} onClick={()=>setActiveTier(t)}
            style={activeTier===t?{}:{borderColor:tierColors[t]+"44",color:tierColors[t]}}>
            {tierLabels[t].split("—")[0].trim()}
          </button>
        ))}
      </div>

      {/* Tier labels */}
      {activeTier===0 && [1,2,3,4].map(tier=>{
        const tierPatterns = LEARN_PATTERNS.filter(p=>p.tier===tier);
        const tierDone = tierPatterns.reduce((s,p)=>s+p.problems.filter(q=>learnDone[q.id]).length,0);
        const tierTotal = tierPatterns.reduce((s,p)=>s+p.problems.length,0);
        return (
          <div key={tier}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,marginTop:tier>1?20:0}}>
              <div style={{height:2,flex:1,background:tierColors[tier]+"33"}}/>
              <div style={{fontSize:12,fontWeight:700,color:tierColors[tier],whiteSpace:"nowrap"}}>{tierLabels[tier]}</div>
              <div style={{fontSize:11,color:"#bbb"}}>{tierDone}/{tierTotal}</div>
              <div style={{height:2,flex:1,background:tierColors[tier]+"33"}}/>
            </div>
            {tierPatterns.map(pattern=>(
              <PatternCard key={pattern.id} pattern={pattern} learnDone={learnDone}
                onToggle={toggleDone} expanded={!!expanded[pattern.id]}
                onExpand={()=>setExpanded(e=>({...e,[pattern.id]:!e[pattern.id]}))}
                showTpl={!!showTpl[pattern.id]} onToggleTpl={()=>setShowTpl(s=>({...s,[pattern.id]:!s[pattern.id]}))}/>
            ))}
          </div>
        );
      })}

      {activeTier!==0 && filteredPatterns.map(pattern=>(
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
    <div style={{background:"#fff",border:`1px solid ${expanded?pattern.accent+"44":"#e8e5e0"}`,borderRadius:13,marginBottom:10,overflow:"hidden",transition:"border-color .2s"}}>

      {/* Pattern header */}
      <div style={{display:"flex",alignItems:"center",padding:"14px 18px",cursor:"pointer",gap:12}} onClick={onExpand}>
        <div style={{fontSize:22,flexShrink:0}}>{pattern.emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1c1c1c"}}>{pattern.label}</div>
          <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:pattern.accent,background:pattern.accent+"15",padding:"1px 7px",borderRadius:4,fontWeight:600}}>{pattern.placement}</span>
            <span style={{fontSize:10,color:"#aaa"}}>~{pattern.days}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:52,height:4,background:"#f0ede8",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:pattern.accent,borderRadius:2,transition:"width .5s"}}/>
          </div>
          <span style={{fontSize:11,color:"#bbb",minWidth:28,textAlign:"right"}}>{done}/{pattern.problems.length}</span>
          <span style={{fontSize:9,color:"#ccc",transition:"transform .2s",transform:expanded?"rotate(180deg)":"rotate(0)"}}>▼</span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{borderTop:"1px solid #f5f3f0"}}>

          {/* Simple explanation */}
          <div style={{padding:"14px 18px",background:"#fafaf9",borderBottom:"1px solid #f0ede8"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>💡 Simple Explanation</div>
            <div style={{fontSize:12,color:"#444",lineHeight:1.7}}>{pattern.simpleExplanation}</div>
            <div style={{marginTop:8,fontSize:11,color:"#888"}}>
              <span style={{fontWeight:600}}>When to use: </span>{pattern.whenToUse}
            </div>
          </div>

          {/* Template toggle */}
          <div style={{padding:"10px 18px",borderBottom:"1px solid #f0ede8"}}>
            <button onClick={onToggleTpl}
              style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"1.5px solid "+pattern.accent+"44",borderRadius:7,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600,color:pattern.accent,fontFamily:"'DM Sans'",transition:"all .15s"}}>
              {showTpl?"▼ Hide Template":"▶ See Template (memorize this)"}
            </button>
            {showTpl && (
              <div style={{marginTop:10,background:"#1e1e2e",borderRadius:8,padding:"14px 16px",overflow:"auto"}}>
                <pre style={{fontSize:11,color:"#cdd6f4",lineHeight:1.6,margin:0,fontFamily:"'JetBrains Mono','Fira Code',monospace",whiteSpace:"pre-wrap"}}>{pattern.template}</pre>
              </div>
            )}
          </div>

          {/* Problems list */}
          <div>
            {pattern.problems.map(p=>{
              const isDone = !!learnDone[p.id];
              const ds = diffStyle[p.diff];
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",padding:"10px 18px",gap:9,borderBottom:"1px solid #f9f7f5",transition:"background .1s",background:isDone?"#f9f7f5":"#fff",opacity:isDone?.5:1}}>
                  <button onClick={()=>onToggle(p.id)}
                    style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${isDone?pattern.accent:"#ddd"}`,background:isDone?pattern.accent:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:8,color:isDone?"#fff":"transparent",transition:"all .15s"}}>
                    {isDone?"✓":""}
                  </button>
                  <span style={{flex:1,fontSize:12,color:"#333",textDecoration:isDone?"line-through":"none"}}>{p.name}</span>
                  <span style={{fontSize:9,color:"#bbb",background:"#f5f3f0",padding:"2px 6px",borderRadius:4,whiteSpace:"nowrap"}}>{p.tag}</span>
                  <span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,color:ds.color,background:ds.bg,whiteSpace:"nowrap"}}>{p.diff}</span>
                  <span style={{fontSize:10,color:"#bbb",flexShrink:0}}>LC {p.lc}</span>
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{width:19,height:19,borderRadius:4,border:"1.5px solid #e8e5e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#bbb",textDecoration:"none",flexShrink:0,transition:"all .12s"}}
                    onMouseOver={e=>{e.currentTarget.style.borderColor="#f97316";e.currentTarget.style.color="#f97316";}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor="#e8e5e0";e.currentTarget.style.color="#bbb";}}>
                    ↗
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function AlgoVault() {
  const [user,setUser]=useState(null); const [authChecked,setAuthChecked]=useState(false);
  const [syncing,setSyncing]=useState(false); const [lastSaved,setLastSaved]=useState(null);
  // DSA state
  const [done,setDone]=useState({}); const [inProgress,setInProgress]=useState({});
  const [notes,setNotes]=useState({}); const [streak,setStreak]=useState(EMPTY_STREAK);
  const [adsDone,setAdsDone]=useState({}); const [bankDone,setBankDone]=useState({});
  const [learnDone,setLearnDone]=useState({});
  // Placement state  
  const [applications,setApplications]=useState([]); // MY personal log
  const [dayStatus,setDayStatus]=useState({});
  const [todayLog,setTodayLog]=useState({text:'',done:false,date:''});
  const [logDraft,setLogDraft]=useState('');
  // UI state
  const [page,setPage]=useState("home");
  const [planTab,setPlanTab]=useState("drives"); // "drives" | "mylog"
  const [learnTabActive,setLearnTabActive]=useState(0);
  const [topicExp,setTopicExp]=useState({arrays:true,trees:false,hashmap:false,bsearch:false});
  const [adsExp,setAdsExp]=useState({}); const [bankExp,setBankExp]=useState({});
  const [noteOpen,setNoteOpen]=useState(null); const [noteText,setNoteText]=useState("");
  const [filterDiff,setFilterDiff]=useState("All"); const [bankFilter,setBankFilter]=useState("All");
  // Drive database filters
  const [driveSearch,setDriveSearch]=useState(""); const [driveType,setDriveType]=useState("All");
  const [driveMinCtc,setDriveMinCtc]=useState(0); const [expandedDrive,setExpandedDrive]=useState(null);
  // My application log
  const [showAddApp,setShowAddApp]=useState(false);
  const [editingApp,setEditingApp]=useState(null);
  const [appForm,setAppForm]=useState({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});
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
        const savedLog = data.today_log||{text:'',done:false,date:''};
        // Reset if it's a new day
        const today_ = new Date().toDateString();
        if(savedLog.date !== today_) {
          setTodayLog({text:'',done:false,date:today_});
          setLogDraft('');
        } else {
          setTodayLog(savedLog);
          setLogDraft(savedLog.text||'');
        }
        if(data.bank_done){setBankDone(data.bank_done);}
        else{const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});setBankDone(init);}
      } else {
        const init={};BANK.forEach(q=>{if(q.init)init[q.id]=true;});setBankDone(init);
      }
      setSyncing(false);
    })();
  },[user]);

  const persist=useCallback((d,ip,n,s,ad,bd,ds,apps,ld)=>{
    if(!user)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      setSyncing(true);
      await supabase.from("progress").upsert({
        user_id:user.id,done:d,in_progress:ip,notes:n,streak:s,
        ads_done:ad,bank_done:bd,day_status:ds,applications:apps,learn_done:ld,today_log:todayLog,
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
  const totalLearnDone=Object.values(learnDone).filter(Boolean).length;

  const bumpStreak=(s)=>{
    const ts=todayStr(); const hist=s.history||[];
    if(hist.includes(ts))return s;
    const yest=new Date(Date.now()-DAY_MS).toDateString();
    const nc=s.last===yest?s.count+1:1;
    return{count:nc,last:ts,history:[...hist,ts].slice(-30)};
  };

  const markDone=(id)=>{
    const nowDone=!done[id]; const nd={...done,[id]:nowDone};
    let ns=streak; if(nowDone)ns=bumpStreak(streak);
    setDone(nd); if(nowDone)setStreak(ns);
    persist(nd,inProgress,notes,ns,adsDone,bankDone,dayStatus,applications,learnDone);
  };
  const markProg=(id)=>{const np={...inProgress,[id]:!inProgress[id]};setInProgress(np);persist(done,np,notes,streak,adsDone,bankDone,dayStatus,applications,learnDone);};
  const markAdsDone=(id)=>{const na={...adsDone,[id]:!adsDone[id]};setAdsDone(na);persist(done,inProgress,notes,streak,na,bankDone,dayStatus,applications,learnDone);};
  const markBankDone=(id)=>{const nb={...bankDone,[id]:!bankDone[id]};setBankDone(nb);persist(done,inProgress,notes,streak,adsDone,nb,dayStatus,applications,learnDone);};
  const saveLog = (text, isDoneFlag) => {
    const newLog = {text, done: isDoneFlag, date: new Date().toDateString()};
    setTodayLog(newLog);
    if(!user) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async() => {
      setSyncing(true);
      await supabase.from('progress').upsert({
        user_id: user.id, done, in_progress: inProgress, notes, streak,
        ads_done: adsDone, bank_done: bankDone, day_status: dayStatus,
        applications, learn_done: learnDone, today_log: newLog,
        updated_at: new Date().toISOString(),
      }, {onConflict: 'user_id'});
      setSyncing(false); setLastSaved(new Date());
    }, 600);
  };
  const setDayStat=(date,st)=>{const nd={...dayStatus,[date]:st};setDayStatus(nd);persist(done,inProgress,notes,streak,adsDone,bankDone,nd,applications,learnDone);};
  const openNote=(id)=>{setNoteOpen(id);setNoteText(notes[id]||"");};
  const saveNote=()=>{if(!noteOpen)return;const nn={...notes,[noteOpen]:noteText};setNotes(nn);persist(done,inProgress,nn,streak,adsDone,bankDone,dayStatus,applications,learnDone);setNoteOpen(null);};
  const signOut=async()=>{await supabase.auth.signOut();setUser(null);};

  // Application log helpers
  const saveApp=()=>{
    if(!appForm.company.trim())return;
    let newApps;
    if(editingApp!==null){
      newApps=applications.map((a,i)=>i===editingApp?{...appForm,id:a.id}:a);
    } else {
      newApps=[...applications,{...appForm,id:Date.now().toString()}];
    }
    setApplications(newApps);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,newApps,learnDone);
    setShowAddApp(false); setEditingApp(null);
    setAppForm({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});
  };
  const deleteApp=(idx)=>{
    const newApps=applications.filter((_,i)=>i!==idx);
    setApplications(newApps);
    persist(done,inProgress,notes,streak,adsDone,bankDone,dayStatus,newApps,learnDone);
  };
  const editApp=(idx)=>{
    setAppForm(applications[idx]);
    setEditingApp(idx);
    setShowAddApp(true);
  };

  const last7=Array.from({length:7},(_,i)=>{const d=new Date(Date.now()-(6-i)*DAY_MS).toDateString();return{d,active:(streak.history||[]).includes(d)};});
  const bankByPattern=BANK_PATTERNS.map(pat=>({id:"bp_"+pat.replace(/\W/g,"_"),label:pat,accent:"#2563eb",problems:BANK.filter(q=>q.pattern===pat).map(q=>({...q,tag:q.pattern,difficulty:q.diff}))}));

  // Drive filter
  const filteredDrives=DRIVES.filter(d=>{
    const q=driveSearch.toLowerCase();
    const matchQ=!q||(d.co.toLowerCase().includes(q)||d.role.toLowerCase().includes(q)||d.loc.toLowerCase().includes(q));
    const matchT=driveType==="All"||d.type===driveType;
    const matchC=!driveMinCtc||!d.ctc||(d.ctc>=driveMinCtc);
    return matchQ&&matchT&&matchC;
  });

  // Pipeline counts
  const pipeline={
    applied:applications.length,
    oa:applications.filter(a=>["OA Done","OA Cleared","Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at Interview","Rejected at HR"].includes(a.currentStage)).length,
    interview:applications.filter(a=>["Interview R1","Interview R2","Interview R3","HR Round","Offered","Rejected at HR"].includes(a.currentStage)).length,
    hr:applications.filter(a=>["HR Round","Offered"].includes(a.currentStage)).length,
    offered:applications.filter(a=>a.currentStage==="Offered").length,
  };

  if(!authChecked)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa"}}>Loading…</div>;
  if(!user)return<AuthScreen onAuth={setUser}/>;

  const NAV=[["home","🏠"],["tracker","DSA"],["learn","Learn"],["ads","ADS"],["bank","Bank"],["daily","Daily"],["plan","Placement"],["stats","Stats"]];

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
        .inp{width:100%;padding:"9px 12px";border:1.5px solid #e8e5e0;border-radius:8px;font-size:13px;font-family:'DM Sans';outline:none;background:#fff;color:#1c1c1c}
        .inp:focus{border-color:#2563eb}
        .sel{border:1.5px solid #e8e5e0;border-radius:8px;padding:8px 10px;font-size:12px;font-family:'DM Sans';background:#fff;color:#555;outline:none;cursor:pointer}
        .sel:focus{border-color:#2563eb}
        .tab-row{display:flex;gap:0;border-bottom:2px solid #f0ede8;margin-bottom:20px}
        .tab-btn{padding:10px 20px;font-size:13px;font-weight:500;color:#aaa;cursor:pointer;border:none;background:transparent;border-bottom:2px solid transparent;margin-bottom:-2px;font-family:'DM Sans';transition:all .15s}
        .tab-btn.on{color:#1c1c1c;font-weight:600;border-bottom-color:#2563eb}
        .moverlay{position:fixed;inset:0;background:rgba(0,0,0,.3);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,.12)}
        .mta{width:100%;height:90px;border:1.5px solid #e8e5e0;border-radius:8px;padding:10px;font-size:12px;font-family:'DM Sans';resize:none;outline:none;color:#333;background:#fafaf9}
        .mta:focus{border-color:#2563eb}
        .macts{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
        .mc{padding:7px 13px;border:1.5px solid #e8e5e0;border-radius:7px;background:transparent;font-size:12px;cursor:pointer;color:#666;font-family:'DM Sans'}
        .ms{padding:7px 15px;border:none;border-radius:7px;background:#1c1c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans'}
        .drive-row{display:flex;align-items:flex-start;padding:11px 16px;gap:10px;border-bottom:1px solid #f9f7f5;cursor:pointer;transition:background .1s}
        .drive-row:hover{background:#fafaf9}
        .drive-exp{padding:10px 16px 14px;background:#fafaf9;border-bottom:1px solid #f0ede8;font-size:12px;color:#555;line-height:1.7}
        .app-row{display:grid;grid-template-columns:1fr 1fr auto auto auto;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid #f9f7f5}
        .app-row:last-child{border-bottom:none}
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
        {page==="home"&&(
          <div className="inner">
            <div style={{paddingTop:20,paddingBottom:28}}>
              <div className="fu" style={{fontSize:11,fontWeight:600,color:"#2563eb",background:"#eff6ff",padding:"3px 11px",borderRadius:20,display:"inline-block",marginBottom:18}}>📌 Tushar's Command Center</div>
              <h1 className="fu2" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,lineHeight:1.06,letterSpacing:-2}}>One vault.<br/><span style={{color:"#2563eb"}}>Everything</span> you need.</h1>
              <div className="fu3" style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["tracker","DSA"],["learn","Learn Patterns"],["bank","Question Bank"],["daily","Daily Plan"],["plan","Placement Intel"]].map(([p,l])=>(
                  <button key={p} onClick={()=>setPage(p)}
                    style={{padding:"8px 16px",background:p==="tracker"?"#1c1c1c":"transparent",color:p==="tracker"?"#fff":"#555",border:p==="tracker"?"none":"1.5px solid #ddd",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
                    {l} →
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:9,marginBottom:14}}>
              {[
                {l:"DSA Solved",v:totalDone,t:allProblems.length,c:"#2563eb"},
                {l:"ADS Solved",v:totalAdsDone,t:allAds.length,c:"#059669"},
                {l:"Bank Solved",v:totalBankDone,t:BANK.length,c:"#9333ea"},
                {l:"Patterns Learned",v:Object.values(learnDone).filter(Boolean).length,t:LEARN_PATTERNS.reduce((s,p)=>s+p.problems.length,0),c:"#7c3aed"},
                {l:"Streak 🔥",v:streak.count,c:"#d97706"},
                {l:"Applications",v:applications.length,c:"#dc2626"},
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

            {/* TODAY'S LOG */}
            <div className="card" style={{border: todayLog.done ? "1px solid #a7f3d0" : "1px solid #e8e5e0", background: todayLog.done ? "#f0fdf4" : "#fff"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:13,color: todayLog.done?"#059669":"#1c1c1c"}}>
                  📝 Today's Plan {todayLog.done && "✅"}
                </div>
                <div style={{fontSize:10,color:"#bbb"}}>{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'})}</div>
              </div>
              <textarea
                value={logDraft}
                onChange={e=>{setLogDraft(e.target.value);}}
                onBlur={e=>saveLog(e.target.value, todayLog.done)}
                placeholder={"Write today's 3 tasks here...\n\n1. LC 704 Binary Search + LC 35 Search Insert\n2. ADS: Prefix Sum problems\n3. Apply to Razorpay on LinkedIn"}
                style={{width:"100%",minHeight:100,border:"1.5px solid #e8e5e0",borderRadius:8,padding:"10px 12px",fontSize:12,fontFamily:"'DM Sans',sans-serif",resize:"vertical",outline:"none",lineHeight:1.7,color:"#333",background: todayLog.done?"#f0fdf4":"#fafaf9"}}
              />
              <div style={{display:"flex",gap:8,marginTop:8,justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:11,color:"#bbb"}}>Auto-saves on click away · Resets each new day</div>
                <div style={{display:"flex",gap:6}}>
                  <button
                    onClick={()=>saveLog(logDraft, false)}
                    style={{padding:"5px 12px",background:"transparent",border:"1.5px solid #e8e5e0",borderRadius:7,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans'",color:"#555"}}>
                    Save
                  </button>
                  <button
                    onClick={()=>saveLog(logDraft, !todayLog.done)}
                    style={{padding:"5px 12px",background:todayLog.done?"#dc2626":"#059669",border:"none",borderRadius:7,fontSize:11,cursor:"pointer",fontFamily:"'DM Sans'",color:"#fff",fontWeight:600}}>
                    {todayLog.done ? "Unmark Done" : "✅ Mark Day Done"}
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:12,display:"flex",justifyContent:"space-between"}}>
                <span>📋 My Application Pipeline</span>
                <span style={{fontSize:11,color:"#2563eb",cursor:"pointer"}} onClick={()=>{setPage("plan");setPlanTab("mylog");}}>View all →</span>
              </div>
              <div style={{display:"flex",gap:0}}>
                {[["Applied",pipeline.applied,"#2563eb"],["OA",pipeline.oa,"#9333ea"],["Interview",pipeline.interview,"#d97706"],["HR",pipeline.hr,"#059669"],["Offered 🎉",pipeline.offered,"#059669"]].map(([l,v,c],i,arr)=>(
                  <div key={l} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRight:i<arr.length-1?"1px solid #f0ede8":"none"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:v>0?c:"#ddd"}}>{v}</div>
                    <div style={{fontSize:10,color:"#aaa",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LEARN ── */}
        {page==="learn"&&(
          <LearnPage learnDone={learnDone} setLearnDone={setLearnDone} persist={persist}
            done={done} inProgress={inProgress} notes={notes} streak={streak}
            adsDone={adsDone} bankDone={bankDone} dayStatus={dayStatus} applications={applications}/>
        )}

        {/* ── DSA TRACKER ── */}
        {page==="tracker"&&(
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div className="stitle" style={{marginBottom:0}}>DSA Tracker</div>
              <div className="filts">{["All","Easy","Medium","Hard"].map(f=><button key={f} className={`fb${filterDiff===f?" on":""}`} onClick={()=>setFilterDiff(f)}>{f}</button>)}</div>
            </div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
                <span style={{fontSize:12,fontWeight:500,color:"#666"}}>{totalDone}/{allProblems.length} solved</span>
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
            <div style={{fontSize:10,color:"#ccc",marginTop:12,display:"flex",gap:14}}>✓ solved · ~ in progress · ✎ notes · ↗ leetcode</div>
          </div>
        )}

        {/* ── ADS SUBJECT ── */}
        {page==="ads"&&(
          <div className="inner">
            <div style={{marginBottom:16}}><div className="stitle" style={{marginBottom:4}}>ADS Subject Plan</div><div style={{fontSize:11,color:"#aaa"}}>ST1 Question Bank · {totalAdsDone}/{allAds.length} done</div></div>
            <div className="ovbar">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
                <span style={{fontSize:12,color:"#666"}}>{totalAdsDone}/{allAds.length}</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900}}>{Math.round((totalAdsDone/allAds.length)*100)}%</span>
              </div>
              <div className="ovbg"><div style={{height:"100%",width:`${(totalAdsDone/allAds.length)*100}%`,background:"#059669",borderRadius:3,transition:"width .6s"}}/></div>
            </div>
            {ADS_TOPICS.map(t=>(
              <TopicBlock key={t.id} topic={t} doneMap={adsDone} onToggle={markAdsDone}
                showDiff={false} expanded={!!adsExp[t.id]} onExpand={()=>setAdsExp(e=>({...e,[t.id]:!e[t.id]}))} />
            ))}
          </div>
        )}

        {/* ── QUESTION BANK ── */}
        {page==="bank"&&(
          <div className="inner">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div><div className="stitle" style={{marginBottom:3}}>Placement Question Bank</div><div style={{fontSize:11,color:"#aaa"}}>50 most asked · Pattern-wise · {totalBankDone}/50 done</div></div>
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

        {/* ── DAILY PLAN ── */}
        {page==="daily"&&(
          <div className="inner">
            <div style={{marginBottom:16}}><div className="stitle" style={{marginBottom:4}}>Daily Prep Plan</div><div style={{fontSize:11,color:"#aaa"}}>Mar 23 – May 10 · 3–4 problems/day · Morning + Evening · follow sequence, ignore dates</div></div>
            {[
              {label:"Week 1",focus:"Stack + Queue + Linked List",days:DAILY_PLAN.slice(0,7)},
              {label:"Week 2",focus:"Backtracking + Linked List",days:DAILY_PLAN.slice(7,14)},
              {label:"Week 3",focus:"Graphs + Start DP",days:DAILY_PLAN.slice(14,21)},
              {label:"Week 4–5",focus:"DP + Heap + Greedy",days:DAILY_PLAN.slice(21,27)},
              {label:"Week 5–6",focus:"SQL + System Design + OOPS + Java",days:DAILY_PLAN.slice(27,36)},
              {label:"Week 7–8",focus:"Mock Tests + Apply heavily",days:DAILY_PLAN.slice(36,48)},
            ].map(week=>(
              <div key={week.label} style={{marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:900}}>{week.label}</div>
                  <div style={{fontSize:11,color:"#aaa",background:"#f5f3f0",padding:"2px 8px",borderRadius:5}}>{week.focus}</div>
                </div>
                {week.days.map(d=>{
                  const st=dayStatus[d.date]||"";
                  const stColor={done:"#059669",partial:"#d97706",skip:"#dc2626"}[st]||"#e8e5e0";
                  return (
                    <div key={d.date} className="card" style={{padding:"11px 14px",display:"flex",gap:12,alignItems:"flex-start",borderLeft:`3px solid ${stColor}`,marginBottom:6}}>
                      <div style={{flexShrink:0,textAlign:"center",minWidth:38}}>
                        <div style={{fontSize:11,fontWeight:700}}>{d.date}</div>
                        <div style={{fontSize:10,color:"#bbb"}}>{d.day}</div>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,color:"#888",marginBottom:4}}>🌅 {d.morning}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                          {[d.p1,d.p2].filter(Boolean).map((p,i)=>(
                            <span key={i} style={{fontSize:11,background:"#f0ede8",padding:"2px 7px",borderRadius:4,color:"#555"}}>{p}</span>
                          ))}
                        </div>
                        <div style={{fontSize:11,color:"#888",marginTop:4}}>🌆 {d.evening}</div>
                      </div>
                      <select className="sel" value={st} onChange={e=>setDayStat(d.date,e.target.value)}
                        style={{flexShrink:0,fontSize:11,padding:"4px 6px",borderColor:st?stColor:"#e8e5e0",color:st?stColor:"#aaa"}}>
                        <option value="">—</option>
                        <option value="done">✅ Done</option>
                        <option value="partial">🔄 Partial</option>
                        <option value="skip">❌ Skip</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── PLACEMENT INTEL ── */}
        {page==="plan"&&(
          <div className="inner">
            <div className="stitle" style={{marginBottom:16}}>Placement Intel</div>
            <div className="tab-row">
              <button className={`tab-btn${planTab==="drives"?" on":""}`} onClick={()=>setPlanTab("drives")}>🏢 Drive Database <span style={{fontSize:10,color:"#bbb",marginLeft:4}}>{DRIVES.length}</span></button>
              <button className={`tab-btn${planTab==="mylog"?" on":""}`} onClick={()=>setPlanTab("mylog")}>📋 My Applications <span style={{fontSize:10,color:"#bbb",marginLeft:4}}>{applications.length}</span></button>
            </div>

            {/* ── DRIVE DATABASE TAB ── */}
            {planTab==="drives"&&(
              <>
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
                  <input className="inp" value={driveSearch} onChange={e=>setDriveSearch(e.target.value)}
                    placeholder="Search company, role, location…"
                    style={{flex:"1 1 200px",padding:"8px 12px",border:"1.5px solid #e8e5e0",borderRadius:8,fontSize:12,fontFamily:"'DM Sans'",outline:"none"}}/>
                  <select className="sel" value={driveType} onChange={e=>setDriveType(e.target.value)}>
                    {DRIVE_TYPES.map(t=><option key={t}>{t}</option>)}
                  </select>
                  <select className="sel" value={driveMinCtc} onChange={e=>setDriveMinCtc(Number(e.target.value))}>
                    <option value={0}>Any CTC</option>
                    <option value={8}>8+ LPA</option>
                    <option value={12}>12+ LPA</option>
                    <option value={20}>20+ LPA</option>
                    <option value={30}>30+ LPA</option>
                  </select>
                  <span style={{fontSize:11,color:"#aaa"}}>{filteredDrives.length} drives</span>
                </div>
                <div className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto auto",gap:0,padding:"8px 16px",background:"#f9f7f5",borderBottom:"1px solid #f0ede8",fontSize:10,fontWeight:600,color:"#aaa",letterSpacing:.5}}>
                    <span>COMPANY · ROLE</span><span>LOCATION · DATE</span><span style={{textAlign:"right"}}>CTC</span><span style={{textAlign:"right",marginLeft:12}}>PLACED</span>
                  </div>
                  <div style={{maxHeight:500,overflowY:"auto"}}>
                    {filteredDrives.slice(0,200).map((d,i)=>(
                      <div key={i}>
                        <div className="drive-row" onClick={()=>setExpandedDrive(expandedDrive===i?null:i)}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:600,color:"#1c1c1c"}}>{d.co}</div>
                            <div style={{fontSize:11,color:"#888",marginTop:1}}>{d.role}</div>
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:11,color:"#555"}}>{d.loc}</div>
                            <div style={{fontSize:10,color:"#bbb"}}>{d.dt}</div>
                          </div>
                          <div style={{textAlign:"right",fontSize:12,fontWeight:700,color:d.ctc>=15?"#059669":d.ctc>=10?"#d97706":"#555",marginRight:12,flexShrink:0}}>
                            {d.ctc?`₹${d.ctc}L`:"—"}
                          </div>
                          <div style={{textAlign:"right",fontSize:11,color:d.placed>0?"#2563eb":"#ddd",minWidth:28,flexShrink:0}}>
                            {d.placed!=null?d.placed:"—"}
                          </div>
                        </div>
                        {expandedDrive===i&&(
                          <div className="drive-exp">
                            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:d.rem?8:0}}>
                              {d.type&&<span><b>Type:</b> {d.type}</span>}
                              {d.stip&&<span><b>Stipend:</b> ₹{d.stip}K/mo</span>}
                              {d.placed!=null&&<span><b>Placed:</b> {d.placed} students</span>}
                            </div>
                            {d.rem&&<div style={{background:"#fff3cd",padding:"6px 10px",borderRadius:6,fontSize:11,color:"#856404",borderLeft:"3px solid #ffc107"}}>💡 {d.rem}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredDrives.length>200&&<div style={{padding:"12px 16px",fontSize:11,color:"#aaa",textAlign:"center"}}>Showing top 200 — refine your search to see more</div>}
                    {filteredDrives.length===0&&<div style={{padding:"24px 16px",fontSize:12,color:"#aaa",textAlign:"center"}}>No drives match your filters</div>}
                  </div>
                </div>
              </>
            )}

            {/* ── MY APPLICATIONS LOG TAB ── */}
            {planTab==="mylog"&&(
              <>
                {/* Pipeline summary */}
                <div className="card" style={{padding:0,marginBottom:14}}>
                  <div style={{display:"flex"}}>
                    {[["Applied",pipeline.applied,"#2563eb"],["OA",pipeline.oa,"#9333ea"],["Interview",pipeline.interview,"#d97706"],["HR",pipeline.hr,"#059669"],["Offered 🎉",pipeline.offered,"#059669"]].map(([l,v,c],i,arr)=>(
                      <div key={l} style={{flex:1,textAlign:"center",padding:"14px 8px",borderRight:i<arr.length-1?"1px solid #f0ede8":"none"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:v>0?c:"#ddd"}}>{v}</div>
                        <div style={{fontSize:10,color:"#aaa",marginTop:2}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#555"}}>{applications.length} applications logged</div>
                  <button onClick={()=>{setEditingApp(null);setAppForm({company:"",role:"",platform:"Campus Portal",dateApplied:"",currentStage:"Shortlisted for OA",notes:""});setShowAddApp(true);}}
                    style={{padding:"7px 14px",background:"#1c1c1c",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>
                    + Add Application
                  </button>
                </div>

                {applications.length===0?(
                  <div className="card" style={{textAlign:"center",padding:"32px 20px",color:"#aaa"}}>
                    <div style={{fontSize:24,marginBottom:8}}>📋</div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>No applications logged yet</div>
                    <div style={{fontSize:12}}>Add your first application using the button above</div>
                  </div>
                ):(
                  <div className="card" style={{padding:0,overflow:"hidden"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr auto auto auto",gap:0,padding:"8px 16px",background:"#f9f7f5",borderBottom:"1px solid #f0ede8",fontSize:10,fontWeight:600,color:"#aaa",letterSpacing:.5}}>
                      <span>COMPANY</span><span>ROLE</span><span>CURRENT STAGE</span><span>DATE</span><span></span><span></span>
                    </div>
                    {applications.map((app,idx)=>{
                      const stColor=STAGE_COLORS[app.currentStage]||"#aaa";
                      const isActive=!app.currentStage.startsWith("Rejected")&&app.currentStage!=="Ghosted";
                      return (
                        <div key={app.id||idx} style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr auto auto auto",gap:0,padding:"11px 16px",borderBottom:"1px solid #f9f7f5",alignItems:"center",opacity:isActive?1:0.6}}>
                          <div style={{fontSize:13,fontWeight:600}}>{app.company}</div>
                          <div style={{fontSize:12,color:"#666"}}>{app.role||"—"}</div>
                          <div>
                            <span style={{fontSize:10,fontWeight:600,color:stColor,background:stColor+"18",padding:"3px 8px",borderRadius:20}}>{app.currentStage}</span>
                          </div>
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

        {/* ── STATS ── */}
        {page==="stats"&&(
          <div className="inner">
            <div className="stitle">Your Stats</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11,marginBottom:12}}>
              {[{l:"DSA Solved",v:totalDone,t:allProblems.length,c:"#2563eb"},{l:"ADS Solved",v:totalAdsDone,t:allAds.length,c:"#059669"},{l:"Bank Done",v:totalBankDone,t:50,c:"#9333ea"},{l:"Streak 🔥",v:streak.count,c:"#d97706"},{l:"In Progress",v:totalInProg,c:"#555"},{l:"Offers 🎉",v:applications.filter(a=>a.currentStage==="Offered").length,c:"#059669"}].map(({l,v,t,c})=>(
                <div key={l} className="card" style={{padding:16}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,color:c,lineHeight:1}}>{v}{t?<span style={{fontSize:12,color:"#ddd",fontWeight:400}}>/{t}</span>:""}</div>
                  <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{l}</div>
                </div>
              ))}
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
            <div className="card">
              <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>Daily Plan Progress</div>
              {[["done","✅ Done","#059669"],["partial","🔄 Partial","#d97706"],["skip","❌ Skip","#dc2626"]].map(([k,l,c])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                  <div style={{width:56,fontSize:12,color:c,fontWeight:500}}>{l}</div>
                  <div style={{flex:1,height:5,background:"#f0ede8",borderRadius:3}}><div style={{height:"100%",width:`${(Object.values(dayStatus).filter(s=>s===k).length/DAILY_PLAN.length)*100}%`,background:c,borderRadius:3}}/></div>
                  <div style={{fontSize:11,color:"#aaa",width:38,textAlign:"right"}}>{Object.values(dayStatus).filter(s=>s===k).length}/{DAILY_PLAN.length}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADD/EDIT APPLICATION MODAL */}
      {showAddApp&&(
        <div className="moverlay" onClick={()=>setShowAddApp(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>{editingApp!==null?"Edit Application":"Log New Application"}</div>
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
                <textarea className="mta" value={appForm.notes} onChange={e=>setAppForm(f=>({...f,notes:e.target.value}))} placeholder="Any notes about this company or application…"/>
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
            <div style={{fontSize:11,color:"#aaa",marginBottom:10}}>Approach, edge cases, complexity…</div>
            <textarea className="mta" style={{height:110}} value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Write your notes here..." autoFocus/>
            <div className="macts"><button className="mc" onClick={()=>setNoteOpen(null)}>Cancel</button><button className="ms" onClick={saveNote}>Save</button></div>
          </div>
        </div>;
      })()}
    </div>
  );
}