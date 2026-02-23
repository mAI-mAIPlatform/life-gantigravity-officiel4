/**
 * NeoHits App : Radio numérique.
 */
export class NeoHitsApp {
    render() {
        return `
            <div class="mt-4 text-center">
                <div class="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center mb-6">
                    <div class="text-5xl animate-pulse">🎵</div>
                </div>
                
                <h3 class="text-lg font-bold mb-1">SynthWave FM</h3>
                <p class="text-[10px] text-white/50 mb-8 uppercase tracking-widest">Digital Radio 102.4</p>

                <div class="flex justify-center gap-8 items-center mb-10">
                    <button class="text-2xl opacity-50">⏮</button>
                    <button class="w-16 h-16 bg-white rounded-full text-black flex items-center justify-center text-3xl shadow-lg">▶</button>
                    <button class="text-2xl opacity-50">⏭</button>
                </div>

                <div class="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div class="w-1/3 h-full bg-white transition-all duration-1000"></div>
                </div>
                <div class="flex justify-between text-[8px] mt-2 text-white/40">
                    <span>1:24</span>
                    <span>3:45</span>
                </div>
            </div>
        `;
    }
}
