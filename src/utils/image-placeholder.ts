// Utility to generate placeholder images with product names
export const generatePlaceholderImage = (productName: string, width: number = 300, height: number = 300): string => {
  // Create a simple SVG placeholder with the product name
  const svgString = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#6e7e91" />
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${productName}
      </text>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">
        Premium Quality
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
};

// Mapping of product names to placeholder images using external service
export const productPlaceholders: Record<string, string> = {
  'silk-evening-gown.jpg': generatePlaceholderImage('Silk Evening Gown'),
  'cashmere-sweater.jpg': generatePlaceholderImage('Cashmere Sweater'),
  'leather-jacket.jpg': generatePlaceholderImage('Leather Jacket'),
  'linen-suit.jpg': generatePlaceholderImage('Linen Suit'),
  'velvet-blazer.jpg': generatePlaceholderImage('Velvet Blazer'),
  'wool-coat.jpg': generatePlaceholderImage('Wool Coat'),
  'evening-wear.jpg': generatePlaceholderImage('Evening Wear Collection'),
  'winter-collection.jpg': generatePlaceholderImage('Winter Collection'),
  'business-attire.jpg': generatePlaceholderImage('Business Attire'),
  'summer-luxe.jpg': generatePlaceholderImage('Summer Luxe'),
  'limited-tuxedo.jpg': generatePlaceholderImage('Limited Edition Tuxedo'),
  'limited-boots.jpg': generatePlaceholderImage('Artisanal Leather Boots'),
  'limited-scarf.jpg': generatePlaceholderImage('Silk Scarf Collection')
};

// Alternative placeholder service URLs for real images
export const alternativePlaceholders: Record<string, string> = {
  'silk-evening-gown.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Silk+Evening+Gown',
  'cashmere-sweater.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Cashmere+Sweater',
  'leather-jacket.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Leather+Jacket',
  'linen-suit.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Linen+Suit',
  'velvet-blazer.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Velvet+Blazer',
  'wool-coat.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Wool+Coat',
  'evening-wear.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Evening+Wear',
  'winter-collection.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Winter+Collection',
  'business-attire.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Business+Attire',
  'summer-luxe.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Summer+Luxe',
  'limited-tuxedo.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Limited+Tuxedo',
  'limited-boots.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Leather+Boots',
  'limited-scarf.jpg': 'https://placehold.co/600x800/6e7e91/FFFFFF?text=Silk+Scarf'
};