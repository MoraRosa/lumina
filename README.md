# 🌸 Lumina Skincare

A beautiful, kawaii-styled landing page for Lumina Skincare - gentle, fragrance-free skincare products designed for sensitive skin. Built with modern web technologies and ready to deploy to GitHub Pages.

## ✨ Live Demo

🔗 **[View Live Site](#)** _(Add your GitHub Pages URL here after deployment)_

## 🎨 Features

- 🎀 **Kawaii Design System** - Soft pastel colors (pink, green, purple) with rounded edges
- 📱 **Fully Responsive** - Beautiful on all devices
- 🛍️ **Full E-commerce** - Complete Shopify integration with cart, checkout, and products
- 🛒 **Shopping Cart** - Functional cart drawer with add/remove/update quantity
- 📦 **Product Pages** - Dynamic product listing and detail pages
- 💳 **Secure Checkout** - Seamless redirect to Shopify checkout
- 💌 **Newsletter Signup** - Collect customer emails with validation
- 🎨 **Custom SVG Edge Separators** - Scalloped, zigzag, and multi-scallop transitions
- ⚡ **Fast & Modern** - Built with Vite and React with optimized caching
- ♿ **Accessible** - Semantic HTML and ARIA labels

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router DOM
- **State Management:** Zustand (shopping cart with persistence)
- **Data Fetching:** TanStack React Query (with caching)
- **E-commerce:** Shopify Storefront API (headless architecture)
- **API Client:** @shopify/hydrogen-react
- **Form Handling:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
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
     base: "/lumina-skincare/", // Replace with your actual repo name
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
│       └── deploy.yml              # GitHub Actions CI/CD
├── src/
│   ├── components/
│   │   ├── edges/                  # SVG edge separators
│   │   │   ├── ScallopedEdge.tsx
│   │   │   ├── ZigzagEdge.tsx
│   │   │   └── MultiScallopEdge.tsx
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── CartDrawer.tsx          # Shopping cart drawer
│   │   ├── ProductCard.tsx         # Product card component
│   │   ├── ProductGrid.tsx         # Product grid layout
│   │   ├── Navbar.tsx              # Top navigation
│   │   ├── NavLink.tsx             # Navigation link component
│   │   └── Footer.tsx              # Footer with newsletter
│   ├── pages/
│   │   ├── Index.tsx               # Landing page
│   │   ├── ProductListing.tsx      # Products page
│   │   ├── ProductDetail.tsx       # Product detail page
│   │   └── NotFound.tsx            # 404 page
│   ├── hooks/
│   │   ├── useProducts.ts          # Fetch products from Shopify
│   │   ├── useProduct.ts           # Fetch single product
│   │   └── useShopifyCart.ts       # Shopify cart operations
│   ├── stores/
│   │   └── cartStore.ts            # Zustand cart state
│   ├── lib/
│   │   ├── shopify.ts              # Shopify API client & queries
│   │   └── utils.ts                # Utility functions
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles + design system
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── vite.config.ts                  # Vite configuration
├── tailwind.config.ts              # Tailwind + design system
├── package.json                    # Dependencies and scripts
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

## 🛍️ Shopify Integration

Lumina uses a **headless Shopify architecture** where the React frontend handles the UI/UX while Shopify manages all backend operations (products, inventory, payments, orders, shipping, taxes).

### ✅ Implemented Features

- ✅ **Shopping Cart Drawer** - Fully functional cart with add/remove/update quantity
- ✅ **Product Card Component** - Reusable product display with images, pricing, and add to cart
- ✅ **Product Grid** - Responsive grid layout for product listings
- ✅ **Product Detail Pages** - Full product pages with image gallery, variants, and quantity selector
- ✅ **Shopify Storefront API Integration** - GraphQL client for fetching products and creating carts
- ✅ **Checkout Redirect** - Seamless redirect to Shopify checkout
- ✅ **React Query Hooks** - Optimized data fetching with caching
- ✅ **Cart State Management** - Zustand store with localStorage persistence

### 🔧 Setup Instructions

#### 1. Create a Shopify Store

If you don't have a Shopify store yet:

1. Go to [shopify.com](https://www.shopify.com)
2. Sign up for a free trial or paid plan
3. Set up your store with products

#### 2. Get Shopify API Credentials

1. In your Shopify Admin, go to **Settings** → **Apps and sales channels**
2. Click **Develop apps**
3. Click **Create an app** (e.g., "Lumina Frontend")
4. Go to **Configuration** tab
5. Under **Storefront API**, click **Configure**
6. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
7. Click **Save**
8. Go to **API credentials** tab
9. Click **Install app**
10. Copy the **Storefront API access token** (starts with `shpat_`)

#### 3. Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Shopify credentials:

   ```env
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
   VITE_SHOPIFY_API_VERSION=2024-10
   ```

3. **Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

#### 4. Test the Integration

```bash
# Start the development server
npm run dev

# Visit http://localhost:8080
# You should see your Shopify products on the homepage and /products page
```

### 📚 API Documentation

The integration uses the following custom hooks:

#### `useProducts(limit?: number)`

Fetches products from Shopify with React Query caching.

```typescript
import { useProducts } from "@/hooks/useProducts";

const { data: products, isLoading } = useProducts(20);
```

#### `useProduct(handle: string)`

Fetches a single product by handle with all variants.

```typescript
import { useProduct } from "@/hooks/useProduct";

const { data: product, isLoading } = useProduct("moisturizer");
```

#### `useSyncCartWithShopify()`

Syncs local cart with Shopify and returns checkout URL.

```typescript
import { useSyncCartWithShopify } from "@/hooks/useShopifyCart";

const { syncAndCheckout } = useSyncCartWithShopify();
const checkoutUrl = await syncAndCheckout();
```

### 🏗️ Architecture

```
┌─────────────────────────────────────┐
│   React Frontend (Lumina)           │
│   - Custom design/branding          │
│   - Product display                 │
│   - Cart UI                         │
│   - Customer experience             │
└──────────────┬──────────────────────┘
               │
               │ Shopify Storefront API
               │ (GraphQL)
               │
┌──────────────▼──────────────────────┐
│   Shopify Backend                   │
│   ✅ Product catalog                │
│   ✅ Inventory management           │
│   ✅ Payment processing             │
│   ✅ Order management               │
│   ✅ Customer accounts              │
│   ✅ Shipping calculations          │
│   ✅ Tax calculations               │
│   ✅ Email notifications            │
└─────────────────────────────────────┘
```

### 🔐 Security Notes

- The **Storefront API access token** is safe to expose in frontend code
- It only allows read access to public product data and cart creation
- Never use the **Admin API** token in frontend code
- All payment processing happens securely on Shopify's servers

### 🚀 Deployment with Shopify

When deploying to production (GitHub Pages):

1. Add environment variables to GitHub Secrets:

   - Go to your repo → **Settings** → **Secrets and variables** → **Actions**
   - Add secrets:
     - `VITE_SHOPIFY_STORE_DOMAIN`
     - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
     - `VITE_SHOPIFY_API_VERSION`

2. Update `.github/workflows/deploy.yml` to use secrets:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_SHOPIFY_STORE_DOMAIN: ${{ secrets.VITE_SHOPIFY_STORE_DOMAIN }}
       VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
       VITE_SHOPIFY_API_VERSION: ${{ secrets.VITE_SHOPIFY_API_VERSION }}
   ```

### 📦 Future Enhancements

- [ ] Product filtering and search
- [ ] Product collections/categories
- [ ] Customer reviews integration
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Multi-currency support
- [ ] Inventory status indicators

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

- [ ] Product filtering and search
- [ ] Product collections/categories
- [ ] Customer reviews integration
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Multi-currency support
- [ ] Inventory status indicators
- [ ] Create blog for skincare tips
- [ ] Customer account pages
- [ ] Live chat support
- [ ] Product comparison feature
- [ ] Size guide modal

## 🤝 Contributing

This is a commercial project. For questions or collaboration opportunities, please contact the project owner.

## 📄 License

© 2025 Lumina Skincare. All rights reserved.

## 🙏 Credits

- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Framework:** [React](https://react.dev) + [Vite](https://vitejs.dev)

---

Made with 💖 by Lumina Skincare
