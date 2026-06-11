import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Flame, Check, HelpCircle, ArrowRight, Star, Sparkles, Trophy } from 'lucide-react';
import { LoyaltyMilestone, Product } from '../types';
import { LOYALTY_MILESTONES } from '../data';

interface LoyaltyHubProps {
  points: number;
  onAddPoints: (amount: number) => void;
  onDeductPoints: (amount: number) => void;
  onClaimRewardItem: (rewardProduct: Product) => void;
}

export default function LoyaltyHub({ points, onAddPoints, onDeductPoints, onClaimRewardItem }: LoyaltyHubProps) {
  const [activeQuizIndex, setActiveQuizIndex] = React.useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [quizSuccess, setQuizSuccess] = React.useState<boolean | null>(null);

  // Simple fun interactive trivia to add points
  const triviaQuestions = [
    {
      q: 'Which signature Burger King product translates to "something huge or extraordinary"?',
      opts: ['Big Mac', 'Whopper®', 'Chicken Royale', 'Bacon King'],
      ans: 'Whopper®'
    },
    {
      q: 'Under what continuous temperature process does a Master Grill brand our real 100% beef?',
      opts: ['Micorwave heater', 'Pan-fried butter', 'Continuous open flame-grill', 'Boiling water steam'],
      ans: 'Continuous open flame-grill'
    }
  ];

  const handleAnswerSelect = (opt: string) => {
    setSelectedAnswer(opt);
    const activeQuestion = triviaQuestions[activeQuizIndex || 0];
    if (opt === activeQuestion.ans) {
      setQuizSuccess(true);
      onAddPoints(100); // Add points!
    } else {
      setQuizSuccess(false);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizSuccess(null);
    setActiveQuizIndex(null);
  };

  // Claim points mapping to actual cart products
  const handleClaim = (milestone: LoyaltyMilestone) => {
    if (points >= milestone.pointsRequired) {
      onDeductPoints(milestone.pointsRequired);
      
      // Construct a free product
      let mappedImg = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400';
      if (milestone.id === 'milestone-1') mappedImg = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400';
      if (milestone.id === 'milestone-2') mappedImg = 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=400';

      const freeProduct: Product = {
        id: `claimed-${milestone.id}-${Date.now()}`,
        name: `🎁 FREE ${milestone.rewardName}`,
        description: `Claimed for ${milestone.pointsRequired} Royal Crowns! Zero-cost reward meal item.`,
        category: 'bundles',
        price: 0,
        image: mappedImg,
        tags: ['Rewards Privilege', 'Free'],
        ingredients: ['Signature ingredients'],
        nutrition: { calories: 350, protein: '12g', carbs: '45g', fat: '14g' }
      };

      onClaimRewardItem(freeProduct);
    }
  };

  // Find max required points to get progress percentage
  const maxPointsTarget = 750;
  const progressPercentage = Math.min((points / maxPointsTarget) * 100, 100);

  return (
    <section id="loyalty" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Visual background rings */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT PANEL: Progress tracker dashboard & trivia quiz */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold tracking-widest uppercase mb-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>MEMBERS PORTAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Royal Crowns <span className="text-amber-500">Loyalty Suite</span>
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                No plastic cards, no nonsense. Earn 10 points on every single dollar spent automatically. Accumulate and redeem free items.
              </p>
            </div>

            {/* Gamified Points HUD Dashboard */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute -top-3 -right-3 text-7xl font-bold font-mono text-zinc-950 select-none">CROWN</div>

              <div className="flex items-center justify-between relative z-10">
                <div className="text-left">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-wider leading-none">Your Rank</p>
                  <p className="text-lg font-black text-white mt-1 flex items-center gap-1.5">
                    👑 Lvl 2 Premium Duke <span className="bg-amber-500 text-black text-[9px] font-black uppercase px-1.5 py-0.5 rounded">Active</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-wider leading-none">Live Points Balance</p>
                  <p className="text-3xl font-black text-amber-500 font-mono mt-1">{points} pts</p>
                </div>
              </div>

              {/* Progress Bar with markers */}
              <div className="mt-8 space-y-2 relative z-10">
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>0 pts (Initiate)</span>
                  <span>750 pts (King Feast)</span>
                </div>
                <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-850 p-px">
                  <div 
                    className="bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500 h-full rounded-full transition-all duration-1000 shadow-md shadow-amber-500/10" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500">
                  <span>Next major landmark: Whopper (500 pts)</span>
                  <span>{Math.max(0, 500 - points)} pts left</span>
                </div>
              </div>

              {/* Points Simulator triggers for demo testing */}
              <div className="mt-6 pt-5 border-t border-zinc-850 flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Need testing crowns?</p>
                  <p className="text-[10px] text-zinc-400">Claim 100 immediate testing points below instantly.</p>
                </div>
                <button
                  onClick={() => onAddPoints(100)}
                  className="bg-zinc-800 hover:bg-zinc-750 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors border border-zinc-700/60"
                  id="btn-add-dummy-points"
                >
                  💳 Insert +100pts
                </button>
              </div>
            </div>

            {/* Interactive Crown Trivia Quiz game block */}
            <div className="bg-zinc-900/50 border border-zinc-850/70 p-5 rounded-2xl">
              <AnimatePresence mode="wait">
                {activeQuizIndex === null ? (
                  <div className="text-left flex items-start gap-4" id="quiz-intro">
                    <span className="text-3xl">🧠</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Fast Trivia: Earn +100 Points!</h4>
                      <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Answer our signature flame question correctly to win raw points mapped to free food items!</p>
                      <button 
                        onClick={() => {
                          setActiveQuizIndex(Math.floor(Math.random() * triviaQuestions.length));
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl mt-3 flex items-center gap-1.5 transition-all"
                        id="btn-play-trivia"
                      >
                        <span>Start Flame Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-left"
                    id="quiz-active-block"
                  >
                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-wider mb-1">CROWN REWARDS TACTICAL QUIZ</p>
                    <h4 className="text-xs font-extrabold text-white mb-3">
                      {triviaQuestions[activeQuizIndex].q}
                    </h4>

                    {selectedAnswer === null ? (
                      <div className="space-y-1.5">
                        {triviaQuestions[activeQuizIndex].opts.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSelect(opt)}
                            className="w-full text-left bg-zinc-950 hover:bg-zinc-800 border border-zinc-850 text-zinc-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xxs transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {quizSuccess ? (
                          <div className="bg-green-950/40 border border-green-500/20 text-green-400 text-xxs px-3 py-2.5 rounded-xl leading-relaxed">
                            🎉 <strong>CORRECT!</strong> You scored 100 extra points directly added to your Duke account. Redeeming is now open!
                          </div>
                        ) : (
                          <div className="bg-red-950/40 border border-red-500/20 text-red-400 text-xxs px-3 py-2.5 rounded-xl leading-relaxed">
                            ❌ <strong>WRONG ANSWER!</strong> No points awarded. Practice your flame-grilled knowledge and retry.
                          </div>
                        )}
                        <button 
                          onClick={handleNextQuiz}
                          className="bg-zinc-800 hover:bg-zinc-750 text-white font-bold text-xxs py-2 px-4 rounded-lg"
                        >
                          Finish Quiz
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* RIGHT PANEL: Landmark milestones with direct points claiming! */}
          <div className="col-span-1 lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-400">Available Milestone Redemptions</h3>
            
            <div className="space-y-3" id="loyalty-milestones-list">
              {LOYALTY_MILESTONES.map((milestone) => {
                const canClaim = points >= milestone.pointsRequired;

                return (
                  <div 
                    key={milestone.id}
                    className={`bg-zinc-900 border rounded-2xl p-4 flex items-center justify-between transition-colors ${
                      canClaim 
                        ? 'border-amber-500/20 shadow-md shadow-amber-500/2' 
                        : 'border-zinc-850'
                    }`}
                    id={`milestone-card-${milestone.id}`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-3xl bg-zinc-950 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800">
                        {milestone.image}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs text-white leading-snug">{milestone.rewardName}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${canClaim ? 'bg-amber-500 text-black font-black' : 'bg-zinc-950 text-zinc-550'}`}>
                            {milestone.pointsRequired} pts
                          </span>
                        </div>
                        <p className="text-zinc-500 text-[10px] mt-0.5 leading-snug">{milestone.rewardDescription}</p>
                      </div>
                    </div>

                    <button
                      disabled={!canClaim}
                      onClick={() => handleClaim(milestone)}
                      className={`text-[9px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                        canClaim
                          ? 'bg-amber-500 hover:bg-amber-400 text-black font-black'
                          : 'bg-zinc-950 text-zinc-550 border border-zinc-850 cursor-not-allowed'
                      }`}
                      id={`btn-redeem-${milestone.id}`}
                    >
                      {canClaim ? 'Redeem Free ✓' : 'Locked'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
