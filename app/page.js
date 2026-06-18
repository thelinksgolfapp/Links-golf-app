import React, { useState, useEffect } from 'react';
import { Trophy, PlusCircle, Users, Flag, Phone, Shield, ArrowRight, Search, CheckCircle } from 'lucide-react';

export default function LinksApp() {
  const [currentView, setCurrentView] = useState('leaderboard'); 
  const [currentUser, setCurrentUser] = useState({ id: 1, firstName: "Alex", lastName: "Miller", username: "amiller_golf", isAdmin: true });
  const [selectedCourse, setSelectedCourse] = useState('Pine Valley');

  const [courses, setCourses] = useState([
    { id: '1', name: 'Pine Valley', location: 'Clementon, NJ', totalPar: 70, holePars: Array(18).fill(4) },
    { id: '2', name: 'Spanish Bay', location: 'Pebble Beach, CA', totalPar: 72, holePars: Array(18).fill(4) }
  ]);

  const [users, setUsers] = useState([
    { id: 1, firstName: "Alex", lastName: "Miller", username: "amiller_golf", phone: "555-0192", isAdmin: true },
    { id: 2, firstName: "Sarah", lastName: "Jenkins", username: "sjenkins_putts", phone: "555-0143", isAdmin: false },
    { id: 3, firstName: "John", lastName: "Doe", username: "jdoe_driver", phone: "555-0188", isAdmin: false },
    { id: 4, firstName: "Mike", lastName: "Ross", username: "mross_links", phone: "555-0165", isAdmin: false }
  ]);

  const [rounds, setRounds] = useState([
    { id: '101', courseName: 'Pine Valley', type: 'Single', playerNames: 'Alex Miller', score: -2, date: 'Today' },
    { id: '102', courseName: 'Pine Valley', type: '2-Man Team', playerNames: 'Sarah & John', score: +1, date: 'Yesterday' },
    { id: '103', courseName: 'Spanish Bay', type: 'Single', playerNames: 'Mike Ross', score: 0, date: '2 days ago' }
  ]);

  const [signUpForm, setSignUpForm] = useState({ firstName: '', lastName: '', phone: '', username: '' });
  const [courseForm, setCourseForm] = useState({ name: '', location: '', totalPar: 72 });
  const [roundForm, setRoundForm] = useState({ type: 'Single', selectedPlayers: [], score: 0 });
  const [playerSearch, setPlayerSearch] = useState('');
  const [adminHolePars, setAdminHolePars] = useState(Array(18).fill(4));

  const filteredRounds = rounds.filter(r => r.courseName === selectedCourse);
  const userCurrentRank = 1; 
  const userCurrentScore = "-2";

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: String(courses.length + 1),
      name: courseForm.name,
      location: courseForm.location,
      totalPar: Number(courseForm.totalPar),
      holePars: adminHolePars
    };
    setCourses([...courses, newCourse]);
    setCourseForm({ name: '', location: '', totalPar: 72 });
    alert("Course Successfully Published!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white font-sans antialiased">
      <header className="border-b border-zinc-800 bg-[#121212]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('leaderboard')}>
          <span className="text-2xl font-black tracking-tighter text-white flex items-center">
            LI
            <span className="relative inline-block mx-0.5 text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
              N
              <span className="absolute left-[40%] top-[-4px] h-[115%] w-[3px] bg-[#4ade80]"></span>
              <span className="absolute left-[45%] top-[-4px] w-3 h-2 bg-[#4ade80] rounded-sm"></span>
            </span>
            KS
          </span>
        </div>
        <nav className="flex items-center space-x-1 md:space-x-4 text-sm font-medium">
          <button onClick={() => setCurrentView('leaderboard')} className={`px-3 py-2 rounded-lg transition ${currentView === 'leaderboard' ? 'bg-zinc-800 text-[#4ade80]' : 'text-zinc-400 hover:text-white'}`}>Leaderboards</button>
          <button onClick={() => setCurrentView('create-round')} className={`px-3 py-2 rounded-lg transition ${currentView === 'create-round' ? 'bg-zinc-800 text-[#4ade80]' : 'text-zinc-400 hover:text-white'}`}>New Round</button>
          <button onClick={() => setCurrentView('signup')} className={`px-3 py-2 rounded-lg transition ${currentView === 'signup' ? 'bg-zinc-800 text-[#4ade80]' : 'text-zinc-400 hover:text-white'}`}>Join</button>
          {currentUser?.isAdmin && (
            <button onClick={() => setCurrentView('admin')} className={`px-3 py-2 rounded-lg flex items-center space-x-1 border border-zinc-700 transition ${currentView === 'admin' ? 'bg-[#4ade80] text-black' : 'text-zinc-300 hover:bg-zinc-800'}`}>
              <Shield className="w-4 h-4" /> <span>Admin</span>
            </button>
          )}
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentView === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Tournament Standings</h1>
                <p className="text-zinc-400 text-sm mt-1">Live, verified calculations across active rounds</p>
              </div>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-[#4ade80] font-medium text-sm transition"
              >
                {courses.map(c => <option key={c.id} value={c.name}>{c.name} ({c.location})</option>)}
              </select>
            </div>

            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-2 border-[#4ade80]/60 rounded-2xl p-6 shadow-[0_0_20px_rgba(74,222,128,0.1)] flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-[#4ade80] text-black font-black text-2xl h-14 w-14 rounded-xl flex items-center justify-center shadow-lg shadow-[#4ade80]/20">
                  #{userCurrentRank}
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-zinc-400">Your Active Position</p>
                  <h3 className="text-xl font-bold text-white">{currentUser.firstName} {currentUser.lastName}</h3>
                  <p className="text-xs text-zinc-500">@{currentUser.username}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-[#4ade80] tracking-tighter">{userCurrentScore}</span>
                <p className="text-xs text-zinc-400 font-medium">To Par</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <div className="col-span-2">Pos</div>
                <div className="col-span-7">Competitor / Team</div>
                <div className="col-span-3 text-right">Score</div>
              </div>
              <div className="divide-y divide-zinc-800/60">
                <div className="p-4 grid grid-cols-12 items-center bg-zinc-800/20 border-l-4 border-[#4ade80]">
                  <div className="col-span-2 font-black text-lg text-[#4ade80]">1</div>
                  <div className="col-span-7">
                    <div className="font-bold text-white">Alex Miller</div>
                    <div className="text-xs text-zinc-500">@amiller_golf</div>
                  </div>
                  <div className="col-span-3 text-right font-black text-lg text-[#4ade80]">-2</div>
                </div>
                <div className="p-4 grid grid-cols-12 items-center">
                  <div className="col-span-2 font-bold text-zinc-400">2</div>
                  <div className="col-span-7">
                    <div className="font-bold text-zinc-200">Sarah & John</div>
                    <div className="text-xs text-zinc-500 font-mono tracking-wide">2-Man Team</div>
                  </div>
                  <div className="col-span-3 text-right font-bold text-zinc-300">+1</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-lg font-bold tracking-tight text-zinc-300">Recent Rounds at {selectedCourse}</h3>
              {filteredRounds.length === 0 ? (
                <p className="text-sm text-zinc-500 italic bg-zinc-950 p-4 rounded-xl border border-zinc-900">No rounds filed for this course yet.</p>
              ) : (
                <div className="grid gap-3">
                  {filteredRounds.map(round => (
                    <div key={round.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="bg-zinc-800 p-2.5 rounded-lg text-zinc-400"><Flag className="w-4 h-4" /></div>
                        <div>
                          <p className="text-sm font-bold text-zinc-200">{round.playerNames}</p>
                          <p className="text-xs text-zinc-500">{round.type} • {round.date}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-md text-xs font-black ${round.score <= 0 ? 'bg-emerald-500/10 text-[#4ade80]' : 'bg-rose-500/10 text-rose-400'}`}>
                        {round.score === 0 ? 'E' : round.score > 0 ? `+${round.score}` : round.score}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'signup' && (
          <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight">Create Competitor Profile</h2>
              <p className="text-zinc-400 text-xs mt-1">No email strings required. Join using real-world contact validation.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Profile created successfully!"); setCurrentView('leaderboard'); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">First Name</label>
                  <input type="text" required className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4ade80] transition text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">Last Name</label>
                  <input type="text" required className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4ade80] transition text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-zinc-500 text-sm font-mono">@</span>
                  <input type="text" required className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4ade80] transition text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 text-zinc-500 w-4 h-4" />
                  <input type="tel" required placeholder="(555) 000-0000" className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4ade80] transition text-white" />
                </div>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-2 text-sky-400">
                  <span className="font-black text-sm tracking-tight font-mono">venmo</span>
                  <span className="text-zinc-500 text-xs">• Hub Registration Passthrough</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Links accounts are validated via a one-time fee. Tapping below securely transfers directly to the corporate registry.
                </p>
                <a 
                  href="https://venmo.com/u/PlayLinksGolfApp?amount=5.00&note=Links%20Registration" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center justify-center space-x-2 transition"
                >
                  <span>Authorize $5/Yr Subscription</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <button type="submit" className="w-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-black py-3 rounded-xl text-sm transition tracking-wide shadow-lg shadow-[#4ade80]/10">
                Complete Core Profile
              </button>
            </form>
          </div>
        )}

        {currentView === 'create-round' && (
          <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight">File New Round Summary</h2>
              <p className="text-zinc-400 text-xs mt-1">Select configurations to push data algorithms directly to live boards.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">Round Configuration</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Single', '2-Man Team', '4-Man Team'].map(t => (
                    <button key={t} onClick={() => setRoundForm({...roundForm, type: t})} className={`py-2 rounded-xl text-xs font-bold border transition ${roundForm.type === t ? 'bg-[#4ade80] text-black border-[#4ade80]' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {roundForm.type !== 'Single' && (
                <div className="space-y-2 border border-zinc-800 p-4 rounded-xl bg-zinc-950">
                  <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400">Search & Assemble Roster</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-zinc-500 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      value={playerSearch}
                      onChange={(e) => setPlayerSearch(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#4ade80] transition text-white" 
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1">Total Score Relative to Par</label>
                <input type="number" className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4ade80] transition text-white" placeholder="e.g. -2, 0, 4" />
              </div>

              <button onClick={() => { alert("Round submitted!"); setCurrentView('leaderboard'); }} className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold py-3 rounded-xl text-sm transition">
                Submit Authorized Round
              </button>
            </div>
          </div>
        )}

        {currentView === 'admin' && (
          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <h1 className="text-3xl font-black tracking-tight text-white flex items-center space-x-2">
                <Shield className="w-7 h-7 text-[#4ade80]" />
                <span>Central Management Dashboard</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">Platform operations panel.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 h-fit">
                <h3 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-2">
                  <Flag className="w-4 h-4 text-[#4ade80]" />
                  <span>Map New Course Instance</span>
                </h3>
                <form className="space-y-3" onSubmit={handleCreateCourse}>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Course Title</label>
                    <input type="text" required value={courseForm.name} onChange={(e) => setCourseForm({...courseForm, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#4ade80] transition text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Regional Location</label>
                    <input type="text" required value={courseForm.location} onChange={(e) => setCourseForm({...courseForm, location: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#4ade80] transition text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Benchmark Standard Par</label>
                    <input type="number" required value={courseForm.totalPar} onChange={(e) => setCourseForm({...courseForm, totalPar: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#4ade80] transition text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Holes 1 - 18 Matrix Allocation</label>
                    <div className="grid grid-cols-6 gap-1 max-h-24 overflow-y-auto p-1 bg-zinc-950 rounded-lg border border-zinc-800">
                      {adminHolePars.map((p, index) => (
                        <input 
                          key={index} 
                          type="number" 
                          min="3" max="5" 
                          value={p}
                          onChange={(e) => {
                            const newPars = [...adminHolePars];
                            newPars[index] = Number(e.target.value);
                            setAdminHolePars(newPars);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-700 text-center rounded text-xs p-1 focus:outline-none focus:border-[#4ade80]" 
                        />
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold py-2 rounded-lg text-xs transition">
                    Commit Course Node
                  </button>
                </form>
              </div>

              <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#4ade80]" />
                  <span>Verified Platform Registrations ({users.length})</span>
                </h3>
                <div className="divide-y divide-zinc-800 overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950">
                  {users.map(user => (
                    <div key={user.id} className="p-3 flex justify-between items-center text-xs hover:bg-zinc-900/40">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-white">{user.firstName} {user.lastName}</span>
                          <span className="text-zinc-500 text-[10px]">@{user.username}</span>
                        </div>
                        <p className="text-zinc-500 font-mono text-[11px] mt-0.5">{user.phone}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.isAdmin ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-400'}`}>
                        {user.isAdmin ? 'Admin Node' : 'Competitor'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
