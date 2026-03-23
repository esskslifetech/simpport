# Simple Portfolio

A modern, minimalist portfolio website built with React, TypeScript, and TailwindCSS. Features an immersive design with background video, smooth animations, and a clean interface showcasing personal information and social links.

## ✨ Features

- **Modern Design**: Clean, minimalist interface with glassmorphism effects
- **Background Video**: Ambient YouTube video integration with playback controls
- **Smooth Animations**: Built with Framer Motion for fluid transitions
- **Custom Cursor**: Beautiful animated cursor with hover effects and trail animation
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Click-to-enter experience with audio controls
- **Social Links**: Quick access to GitHub and LinkedIn profiles
- **Live Time Display**: Real-time clock in the header
- **Music Ticker**: Animated "Now Playing" section with vinyl record animation

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: TailwindCSS v4 with custom animations
- **Animations**: Framer Motion (motion library)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Video**: YouTube iframe integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will start at `http://localhost:3000`

### Building for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 🎯 Usage

1. **Enter the Portfolio**: Click anywhere on the initial screen to enter the main portfolio
2. **Audio Control**: Use the mute/unmute button in the top-right corner
3. **Social Links**: Click on the GitHub or LinkedIn icons to visit your profiles
4. **Custom Cursor**: Enjoy the animated cursor with hover effects on interactive elements
5. **Responsive**: The portfolio automatically adapts to different screen sizes

## 🎨 Customization

### Personal Information

Edit the following in `src/App.tsx`:

- **Name**: Change the display name and initials
- **Avatar**: Update the `picsum.photos` seed or replace with your image
- **Social Links**: Update GitHub and LinkedIn URLs
- **Bio**: Modify the quote and description text
- **Video**: Change the YouTube video ID for different background content

### Styling

- **Colors**: Modify TailwindCSS classes in `src/App.tsx`
- **Animations**: Adjust animation timings and effects
- **Layout**: Change component structure and positioning
- **Custom Cursor**: Customize cursor appearance in `src/index.css`:
  - Modify cursor size, colors, and glow effects
  - Adjust trail animation speed and delay
  - Change hover and click state animations

### Video Background

The background video uses YouTube's embed API. To change the video:

1. Find your desired YouTube video ID (the part after `v=` in the URL)
2. Update the `videoId` constant in `src/App.tsx`

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── App.tsx          # Main portfolio component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles and animations
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎬 Background Video

The portfolio features "Daft Punk - Give Life Back to Music (Drumless Edition)" as the ambient background video. The video:

- Auto-plays when entering the portfolio
- Is muted by default (user-controlled)
- Loops continuously
- Has playback speed set to 1.15x for enhanced energy

## �️ Custom Cursor

The portfolio includes a custom animated cursor with the following features:

- **Glassmorphism Design**: Circular cursor with glowing border and backdrop blur
- **Trail Animation**: Secondary element follows with delay for smooth motion
- **Interactive States**: 
  - Expands and glows when hovering over interactive elements
  - Shrinks slightly when clicking for feedback
  - Smooth transitions between states
- **Responsive Tracking**: Follows mouse movement with fluid animations
- **Customizable**: All styles can be modified in `src/index.css`

The cursor automatically applies to all interactive elements including buttons, links, and the click-to-enter screen.

## �🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Remove build artifacts
- `npm run lint` - Run TypeScript type checking

## 🌐 Deployment

### Static Hosting

The build output can be deployed to any static hosting service:

1. Run `npm run build`
2. Upload the `dist/` folder to your hosting provider

### Popular Hosting Options

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Cloudflare Pages**: Connect your repository for continuous deployment

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Performance

- Optimized build with Vite
- Lazy loading for optimal performance
- Minimal dependencies for faster loading
- Efficient animation using CSS transforms
- Responsive images and assets

---

**Created with ❤️ using React, TypeScript, and TailwindCSS**
