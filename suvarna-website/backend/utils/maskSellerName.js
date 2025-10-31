/**
 * Generate a masked name for sellers
 * Format: Seller-XXXXXX where XXXXXX is first 6 chars of UUID
 */
export function maskSellerName(sellerId) {
  const maskedId = sellerId.substring(0, 6).toUpperCase();
  return `Seller-${maskedId}`;
}

