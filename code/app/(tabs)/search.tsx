import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MapPin, DollarSign, Users, Filter, Star, Heart, MessageSquare } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SAMPLE_LISTINGS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    title: 'Modern Studio near Campus',
    location: 'University District',
    price: 800,
    rooms: 2,
    matchScore: 95,
    description: 'Bright and spacious apartment with modern amenities, perfect for students.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    title: 'Cozy Downtown Apartment',
    location: 'Downtown',
    price: 650,
    rooms: 1,
    matchScore: 82,
    description: 'Charming apartment in the heart of downtown, walking distance to shops and restaurants.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    title: 'Shared Student Housing',
    location: 'West Campus',
    price: 750,
    rooms: 3,
    matchScore: 78,
    description: 'Perfect for students looking for a social living environment.',
  },
];

const FILTERS = [
  { id: 'price', label: 'Price Range', icon: DollarSign },
  { id: 'rooms', label: 'Rooms', icon: Users },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'more', label: 'More Filters', icon: Filter },
];

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(current =>
      current.includes(filterId)
        ? current.filter(id => id !== filterId)
        : [...current, filterId]
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 70) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for apartments or locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersContainer}
      >
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilters.includes(filter.id) && styles.filterButtonActive
            ]}
            onPress={() => toggleFilter(filter.id)}
          >
            <filter.icon
              size={16}
              color={activeFilters.includes(filter.id) ? '#FFFFFF' : '#3B82F6'}
            />
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter.id) && styles.filterTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Available Apartments</Text>
        
        {SAMPLE_LISTINGS.map(listing => (
          <View key={listing.id} style={styles.listingCard}>
            <Image source={{ uri: listing.image }} style={styles.listingImage} />
            
            <View style={styles.listingContent}>
              <View style={styles.listingHeader}>
                <Text style={styles.listingTitle}>{listing.title}</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={styles.locationContainer}>
                <MapPin size={16} color="#64748B" />
                <Text style={styles.locationText}>{listing.location}</Text>
              </View>

              <Text style={styles.descriptionText} numberOfLines={2}>
                {listing.description}
              </Text>

              <View style={styles.listingFooter}>
                <View style={styles.priceContainer}>
                  <DollarSign size={16} color="#1F2937" />
                  <Text style={styles.priceText}>${listing.price}/mo</Text>
                </View>

                <View style={styles.roomsContainer}>
                  <Users size={16} color="#64748B" />
                  <Text style={styles.roomsText}>{listing.rooms} rooms</Text>
                </View>

                <View 
                  style={[
                    styles.matchScore,
                    { backgroundColor: getMatchScoreColor(listing.matchScore) }
                  ]}
                >
                  <Star size={12} color="#FFFFFF" />
                  <Text style={styles.matchScoreText}>{listing.matchScore}% Match</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.messageButton}>
                  <MessageSquare size={16} color="#3B82F6" />
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#3B82F6',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  listingImage: {
    width: '100%',
    height: 200,
  },
  listingContent: {
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748B',
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  listingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  roomsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  roomsText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748B',
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScoreText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  messageButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  viewDetailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});