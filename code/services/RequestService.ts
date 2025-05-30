// src/services/RequestService.ts
import { CoLivingRequest, Listing, Student } from '../models';

export class RequestService {
  private requests = new Map<string, CoLivingRequest>();

  submitRequest(
    requestId: string,
    listing: Listing,
    requester: Student,
    message: string
  ): CoLivingRequest {
    const r = new CoLivingRequest(
      requestId,
      'pending',
      message,
      new Date()
    );
    r.submit();
    r.requester = requester;
    r.listing = listing;
    this.requests.set(r.requestId, r);
    return r;
  }

  approve(requestId: string): void {
    const r = this.get(requestId);
    r.approve();
  }

  reject(requestId: string): void {
    const r = this.get(requestId);
    r.reject();
  }

  get(requestId: string): CoLivingRequest {
    const r = this.requests.get(requestId);
    if (!r) throw new Error('Request not found');
    return r;
  }

  getByListing(listingId: string): CoLivingRequest[] {
    return Array.from(this.requests.values()).filter(r => r.listing.listingId === listingId);
  }
}
