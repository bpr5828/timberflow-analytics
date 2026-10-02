# TimberFlow Analytics

A high-performance, clean, and elegant React single-page application (SPA) serving as a unified Operations & Financial Intelligence Platform for timber and industrial wood products manufacturing.

## Tech Stack
* **React 18+** with **Tailwind CSS**
* **Lucide React** for icons
* **Recharts** for rich analytics
* **@mlc-ai/web-llm** for AI chat capabilities

## Build and Run Locally

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the local server, typically at `http://localhost:5173`.

3. **Build for Production**
   ```bash
   npm run build
   ```
   The production-ready files will be generated in the `dist` directory.

## Deploy to Vercel

Vercel is the easiest way to deploy this React/Vite application.

### Method 1: Using the Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm i -g vercel
   ```

2. **Run Vercel deployment:**
   ```bash
   vercel
   ```
   - Log in when prompted.
   - Set up and deploy `~/Development/Lumber/Prototype`.
   - Choose `N` (No) when asked to link to an existing project.
   - Leave the default settings for "Build Command" and "Output Directory" (Vite is automatically detected).

3. **Deploy to Production:**
   Once you're happy with the preview, run:
   ```bash
   vercel --prod
   ```

### Method 2: Using the Vercel Dashboard

1. Push this code to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import your repository.
4. Vercel will automatically detect that this is a Vite project. Leave the Build Command and Output Directory as their defaults.
5. Click **Deploy**.

## Mock Data Structure

The application uses mock datasets simulating real-world timber operations (e.g., SYP, board feet processed, piece-rate logistics) under the `/src/data/` directory.

- `masterData.js`: Global configuration for the 5 primary operating entities.
- `operationsData.js`: Timber ops and piece-rate metrics.
- `financialsData.js`: Revenue, margins, and payroll metrics.
