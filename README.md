# 🌸 Lumina Skincare

A beautiful, kawaii-styled landing page for Lumina Skincare - gentle, fragrance-free skincare products designed for sensitive skin. Built with modern web technologies and ready to deploy to GitHub Pages.

## ✨ Live Demo

🔗 **[View Live Site](#)** _(Add your GitHub Pages URL here after deployment)_

## 🎨 Features

- 🎀 **Kawaii Design System** - Soft pastel colors (pink, green, purple) with rounded edges
- 📱 **Fully Responsive** - Beautiful on all devices
- 💌 **Newsletter Signup** - Collect customer emails with validation
- 🎨 **Custom SVG Edge Separators** - Scalloped, zigzag, and multi-scallop transitions
- 🛍️ **Shopify Ready** - Prepared for product integration
- ⚡ **Fast & Modern** - Built with Vite and React
- ♿ **Accessible** - Semantic HTML and ARIA labels

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui
- **Form Handling:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
- **State Management:** Zustand (for shopping cart)
- **Deployment:** GitHub Pages with GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd lumina-skincare

# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:8080
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run deploy       # Deploy to GitHub Pages (manual)
```

## 🌐 GitHub Pages Deployment

### Initial Setup (One-time)

1. **Create a new GitHub repository**
   ```bash
   # Example: lumina-skincare
   ```

2. **Update the base path in `vite.config.ts`**
   ```typescript
   export default defineConfig(({ mode }) => ({
     base: '/lumina-skincare/', // Replace with your actual repo name
     // ... rest of config
   }));
   ```

3. **Push your code to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

### Deployment Methods

#### Option 1: Automatic Deployment (Recommended)

Every push to the `main` branch automatically triggers a deployment via GitHub Actions.

✅ **Benefits:**
- Fully automated
- No manual intervention needed
- Deploys latest changes instantly
- View deployment status in the **Actions** tab

#### Option 2: Manual Deployment

```bash
npm run deploy
```

This command:
1. Builds your project (`npm run build`)
2. Creates/updates the `gh-pages` branch
3. Pushes the `dist` folder to GitHub Pages

### Verify Deployment

After deployment (5-10 minutes), your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## 📁 Project Structure

```
lumina-skincare/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── src/
│   ├── components/
│   │   ├── edges/              # SVG edge separators
│   │   │   ├── ScallopedEdge.tsx
│   │   │   ├── ZigzagEdge.tsx
│   │   │   └── MultiScallopEdge.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Navbar.tsx          # Top navigation
│   │   ├── NavLink.tsx         # Navigation link component
│   │   └── Footer.tsx          # Footer with newsletter
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   └── NotFound.tsx        # 404 page
│   ├── stores/
│   │   └── cartStore.ts        # Zustand cart state (for Shopify)
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles + design system
├── public/                     # Static assets
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind + design system
├── package.json                # Dependencies and scripts
└── README.md
```

## 🎨 Design System

### Color Palette
```css
--pastel-pink: 340 100% 85%     /* #FFB3D9 */
--pastel-green: 145 60% 80%     /* #A3E4BD */
--pastel-purple: 270 60% 85%    /* #D4B3FF */
```

### Design Philosophy
- **Kawaii Aesthetic:** Soft, cute, and approachable
- **Rounded Edges:** All components use `--radius: 1.5rem`
- **Pastel Colors:** Gentle on the eyes, perfect for skincare
- **Semantic Tokens:** All colors defined in `index.css` and referenced via CSS variables

### Typography
- System fonts with clean, modern aesthetic
- Clear hierarchy with responsive font sizes

### Target Demographic
18-35 year olds interested in gentle, sensitive skincare

## 💌 Newsletter Signup

### Current Implementation
- Email validation using Zod schema
- Stores emails in browser localStorage
- Toast notifications for success/error states
- Duplicate email detection

### Future Implementation
Will be connected to Shopify customer list once store is integrated.

## 🛍️ Shopify Integration (Coming Soon)

The site is prepared for Shopify integration with:
- Cart state management (Zustand)
- Product display section placeholder
- Shopping cart drawer (to be implemented)

### Planned Features
- Dynamic product catalog
- Add to cart functionality
- Shopping cart drawer
- Checkout integration
- Product detail pages
- Customer reviews

## 🐛 Troubleshooting

### Build Errors

**Problem:** Build fails with dependency errors
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Build fails with TypeScript errors
```bash
# Solution: Check TypeScript version
npm run build
# Review errors and fix type issues
```

### GitHub Pages Issues

**Problem:** 404 error after deployment
- ✅ Verify `base` path in `vite.config.ts` matches your repo name
- ✅ Check if GitHub Pages is enabled in repository Settings
- ✅ Ensure GitHub Actions workflow completed successfully
- ✅ Wait 5-10 minutes after first deployment

**Problem:** Styles not loading
- ✅ Verify `base` configuration includes trailing slash
- ✅ Check browser console for 404 errors on assets
- ✅ Clear browser cache and hard reload

**Problem:** GitHub Actions workflow fails
- ✅ Check Actions tab for error messages
- ✅ Verify Node.js version in workflow matches local version
- ✅ Ensure `npm ci` can install all dependencies

### Local Development Issues

**Problem:** Port 8080 already in use
```bash
# Solution: Change port in vite.config.ts or kill existing process
lsof -ti:8080 | xargs kill -9
```

**Problem:** Hot reload not working
```bash
# Solution: Restart dev server
npm run dev
```

## 📝 Future Enhancements

- [ ] Connect Shopify store
- [ ] Add product detail pages
- [ ] Implement shopping cart drawer
- [ ] Add customer reviews section
- [ ] Create blog for skincare tips
- [ ] Add search functionality
- [ ] Implement product filtering
- [ ] Add wishlist feature
- [ ] Create customer account pages
- [ ] Add live chat support

## 🤝 Contributing

This is a commercial project. For questions or collaboration opportunities, please contact the project owner.

## 📄 License

© 2025 Lumina Skincare. All rights reserved.

## 🙏 Credits

- **Built with:** [Lovable](https://lovable.dev)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)

---

Made with 💖 by Lumina Skincare
