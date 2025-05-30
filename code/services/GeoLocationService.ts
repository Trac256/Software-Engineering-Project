import { GeoLocation } from '../models';

export class GeoLocationService {
  async geocode(address: string): Promise<GeoLocation> {
    console.log(`Geocoding address: ${address}`);
    // stub: in real life call an API
    const loc = new GeoLocation(0, 0);
    return loc.geocode(address);
  }
}
