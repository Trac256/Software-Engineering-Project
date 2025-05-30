import { Listing, Owner, Apartment } from '../models';

export class ListingService {
  private listings = new Map<string, Listing>();

  /** Owner creates a listing for a given apartment */
  createListing(owner: Owner, apt: Apartment, data: {
    title: string;
    description: string;
    price: number;
    minStay: number;
    maxStay: number;
    images?: string[];
  }): Listing {
    const listing = owner.createListing();
    listing.apartment = apt;
    listing.title = data.title;
    listing.description = data.description;
    listing.price = data.price;
    listing.minStay = data.minStay;
    listing.maxStay = data.maxStay;
    listing.images = data.images || [];
    listing.status = 'draft';
    this.listings.set(listing.listingId, listing);
    console.log(`Listing ${listing.listingId} created by Owner ${owner.ownerId}`);
    return listing;
  }

  /** Publish a draft listing */
  publish(listingId: string): void {
    const l = this.get(listingId);
    l.publish();
    console.log(`Listing ${listingId} published`);
  }

  /** Edit any fields on an existing listing */
  edit(listingId: string, updates: Partial<{
    title: string;
    description: string;
    price: number;
    minStay: number;
    maxStay: number;
    images: string[];
  }>): void {
    const l = this.get(listingId);
    l.edit(updates as any);
    console.log(`Listing ${listingId} edited`);
  }

  hide(listingId: string): void {
    this.get(listingId).hide();
  }

  delete(listingId: string): void {
    this.get(listingId).delete();
    this.listings.delete(listingId);
    console.log(`Listing ${listingId} deleted`);
  }

  get(listingId: string): Listing {
    const l = this.listings.get(listingId);
    if (!l) throw new Error(`Listing ${listingId} not found`);
    return l;
  }

  findAll(): Listing[] {
    return Array.from(this.listings.values());
  }
}
