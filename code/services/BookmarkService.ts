import { Bookmark, User, Listing } from '../models';

export class BookmarkService {
  private bookmarks = new Map<string, Bookmark>();

  addBookmark(bookmarkId: string, user: User, listing: Listing): Bookmark {
    const b = new Bookmark(bookmarkId);
    b.user = user;
    b.listing = listing;
    b.add();
    this.bookmarks.set(bookmarkId, b);
    return b;
  }

  removeBookmark(bookmarkId: string): void {
    const b = this.bookmarks.get(bookmarkId);
    if (!b) throw new Error('Bookmark not found');
    b.remove();
    this.bookmarks.delete(bookmarkId);
  }

  getForUser(userId: string): Bookmark[] {
    return Array.from(this.bookmarks.values()).filter(b => b.user.userId === userId);
  }
}
