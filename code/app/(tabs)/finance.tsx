import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Camera, MapPin, DollarSign, Chrome as Home, Upload, Eye, MessageSquare, Star, Trash2, CirclePlus as PlusCircle, ChevronRight, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for active listings
const ACTIVE_LISTINGS = [
  {
    id: '1',
    title: 'Modern Studio Apartment',
    type: 'Studio',
    address: '123 University Ave',
    price: 800,
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    ],
    status: 'active',
    stats: {
      views: 182,
      requests: 4,
      rating: 4.8,
    },
  },
  {
    id: '2',
    title: 'Downtown Loft',
    type: 'Loft',
    address: '456 Main Street',
    price: 1200,
    photos: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    ],
    status: 'hidden',
    stats: {
      views: 95,
      requests: 2,
      rating: 4.5,
    },
  },
];

const RESIDENCE_TYPES = [
  'Studio',
  'Apartment',
  'Duplex',
  'Triplex',
  'House',
  'Loft',
];

export default function Finance() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'list' | 'create'>('list');
  const [selectedType, setSelectedType] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'hidden':
        return '#FF9800';
      default:
        return '#64748B';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'list' ? 'My Listings' : 'Create Listing'}
        </Text>
        {mode === 'list' && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setMode('create')}
          >
            <PlusCircle size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>New Listing</Text>
          </TouchableOpacity>
        )}
      </View>

      {mode === 'create' ? (
        <View style={styles.formContainer}>
          {/* Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Residence Type</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.typeContainer}
            >
              {RESIDENCE_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeChip,
                    selectedType === type && styles.typeChipSelected
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Home size={16} color={selectedType === type ? '#FFFFFF' : '#64748B'} />
                  <Text
                    style={[
                      styles.typeChipText,
                      selectedType === type && styles.typeChipTextSelected
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Basic Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Modern Studio near Campus"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <View style={styles.addressInput}>
                  <MapPin size={20} color="#64748B" />
                  <TextInput
                    style={styles.input}
                    placeholder="Select location on map"
                  />
                  <TouchableOpacity style={styles.mapButton}>
                    <Text style={styles.mapButtonText}>Open Map</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Area (sq m)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 50"
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Floor</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 3"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Monthly Rent</Text>
                <View style={styles.priceInput}>
                  <DollarSign size={20} color="#64748B" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Photos & Media */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos & Media</Text>
            <View style={styles.photoGrid}>
              <TouchableOpacity style={styles.addPhotoButton}>
                <Camera size={24} color="#3B82F6" />
                <Text style={styles.addPhotoText}>Add Photos</Text>
                <Text style={styles.photoHint}>Min. 3 photos required</Text>
              </TouchableOpacity>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoPreview}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <TouchableOpacity style={styles.removePhotoButton}>
                    <Trash2 size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Policies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Policies</Text>
            <View style={styles.policyGrid}>
              <TouchableOpacity style={styles.policyChip}>
                <Text style={styles.policyText}>🐾 Pets Allowed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.policyChip}>
                <Text style={styles.policyText}>🚭 No Smoking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.policyChip}>
                <Text style={styles.policyText}>👥 Visitors Allowed</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Create Listing</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listingsContainer}>
          {/* Stats Overview */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Listings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>286</Text>
              <Text style={styles.statLabel}>Total Views</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Pending Requests</Text>
            </View>
          </View>

          {/* Active Listings */}
          {ACTIVE_LISTINGS.map(listing => (
            <View key={listing.id} style={styles.listingCard}>
              <View style={styles.listingHeader}>
                <View style={styles.listingTitleContainer}>
                  <Text style={styles.listingTitle}>{listing.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(listing.status) }]}>
                    <Text style={styles.statusText}>
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <ChevronRight size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={styles.listingPhotos}>
                {listing.photos.map((photo, index) => (
                  <Image 
                    key={index}
                    source={{ uri: photo }} 
                    style={styles.listingPhoto}
                  />
                ))}
              </View>

              <View style={styles.listingDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.detailText}>{listing.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <DollarSign size={16} color="#64748B" />
                  <Text style={styles.detailText}>${listing.price}/month</Text>
                </View>
              </View>

              <View style={styles.listingStats}>
                <View style={styles.statBadge}>
                  <Eye size={16} color="#64748B" />
                  <Text style={styles.statText}>{listing.stats.views}</Text>
                </View>
                <View style={styles.statBadge}>
                  <MessageSquare size={16} color="#64748B" />
                  <Text style={styles.statText}>{listing.stats.requests}</Text>
                </View>
                <View style={styles.statBadge}>
                  <Star size={16} color="#FFB800" />
                  <Text style={styles.statText}>{listing.stats.rating}</Text>
                </View>
              </View>

              <View style={styles.listingActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Upload size={16} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Promote</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <AlertCircle size={16} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]}>
                  <Trash2 size={16} color="#EF4444" />
                  <Text style={styles.actionButtonTextDanger}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginRight: 8,
  },
  typeChipSelected: {
    backgroundColor: '#3B82F6',
  },
  typeChipText: {
    fontSize: 14,
    color: '#64748B',
  },
  typeChipTextSelected: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  addressInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  mapButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addPhotoButton: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
    marginTop: 8,
  },
  photoHint: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  photoPreview: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  policyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  policyChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  policyText: {
    fontSize: 14,
    color: '#64748B',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  listingsContainer: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listingTitleContainer: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  listingPhotos: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  listingPhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  listingDetails: {
    marginTop: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
  },
  listingStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#64748B',
  },
  listingActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  actionButtonDanger: {
    backgroundColor: '#FEE2E2',
  },
  actionButtonTextDanger: {
    fontSize: 14,
    color: '#EF4444',
  },
});