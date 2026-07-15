import { CollectionPage } from "@/components/CollectionPage";
import { fragranceConfig } from "@/config/collectionPages";

/**
 * Fragrance collection page. All filtering/sorting/pagination logic and
 * the page layout live in CollectionPage.tsx -- this file only supplies
 * this collection's identity (Shopify handle, copy, hero icon). See
 * src/config/collectionPages.ts for what fragranceConfig contains.
 */
const Fragrance = () => <CollectionPage config={fragranceConfig} />;

export default Fragrance;