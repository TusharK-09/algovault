import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── Data ─────────────────────────────────────────────────────────────────────
const TOPICS = [
  {
    id: "arrays", label: "Arrays + Sliding Window", emoji: "🪟",
    accent: "#2563eb", level: "Harder Problems",
    problems: [
      { id: "a1", name: "Minimum Window Substring", difficulty: "Hard", tag: "sliding window", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "a2", name: "Longest Substring with K Distinct", difficulty: "Hard", tag: "sliding window", leetcode: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/" },
      { id: "a3", name: "Sliding Window Maximum", difficulty: "Hard", tag: "deque", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: "a4", name: "Minimum Size Subarray Sum", difficulty: "Medium", tag: "two pointer", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
      { id: "a5", name: "Fruit Into Baskets", difficulty: "Medium", tag: "sliding window", leetcode: "https://leetcode.com/problems/fruit-into-baskets/" },
      { id: "a6", name: "Permutation in String", difficulty: "Medium", tag: "sliding window", leetcode: "https://leetcode.com/problems/permutation-in-string/" },
      { id: "a7", name: "Longest Repeating Character Replacement", difficulty: "Medium", tag: "sliding window", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: "a8", name: "Max Consecutive Ones III", difficulty: "Medium", tag: "sliding window", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
    ],
  },
  {
    id: "trees", label: "Trees → BST", emoji: "🌲",
    accent: "#059669", level: "BST Problems",
    problems: [
      { id: "t1", name: "Validate Binary Search Tree", difficulty: "Medium", tag: "BST", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { id: "t2", name: "Kth Smallest in BST", difficulty: "Medium", tag: "inorder", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
      { id: "t3", name: "BST Iterator", difficulty: "Medium", tag: "inorder", leetcode: "https://leetcode.com/problems/binary-search-tree-iterator/" },
      { id: "t4", name: "Lowest Common Ancestor of BST", difficulty: "Medium", tag: "BST", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { id: "t5", name: "Delete Node in BST", difficulty: "Medium", tag: "BST", leetcode: "https://leetcode.com/problems/delete-node-in-a-bst/" },
      { id: "t6", name: "Convert Sorted Array to BST", difficulty: "Easy", tag: "BST", leetcode: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
      { id: "t7", name: "Range Sum of BST", difficulty: "Easy", tag: "DFS", leetcode: "https://leetcode.com/problems/range-sum-of-bst/" },
      { id: "t8", name: "Balance a BST", difficulty: "Medium", tag: "BST", leetcode: "https://leetcode.com/problems/balance-a-binary-search-tree/" },
    ],
  },
  {
    id: "hashmap", label: "HashMap", emoji: "🗂️",
    accent: "#dc2626", level: "Complex Frequency",
    problems: [
      { id: "h1", name: "Top K Frequent Elements", difficulty: "Medium", tag: "frequency", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { id: "h2", name: "Group Anagrams", difficulty: "Medium", tag: "frequency", leetcode: "https://leetcode.com/problems/group-anagrams/" },
      { id: "h3", name: "Subarray Sum Equals K", difficulty: "Medium", tag: "prefix sum", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "h4", name: "Longest Consecutive Sequence", difficulty: "Medium", tag: "frequency", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: "h5", name: "Word Pattern", difficulty: "Easy", tag: "bijection", leetcode: "https://leetcode.com/problems/word-pattern/" },
      { id: "h6", name: "Find All Anagrams in String", difficulty: "Medium", tag: "sliding+map", leetcode: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
      { id: "h7", name: "4Sum II", difficulty: "Medium", tag: "two maps", leetcode: "https://leetcode.com/problems/4sum-ii/" },
      { id: "h8", name: "Contiguous Array", difficulty: "Medium", tag: "prefix sum", leetcode: "https://leetcode.com/problems/contiguous-array/" },
    ],
  },
  {
    id: "bsearch", label: "Binary Search", emoji: "🔍",
    accent: "#9333ea", level: "Variations",
    problems: [
      { id: "b1", name: "Find Peak Element", difficulty: "Medium", tag: "peak", leetcode: "https://leetcode.com/problems/find-peak-element/" },
      { id: "b2", name: "Search in Rotated Array", difficulty: "Medium", tag: "rotated", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: "b3", name: "Search in Rotated Array II", difficulty: "Medium", tag: "rotated", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
      { id: "b4", name: "Find Minimum in Rotated Array", difficulty: "Medium", tag: "rotated", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: "b5", name: "Find Minimum in Rotated Array II", difficulty: "Hard", tag: "rotated", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/" },
      { id: "b6", name: "Koko Eating Bananas", difficulty: "Medium", tag: "search on answer", leetcode: "https://leetcode.com/problems/koko-eating-bananas/" },
      { id: "b7", name: "Capacity to Ship Packages", difficulty: "Medium", tag: "search on answer", leetcode: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
      { id: "b8", name: "Split Array Largest Sum", difficulty: "Hard", tag: "search on answer", leetcode: "https://leetcode.com/problems/split-array-largest-sum/" },
    ],
  },
];

const DIFF_STYLE = {
  Easy:   { color: "#059669", bg: "#ecfdf5" },
  Medium: { color: "#d97706", bg: "#fffbeb" },
  Hard:   { color: "#dc2626", bg: "#fef2f2" },
};

const DAY_MS = 86400000;
const today = () => new Date().toDateString();
const EMPTY_STREAK = { count: 0, last: null, history: [] };

// ── Auth Screen ───────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    setError(""); setLoading(true);
    if (mode === "signup") {
      const { error: e } = await supabase.auth.signUp({ email, password });
      if (e) setError(e.message); else setSent(true);
    } else {
      const { data, error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) setError(e.message); else onAuth(data.user);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#fafaf9", fontFamily:"'DM Sans', sans-serif", padding:20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@900&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:900, marginBottom:8, letterSpacing:-1 }}>
          Algo<span style={{ color:"#2563eb" }}>Vault</span>
        </div>
        <div style={{ fontSize:14, color:"#888", marginBottom:36 }}>Tushar's DSA tracker — sign in to sync across devices.</div>
        {sent ? (
          <div style={{ background:"#ecfdf5", border:"1px solid #a7f3d0", borderRadius:12, padding:20, fontSize:14, color:"#059669" }}>
            ✅ Check your email to confirm, then come back to log in.
          </div>
        ) : (
          <>
            {[["EMAIL","email","you@email.com",email,setEmail],["PASSWORD","password","••••••••",password,setPassword]].map(([lbl,type,ph,val,set])=>(
              <div key={lbl} style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:5, letterSpacing:1 }}>{lbl}</label>
                <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
                  onKeyDown={e=>e.key==="Enter"&&submit()}
                  style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e8e5e0", borderRadius:10, fontSize:14, fontFamily:"'DM Sans'", outline:"none", background:"#fff", color:"#1c1c1c" }}
                />
              </div>
            ))}
            {error && <div style={{ fontSize:13, color:"#dc2626", marginBottom:12, background:"#fef2f2", padding:"8px 12px", borderRadius:8 }}>{error}</div>}
            <button onClick={submit} disabled={loading||!email||!password}
              style={{ width:"100%", padding:13, background:loading?"#ccc":"#1c1c1c", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:600, cursor:loading?"not-allowed":"pointer", fontFamily:"'DM Sans'" }}>
              {loading ? "…" : mode==="login" ? "Sign In →" : "Create Account →"}
            </button>
            <div style={{ textAlign:"center", marginTop:14, fontSize:13, color:"#aaa" }}>
              {mode==="login"?"No account? ":"Already have one? "}
              <span style={{ color:"#2563eb", cursor:"pointer", fontWeight:600 }} onClick={()=>{setMode(m=>m==="login"?"signup":"login");setError("");}}>
                {mode==="login"?"Sign up":"Log in"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function AlgoVault() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [done, setDone] = useState({});
  const [inProgress, setInProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [streak, setStreak] = useState(EMPTY_STREAK);

  const [page, setPage] = useState("home");
  const [expanded, setExpanded] = useState({ arrays:true, trees:false, hashmap:false, bsearch:false });
  const [noteOpen, setNoteOpen] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [filterDiff, setFilterDiff] = useState("All");

  const saveTimer = useRef(null);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load data from Supabase
  useEffect(() => {
    if (!user) return;
    (async () => {
      setSyncing(true);
      const { data } = await supabase.from("progress").select("*").eq("user_id", user.id).single();
      if (data) {
        setDone(data.done || {});
        setInProgress(data.in_progress || {});
        setNotes(data.notes || {});
        setStreak(data.streak || EMPTY_STREAK);
      }
      setSyncing(false);
    })();
  }, [user]);

  // Debounced save
  const persist = useCallback((d, ip, n, s) => {
    if (!user) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSyncing(true);
      await supabase.from("progress").upsert({
        user_id: user.id, done: d, in_progress: ip, notes: n, streak: s,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      setSyncing(false);
      setLastSaved(new Date());
    }, 800);
  }, [user]);

  const allProblems = TOPICS.flatMap(t => t.problems);
  const totalDone = Object.values(done).filter(Boolean).length;
  const totalInProg = allProblems.filter(p => inProgress[p.id] && !done[p.id]).length;
  const totalProblems = allProblems.length;

  const markDone = (id) => {
    const nowDone = !done[id];
    const newDone = { ...done, [id]: nowDone };
    setDone(newDone);
    let newStreak = streak;
    if (nowDone) {
      const todayStr = today();
      const hist = streak.history || [];
      if (!hist.includes(todayStr)) {
        const yesterday = new Date(Date.now() - DAY_MS).toDateString();
        const newCount = streak.last === yesterday ? streak.count + 1 : streak.last === todayStr ? streak.count : 1;
        newStreak = { count: newCount, last: todayStr, history: [...hist, todayStr].slice(-30) };
        setStreak(newStreak);
      }
    }
    persist(newDone, inProgress, notes, newStreak);
  };

  const markProg = (id) => {
    const newProg = { ...inProgress, [id]: !inProgress[id] };
    setInProgress(newProg);
    persist(done, newProg, notes, streak);
  };

  const openNote = (id) => { setNoteOpen(id); setNoteText(notes[id] || ""); };
  const saveNote = () => {
    if (!noteOpen) return;
    const newNotes = { ...notes, [noteOpen]: noteText };
    setNotes(newNotes);
    persist(done, inProgress, newNotes, streak);
    setNoteOpen(null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); setDone({}); setInProgress({}); setNotes({}); setStreak(EMPTY_STREAK);
  };

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * DAY_MS).toDateString();
    return { d, active: (streak.history || []).includes(d) };
  });

  if (!authChecked) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif", color:"#aaa" }}>Loading…</div>
  );
  if (!user) return <AuthScreen onAuth={setUser} />;

  return (
    <div style={{ minHeight:"100vh", background:"#fafaf9", color:"#1c1c1c", fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#f0f0ef} ::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}

        .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,250,249,0.93);backdrop-filter:blur(12px);border-bottom:1px solid #e8e5e0}
        .nav-in{max-width:1080px;margin:0 auto;padding:0 32px;height:58px;display:flex;align-items:center;justify-content:space-between}
        .logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:900;cursor:pointer;letter-spacing:-.5px}
        .logo span{color:#2563eb}
        .nav-c{display:flex;gap:4px}
        .nl{padding:6px 16px;border-radius:8px;font-size:13px;font-weight:500;color:#666;cursor:pointer;border:none;background:transparent;transition:all .15s;font-family:'DM Sans'}
        .nl:hover{color:#1c1c1c;background:#f0ede8}
        .nl.on{color:#1c1c1c;background:#ece9e4;font-weight:600}
        .nav-r{display:flex;align-items:center;gap:10px}
        .sdot{width:7px;height:7px;border-radius:50%;background:#059669;transition:background .3s;flex-shrink:0}
        .sdot.syncing{background:#d97706;animation:pulse 1s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .soBtn{font-size:12px;color:#aaa;background:transparent;border:1px solid #e8e5e0;border-radius:7px;padding:5px 12px;cursor:pointer;font-family:'DM Sans';transition:all .15s}
        .soBtn:hover{color:#dc2626;border-color:#dc2626}
        .page{padding-top:58px}

        .hero{max-width:1080px;margin:0 auto;padding:88px 32px 56px}
        .htag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:#2563eb;background:#eff6ff;padding:4px 12px;border-radius:20px;margin-bottom:28px}
        .htitle{font-family:'Playfair Display',serif;font-size:clamp(40px,6vw,68px);font-weight:900;line-height:1.05;letter-spacing:-2px}
        .htitle span{color:#2563eb}
        .hsub{font-size:17px;color:#777;margin-top:18px;max-width:440px;line-height:1.65;font-weight:300}
        .hcta{margin-top:36px;display:flex;gap:10px}
        .btnP{padding:12px 26px;background:#1c1c1c;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans';transition:all .15s}
        .btnP:hover{background:#333}
        .btnS{padding:12px 26px;background:transparent;color:#555;border:1.5px solid #ddd;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Sans';transition:all .15s}
        .btnS:hover{border-color:#aaa;color:#1c1c1c}
        .tcards{max-width:1080px;margin:0 auto;padding:0 32px 72px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .tc{background:#fff;border:1px solid #e8e5e0;border-radius:16px;padding:22px;cursor:pointer;transition:all .2s}
        .tc:hover{border-color:#ccc;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}

        .inner{max-width:1080px;margin:0 auto;padding:44px 32px}
        .stitle{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;letter-spacing:-.5px;margin-bottom:28px}
        .sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
        .scard{background:#fff;border:1px solid #e8e5e0;border-radius:16px;padding:26px}
        .snum{font-family:'Playfair Display',serif;font-size:38px;font-weight:900;letter-spacing:-1px;line-height:1}
        .slbl{font-size:12px;color:#aaa;margin-top:5px}
        .card{background:#fff;border:1px solid #e8e5e0;border-radius:16px;padding:26px;margin-bottom:16px}
        .srow{display:flex;gap:8px;margin-top:14px}
        .sd{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
        .sdot2{width:26px;height:26px;border-radius:7px;background:#f0ede8;transition:all .2s}
        .sdot2.on{background:#2563eb}
        .sdlbl{font-size:10px;color:#bbb}
        .drow{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .drow:last-child{margin-bottom:0}
        .dlbl{width:58px;font-size:13px;font-weight:500}
        .dbg{flex:1;height:6px;background:#f0ede8;border-radius:3px}
        .dfill{height:100%;border-radius:3px;transition:width .5s}
        .dct{width:38px;text-align:right;font-size:12px;color:#aaa}

        .ttop{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
        .filts{display:flex;gap:5px}
        .fb{padding:6px 13px;border-radius:7px;font-size:12px;font-weight:500;cursor:pointer;border:1.5px solid #e8e5e0;background:#fff;color:#666;transition:all .15s;font-family:'DM Sans'}
        .fb.on{background:#1c1c1c;color:#fff;border-color:#1c1c1c}
        .ovbar{background:#fff;border:1px solid #e8e5e0;border-radius:14px;padding:22px;margin-bottom:20px}
        .ovtop{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
        .ovlbl{font-size:13px;font-weight:500;color:#666}
        .ovpct{font-family:'Playfair Display',serif;font-size:20px;font-weight:900}
        .ovbg{height:7px;background:#f0ede8;border-radius:4px}
        .ovfill{height:100%;background:#2563eb;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1)}

        .tblock{background:#fff;border:1px solid #e8e5e0;border-radius:14px;margin-bottom:14px;overflow:hidden}
        .thdr{display:flex;align-items:center;padding:18px 22px;cursor:pointer;gap:12px;transition:background .12s}
        .thdr:hover{background:#fafaf9}
        .tinfo{flex:1}
        .tname{font-size:14px;font-weight:600}
        .tlvl{font-size:11px;color:#bbb;margin-top:1px}
        .tr{display:flex;align-items:center;gap:10px}
        .tmbar{width:56px;height:4px;background:#f0ede8;border-radius:2px;overflow:hidden}
        .tmfill{height:100%;border-radius:2px}
        .tct{font-size:11px;color:#bbb;min-width:32px;text-align:right}
        .tch{font-size:9px;color:#ccc;transition:transform .2s}

        .plist{border-top:1px solid #f5f3f0}
        .pitem{display:flex;align-items:center;padding:12px 22px;gap:10px;border-bottom:1px solid #f9f7f5;transition:background .1s}
        .pitem:last-child{border-bottom:none}
        .pitem:hover{background:#fafaf9}
        .pitem.done{opacity:.4}
        .cb{width:17px;height:17px;border-radius:5px;border:1.5px solid #ddd;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .12s;font-size:9px;color:transparent}
        .cb.on{background:#2563eb;border-color:#2563eb;color:#fff}
        .pb{width:17px;height:17px;border-radius:5px;border:1.5px dashed #ddd;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#ccc;transition:all .12s}
        .pb.on{border-color:#d97706;border-style:solid;color:#d97706}
        .pname{flex:1;font-size:13px;color:#333}
        .ptag{font-size:10px;color:#bbb;background:#f5f3f0;padding:2px 7px;border-radius:4px}
        .dchip{font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px}
        .nbtn{width:22px;height:22px;border-radius:6px;border:1.5px solid #e8e5e0;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#bbb;transition:all .12s;flex-shrink:0}
        .nbtn:hover{border-color:#aaa;color:#555}
        .nbtn.has{border-color:#f9ca24;color:#d97706;background:#fffbeb}
        .lc{width:22px;height:22px;border-radius:6px;border:1.5px solid #e8e5e0;display:flex;align-items:center;justify-content:center;font-size:10px;color:#bbb;text-decoration:none;transition:all .12s;flex-shrink:0}
        .lc:hover{border-color:#f97316;color:#f97316}

        .moverlay{position:fixed;inset:0;background:rgba(0,0,0,.25);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:18px;padding:26px;width:100%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,.1)}
        .mta{width:100%;height:130px;border:1.5px solid #e8e5e0;border-radius:10px;padding:11px;font-size:13px;font-family:'DM Sans';resize:none;outline:none;line-height:1.6;color:#333;background:#fafaf9;transition:border-color .15s}
        .mta:focus{border-color:#2563eb;background:#fff}
        .macts{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
        .mcancel{padding:8px 16px;border:1.5px solid #e8e5e0;border-radius:8px;background:transparent;font-size:13px;cursor:pointer;color:#666;font-family:'DM Sans'}
        .msave{padding:8px 18px;border:none;border-radius:8px;background:#1c1c1c;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans'}

        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .45s ease both}
        .fu2{animation:fadeUp .45s ease .08s both}
        .fu3{animation:fadeUp .45s ease .16s both}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-in">
          <div className="logo" onClick={() => setPage("home")}>Algo<span>Vault</span></div>
          <div className="nav-c">
            {[["home","Home"],["tracker","Tracker"],["stats","Stats"]].map(([id,lbl]) => (
              <button key={id} className={`nl${page===id?" on":""}`} onClick={() => setPage(id)}>{lbl}</button>
            ))}
          </div>
          <div className="nav-r">
            <div className={`sdot${syncing?" syncing":""}`} title={syncing?"Saving…":lastSaved?`Saved ${lastSaved.toLocaleTimeString()}`:"All synced"} />
            <button className="soBtn" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="page">

        {/* ── HOME ── */}
        {page === "home" && <>
          <div className="hero">
            <div className="htag fu">📌 Tushar's DSA Grind</div>
            <h1 className="htitle fu2">Your personal<br /><span>algorithm</span> vault.</h1>
            <p className="hsub fu3">Track every problem, note every insight, build every streak — synced across all your devices.</p>
            <div className="hcta fu3">
              <button className="btnP" onClick={() => setPage("tracker")}>Open Tracker →</button>
              <button className="btnS" onClick={() => setPage("stats")}>View Stats</button>
            </div>
          </div>
          <div className="tcards">
            {TOPICS.map(t => {
              const cnt = t.problems.filter(p => done[p.id]).length;
              return (
                <div key={t.id} className="tc" onClick={() => { setPage("tracker"); setExpanded(e => ({ ...Object.fromEntries(Object.keys(e).map(k=>[k,false])), [t.id]:true })); }}>
                  <div style={{ fontSize:22, marginBottom:10 }}>{t.emoji}</div>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:3 }}>{t.label}</div>
                  <div style={{ fontSize:11, color:"#aaa", marginBottom:14 }}>{t.level}</div>
                  <div style={{ height:3, background:"#f0ede8", borderRadius:2, marginBottom:7 }}>
                    <div style={{ height:"100%", width:`${(cnt/t.problems.length)*100}%`, background:t.accent, borderRadius:2, transition:"width .5s" }} />
                  </div>
                  <div style={{ fontSize:11, color:"#bbb" }}>{cnt}/{t.problems.length} solved</div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ── STATS ── */}
        {page === "stats" && (
          <div className="inner">
            <div className="stitle">Your Stats</div>
            <div className="sgrid">
              <div className="scard"><div className="snum" style={{color:"#2563eb"}}>{totalDone}</div><div className="slbl">Problems Solved</div></div>
              <div className="scard"><div className="snum" style={{color:"#d97706"}}>{totalInProg}</div><div className="slbl">In Progress</div></div>
              <div className="scard"><div className="snum" style={{color:"#059669"}}>{streak.count}</div><div className="slbl">Day Streak 🔥</div></div>
            </div>
            <div className="card">
              <div style={{fontWeight:600,fontSize:14}}>Last 7 Days</div>
              <div style={{fontSize:12,color:"#aaa",marginTop:3}}>Days with at least one problem solved</div>
              <div className="srow">
                {last7.map(({d,active},i) => {
                  const lbl = ["Su","Mo","Tu","We","Th","Fr","Sa"][new Date(d).getDay()];
                  return <div key={i} className="sd"><div className={`sdot2${active?" on":""}`}/><div className="sdlbl">{lbl}</div></div>;
                })}
              </div>
            </div>
            <div className="card">
              <div style={{fontWeight:600,fontSize:14,marginBottom:18}}>By Difficulty</div>
              {["Easy","Medium","Hard"].map(d => {
                const all = allProblems.filter(p=>p.difficulty===d);
                const s = all.filter(p=>done[p.id]).length;
                return (
                  <div key={d} className="drow">
                    <div className="dlbl" style={{color:DIFF_STYLE[d].color}}>{d}</div>
                    <div className="dbg"><div className="dfill" style={{width:`${(s/all.length)*100}%`,background:DIFF_STYLE[d].color}}/></div>
                    <div className="dct">{s}/{all.length}</div>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div style={{fontWeight:600,fontSize:14,marginBottom:18}}>By Topic</div>
              {TOPICS.map(t => {
                const cnt = t.problems.filter(p=>done[p.id]).length;
                return (
                  <div key={t.id} style={{marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:500}}>{t.emoji} {t.label}</span>
                      <span style={{fontSize:12,color:"#aaa"}}>{cnt}/{t.problems.length}</span>
                    </div>
                    <div style={{height:5,background:"#f0ede8",borderRadius:3}}>
                      <div style={{height:"100%",width:`${(cnt/t.problems.length)*100}%`,background:t.accent,borderRadius:3,transition:"width .5s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TRACKER ── */}
        {page === "tracker" && (
          <div className="inner">
            <div className="ttop">
              <div className="stitle" style={{marginBottom:0}}>Problem Tracker</div>
              <div className="filts">
                {["All","Easy","Medium","Hard"].map(f => (
                  <button key={f} className={`fb${filterDiff===f?" on":""}`} onClick={() => setFilterDiff(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="ovbar">
              <div className="ovtop">
                <span className="ovlbl">{totalDone} of {totalProblems} solved</span>
                <span className="ovpct">{Math.round((totalDone/totalProblems)*100)}%</span>
              </div>
              <div className="ovbg"><div className="ovfill" style={{width:`${(totalDone/totalProblems)*100}%`}}/></div>
            </div>
            {TOPICS.map(topic => {
              const filtered = topic.problems.filter(p => filterDiff==="All"||p.difficulty===filterDiff);
              if (!filtered.length) return null;
              const cnt = topic.problems.filter(p=>done[p.id]).length;
              const isOpen = expanded[topic.id];
              return (
                <div key={topic.id} className="tblock">
                  <div className="thdr" onClick={() => setExpanded(e=>({...e,[topic.id]:!e[topic.id]}))}>
                    <span style={{fontSize:17}}>{topic.emoji}</span>
                    <div className="tinfo">
                      <div className="tname">{topic.label}</div>
                      <div className="tlvl">{topic.level}</div>
                    </div>
                    <div className="tr">
                      <div className="tmbar"><div className="tmfill" style={{width:`${(cnt/topic.problems.length)*100}%`,background:topic.accent}}/></div>
                      <div className="tct">{cnt}/{topic.problems.length}</div>
                      <div className="tch" style={{transform:isOpen?"rotate(180deg)":"rotate(0)"}}>▼</div>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="plist">
                      {filtered.map(p => {
                        const isDone = !!done[p.id];
                        const isProg = !!inProgress[p.id] && !isDone;
                        const hasNote = !!(notes[p.id]?.trim());
                        return (
                          <div key={p.id} className={`pitem${isDone?" done":""}`}>
                            <button className={`cb${isDone?" on":""}`} onClick={()=>markDone(p.id)}>{isDone?"✓":""}</button>
                            <button className={`pb${isProg?" on":""}`} onClick={()=>markProg(p.id)}>{isProg?"~":""}</button>
                            <span className="pname" style={{textDecoration:isDone?"line-through":"none"}}>{p.name}</span>
                            <span className="ptag">{p.tag}</span>
                            <span className="dchip" style={{color:DIFF_STYLE[p.difficulty].color,background:DIFF_STYLE[p.difficulty].bg}}>{p.difficulty}</span>
                            <button className={`nbtn${hasNote?" has":""}`} onClick={()=>openNote(p.id)}>✎</button>
                            <a className="lc" href={p.leetcode} target="_blank" rel="noreferrer">↗</a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{fontSize:11,color:"#ccc",marginTop:20,display:"flex",gap:18}}>
              <span>✓ solved</span><span>~ in progress</span><span>✎ notes</span><span>↗ leetcode</span>
            </div>
          </div>
        )}
      </div>

      {/* NOTE MODAL */}
      {noteOpen && (() => {
        const prob = allProblems.find(p=>p.id===noteOpen);
        return (
          <div className="moverlay" onClick={saveNote}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div style={{fontWeight:600,fontSize:14,marginBottom:3}}>Notes — {prob?.name}</div>
              <div style={{fontSize:12,color:"#aaa",marginBottom:14}}>Approach, edge cases, complexity…</div>
              <textarea className="mta" value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Write your notes here..." autoFocus/>
              <div className="macts">
                <button className="mcancel" onClick={()=>setNoteOpen(null)}>Cancel</button>
                <button className="msave" onClick={saveNote}>Save</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
