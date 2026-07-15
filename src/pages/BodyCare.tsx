import { CollectionPage } from "@/components/CollectionPage";
import { bodyCareConfig } from "@/config/collectionPages";

/**
 * Body Care collection page. All filtering/sorting/pagination logic and
 * the page layout live in CollectionPage.tsx -- this file only supplies
 * this collection's identity (Shopify handle, copy, hero icon). See
 * src/config/collectionPages.ts for what bodyCareConfig contains.
 */
const BodyCare = () => <CollectionPage config={bodyCareConfig} />;

export default BodyCare;