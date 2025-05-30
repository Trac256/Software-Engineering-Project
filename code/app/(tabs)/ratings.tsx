import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Star, Filter, Flag, BookmarkPlus, ChevronDown, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for ratings
const RATINGS_DATA = {
  overallRating: 4.6,
  totalRatings: 27,
  distribution: {
    5: 15,
    4: 8,
    3: 2,
    2: 1,
    1: 1,
  },
  reviews: [
    {
      id: '1',
      userName: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      rating: 5,
      comment: 'Great roommate! Always respectful of shared spaces and contributes to a positive living environment.',
      date: '2024-01-15',
      tags: ['Respectful', 'Clean', 'Friendly'],
      verified: true,
    },
    {
      id: '2',
      userName: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rating: 4,
      comment: 'Reliable tenant, pays rent on time. Could improve on noise levels during late hours.',
      date: '2024-01-10',
      tags: ['Punctual', 'Reliable'],
      verified: true,
    },
    {
      id: '3',
      userName: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      rating: 3,
      comment: 'Communication could be better, but overall decent experience.',
      date: '2024-01-05',
      tags: ['Average Communication'],
      verified: true,
      underInvestigation: true,
    },
  ],
};

const FILTERS = [
  { id: 'all', label: 'All Ratings' },
  { id: '5', label: '5 Stars' },
  { id: '4', label: '4 Stars' },
  { id: '3', label: '3 Stars & Below' },
  { id: 'comments', label: 'With Comments' },
  { id: 'investigation', label: 'Under Investigation' },
];

export default function Ratings() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#4CAF50';
    if (rating >= 3.5) return '#FF9800';
    return '#F44336';
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? '#FFB800' : '#E2E8F0'}
        fill={index < rating ? '#FFB800' : 'none'}
      />
    ));
  };

  const getFilteredReviews = () => {
    return RATINGS_DATA.reviews.filter(review => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'investigation') return review.underInvestigation;
      if (activeFilter === 'comments') return review.comment.length > 0;
      return review.rating === parseInt(activeFilter);
    });
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ratings & Reviews</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Overall Rating Card */}
      <View style={styles.overallCard}>
        <View style={styles.ratingHeader}>
          <Text style={[styles.overallRating, { color: getRatingColor(RATINGS_DATA.overallRating) }]}>
            {RATINGS_DATA.overallRating}
          </Text>
          <View style={styles.starsContainer}>
            {renderStars(Math.round(RATINGS_DATA.overallRating))}
          </View>
          <Text style={styles.totalRatings}>{RATINGS_DATA.totalRatings} ratings</Text>
        </View>

        {/* Rating Distribution */}
        <View style={styles.distribution}>
          {Object.entries(RATINGS_DATA.distribution)
            .reverse()
            .map(([stars, count]) => (
              <View key={stars} style={styles.distributionRow}>
                <View style={styles.distributionStars}>
                  <Text style={styles.distributionNumber}>{stars}</Text>
                  <Star size={14} color="#FFB800" fill="#FFB800" />
                </View>
                <View style={styles.distributionBar}>
                  <View 
                    style={[
                      styles.distributionFill,
                      { width: `${(count / RATINGS_DATA.totalRatings) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.distributionCount}>{count}</Text>
              </View>
            ))}
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
              styles.filterChip,
              activeFilter === filter.id && styles.filterChipActive
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === filter.id && styles.filterChipTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Filter */}
      <TouchableOpacity style={styles.timeFilter}>
        <Text style={styles.timeFilterText}>All Time</Text>
        <ChevronDown size={20} color="#64748B" />
      </TouchableOpacity>

      {/* Reviews */}
      <View style={styles.reviewsContainer}>
        {getFilteredReviews().map(review => (
          <View key={review.id} style={styles.reviewCard}>
            {review.underInvestigation && (
              <View style={styles.investigationBanner}>
                <AlertTriangle size={16} color="#FF9800" />
                <Text style={styles.investigationText}>This review is under investigation</Text>
              </View>
            )}
            
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <Image source={{ uri: review.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.userName}>{review.userName}</Text>
                  <View style={styles.ratingContainer}>
                    {renderStars(review.rating)}
                    <Text style={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.reportButton}>
                <Flag size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.reviewComment}>{review.comment}</Text>

            <View style={styles.tagsContainer}>
              {review.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Add to Trusted Profiles Button */}
      <TouchableOpacity style={styles.trustButton}>
        <BookmarkPlus size={20} color="#3B82F6" />
        <Text style={styles.trustButtonText}>Add to Trusted Profiles</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  overallCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  overallRating: {
    fontSize: 48,
    fontWeight: '700',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  totalRatings: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  distribution: {
    gap: 8,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  distributionStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 40,
  },
  distributionNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  distributionCount: {
    fontSize: 14,
    color: '#64748B',
    width: 30,
    textAlign: 'right',
  },
  filtersContainer: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  timeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 20,
  },
  timeFilterText: {
    fontSize: 14,
    color: '#64748B',
  },
  reviewsContainer: {
    padding: 20,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  investigationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  investigationText: {
    fontSize: 14,
    color: '#FF9800',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reviewUser: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#64748B',
  },
  reportButton: {
    padding: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginTop: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#64748B',
  },
  trustButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  trustButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
});