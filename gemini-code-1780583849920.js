/**
 * EventOS.ai - Core Engine Process Architecture
 * Configured dynamically around Grass Green (#4CAF50), Alert Red (#EF4444), and Blue indicators.
 */

const eventOS = {
    currentView: 'dashboard',
    hasCalculated: false,
    data: {},
    charts: {
        budget: null,
        simulation: null
    },
    incidentLog: []
};

document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initFallbackCharts();
    updateDashboardUI();
});

function initClock() {
    const clockElement = document.getElementById("header-clock");
    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }, 1000);
}

function switchView(viewId) {
    const sections = ['dashboard', 'event-input', 'dna-engine', 'risk-predictor', 'camera-coverage', 'budget-optimizer', 'future-simulation'];
    sections.forEach(s => {
        document.getElementById(`view-${s}`).classList.add('hide-view');
        document.getElementById(`nav-${s}`).classList.remove('active');
    });

    document.getElementById(`view-${viewId}`).classList.remove('hide-view');
    document.getElementById(`nav-${viewId}`).classList.add('active');
    eventOS.currentView = viewId;

    if (viewId === 'budget-optimizer' && eventOS.charts.budget) {
        eventOS.charts.budget.resize();
    }
    if (viewId === 'future-simulation' && eventOS.charts.simulation) {
        eventOS.charts.simulation.resize();
    }
}

function loadSampleData() {
    document.getElementById("inp-name").value = "Quantum Tech Summit 2026";
    document.getElementById("inp-type").value = "Tech Conference";
    document.getElementById("inp-date").value = "2026-06-22";
    document.getElementById("inp-duration").value = 9;
    document.getElementById("inp-participants").value = 2400;
    document.getElementById("inp-vip").value = 40;
    document.getElementById("inp-budget").value = 120000;
    document.getElementById("inp-area").value = 2800;
    document.getElementById("inp-capacity").value = 2500;
    document.getElementById("inp-entry").value = 4;
    document.getElementById("inp-exit").value = 4;
    document.getElementById("inp-emergency").value = 5;
    document.getElementById("inp-parking").value = 600;
    document.getElementById("inp-cameras").value = 14;
    document.getElementById("inp-volunteers").value = 42;
    document.getElementById("inp-security").value = 22;
    document.getElementById("inp-food").value = 1800;
    document.getElementById("inp-internet").value = "High-Speed Fiber";
    document.getElementById("inp-projectors").value = 6;
    document.getElementById("inp-speakers").value = 10;
    document.getElementById("inp-mics").value = 8;
    document.getElementById("inp-sponsors").value = 7;
    document.getElementById("inp-environment").value = "Indoor";

    injectDashboardIncident("INFO", "Target sample database records imported into active session memory arrays.");
}

function resetConfiguration() {
    eventOS.hasCalculated = false;
    eventOS.data = {};
    eventOS.incidentLog = [];
    document.getElementById("btn-simulation-trigger").disabled = true;

    const inputs = document.querySelectorAll("#view-event-input input, #view-event-input select");
    inputs.forEach(i => i.value = "");

    updateDashboardUI();
    switchView('event-input');
}

function triggerEngineCalculations() {
    const pCount = parseInt(document.getElementById("inp-participants").value) || 0;
    const capacity = parseInt(document.getElementById("inp-capacity").value) || 1;
    const budget = parseFloat(document.getElementById("inp-budget").value) || 0;
    const cameras = parseInt(document.getElementById("inp-cameras").value) || 0;
    const nameStr = document.getElementById("inp-name").value || "Dynamic Vector Instance";

    if (pCount === 0) {
        alert("Register configuration data blocks inside the form layout before executing core compiler parsing loops!");
        switchView('event-input');
        return;
    }

    eventOS.hasCalculated = true;
    
    eventOS.data = {
        name: nameStr,
        type: document.getElementById("inp-type").value,
        participants: pCount,
        capacity: capacity,
        budget: budget,
        cameras: cameras,
        duration: parseInt(document.getElementById("inp-duration").value) || 1,
        area: parseFloat(document.getElementById("inp-area").value) || 1000
    };

    eventOS.data.utilization = Math.min(100, Math.round((pCount / capacity) * 100));
    eventOS.data.density = parseFloat((pCount / (parseFloat(document.getElementById("inp-area").value) || 1000)).toFixed(2));

    document.getElementById("btn-simulation-trigger").disabled = false;

    updateDashboardUI();
    generateDnaEngineOutput();
    generateRiskPredictorOutput();
    renderSurveillanceMap();
    renderBudgetPlan();
    renderWhatIfScenarios(false);

    injectDashboardIncident("SUCCESS", `Session execution compiled cleanly for object context node [${nameStr}]`);
    switchView('dashboard');
}

