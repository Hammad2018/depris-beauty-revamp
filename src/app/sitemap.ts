import type { MetadataRoute } from "next";
import { getCommerce } from "@/lib/commerce";
import { slugify } from "@/lib/slug";
import { site, blogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const commerce = getCommerce();
  const [products, collections] = await Promise.all([commerce.getProducts(), commerce.getCollections()]);

  const staticRoutes = ["", "/shop", "/quiz", "/bundles", "/science", "/about", "/brands", "/blog", "/contact"].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date() }),
  );

  const productRoutes = products.map((p) => ({ url: `${base}/products/${p.handle}`, lastModified: new Date() }));
  const collectionRoutes = collections.map((c) => ({ url: `${base}/collections/${c.handle}`, lastModified: new Date() }));
  const brandRoutes = Array.from(new Set(products.map((p) => slugify(p.brand)))).map((h) => ({
    url: `${base}/brands/${h}`,
    lastModified: new Date(),
  }));
  const blogRoutes = blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...brandRoutes, ...blogRoutes];
}
