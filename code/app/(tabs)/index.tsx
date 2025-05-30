import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Bell, MapPin, Users, Percent } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FEATURED_LISTINGS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    location: 'Downtown Campus',
    price: '$800/mo',
    roommates: 2,
    matchScore: 95,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    location: 'West End',
    price: '$650/mo',
    roommates: 3,
    matchScore: 82,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    location: 'University District',
    price: '$750/mo',
    roommates: 1,
    matchScore: 78,
  },
];

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Roommate Request',
    description: 'Sarah wants to connect with you',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Rent Payment Due',
    description: 'Your monthly rent payment is due in 3 days',
    time: '5h ago',
  },
];

export default function Dashboard() {
  const insets = useSafeAreaInsets();

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 70) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome, Maria!</Text>
          <Text style={styles.subtitle}>Find your perfect student housing</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Quick Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchPlaceholder}>🔍 Search for housing or roommates...</Text>
        </View>
        <View style={styles.filterTags}>
          <TouchableOpacity style={styles.filterTag}>
            <Users size={16} color="#3B82F6" />
            <Text style={styles.filterTagText}>Roommates Only</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTag}>
            <Percent size={16} color="#3B82F6" />
            <Text style={styles.filterTagText}>Match > 70%</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Listings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Listings</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listingsScroll}>
          {FEATURED_LISTINGS.map(listing => (
            <TouchableOpacity key={listing.id} style={styles.listingCard}>
              <Image source={{ uri: listing.image }} style={styles.listingImage} />
              <View style={styles.listingDetails}>
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.locationText}>{listing.location}</Text>
                </View>
                <View style={styles.listingStats}>
                  <Text style={styles.priceText}>{listing.price}</Text>
                  <View style={styles.roommatesContainer}>
                    <Users size={16} color="#64748B" />
                    <Text style={styles.roommatesText}>{listing.roommates}</Text>
                  </View>
                </View>
                <View style={[styles.matchScore, { backgroundColor: getMatchScoreColor(listing.matchScore) }]}>
                  <Text style={styles.matchScoreText}>{listing.matchScore}% Match</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {NOTIFICATIONS.map(notification => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
            </View>
            <Text style={styles.notificationTime}>{notification.time}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  searchContainer: {
    padding: 20,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchPlaceholder: {
    color: '#94A3B8',
    fontSize: 16,
  },
  filterTags: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  filterTagText: {
    color: '#3B82F6',
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  listingsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 280,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listingImage: {
    width: '100%',
    height: 160,
  },
  listingDetails: {
    padding: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#64748B',
    fontSize: 14,
  },
  listingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  roommatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roommatesText: {
    color: '#64748B',
    fontSize: 14,
  },
  matchScore: {
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 12,
  },
});