/**
 * @file vite.config.ts
 * @description Vite build configuration for Bloom & Petal Nepal React app.
 * 
 * VITE:
 * - Modern build tool for fast development and optimized production builds
 * - Uses native ES modules during development (instant HMR)
 * - Bundles code with Rollup for production
 * - Zero-config by default, fully customizable
 * 
 * CONFIGURATION OVERVIEW:
 * - Development server on port 3000
 * - React Fast Refresh for hot module replacement
 * - Environment variable loading (.env files)
 * - Path aliases for cleaner imports
 * - API key configuration for Google Generative AI
 * 
 * USAGE:
 * - npm run dev    → Start dev server with HMR
 * - npm run build  → Build for production
 * - npm run preview → Preview production build locally
 * 
 * @author Bloom & Petal Nepal Team
 * @version 1.0
 */

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * 
 * defineConfig() provides TypeScript autocomplete for IDE support
 * The callback receives { command, mode } for conditional configuration
 * 
 * MODES:
 * - development: npm run dev
 * - production: npm run build
 * - Can define custom modes as needed
 */
export default defineConfig(({ mode }) => {
    // Load environment variables from .env files
    // Variables must start with VITE_ to be exposed to client code
    const env = loadEnv(mode, '.', '');
    
    return {
      // ===== SERVER CONFIGURATION =====
      // Dev server settings (npm run dev)
      server: {
        port: 3000,           // Port to run dev server on
        host: '0.0.0.0',      // Allow access from any IP (Docker-friendly)
      },

      // ===== PLUGINS =====
      // React Fast Refresh plugin for instant HMR
      plugins: [react()],

      // ===== ENVIRONMENT VARIABLES =====
      // Define global variables available in client code
      // These are compile-time replacements
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },

      // ===== MODULE RESOLUTION =====
      // Path aliases for cleaner imports
      resolve: {
        alias: {
          // Allows: import { something } from '@/components/Component'
          // Instead of: import { something } from '../../components/Component'
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
