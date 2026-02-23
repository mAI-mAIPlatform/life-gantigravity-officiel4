import './style.css';
import { GameEngine } from './engine/GameEngine';
import { Store } from './ui/Store';
import { LifePass } from './ui/LifePass';
import { Settings } from './ui/Settings';
import { CreditsStore } from './ui/CreditsStore';
import { InventaireUI } from './ui/InventaireUI';
import { InventoryManager } from './core/InventoryManager';

// Smartphone Imports
import { Smartphone } from './ui/smartphone/Smartphone';
import { SmartphoneUI } from './ui/smartphone/SmartphoneUI';
import { BankApp } from './ui/smartphone/apps/BankApp';
import { ClockApp } from './ui/smartphone/apps/ClockApp';
import { MapApp } from './ui/smartphone/apps/MapApp';
import { JobsApp } from './ui/smartphone/apps/JobsApp';
import { NewsApp } from './ui/smartphone/apps/NewsApp';
import { NeoHitsApp } from './ui/smartphone/apps/NeoHitsApp';
import { SettingsApp } from './ui/smartphone/apps/SettingsApp';
import { StoreApp } from './ui/smartphone/apps/StoreApp';
import { VibsApp } from './ui/smartphone/apps/VibsApp';

/**
 * Global UI Helper
 */
window.toggleOverlay = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('hidden');
    el.classList.toggle('flex');
  }
};

/**
 * Main Application Hub
 */
class LifeApp {
  constructor() {
    this.engine = null;
    this.uiModules = {};
    this.ui = {
      menu: document.getElementById('main-menu'),
      startBtn: document.getElementById('start-game'),
      loadingScreen: document.getElementById('loading-screen')
    };

    this.init();
  }

  init() {
    console.log('Life App Initializing...');

    // Initialize 3D Engine
    this.engine = new GameEngine('canvas-container');

    // Initialize UI Modules
    this.uiModules.store = new Store(this.engine.economy);
    this.uiModules.lifepass = new LifePass();
    this.uiModules.settings = new Settings();
    this.uiModules.credits = new CreditsStore();

    // Smartphone Integration
    this.smartphone = new Smartphone();
    this.smartphoneUI = new SmartphoneUI(this.smartphone);

    // Register Apps
    this.smartphone.registerApp('Bank', new BankApp());
    this.smartphone.registerApp('Clock', new ClockApp());
    this.smartphone.registerApp('Map', new MapApp());
    this.smartphone.registerApp('Jobs', new JobsApp());
    this.smartphone.registerApp('News', new NewsApp());
    this.smartphone.registerApp('NeoHits', new NeoHitsApp());
    this.smartphone.registerApp('Settings', new SettingsApp());
    this.smartphone.registerApp('Store', new StoreApp());
    this.smartphone.registerApp('Vibs', new VibsApp());

    // Connect Inventory
    this.inventoryManager = new InventoryManager();
    this.uiModules.inventory = new InventaireUI(this.inventoryManager);

    // Bind UI Events
    this.ui.startBtn.addEventListener('click', () => this.startGame());

    // Home Phone Button
    const phoneBtn = document.getElementById('home-phone-btn');
    if (phoneBtn) {
      phoneBtn.addEventListener('click', () => this.smartphone.toggle());
    }

    // Global Keyboard Controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyI') this.uiModules.inventory.toggle();
      if (e.code === 'KeyP') this.smartphone.toggle(); // P for Phone
      if (e.code === 'Escape') {
        if (this.smartphone.isOpen) {
          this.smartphone.toggle();
        } else {
          this.closeAllOverlays();
        }
      }
    });

    // NPC Dialogue Listener
    window.addEventListener('npc-dialogue', (e) => this.showDialogue(e.detail.text));

    window.addEventListener('load', () => {
      console.log('Life Platform Ready.');
    });
  }

  closeAllOverlays() {
    Object.values(this.uiModules).forEach(mod => {
      if (mod.isOpen) mod.toggle();
    });
  }

  showDialogue(text) {
    const diag = document.createElement('div');
    diag.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl p-6 rounded-lg border border-accent/50 animate-fade-in text-white text-sm z-50 shadow-[0_0_30px_rgba(0,255,136,0.2)] max-w-md text-center italic';
    diag.textContent = text;
    document.body.appendChild(diag);
    setTimeout(() => {
      diag.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
      setTimeout(() => diag.remove(), 1000);
    }, 3000);
  }

  startGame() {
    console.log('Game Started');
    this.ui.menu.classList.add('opacity-0');
    setTimeout(() => {
      this.ui.menu.classList.add('hidden');
      this.showLoading();
    }, 500);
  }

  showLoading() {
    this.ui.loadingScreen.classList.remove('hidden');
    this.engine.loadWorld().then(() => {
      console.log('World Assets Loaded.');
      this.finishLoading();
    }).catch(err => {
      console.error('Failed to load world:', err);
    });
  }

  finishLoading() {
    const bar = document.getElementById('loading-bar');
    if (bar) bar.style.width = '100%';

    setTimeout(() => {
      this.ui.loadingScreen.classList.add('opacity-0');
      setTimeout(() => {
        this.ui.loadingScreen.classList.add('hidden');
        console.log('Life: NeoCity Rendered.');
      }, 500);
    }, 800);
  }
}

// Global instance for debugging
window.app = new LifeApp();
