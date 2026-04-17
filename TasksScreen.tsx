import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Radius, Spacing, Typography } from './theme';
import { ScreenHeader } from './ScreenHeader';
import { TaskCard } from './TaskCard';
import { mockAvailableJobs, mockActiveDeliveries } from './mockData';
import { Shipment } from './types';
import { RootStackParamList } from './NavigationTypes';

type TabKey = 'available' | 'active';

export const TasksScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [tab, setTab] = useState<TabKey>('available');
  const [jobs, setJobs] = useState<Shipment[]>(mockAvailableJobs);

  const handleAccept = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleDecline = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleCardPress = (id: string) => {
    navigation.navigate('JobDetail', { jobId: id });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Tasks"
        subtitle={
          tab === 'available'
            ? `${jobs.length} jobs available near you`
            : `${mockActiveDeliveries.length} active delivery`
        }
      />

      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, tab === 'available' && styles.tabActive]}
          onPress={() => setTab('available')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'available' && styles.tabTextActive,
            ]}
          >
            Available
          </Text>
          {jobs.length > 0 ? (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{jobs.length}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'active' && styles.tabActive]}
          onPress={() => setTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'active' && styles.tabTextActive,
            ]}
          >
            Active
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'available' ? (
          jobs.length === 0 ? (
            <EmptyState
              icon="search"
              title="No jobs available"
              subtitle="Stay online — new jobs appear as senders post them."
            />
          ) : (
            jobs.map(shipment => (
              <TaskCard
                key={shipment.id}
                shipment={shipment}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onPress={handleCardPress}
              />
            ))
          )
        ) : mockActiveDeliveries.length === 0 ? (
          <EmptyState
            icon="truck"
            title="No active deliveries"
            subtitle="Accepted jobs will show up here."
          />
        ) : (
          mockActiveDeliveries.map(delivery => (
            <Pressable
              key={delivery.id}
              style={styles.activeCard}
              onPress={() =>
                navigation.navigate('ActiveDelivery', {
                  deliveryId: delivery.id,
                })
              }
            >
              <View style={styles.activeHeader}>
                <View style={styles.activeStatusPill}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.activeStatusText}>IN PROGRESS</Text>
                </View>
                <Text style={styles.activePrice}>AED {delivery.price}</Text>
              </View>
              <Text style={styles.activeSender}>{delivery.senderName}</Text>
              <View style={styles.activeRoute}>
                <Icon name="navigation" size={16} color={Colors.success} />
                <Text
                  style={[Typography.body, styles.activeRouteText]}
                  numberOfLines={1}
                >
                  {delivery.delivery.address}
                </Text>
              </View>
              <View style={styles.activeFooter}>
                <Text style={styles.tapHint}>Tap to open delivery</Text>
                <Icon name="chevron-right" size={14} color={Colors.textTertiary} />
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const EmptyState: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
}> = ({ icon, title, subtitle }) => (
  <View style={styles.empty}>
    <View style={styles.emptyIcon}>
      <Icon name={icon} size={28} color={Colors.textTertiary} />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptySubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: 4,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    gap: Spacing.xs,
  },
  tabActive: {
    backgroundColor: Colors.surface,
  },
  tabText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  tabBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 6,
    minWidth: 20,
    height: 20,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  activeCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  activeStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.success,
  },
  activeStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
    letterSpacing: 0.5,
  },
  activePrice: {
    ...Typography.h3,
    color: Colors.success,
  },
  activeSender: {
    ...Typography.bodyLarge,
    marginBottom: Spacing.sm,
  },
  activeRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
  },
  activeRouteText: {
    flex: 1,
    fontWeight: '500',
  },
  activeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Spacing.xs,
    gap: 2,
  },
  tapHint: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xxs,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
});
