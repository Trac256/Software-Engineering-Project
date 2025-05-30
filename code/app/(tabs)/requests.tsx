import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Calendar, Star, Users, Send, CirclePlus as PlusCircle, CircleAlert as AlertCircle, X as XIcon, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for suggested roommates
const SUGGESTED_ROOMMATES = [
  {
    id: '1',
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    matchScore: 95,
    occupation: 'Graduate Student',
    interests: ['Reading', 'Cooking', 'Yoga'],
    moveInDate: '2024-03-01',
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    matchScore: 88,
    occupation: 'Software Engineer',
    interests: ['Music', 'Gaming', 'Hiking'],
    moveInDate: '2024-02-15',
  },
  {
    id: '3',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    matchScore: 82,
    occupation: 'Medical Student',
    interests: ['Photography', 'Travel', 'Fitness'],
    moveInDate: '2024-03-15',
  },
];

export default function Requests() {
  const insets = useSafeAreaInsets();
  const [departureDate, setDepartureDate] = useState('');
  const [reason, setReason] = useState('');
  const [rating, setRating] = useState(5);
  const [notifyRoommates, setNotifyRoommates] = useState(true);
  const [step, setStep] = useState('form'); // 'form' or 'suggestions'

  const handleSubmit = () => {
    if (!departureDate) {
      // Show error state
      return;
    }
    setStep('suggestions');
  };

  const renderStars = (count: number, onPress?: (index: number) => void) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onPress?.(index + 1)}
        style={styles.starButton}
      >
        <Star
          size={24}
          color="#FFB800"
          fill={index < count ? '#FFB800' : 'none'}
        />
      </TouchableOpacity>
    ));
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 80) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {step === 'form' ? 'Departure Notice' : 'Suggested Roommates'}
        </Text>
      </View>

      {step === 'form' ? (
        <View style={styles.formContainer}>
          {/* Departure Form */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>When are you leaving?</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="Select departure date"
                value={departureDate}
                onChangeText={setDepartureDate}
              />
            </View>

            <Text style={styles.sectionTitle}>Reason for leaving (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Share your reason for departure..."
              multiline
              numberOfLines={4}
              value={reason}
              onChangeText={setReason}
            />

            <Text style={styles.sectionTitle}>Rate your stay</Text>
            <View style={styles.ratingContainer}>
              {renderStars(rating, (index) => setRating(index))}
            </View>

            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setNotifyRoommates(!notifyRoommates)}
            >
              <View style={[
                styles.checkboxBox,
                notifyRoommates && styles.checkboxChecked
              ]}>
                {notifyRoommates && <XIcon size={16} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Notify current roommates about my departure
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.suggestionsContainer}>
          {/* Alert Banner */}
          <View style={styles.alertBanner}>
            <AlertCircle size={20} color="#3B82F6" />
            <Text style={styles.alertText}>
              We've found {SUGGESTED_ROOMMATES.length} potential roommates based on your preferences!
            </Text>
          </View>

          {/* Suggested Roommates */}
          {SUGGESTED_ROOMMATES.map(roommate => (
            <View key={roommate.id} style={styles.roommateCard}>
              <View style={styles.roommateHeader}>
                <Image source={{ uri: roommate.avatar }} style={styles.avatar} />
                <View style={styles.roommateInfo}>
                  <Text style={styles.roommateName}>{roommate.name}</Text>
                  <Text style={styles.occupation}>{roommate.occupation}</Text>
                </View>
                <View style={[
                  styles.matchScore,
                  { backgroundColor: getMatchScoreColor(roommate.matchScore) }
                ]}>
                  <Users size={14} color="#FFFFFF" />
                  <Text style={styles.matchScoreText}>{roommate.matchScore}% Match</Text>
                </View>
              </View>

              <View style={styles.interestsContainer}>
                {roommate.interests.map(interest => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.moveInDate}>
                <Calendar size={16} color="#64748B" />
                <Text style={styles.moveInText}>
                  Available from {new Date(roommate.moveInDate).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.messageButton}>
                  <Send size={16} color="#3B82F6" />
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inviteButton}>
                  <Text style={styles.inviteButtonText}>Send Invitation</Text>
                  <ChevronRight size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Create New Listing Button */}
          <TouchableOpacity style={styles.createListingButton}>
            <PlusCircle size={20} color="#3B82F6" />
            <Text style={styles.createListingText}>Create New Listing</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  formContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  starButton: {
    padding: 4,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  suggestionsContainer: {
    padding: 20,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#3B82F6',
  },
  roommateCard: {
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
  roommateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  roommateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  roommateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  occupation: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScoreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 12,
    color: '#64748B',
  },
  moveInDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  moveInText: {
    fontSize: 14,
    color: '#64748B',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 8,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  inviteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    borderRadius: 8,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  createListingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  createListingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
});