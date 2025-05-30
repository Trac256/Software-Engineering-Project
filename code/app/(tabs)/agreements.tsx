import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FileText, Users, Clock, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle, ChevronRight, CreditCard as Edit2, Download } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for agreements
const AGREEMENTS = [
  {
    id: '1',
    title: 'Modern Studio Agreement',
    address: '123 University Ave',
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    status: 'pending_signatures',
    lastUpdated: '2024-01-15',
    participants: [
      { id: '1', name: 'Maria Garcia', status: 'signed', timestamp: '2024-01-15' },
      { id: '2', name: 'John Smith', status: 'pending', timestamp: null },
      { id: '3', name: 'Sarah Johnson', status: 'declined', timestamp: '2024-01-16' },
    ],
    terms: [
      { id: '1', title: 'Quiet Hours', content: '10 PM - 7 AM on weekdays' },
      { id: '2', title: 'Cleaning Schedule', content: 'Rotating weekly schedule' },
      { id: '3', title: 'Guest Policy', content: 'Maximum 2 overnight guests per week' },
    ],
  },
  {
    id: '2',
    title: 'Downtown Loft Agreement',
    address: '456 Main Street',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    status: 'active',
    lastUpdated: '2024-01-10',
    participants: [
      { id: '1', name: 'Maria Garcia', status: 'signed', timestamp: '2024-01-10' },
      { id: '4', name: 'Alex Wong', status: 'signed', timestamp: '2024-01-10' },
    ],
    terms: [
      { id: '1', title: 'Pet Policy', content: 'Small pets allowed with approval' },
      { id: '2', title: 'Utilities Split', content: 'Equal share between residents' },
    ],
  },
];

export default function Agreements() {
  const insets = useSafeAreaInsets();
  const [selectedAgreement, setSelectedAgreement] = useState(AGREEMENTS[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'declined':
        return '#F44336';
      default:
        return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <CheckCircle2 size={16} color="#4CAF50" />;
      case 'pending':
        return <Clock size={16} color="#FF9800" />;
      case 'declined':
        return <XCircle size={16} color="#F44336" />;
      default:
        return <AlertCircle size={16} color="#64748B" />;
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Agreements</Text>
        <TouchableOpacity style={styles.createButton}>
          <FileText size={16} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      {/* Active Agreement Card */}
      <View style={styles.activeAgreement}>
        <View style={styles.activeHeader}>
          <View>
            <Text style={styles.activeTitle}>{selectedAgreement.title}</Text>
            <Text style={styles.activeAddress}>{selectedAgreement.address}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.dateText}>
            {new Date(selectedAgreement.startDate).toLocaleDateString()} - {new Date(selectedAgreement.endDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Participants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participants</Text>
          {selectedAgreement.participants.map(participant => (
            <View key={participant.id} style={styles.participant}>
              <View style={styles.participantInfo}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?u=${participant.id}` }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(participant.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(participant.status) }]}>
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
              {participant.timestamp && (
                <Text style={styles.timestamp}>
                  {new Date(participant.timestamp).toLocaleDateString()}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          {selectedAgreement.terms.map(term => (
            <View key={term.id} style={styles.term}>
              <Text style={styles.termTitle}>{term.title}</Text>
              <Text style={styles.termContent}>{term.content}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={16} color="#3B82F6" />
            <Text style={styles.downloadText}>Download PDF</Text>
          </TouchableOpacity>
          
          {selectedAgreement.status === 'pending_signatures' && (
            <TouchableOpacity style={styles.signButton}>
              <Text style={styles.signButtonText}>Sign Agreement</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Other Agreements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Agreements</Text>
        {AGREEMENTS.filter(a => a.id !== selectedAgreement.id).map(agreement => (
          <TouchableOpacity
            key={agreement.id}
            style={styles.agreementItem}
            onPress={() => setSelectedAgreement(agreement)}
          >
            <View style={styles.agreementItemContent}>
              <FileText size={20} color="#64748B" />
              <View style={styles.agreementItemInfo}>
                <Text style={styles.agreementItemTitle}>{agreement.title}</Text>
                <Text style={styles.agreementItemAddress}>{agreement.address}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
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
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  activeAgreement: {
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
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  activeAddress: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  participantName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748B',
  },
  term: {
    marginBottom: 16,
  },
  termTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  termContent: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  signButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  signButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  agreementItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agreementItemInfo: {
    flex: 1,
  },
  agreementItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  agreementItemAddress: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});