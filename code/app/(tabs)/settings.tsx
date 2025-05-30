import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, Ban, UserX, MessageSquare, Clock, CircleCheck as CheckCircle2, Circle as XCircle, Filter, ChevronRight, Flag } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample data for reports
const REPORTS = [
  {
    id: '1',
    type: 'listing',
    title: 'Misleading Apartment Photos',
    description: 'The photos in the listing do not match the actual apartment condition.',
    reporter: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    reported: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    date: '2024-01-15',
    status: 'new',
    evidence: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    ],
    history: [
      {
        action: 'Report Received',
        date: '2024-01-15T10:30:00Z',
        note: 'Initial report submitted',
      },
    ],
  },
  {
    id: '2',
    type: 'user',
    title: 'Harassment Report',
    description: 'User has been sending inappropriate messages and making threats.',
    reporter: {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    reported: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    date: '2024-01-14',
    status: 'investigating',
    evidence: [],
    history: [
      {
        action: 'Report Received',
        date: '2024-01-14T15:45:00Z',
        note: 'Initial report submitted',
      },
      {
        action: 'Investigation Started',
        date: '2024-01-14T16:30:00Z',
        note: 'Reviewing chat logs and user history',
      },
    ],
  },
  {
    id: '3',
    type: 'listing',
    title: 'Scam Listing',
    description: 'User is requesting payment outside the platform.',
    reporter: {
      name: 'Alex Wong',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    reported: {
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    date: '2024-01-13',
    status: 'resolved',
    evidence: [],
    history: [
      {
        action: 'Report Received',
        date: '2024-01-13T09:15:00Z',
        note: 'Initial report submitted',
      },
      {
        action: 'Investigation Started',
        date: '2024-01-13T10:00:00Z',
        note: 'Reviewing payment logs',
      },
      {
        action: 'Listing Removed',
        date: '2024-01-13T11:30:00Z',
        note: 'Listing removed and user warned',
      },
    ],
  },
];

type ReportStatus = 'new' | 'investigating' | 'resolved' | 'dismissed';
type ReportType = 'listing' | 'user';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<ReportType | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#EF4444';
      case 'investigating':
        return '#F59E0B';
      case 'resolved':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return AlertTriangle;
      case 'investigating':
        return Clock;
      case 'resolved':
        return CheckCircle2;
      default:
        return XCircle;
    }
  };

  const TypeIcon = ({ type, size, color }: { type: string; size: number; color: string }) => {
    switch (type) {
      case 'listing':
        return <Flag size={size} color={color} />;
      case 'user':
        return <UserX size={size} color={color} />;
      default:
        return <AlertTriangle size={size} color={color} />;
    }
  };

  const filteredReports = REPORTS.filter(report => {
    if (statusFilter && report.status !== statusFilter) return false;
    if (typeFilter && report.type !== typeFilter) return false;
    return true;
  });

  const selectedReportData = REPORTS.find(r => r.id === selectedReport);

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Shield size={24} color="#1F2937" />
          <Text style={styles.title}>Moderation Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <AlertTriangle size={20} color="#EF4444" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>New Reports</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={20} color="#F59E0B" />
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Investigating</Text>
        </View>
        <View style={styles.statCard}>
          <CheckCircle2 size={20} color="#10B981" />
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity 
          style={[
            styles.filterChip,
            !statusFilter && !typeFilter && styles.filterChipActive
          ]}
          onPress={() => {
            setStatusFilter(null);
            setTypeFilter(null);
          }}
        >
          <Text style={[
            styles.filterChipText,
            !statusFilter && !typeFilter && styles.filterChipTextActive
          ]}>All Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterChip,
            typeFilter === 'listing' && styles.filterChipActive
          ]}
          onPress={() => setTypeFilter(typeFilter === 'listing' ? null : 'listing')}
        >
          <Flag size={16} color={typeFilter === 'listing' ? '#FFFFFF' : '#64748B'} />
          <Text style={[
            styles.filterChipText,
            typeFilter === 'listing' && styles.filterChipTextActive
          ]}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterChip,
            typeFilter === 'user' && styles.filterChipActive
          ]}
          onPress={() => setTypeFilter(typeFilter === 'user' ? null : 'user')}
        >
          <UserX size={16} color={typeFilter === 'user' ? '#FFFFFF' : '#64748B'} />
          <Text style={[
            styles.filterChipText,
            typeFilter === 'user' && styles.filterChipTextActive
          ]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterChip,
            statusFilter === 'new' && styles.filterChipActive
          ]}
          onPress={() => setStatusFilter(statusFilter === 'new' ? null : 'new')}
        >
          <AlertTriangle size={16} color={statusFilter === 'new' ? '#FFFFFF' : '#64748B'} />
          <Text style={[
            styles.filterChipText,
            statusFilter === 'new' && styles.filterChipTextActive
          ]}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterChip,
            statusFilter === 'investigating' && styles.filterChipActive
          ]}
          onPress={() => setStatusFilter(statusFilter === 'investigating' ? null : 'investigating')}
        >
          <Clock size={16} color={statusFilter === 'investigating' ? '#FFFFFF' : '#64748B'} />
          <Text style={[
            styles.filterChipText,
            statusFilter === 'investigating' && styles.filterChipTextActive
          ]}>Investigating</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Reports List */}
      <View style={styles.reportsContainer}>
        {filteredReports.map(report => (
          <TouchableOpacity
            key={report.id}
            style={[
              styles.reportCard,
              selectedReport === report.id && styles.reportCardSelected
            ]}
            onPress={() => setSelectedReport(
              selectedReport === report.id ? null : report.id
            )}
          >
            <View style={styles.reportHeader}>
              <View style={styles.reportType}>
                <TypeIcon type={report.type} size={16} color="#64748B" />
                <Text style={styles.reportTypeText}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(report.status) }
              ]}>
                {React.createElement(getStatusIcon(report.status), {
                  size: 12,
                  color: '#FFFFFF'
                })}
                <Text style={styles.statusText}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </Text>
              </View>
            </View>

            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportDescription} numberOfLines={2}>
              {report.description}
            </Text>

            <View style={styles.reportParties}>
              <View style={styles.partyInfo}>
                <Image source={{ uri: report.reporter.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.partyLabel}>Reporter</Text>
                  <Text style={styles.partyName}>{report.reporter.name}</Text>
                </View>
              </View>
              <View style={styles.partyInfo}>
                <Image source={{ uri: report.reported.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.partyLabel}>Reported</Text>
                  <Text style={styles.partyName}>{report.reported.name}</Text>
                </View>
              </View>
            </View>

            {selectedReport === report.id && (
              <View style={styles.reportDetails}>
                {report.evidence.length > 0 && (
                  <View style={styles.evidenceSection}>
                    <Text style={styles.sectionTitle}>Evidence</Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={styles.evidenceContainer}
                    >
                      {report.evidence.map((img, index) => (
                        <Image 
                          key={index}
                          source={{ uri: img }}
                          style={styles.evidenceImage}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                <View style={styles.historySection}>
                  <Text style={styles.sectionTitle}>History</Text>
                  {report.history.map((event, index) => (
                    <View key={index} style={styles.historyEvent}>
                      <View style={styles.historyDot} />
                      <View style={styles.historyContent}>
                        <Text style={styles.historyAction}>{event.action}</Text>
                        <Text style={styles.historyDate}>
                          {new Date(event.date).toLocaleString()}
                        </Text>
                        <Text style={styles.historyNote}>{event.note}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.actionButtons}>
                  {report.status === 'new' && (
                    <TouchableOpacity style={styles.investigateButton}>
                      <Clock size={16} color="#FFFFFF" />
                      <Text style={styles.investigateButtonText}>
                        Start Investigation
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  {report.status === 'investigating' && (
                    <>
                      <TouchableOpacity style={styles.warningButton}>
                        <AlertTriangle size={16} color="#FFFFFF" />
                        <Text style={styles.warningButtonText}>Issue Warning</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.banButton}>
                        <Ban size={16} color="#FFFFFF" />
                        <Text style={styles.banButtonText}>Ban User</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  
                  <TouchableOpacity style={styles.messageButton}>
                    <MessageSquare size={16} color="#3B82F6" />
                    <Text style={styles.messageButtonText}>Send Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => setSelectedReport(
                selectedReport === report.id ? null : report.id
              )}
            >
              <ChevronRight 
                size={20} 
                color="#64748B"
                style={[
                  styles.expandIcon,
                  selectedReport === report.id && styles.expandIconRotated
                ]}
              />
            </TouchableOpacity>
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  reportsContainer: {
    padding: 20,
  },
  reportCard: {
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
  reportCardSelected: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reportTypeText: {
    fontSize: 14,
    color: '#64748B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  reportParties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  partyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  partyLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  partyName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  reportDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  evidenceSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  evidenceContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  evidenceImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  historySection: {
    marginBottom: 16,
  },
  historyEvent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 6,
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  historyDate: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  historyNote: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  investigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    borderRadius: 8,
  },
  investigateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  warningButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    borderRadius: 8,
  },
  warningButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  banButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 8,
  },
  banButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
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
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  expandButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    padding: 4,
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
});