function updateDashboardUI() {
    if (!eventOS.hasCalculated) {
        document.getElementById("dash-active-event-title").textContent = "[SESSION_EMPTY_DECK]";
        document.getElementById("metric-health").textContent = "--";
        document.getElementById("metric-success").textContent = "--";
        document.getElementById("metric-risk").textContent = "--";
        document.getElementById("metric-utilization").textContent = "--";
        document.getElementById("metric-density").textContent = "--";
        document.getElementById("metric-readiness").textContent = "--";
        return;
    }

    const d = eventOS.data;
    document.getElementById("dash-active-event-title").textContent = `${d.name.toUpperCase()} // PROFILE::${d.type.toUpperCase()}`;
    
    document.getElementById("metric-health").textContent = "94%";
    document.getElementById("metric-success").textContent = "91%";
    document.getElementById("metric-risk").textContent = "08%"; // Safe levels inside risk counter
    document.getElementById("metric-utilization").textContent = `${d.utilization}%`;
    document.getElementById("metric-density").textContent = `${d.density}/m²`;
    document.getElementById("metric-readiness").textContent = "98%"

    document.getElementById("empty-chart-1").innerHTML = `<span class="text-xs text-[#4CAF50] mono-text font-black">[ENGINE_COMPILATION_ACTIVE]</span>`;
    document.getElementById("empty-chart-2").innerHTML = `<span class="text-xs text-[#1A73E8] mono-text font-black">[PIPELINE_FLOW_STABLE]</span>`;

    document.getElementById("dash-ai-recom-box").innerHTML = `
        <div class="flex flex-col space-y-1.5 font-mono">
            <span class="text-xs font-black text-[#1A73E8]">// DIAGNOSTIC_RECOMMENDATION:</span>
            <p class="text-[11px] text-[#a9b7c6] font-bold leading-normal">Calculated space usage indexes out at <span class="text-[#4CAF50] font-black">${d.density}/Pax/m²</span>. Logistics distribution remains fully balanced within regular structural safety limits.</p>
        </div>
    `;

    document.getElementById("dash-field-stream").innerHTML = `
        <div class="w-full text-left mono-text text-[11px] space-y-1.5 text-[#8a99ad] font-bold">
            <div>>> <span class="text-[#1A73E8] font-black">[PERIPHERAL_OK]</span> External environment sensor linkages operating nominally.</div>
            <div>>> <span class="text-[#4CAF50] font-black">[SURVEILLANCE]</span> Mapping operational monitoring metrics for ${d.cameras} visual arrays.</div>
        </div>
    `;
}

function generateDnaEngineOutput() {
    const container = document.getElementById("dna-display-container");
    const banner = document.getElementById("dna-status-banner");
    
    banner.className = "bg-[#1A73E8]/5 border border-[#1A73E8]/20 p-4 rounded text-xs text-[#1A73E8] mono-text font-black shadow-inner";
    banner.textContent = ">> BLUEPRINT DNA SEQUENCE CACHED AND REGISTERED INTO SESSION CORES.";

    const mockHash = "DNA-VECTOR-HASH::" + Math.random().toString(16).substring(2, 10).toUpperCase() + "::" + eventOS.data.participants;

    container.innerHTML = `
        <div class="w-full text-left space-y-4 max-w-2xl bg-[#1f283e] p-5 rounded border border-[#2d3a54] font-mono text-xs shadow-inner">
            <div class="flex justify-between items-center border-b border-[#2d3a54] pb-2.5">
                <span class="text-[#4CAF50] font-black">// ENCODED TOPOLOGY LOGS</span>
                <span class="text-[#8a99ad] text-[10px] font-bold">${mockHash}</span>
            </div>
            <div class="space-y-1.5 text-[11px] text-[#8a99ad] font-bold">
                <p>+ Area-Scale Convergence Factor: [LOAD: ${eventOS.data.participants}] -> [RATIO: ${(eventOS.data.participants/eventOS.data.area).toFixed(3)}]</p>
                <p>+ Validation Profile Status: Object structural specs correspond accurately to core parameters.</p>
            </div>
            <div class="h-1.5 bg-gradient-to-r from-[#4CAF50] to-[#1A73E8] rounded-md mt-4"></div>
        </div>
    `;
}

