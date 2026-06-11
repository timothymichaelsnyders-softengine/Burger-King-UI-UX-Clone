import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Compass, Clock, Phone, Check, Activity } from 'lucide-react';
import { Store } from '../types';

interface StoreLocatorProps {
  stores: Store[];
  activeStore: Store;
  onSelectStore: (store: Store) => void;
  onClose?: () => void;
}

export default function StoreLocator({ stores, activeStore, onSelectStore, onClose }: StoreLocatorProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [useGeo, setUseGeo] = React.useState(false);
  const [geoCoords, setGeoCoords] = React.useState<{ lat: number; lng: number } | null>(null);
  const [locatorStatus, setLocatorStatus] = React.useState<string | null>(null);

  // Compute distance to store if geo is available
  const getComputedDistance = (store: Store) => {
    if (!geoCoords) return null;
    // Simple 2D distance model times scaling factor for mock miles
    const dx = (store.latitude - geoCoords.lat) * 69;
    const dy = (store.longitude - geoCoords.lng) * 53;
    return Math.sqrt(dx * dx + dy * dy).toFixed(1);
  };

  const handleGeolocation = () => {
    setLocatorStatus('Pinging location...');
    if (!navigator.geolocation) {
      setLocatorStatus('Geolocation not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setUseGeo(true);
        setLocatorStatus('Located! Distance to grills recalculated.');
      },
      (err) => {
        setLocatorStatus('Location access blocked. Mocking NY coordinates.');
        // Set mock coords near Penn Station Manhattan
        setGeoCoords({ lat: 40.7505, lng: -73.9934 });
        setUseGeo(true);
      },
      { timeout: 5000 }
    );
  };

  const filteredStores = stores.filter(store => {
    const query = searchQuery.toLowerCase();
    return store.name.toLowerCase().includes(query) || 
           store.address.toLowerCase().includes(query) || 
           store.features.some(f => f.toLowerCase().includes(query));
  });

  return (
    <div id="store-locator-section" className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto my-10 text-left">
      
      {/* Locator title panel */}
      <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-red-950/45 rounded-xl flex items-center justify-center border border-red-500/20">
            <MapPin className="w-5 h-5 text-[#FF4500]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">Crown Kitchen Locator</h3>
            <p className="text-zinc-500 text-[10px] sm:text-xs">Lock in your local flame-grill to secure priority pickup times.</p>
          </div>
        </div>

        {/* Global geolocation toggle */}
        <button
          onClick={handleGeolocation}
          className="bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 hover:border-amber-500/30 text-zinc-300 font-extrabold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer text-left transition-colors"
          id="btn-geolocation-ping"
        >
          <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <span>Auto-Detect Grill Location</span>
        </button>
      </div>

      {locatorStatus && (
        <div className="bg-zinc-900/60 transition-all p-2.5 text-[10px] text-amber-400 font-semibold font-mono flex items-center gap-2 px-6 border-b border-zinc-900">
          <Activity className="w-3.5 h-3.5 text-[#FF4500]" />
          <span>{locatorStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Store list */}
        <div className="col-span-1 md:col-span-6 p-6 border-r border-zinc-900 flex flex-col justify-between max-h-[500px]">
          <div>
            {/* Search Input bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search Manhattan outlets, drive-thru, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500/40 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-colors"
                id="locator-search-bar"
              />
            </div>

            {/* List panel */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredStores.map((store) => {
                const isActive = activeStore.id === store.id;
                const distance = getComputedDistance(store);

                return (
                  <button
                    key={store.id}
                    onClick={() => onSelectStore(store)}
                    className={`w-full text-left p-4 rounded-xl border flex flex-col gap-2 transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-orange-950/20 border-[#FF4500]/50 shadow-md shadow-orange-500/1' 
                        : 'bg-zinc-900/60 border-zinc-850 hover:border-zinc-800'
                    }`}
                    id={`locator-item-${store.id}`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="text-left">
                        <h4 className="font-bold text-xs text-white leading-snug flex items-center gap-1.5">
                          <span>{store.name}</span>
                          {isActive && <span className="bg-[#FF4500] text-white text-[8px] uppercase px-1.5 py-0.5 rounded font-black font-sans">Active</span>}
                        </h4>
                        <p className="text-zinc-500 text-[10px] mt-0.5">{store.address}</p>
                      </div>
                      
                      {/* Distance tags */}
                      {distance ? (
                        <span className="text-[10px] font-bold text-amber-500 font-mono">{distance} miles</span>
                      ) : (
                        <span className="text-[10px] font-semibold text-zinc-500">NY Core Outpost</span>
                      )}
                    </div>

                    {/* Features row indicator tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {store.features.map((feat) => (
                        <span key={feat} className="bg-zinc-950 text-zinc-400 text-[8px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-850">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-xl mt-4 text-[11px] text-zinc-500 leading-normal">
            ℹ️ Selected pick-up locations are locked to your session and automatically compute localized tax rates and packaging details instantly.
          </div>
        </div>

        {/* Right Side: Beautiful interactive Manhattan Map mock canvas */}
        <div className="col-span-1 md:col-span-6 bg-zinc-900/30 p-6 flex flex-col justify-between items-center relative min-h-[380px]">
          
          <div className="text-center w-full pb-3 border-b border-zinc-900/80">
            <span className="text-[10px] text-amber-500 uppercase font-black tracking-widest block mb-0.5">Live Manhattan Vector Map</span>
            <span className="text-[9px] text-zinc-500 block">Click hot nodes directly to orient. Outer bounding coordinates lock Manhattan network.</span>
          </div>

          {/* Interactive mockup Map Canvas using absolute pins */}
          <div className="relative w-full max-w-[280px] h-72 border border-zinc-850 bg-zinc-950 rounded-2xl overflow-hidden shadow-inner my-3">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            {/* Map Roads / outlines drawings */}
            <div className="absolute top-0 bottom-0 left-[20%] w-1.5 bg-zinc-900/60 rotate-12" />
            <div className="absolute top-0 bottom-0 left-[60%] w-2 bg-zinc-900/60 rotate-12" />
            <div className="absolute top-[30%] left-0 right-0 h-1.5 bg-zinc-900/60 -rotate-6" />
            <div className="absolute top-[70%] left-0 right-0 h-2 bg-zinc-900/60 -rotate-3" />

            {/* Central Manhattan Central park divider */}
            <div className="absolute top-10 left-10 right-10 bottom-44 bg-green-950/20 border border-green-900/20 rounded-md flex items-center justify-center text-[8px] text-green-600/60 font-black tracking-wider">
              CENTRAL PARK RESV
            </div>

            {/* Nodes representation */}
            {stores.map((store) => {
              const isActive = activeStore.id === store.id;
              
              // Custom layout projection maps to manhattan
              let topVal = '65%';
              let leftVal = '50%';
              
              if (store.id === 'store-1') { topVal = '55%'; leftVal = '55%'; }
              if (store.id === 'store-2') { topVal = '40%'; leftVal = '60%'; }
              if (store.id === 'store-3') { topVal = '70%'; leftVal = '32%'; }
              if (store.id === 'store-4') { topVal = '85%'; leftVal = '42%'; }

              return (
                <button
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                  style={{ top: topVal, left: leftVal }}
                  id={`map-node-pin-${store.id}`}
                >
                  <div className="relative">
                    {/* Ring impulse */}
                    {isActive && (
                      <span className="animate-ping absolute -inset-2.5 rounded-full bg-red-500/40 opacity-75" />
                    )}

                    {/* Main target icon */}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-lg transition-all ${
                      isActive 
                        ? 'bg-[#FF4500] border-white text-white scale-125 z-20' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:scale-115'
                    }`}>
                      <MapPin className="w-4 h-4 text-current" />
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-300 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                      {store.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick info status block */}
          <div className="w-full bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 text-left space-y-1 text-xs">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-zinc-500 uppercase font-bold leading-none">Your Selected Hot Kitchen</span>
              <span className="text-green-500 font-bold font-mono">GRILLS ACTIVE</span>
            </div>
            <h4 className="font-extrabold text-white text-xs">{activeStore.name}</h4>
            <p className="text-zinc-550 text-[10px] leading-snug">{activeStore.address}</p>
            <div className="flex items-center gap-4 text-zinc-400 text-[10px] pt-1 leading-none">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-500" /> {activeStore.hours}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-zinc-500" /> {activeStore.phone}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
