import React, { useState } from 'react';
import { Truck, Clock, Calendar, CheckCircle2, AlertTriangle, MoreVertical, Plus, Filter, Package } from 'lucide-react';
import toast from 'react-hot-toast';

// Initial Mock Data
const initialTasks = {
  'scheduled': [
    { id: 'SHP-101', supplier: 'Al Ain Farms', time: '08:00 AM', items: 120, priority: 'normal' },
    { id: 'SHP-102', supplier: 'TechCorp', time: '10:30 AM', items: 45, priority: 'high' },
  ],
  'at-dock': [
    { id: 'SHP-103', supplier: 'Malabar Plaza', time: '07:15 AM', items: 85, priority: 'normal', dock: 'Dock A' },
  ],
  'unloading': [
    { id: 'SHP-104', supplier: 'P&G Trading', time: '06:00 AM', items: 340, priority: 'high', dock: 'Dock B', progress: 65 },
  ],
  'putaway': [
    { id: 'SHP-105', supplier: 'Bismi Briyani', time: 'Yesterday', items: 50, priority: 'normal', progress: 100 },
  ]
};

export default function DockSchedule() {
  const [columns, setColumns] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ ...task, sourceColumn });
    // Make the dragged item semi-transparent
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires this to enable drag
    e.dataTransfer.setData('text/plain', task.id); 
    
    // Optional: Ghost image styling could go here
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) return;

    setColumns(prev => {
      // Remove from source
      const sourceList = prev[draggedTask.sourceColumn].filter(t => t.id !== draggedTask.id);
      
      // Add to destination
      const targetList = [...prev[targetColumn], { ...draggedTask }];
      
      // Remove the temporary sourceColumn property we added for tracking
      delete targetList[targetList.length - 1].sourceColumn;

      return {
        ...prev,
        [draggedTask.sourceColumn]: sourceList,
        [targetColumn]: targetList
      };
    });

    toast.success(`Moved ${draggedTask.id} to ${formatColumnTitle(targetColumn)}`);
  };

  // --- Helper Functions ---
  const formatColumnTitle = (key) => {
    return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getPriorityColor = (priority) => {
    return priority === 'high' 
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' 
      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-500" /> Dock Schedule
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Drag and drop shipments to update their inbound status.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Schedule Arrival
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex overflow-x-auto gap-6 pb-4 snap-x">
        
        {Object.entries(columns).map(([columnKey, tasks]) => (
          <div 
            key={columnKey}
            className="flex-shrink-0 w-80 flex flex-col bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 snap-start"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnKey)}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">{formatColumnTitle(columnKey)}</h3>
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">
                {tasks.length}
              </span>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {tasks.length === 0 && (
                <div className="h-24 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500">
                  Drop here
                </div>
              )}
              
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, columnKey)}
                  onDragEnd={handleDragEnd}
                  className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors group relative"
                >
                  {/* Task Priority Indicator */}
                  {task.priority === 'high' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 rounded-t-xl opacity-80"></div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.id}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">{task.supplier}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-md border border-slate-100 dark:border-slate-700/50">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="truncate">{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-md border border-slate-100 dark:border-slate-700/50">
                      <Package className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{task.items} Pallets</span>
                    </div>
                  </div>

                  {/* Contextual Footer based on Column */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between mt-auto">
                    {task.dock ? (
                       <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                         <Truck className="w-3.5 h-3.5" /> {task.dock}
                       </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Pending Assignment</span>
                    )}

                    {task.progress !== undefined && (
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-slate-500">{task.progress}%</span>
                         <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${task.progress}%` }}></div>
                         </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