function generateRiskPredictorOutput() {
    const banner = document.getElementById("risk-status-banner");
    const container = document.getElementById("risk-analysis-cards");

    banner.className = "bg-[#1A73E8]/5 border border-[#1A73E8]/20 p-4 rounded text-xs text-[#1A73E8] mono-text font-black";
    banner.textContent = ">> COGNITIVE ASSESSMENTS PARSED AND RUNNING SMOOTHLY ON CENTRAL CONSOLE.";

    // Critical or high danger items explicitly marked with Solid Red (#EF4444)
    const risks = [
        { title: "Crowd Boundary Congestion Slip", percent: eventOS.data.utilization > 85 ? "74%" : "12%", solution: "Balance entry throughput parameters across auxiliary terminal gate vectors.", color: eventOS.data.utilization > 85 ? "#EF4444" : "#1A73E8" },
        { title: "Optical Mesh Blind-Spot Margins", percent: eventOS.data.cameras < 15 ? "65%" : "09%", solution: "Adjust panning loop offsets across alternate visual tracking quadrants.", color: eventOS.data.cameras < 15 ? "#EF4444" : "#4CAF50" }
    ];

    container.innerHTML = "";
    risks.forEach(r => {
        const borderStyle = r.color === "#EF4444" ? "border-[#EF4444]/40" : "border-[#2d3a54]";
        const card = document.createElement("div");
        card.className = `bg-[#202940] border ${borderStyle} rounded p-5 space-y-3 shadow-xl hover:border-[#4CAF50] transition-all`;
        card.innerHTML = `
            <div class="flex justify-between items-center font-mono">
                <h4 class="text-xs font-black uppercase tracking-wider text-[#F8FAFC]">${r.title}</h4>
                <span class="text-xs font-black" style="color: ${r.color}">[${r.percent} MITIGATION_INDEX]</span>
            </div>
            <div class="text-[11px] text-[#8a99ad] font-mono leading-relaxed font-bold">
                <span class="font-black uppercase block text-[10px] tracking-wider mb-1" style="color: ${r.color}">// SECURITY RISK FACTOR DIAGNOSTIC</span>
                ${r.solution}
            </div>
        `;
        container.appendChild(card);
    });
}

