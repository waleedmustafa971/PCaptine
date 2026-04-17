import React, { useEffect, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography } from './theme';
import { StatsCard } from './StatsCard';
import { StatsCardSkeleton } from './SkeletonLoader';
import { OnlineToggleCard } from './OnlineToggleCard';
import {
  mockDriverProfile,
  mockDriverStats,
  mockRecentDeliveries,
} from './mockData';
import { DriverStats, Delivery } from './types';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState<DriverStats | null>(null);
  const [recent, setRecent] = useState<Delivery[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = (simulatedDelay = 1400) => {
    setLoadingStats(true);
    setTimeout(() => {
      setStats(mockDriverStats);
      setRecent(mockRecentDeliveries);
      setLoadingStats(false);
    }, simulatedDelay);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData(900);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const firstName = mockDriverProfile.fullName.split(' ')[0];

  return (
    <View style={styles.container}>
      <View style={[styles.topHeader, { paddingTop: insets.top + Spacing.xs }]}>
        <View style={styles.headerLeft}>
          <Text style={Typography.caption}>Good morning,</Text>
          <Text style={styles.driverName}>{firstName}</Text>
        </View>
        <Pressable style={styles.notifBtn}>
          <Icon name="bell" size={20} color={Colors.textPrimary} />
          <View style={styles.notifDot} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.success}
          />
        }
      >
        <OnlineToggleCard isOnline={isOnline} onToggle={setIsOnline} />

        <View style={styles.spacer} />

        {loadingStats || !stats ? (
          <StatsCardSkeleton />
        ) : (
          <StatsCard stats={stats} />
        )}

        <View style={styles.spacer} />

        <View style={styles.performanceRow}>
          <View style={styles.perfCard}>
            <Icon name="check-circle" size={18} color={Colors.success} />
            <Text style={styles.perfValue}>
              {mockDriverStats.acceptanceRate}%
            </Text>
            <Text style={Typography.caption}>Acceptance</Text>
          </View>
          <View style={styles.perfCard}>
            <Icon name="award" size={18} color={Colors.info} />
            <Text style={styles.perfValue}>
              {mockDriverStats.completionRate}%
            </Text>
            <Text style={Typography.caption}>Completion</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={Typography.h3}>Recent Deliveries</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          {recent.length === 0 && !loadingStats ? (
            <View style={styles.emptyState}>
              <Icon name="inbox" size={28} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>No deliveries yet today</Text>
            </View>
          ) : (
            recent.map(item => (
              <View key={item.id} style={styles.recentCard}>
                <View style={styles.recentIcon}>
                  <Icon name="check" size={16} color={Colors.success} />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={Typography.bodyBold} numberOfLines={1}>
                    {item.senderName}
                  </Text>
                  <Text style={Typography.caption} numberOfLines={1}>
                    {item.pickup.address} → {item.delivery.address}
                  </Text>
                </View>
                <Text style={styles.recentAmount}>+AED {item.price}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  driverName: {
    ...Typography.h2,
    marginTop: 2,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.danger,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  spacer: {
    height: Spacing.md,
  },
  performanceRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  perfCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  perfValue: {
    ...Typography.h3,
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  section: {
    marginTop: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  seeAll: {
    ...Typography.captionBold,
    color: Colors.success,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  recentIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  recentInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  recentAmount: {
    ...Typography.bodyBold,
    color: Colors.success,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
