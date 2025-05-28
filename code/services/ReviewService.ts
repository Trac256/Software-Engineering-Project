import { Review, Student, Owner } from '../models';

export class ReviewService {
  private reviews = new Map<string, Review>();

  addReview(
    reviewId: string,
    rating: number,
    comment: string,
    reviewer: Student,
    owner: Owner
  ): Review {
    const r = new Review(reviewId, rating, comment, new Date(), false);
    r.reviewer = reviewer;
    r.owner = owner;
    this.reviews.set(reviewId, r);
    return r;
  }

  flagReview(reviewId: string): void {
    const r = this.get(reviewId);
    r.flag();
  }

  addResponse(reviewId: string, resp: string): void {
    const r = this.get(reviewId);
    r.addResponse(resp);
  }

  getByOwner(ownerId: string): Review[] {
    return [...this.reviews.values()].filter(r => r.owner.ownerId === ownerId);
  }

  getByStudent(studentId: string): Review[] {
    return [...this.reviews.values()].filter(r => r.reviewer.studentId === studentId);
  }

  private get(reviewId: string): Review {
    const r = this.reviews.get(reviewId);
    if (!r) throw new Error('Review not found');
    return r;
  }
}