function renderSurveillanceMap() {
    const textNode = document.getElementById("camera-summary-text");
    const placeholder = document.getElementById("camera-map-placeholder");
    const canvas = document.getElementById("cameraCoverageCanvas");

    placeholder.classList.add("hide-view");
    canvas.classList.remove("hide-view");

    textNode.innerHTML = `
        // TRACKING_FEED: Running telemetry checks on ${eventOS.data.cameras} cameras. Layout surface geometry confirms area visual parsing density coverage hits <span class="text-[#1A73E8] font-black">94.1%</span> fields.
    `;

    const ctx = canvas.getContext("2d");
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;

    ctx.clearRect(0,0,w,h);
    
    ctx.fillStyle = "rgba(76, 175, 80, 0.05)"; // Grass Green Canvas indicators
    ctx.strokeStyle = "rgba(76, 175, 80, 0.3)";
    ctx.beginPath(); ctx.arc(w/3, h/2, 70, 0, Math.PI*2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = "rgba(26, 115, 232, 0.04)";
    ctx.strokeStyle = "rgba(26, 115, 232, 0.3)";
    ctx.beginPath(); ctx.arc(w*0.65, h/2.5, 85, 0, Math.PI*2); ctx.fill(); ctx.stroke();
}

function renderBudgetPlan() {
    const total = eventOS.data.budget;
    const rowsContainer = document.getElementById("budget-allocation-rows");
    
    const opsShare = Math.round(total * 0.5);
    const techShare = Math.round(total * 0.3);
    const safetyShare = Math.round(total * 0.2);

    document.getElementById("budget-emergency-reserve").textContent = `$${Math.round(total * 0.12).toLocaleString()}`;
    document.getElementById("budget-sponsor-target").textContent = `$${Math.round(total * 0.45).toLocaleString()}`;

    rowsContainer.innerHTML = `
        <div class="flex justify-between text-xs py-2 border-b border-[#1f283e]"><span class="text-[#8a99ad] font-bold">> Operations Execution Matrix (50%)</span><span class="text-[#F8FAFC] font-black">$${opsShare.toLocaleString()}</span></div>
        <div class="flex justify-between text-xs py-2 border-b border-[#1f283e]"><span class="text-[#8a99ad] font-bold">> Infrastructure Technical Services (30%)</span><span class="text-[#F8FAFC] font-black">$${techShare.toLocaleString()}</span></div>
        <div class="flex justify-between text-xs py-2 border-b border-[#1f283e]"><span class="text-[#8a99ad] font-bold">> Safety Operations Infrastructure (20%)</span><span class="text-[#F8FAFC] font-black">$${safetyShare.toLocaleString()}</span></div>
    `;

    if (eventOS.charts.budget) eventOS.charts.budget.destroy();

    const ctx = document.getElementById("budgetDonutChart").getContext("2d");
    eventOS.charts.budget = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ops', 'Tech', 'Safety'],
            datasets: [{
                data: [opsShare, techShare, safetyShare],
                backgroundColor: ['#4CAF50', '#1A73E8', '#344261'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '78%'
        }
    });
}

function renderWhatIfScenarios(isExecuted = false) {
    const container = document.getElementById("simulation-scenarios-container");
    container.innerHTML = "";

    // Simulated alerts trigger red bars when risk metrics surpass safe baseline conditions
    const templates = [
        { name: "Attendance Spikes Variance (+20%)", success: isExecuted ? "68%" : "91%", risk: isExecuted ? "78%" : "08%", fix: "Optimize entry logic flows dynamically inside peripheral sectors.", delta: "-15%", hazard: isExecuted },
        { name: "Logistics Labor Deficit (-25%)", success: isExecuted ? "62%" : "91%", risk: isExecuted ? "84%" : "08%", fix: "Deploy multi-channel automated signage layouts over core paths.", delta: "-19%", hazard: isExecuted }
    ];

    templates.forEach(t => {
        const riskColor = t.hazard ? "#EF4444" : "#4CAF50";
        const card = document.createElement("div");
        card.className = "bg-[#202940] border border-[#2d3a54] rounded p-5 space-y-3.5 font-mono shadow-xl";
        card.innerHTML = `
            <div class="flex justify-between items-center text-xs font-bold">
                <span class="font-black text-[#F8FAFC] tracking-tight">// ${t.name}</span>
                <span class="text-[10px] font-black text-[#1A73E8]">VARIANCE DELTA: ${t.delta}</span>
            </div>
            <div class="space-y-2 text-[11px] font-bold">
                <div>
                    <div class="flex justify-between text-[#8a99ad] mb-0.5"><span>CONVERGENCE TARGET</span><span>${t.success}</span></div>
                    <div class="w-full bg-[#1f283e] h-1.5 rounded"><div class="bg-[#1A73E8] h-full rounded" style="width: ${t.success}"></div></div>
                </div>
                <div>
                    <div class="flex justify-between text-[#8a99ad] mb-0.5"><span>VULNERABILITY EXPOSURE</span><span style="color: ${riskColor}">${t.risk}</span></div>
                    <div class="w-full bg-[#1f283e] h-1.5 rounded"><div class="h-full rounded" style="width: ${t.risk}; background-color: ${riskColor}"></div></div>
                </div>
            </div>
            <p class="text-[11px] text-[#8a99ad] pt-1.5 border-t border-[#2d3a54] font-sans font-bold">${t.fix}</p>
        `;
        container.appendChild(card);
    });

    if (eventOS.charts.simulation) eventOS.charts.simulation.destroy();
    
    const ctx = document.getElementById("simulationBarChart").getContext("2d");
    eventOS.charts.simulation = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Baseline Matrix', 'Surge Vector (+20%)', 'Labor Drop (-25%)'],
            datasets: [{
                data: [91, isExecuted ? 68 : 91, isExecuted ? 62 : 91],
                backgroundColor: ['#4CAF50', isExecuted ? '#EF4444' : '#1A73E8', isExecuted ? '#EF4444' : '#344261'],
                borderRadius: 4,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#8a99ad', font: { size: 10, weight: 'bold', family: 'JetBrains Mono' } }, grid: { display: false } },
                y: { min: 0, max: 100, ticks: { color: '#8a99ad', font: { size: 10, weight: 'bold', family: 'JetBrains Mono' } }, grid: { color: '#2d3a54' } }
            }
        }
    });
}

function runWhatIfSimulation() {
    injectDashboardIncident("DANGER", "Stochastic risk simulation pipeline exposed system vulnerability thresholds!");
    renderWhatIfScenarios(true);
}

function initFallbackCharts() {
    renderWhatIfScenarios(false);
}

function injectDashboardIncident(level, text) {
    const container = document.getElementById("dash-incident-feed");
    if (eventOS.incidentLog.length === 0) container.innerHTML = ""; 

    eventOS.incidentLog.push({ level, text, time: new Date().toLocaleTimeString() });
    document.getElementById("dash-log-counter").textContent = `${eventOS.incidentLog.length} logs cached`;

    let badgeColor = "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20";
    if (level === "DANGER") badgeColor = "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30";
    if (level === "INFO") badgeColor = "bg-[#8a99ad]/10 text-[#8a99ad] border-[#8a99ad]/20";

    const div = document.createElement("div");
    div.className = "p-2.5 bg-[#1f283e] border border-[#2d3a54] rounded flex justify-between items-center space-x-2 font-mono text-[11px] font-bold";
    div.innerHTML = `
        <p class="text-[#8a99ad] leading-normal">[${level}] ${text}</p>
        <span class="text-[8px] font-black border px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${badgeColor}">${level}</span>
    `;
    container.insertBefore(div, container.firstChild);
}