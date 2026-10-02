import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';
import { Search, Bell, LayoutDashboard, Factory, CircleDollarSign, Truck, MessageSquare, ChevronDown, LogOut, Settings, User, Terminal, Table as TableIcon, BarChart2, LineChart as LineChartIcon, Activity, X, Database, Network, Cloud, ArrowRight, RefreshCw, Server } from 'lucide-react';
import { entities } from './data/masterData';
import { financials } from './data/financialsData';
import { operations, pieceRateLogs } from './data/operationsData';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

function Login({ onLogin }) {
  const [email, setEmail] = useState('b.cone@timberflow.com');
  const [password, setPassword] = useState('password123');
  
  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-amber-500"></div>
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-br from-slate-800 to-slate-900 w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg border border-slate-700">
            <Factory className="text-amber-500 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">TimberFlow</h2>
          <p className="text-slate-400">Enterprise Operations Intelligence</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="b.cone@timberflow.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-lg px-4 py-3 transition-all shadow-lg shadow-emerald-900/50 flex justify-center items-center gap-2">
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEntity, setSelectedEntity] = useState('All');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  const filteredFinancials = selectedEntity === 'All' ? financials : financials.filter(f => f.entityId === parseInt(selectedEntity));
  const filteredOperations = selectedEntity === 'All' ? operations : operations.filter(o => o.entityId === parseInt(selectedEntity));

  const totalRevenue = filteredFinancials.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalLabor = filteredFinancials.reduce((acc, curr) => acc + curr.directLabor, 0);
  const totalMbf = filteredOperations.reduce((acc, curr) => acc + curr.mbfProcessed, 0);
  
  const revenueData = filteredFinancials.map(f => {
    const entity = entities.find(e => e.id === f.entityId);
    return { name: entity?.name || 'Unknown', value: f.revenue };
  });

  return (
    <div className="flex h-screen bg-[#0a0f1c] text-slate-200 font-sans overflow-hidden">
      <aside className="w-72 bg-[#0d1425] border-r border-slate-800/60 flex flex-col relative z-20">
        <div className="p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2 rounded-lg shadow-lg shadow-emerald-900/30">
            <Factory className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">TimberFlow</h1>
        </div>
        
        <nav className="flex-1 px-4 pt-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-4">Analytics Suite</div>
          <NavItem icon={<LayoutDashboard />} label="Executive Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Factory />} label="Plant Operations" active={activeTab === 'operations'} onClick={() => setActiveTab('operations')} />
          <NavItem icon={<CircleDollarSign />} label="Financial Analysis" active={activeTab === 'financials'} onClick={() => setActiveTab('financials')} />
        </nav>
        
        <div className="px-4 pb-4">
          <NavItem icon={<Network />} label="Data Flow" active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} />
        </div>

        <div className="p-5 border-t border-slate-800/60 bg-[#0a0f1c]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">LumberTrack Connected</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-[#0a0f1c]">
        <header className="h-20 glass-panel border-b-0 border-slate-800/40 flex items-center justify-between px-8 z-30">
          <div></div>
          
          <div className="flex items-center gap-6">
            <select 
              value={selectedEntity} 
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="bg-slate-900/50 hover:bg-slate-800 px-4 py-2.5 rounded-xl text-sm border border-slate-800 text-white outline-none cursor-pointer"
            >
              <option value="All">All Entities (Consolidated)</option>
              {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            
            <div className="relative">
              <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-slate-800/50 border border-transparent">
                <div className="text-right hidden md:block">
                  <p className="font-semibold text-sm text-slate-200">Bryan Cone</p>
                  <p className="text-emerald-500 font-medium text-xs">CFO</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5"><div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-bold">BC</div></div>
              </div>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl py-2 z-50 border border-slate-700/50">
                  <div className="px-4 py-3 border-b border-slate-800/50">
                    <p className="text-sm font-semibold text-white">Bryan Cone</p>
                  </div>
                  <div className="border-t border-slate-800/50 py-2">
                    <div onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-rose-400 hover:bg-rose-500/10">
                      <LogOut size={16} /><span>Sign Out</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pb-20 custom-scrollbar relative">
          {isChatOpen && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300" onClick={() => setIsChatOpen(false)} />}
          {activeTab === 'dashboard' && (
            <DashboardView totalRevenue={totalRevenue} totalLabor={totalLabor} financials={filteredFinancials} revenueData={revenueData} />
          )}
          {activeTab === 'operations' && (
            <OperationsView mbf={totalMbf} opsData={filteredOperations} pieceLogs={pieceRateLogs} />
          )}
          {activeTab === 'financials' && (
            <FinancialsView financials={filteredFinancials} />
          )}
          {activeTab === 'architecture' && (
            <DataArchitectureView />
          )}
        </div>
      </main>

      {/* Floating Tim AI Chat Widget */}
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

    </div>
  );
}

function DashboardView({ totalRevenue, totalLabor, financials, revenueData }) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Executive Dashboard</h2>
        <p className="text-slate-400">Real-time consolidated analytics across entities.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <PremiumKpiCard title="YTD Revenue" value={`$${(totalRevenue / 1000000).toFixed(1)}M`} trend="+12.4%" chartData={[40,60,45,70,90]} color="emerald" isGood />
        <PremiumKpiCard title="Direct Labor %" value={`${totalRevenue ? ((totalLabor / totalRevenue) * 100).toFixed(1) : 0}%`} trend="-1.2%" chartData={[30,28,26,25,24]} color="amber" isGood />
        <PremiumKpiCard title="Avg Margin" value="21.4%" trend="+2.1%" chartData={[18,19,20,21,21.4]} color="purple" isGood />
        <PremiumKpiCard title="ERP-to-Payroll" value="100%" trend="Sync Active" chartData={[100,100,100,100]} color="blue" isGood />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <PremiumKpiCard title="Total Inventory Value" value="$8.5M" trend="+5.2%" chartData={[7.5,7.8,8.0,8.2,8.5]} color="blue" isGood />
        <PremiumKpiCard title="Order Backlog" value="$15.4M" trend="+1.1%" chartData={[12,13,14,14.5,15.4]} color="emerald" isGood />
        <PremiumKpiCard title="Machine Downtime" value="44 hrs" trend="-15%" chartData={[60,55,50,48,44]} color="amber" isGood />
        <PremiumKpiCard title="Yield Variance" value="1.9%" trend="-0.4%" chartData={[2.5,2.4,2.2,2.0,1.9]} color="emerald" isGood />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 glass-panel rounded-2xl p-6 border-slate-800/50 h-[400px]">
          <h3 className="font-bold text-lg text-white mb-6">Financial Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financials} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="entityId" tickFormatter={(val) => entities.find(e=>e.id === val)?.name.split(' ')[0]} stroke="#64748b" />
              <YAxis tickFormatter={(val)=>`$${val/1000}k`} stroke="#64748b" />
              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', color: '#fff'}} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="directLabor" name="Labor Cost" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="glass-panel rounded-2xl p-6 border-slate-800/50">
          <h3 className="font-bold text-lg text-white mb-6">Revenue Mix</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" stroke="none">
                  {revenueData.map((e, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function OperationsView({ mbf, opsData, pieceLogs }) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Plant Ops & Yield</h2>
        <p className="text-slate-400">Board feet, piece-rate, and LRF metrics.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <PremiumKpiCard title="Total MBF Processed" value={mbf.toLocaleString()} trend="+4.5%" chartData={[800,900,850,1100,mbf]} color="blue" isGood />
        <PremiumKpiCard title="Avg LRF %" value="68.3%" trend="Target: 65%" chartData={[62,64,65,67,68.3]} color="emerald" isGood />
        <PremiumKpiCard title="Piece-Rate Payout" value="$2,000" trend="Shift Total" chartData={[1500,1600,1800,1900,2000]} color="purple" isGood />
        <PremiumKpiCard title="Safety Incidents" value={opsData.reduce((acc, curr) => acc + (curr.safetyIncidents || 0), 0)} trend="YTD" chartData={[2,1,0,0,0]} color="amber" isGood />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <PremiumKpiCard title="Total Maint. Cost" value={`$${(opsData.reduce((acc, curr) => acc + (curr.maintenanceCost || 0), 0) / 1000).toFixed(1)}k`} trend="-2.1%" chartData={[120,115,110,105,108]} color="amber" isGood />
        <PremiumKpiCard title="Log Yard Inventory" value={`${opsData.reduce((acc, curr) => acc + (curr.logYardInventoryMBF || 0), 0).toLocaleString()} MBF`} trend="+5.2%" chartData={[6000,6200,6100,6300,6400]} color="blue" isGood />
        <PremiumKpiCard title="Energy Consumption" value={`${(opsData.reduce((acc, curr) => acc + (curr.energyConsumptionkWh || 0), 0) / 1000).toFixed(0)}k kWh`} trend="-8%" chartData={[280,290,270,265,265]} color="purple" isGood />
        <PremiumKpiCard title="On-Time Delivery" value="94%" trend="+1.2%" chartData={[90,92,91,93,94]} color="emerald" isGood />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="glass-panel rounded-2xl p-6 h-[400px]">
          <h3 className="font-bold text-lg mb-6 text-white flex items-center gap-2"><Activity className="text-emerald-500"/> Machine Line Yield vs Target</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pieceLogs} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="machine" type="category" stroke="#64748b" width={100} />
              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
              <Legend />
              <Bar dataKey="target" name="Target (pcs)" fill="#334155" radius={[0,4,4,0]} />
              <Bar dataKey="produced" name="Produced (pcs)" fill="#10b981" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 h-[400px]">
          <h3 className="font-bold text-lg mb-6 text-white">Lumber Recovery Factor (LRF) Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={opsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="entityId" tickFormatter={(v)=>entities.find(e=>e.id===v)?.name.split(' ')[0]} stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
              <Line type="monotone" dataKey="lrfPercent" stroke="#f59e0b" strokeWidth={3} dot={{r: 6, fill: '#0f172a'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function FinancialsView({ financials }) {
  const totalEbitda = financials.reduce((acc, curr) => acc + (curr.ebitda || 0), 0);
  const totalOvertime = financials.reduce((acc, curr) => acc + (curr.overtimeCost || 0), 0);
  const totalOperatingExp = financials.reduce((acc, curr) => acc + (curr.operatingExpenses || 0), 0);
  const totalNetIncome = totalEbitda - totalOperatingExp;
  
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Financial Analysis</h2>
        <p className="text-slate-400">Profitability, labor costs, and EBITDA margins across entities.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <PremiumKpiCard title="Total EBITDA" value={`$${(totalEbitda / 1000000).toFixed(1)}M`} trend="+8.2%" chartData={[3, 3.2, 3.1, 4, totalEbitda/1000000]} color="emerald" isGood />
        <PremiumKpiCard title="Overtime Costs" value={`$${(totalOvertime / 1000).toFixed(1)}k`} trend="-2.4%" chartData={[300, 250, 280, 200, totalOvertime/1000]} color="amber" isGood />
        <PremiumKpiCard title="Operating Margin" value="23.5%" trend="Target: 20%" chartData={[18, 19, 21, 22, 23.5]} color="purple" isGood />
        <PremiumKpiCard title="Net Income" value={`$${(totalNetIncome / 1000000).toFixed(1)}M`} trend="+12.1%" chartData={[2, 2.1, 2.0, 2.5, totalNetIncome/1000000]} color="blue" isGood />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
         <div className="glass-panel rounded-2xl p-6 h-[400px]">
          <h3 className="font-bold text-lg mb-6 text-white flex items-center gap-2">EBITDA by Entity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financials} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="entityId" tickFormatter={(v)=>entities.find(e=>e.id===v)?.name?.split(' ')[0]} stroke="#64748b" />
              <YAxis tickFormatter={(v)=>`$${v/1000}k`} stroke="#64748b" />
              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', color: '#fff'}} cursor={{fill: '#1e293b'}} />
              <Bar dataKey="ebitda" name="EBITDA" fill="#8b5cf6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 h-[400px]">
          <h3 className="font-bold text-lg mb-6 text-white">Cost Breakdown (Labor vs Overhead)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financials} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="entityId" tickFormatter={(v)=>entities.find(e=>e.id===v)?.name?.split(' ')[0]} stroke="#64748b" />
              <YAxis tickFormatter={(v)=>`$${v/1000}k`} stroke="#64748b" />
              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', color: '#fff'}} />
              <Area type="monotone" dataKey="directLabor" name="Direct Labor" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="overhead" name="Overhead" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function ChatWidget({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([{ id: 0, role: 'assistant', text: "Hello! I'm Tim, your Timber Intelligence Manager. Ask me anything about yields, financials, or piece-rates.", type: 'text' }]);
  const [input, setInput] = useState('');
  const [engine, setEngine] = useState(null);
  const [llmStatus, setLlmStatus] = useState('Initializing LLM... (This may download ~4GB of model weights)');
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    async function loadEngine() {
      try {
        const initProgressCallback = (initProgress) => {
          setLlmStatus(initProgress.text);
        }
        // Using a tiny model for faster web loading if available, standard is Llama-3-8B-Instruct-q4f32_1-MLC
        const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC";
        const newEngine = await CreateMLCEngine(selectedModel, { initProgressCallback });
        setEngine(newEngine);
        setLlmStatus('LLM Ready');
      } catch (err) {
        console.error("Web-LLM Error:", err);
        setLlmStatus('LLM fallback mode (simulated)');
      }
    }
    loadEngine();
  }, []);

  const handleSend = async (e, preset) => {
    e?.preventDefault();
    const q = preset || input;
    if (!q) return;

    const userMsgId = Date.now();
    setMessages(p => [...p, { id: userMsgId, role: 'user', text: q, type: 'text' }]);
    setInput('');

    // Pre-canned complex responses for exact matches to save time
    if (q.toLowerCase().includes('top 3 plants')) {
      setTimeout(() => {
        setMessages(p => [...p, {
          id: Date.now()+1, role: 'assistant', type: 'complex', activeView: 'table', dataKey: 'mbf',
          data: [{ name: 'IWP', mbf: 1250 }, { name: 'ECL', mbf: 890 }, { name: 'Box & Crate', mbf: 450 }],
          text: "Based on the current production data, IWP leads with 1,250 MBF, followed by ECL and Box & Crate. Here is the detailed breakdown:"
        }]);
      }, 1000);
      return;
    }
    
    if (q.toLowerCase().includes('overtime costs')) {
      setTimeout(() => {
        setMessages(p => [...p, {
          id: Date.now()+1, role: 'assistant', type: 'complex', activeView: 'table', dataKey: 'overtime',
          data: [{ name: 'IWP', overtime: 150000 }, { name: 'Box & Crate', overtime: 120000 }],
          text: "IWP has incurred $150,000 in overtime costs, which is 25% higher than East Coast Box & Crate at $120,000. See the comparison below:"
        }]);
      }, 1000);
      return;
    }

    if (q.toLowerCase().includes('inventory value')) {
      setTimeout(() => {
        setMessages(p => [...p, {
          id: Date.now()+1, role: 'assistant', type: 'complex', activeView: 'bar', dataKey: 'inventory',
          data: [{ name: 'IWP', inventory: 4500000 }, { name: 'ECL', inventory: 2800000 }, { name: 'Box & Crate', inventory: 1200000 }],
          text: "Here is the current Epicor inventory valuation breakdown across all major entities. IWP holds the highest inventory value at $4.5M."
        }]);
      }, 1000);
      return;
    }

    if (q.toLowerCase().includes('order backlog')) {
      setTimeout(() => {
        setMessages(p => [...p, {
          id: Date.now()+1, role: 'assistant', type: 'complex', activeView: 'line', dataKey: 'backlog',
          data: [{ name: 'IWP', backlog: 8200000 }, { name: 'ECL', backlog: 5400000 }, { name: 'Box & Crate', backlog: 1800000 }],
          text: "The total consolidated order backlog currently stands at $15.4M. IWP makes up the largest portion at $8.2M."
        }]);
      }, 1000);
      return;
    }

    // Try Web-LLM for custom questions
    if (engine) {
      setMessages(p => [...p, { id: 'loading', role: 'assistant', text: 'Thinking...', type: 'text' }]);
      try {
        const reply = await engine.chat.completions.create({
          messages: [{ role: 'system', content: 'You are Tim, a helpful AI assistant for a timber ERP system. Keep answers brief.' }, { role: 'user', content: q }]
        });
        setMessages(p => p.filter(m => m.id !== 'loading').concat({ id: Date.now()+1, role: 'assistant', text: reply.choices[0].message.content, type: 'text' }));
      } catch (err) {
        setMessages(p => p.filter(m => m.id !== 'loading').concat({ id: Date.now()+1, role: 'assistant', text: "Sorry, I encountered an error querying the Web-LLM engine. Please try a preset query.", type: 'text' }));
      }
    } else {
      // Fallback
      setTimeout(() => {
        setMessages(p => [...p, { id: Date.now()+1, role: 'assistant', text: "I'm currently in simulated mode while the LLM weights load. Please try the preset queries below for full analytics capabilities!", type: 'text' }]);
      }, 1000);
    }
  };

  const setView = (msgId, view) => {
    setMessages(p => p.map(m => m.id === msgId ? { ...m, activeView: view } : m));
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[550px] h-[750px] mb-4 bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl flex flex-col overflow-hidden transform transition-all duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-tight">Tim AI Assistant</h3>
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {llmStatus === 'LLM Ready' ? 'Online (Local AI)' : llmStatus}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900">
            {messages.map((msg, i) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[95%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  
                  {msg.type === 'complex' && (
                    <div className="mt-4 space-y-3">
                      
                      <div className="flex gap-2 mb-2 border-b border-slate-700 pb-2">
                        <button onClick={()=>setView(msg.id, 'table')} className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${msg.activeView==='table'?'bg-emerald-500/20 text-emerald-400':'text-slate-400 hover:text-white'}`}><TableIcon size={14}/> Table</button>
                        <button onClick={()=>setView(msg.id, 'bar')} className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${msg.activeView==='bar'?'bg-emerald-500/20 text-emerald-400':'text-slate-400 hover:text-white'}`}><BarChart2 size={14}/> Bar</button>
                        <button onClick={()=>setView(msg.id, 'line')} className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${msg.activeView==='line'?'bg-emerald-500/20 text-emerald-400':'text-slate-400 hover:text-white'}`}><LineChartIcon size={14}/> Line</button>
                      </div>

                      <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700/50 min-h-[180px]">
                        {msg.activeView === 'table' && (
                          <table className="w-full text-xs text-left">
                            <thead className="text-slate-400 border-b border-slate-800">
                              <tr>
                                {Object.keys(msg.data[0]).map(k => <th key={k} className="py-1 capitalize">{k}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {msg.data.map((row, idx) => (
                                <tr key={idx} className="border-b border-slate-800/50 last:border-0">
                                  {Object.values(row).map((val, cellIdx) => (
                                    <td key={cellIdx} className="py-2">{typeof val === 'number' ? val.toLocaleString() : val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {msg.activeView === 'bar' && (
                          <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={msg.data} margin={{top:10, right:10, left:-20, bottom:0}}>
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${v/1000}k`:v} />
                              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff'}} />
                              <Bar dataKey={msg.dataKey} fill="#10b981" radius={[4,4,0,0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                        {msg.activeView === 'line' && (
                          <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={msg.data} margin={{top:10, right:10, left:-20, bottom:0}}>
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${v/1000}k`:v} />
                              <RechartsTooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff'}} />
                              <Line type="monotone" dataKey={msg.dataKey} stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
               <button onClick={()=>handleSend(null, "Top 3 plants by board-foot?")} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-700 text-[11px] font-medium text-emerald-400 hover:bg-slate-600 border border-slate-600 transition-colors">Top 3 plants by board-foot?</button>
               <button onClick={()=>handleSend(null, "Compare overtime costs IWP vs Box?")} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-700 text-[11px] font-medium text-emerald-400 hover:bg-slate-600 border border-slate-600 transition-colors">Compare overtime IWP vs Box</button>
               <button onClick={()=>handleSend(null, "Inventory value by plant?")} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-700 text-[11px] font-medium text-emerald-400 hover:bg-slate-600 border border-slate-600 transition-colors">Inventory value by plant?</button>
               <button onClick={()=>handleSend(null, "Show order backlog")} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-700 text-[11px] font-medium text-emerald-400 hover:bg-slate-600 border border-slate-600 transition-colors">Show order backlog</button>
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Message Tim..." className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-colors text-sm">Send</button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-700 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
    </>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${active ? 'bg-gradient-to-r from-emerald-600/20 to-transparent border-l-2 border-emerald-500 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
      <div className={`${active ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>{React.cloneElement(icon, { size: 20 })}</div>
      <span className={`font-medium text-sm ${active ? 'font-semibold tracking-wide' : ''}`}>{label}</span>
    </div>
  );
}

function PremiumKpiCard({ title, value, trend, chartData, color }) {
  const c = { emerald: '#10b981', amber: '#f59e0b', blue: '#3b82f6', purple: '#8b5cf6' }[color];
  return (
    <div className="glass-panel rounded-2xl p-6 border-slate-800/50 relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm font-bold pb-1 text-emerald-400">{trend}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData.map((uv,i)=>({name:i,uv}))}><Area type="monotone" dataKey="uv" stroke={c} fill={`${c}22`} strokeWidth={2} /></AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DataArchitectureView() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Data Architecture & Integration Flow</h2>
        <p className="text-slate-400">Near real-time data pipeline from 5 entities running Epicor LumberTrack and Dynamics GP into the centralized Analytics Data Lake.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Source Systems */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 relative">
            <div className="absolute top-0 right-0 p-3"><Database className="text-emerald-500 w-6 h-6 opacity-50"/></div>
            <h3 className="font-bold text-white text-lg mb-2">Epicor LumberTrack (ERP)</h3>
            <p className="text-xs text-slate-400 mb-3">5 Entity Nodes (EINs)</p>
            <ul className="text-sm text-slate-300 space-y-1 ml-4 list-disc marker:text-emerald-500">
              <li>Inventory / Yard Operations</li>
              <li>Production & Yield Data</li>
              <li>Order Backlogs</li>
              <li>Machine Piece-Rates</li>
            </ul>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-blue-500/30 relative">
            <div className="absolute top-0 right-0 p-3"><Database className="text-blue-500 w-6 h-6 opacity-50"/></div>
            <h3 className="font-bold text-white text-lg mb-2">Microsoft Dynamics GP</h3>
            <p className="text-xs text-slate-400 mb-3">Financials</p>
            <ul className="text-sm text-slate-300 space-y-1 ml-4 list-disc marker:text-blue-500">
              <li>General Ledger</li>
              <li>Accounts Payable / Receivable</li>
              <li>Payroll & Overtime Costs</li>
            </ul>
          </div>
        </div>

        {/* Integration Pipeline */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/4">
          <div className="flex flex-col items-center">
             <div className="flex items-center text-slate-400 mb-2">
                <div className="h-0.5 w-16 bg-gradient-to-r from-emerald-500 to-amber-500"></div>
                <ArrowRight className="w-5 h-5 mx-2 text-amber-500" />
                <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 to-purple-500"></div>
             </div>
             
             <div className="glass-panel p-4 rounded-full border-amber-500/40 shadow-lg shadow-amber-900/20 mb-2">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin-slow" />
             </div>
             
             <p className="text-center text-xs font-bold text-white uppercase tracking-wider mb-1">ETL Pipeline</p>
             <p className="text-center text-xs text-slate-400">Near Real-Time Sync (15m)</p>
          </div>
        </div>

        {/* Data Lake & Analytics */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="glass-panel p-8 rounded-2xl border-purple-500/30 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10"><Cloud className="w-40 h-40 text-purple-400"/></div>
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-8 h-8 text-purple-400" />
              <h3 className="font-bold text-white text-xl">Analytics Data Lake</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">Centralized repository for consolidated reporting across all 5 EINs. Data is standardized and structured for high-performance querying.</p>
            
            <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-700/50">
               <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Serving Layer (API)</h4>
               <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-400 font-medium">Operations API</span>
                  <span className="text-blue-400 font-medium">Financial API</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6 rounded-2xl border-slate-800/50">
        <h3 className="font-bold text-white mb-4">Integration Details</h3>
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="text-slate-400 mb-1">Data Frequency</h4>
            <p className="text-white font-medium">Every 15 Minutes (Delta Sync)</p>
          </div>
          <div>
            <h4 className="text-slate-400 mb-1">Data Volume</h4>
            <p className="text-white font-medium">~50GB / Month</p>
          </div>
          <div>
            <h4 className="text-slate-400 mb-1">Transformations</h4>
            <p className="text-white font-medium">Currency conversion, EIN mapping</p>
          </div>
        </div>
      </div>
    </div>
  );
}
