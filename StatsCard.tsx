import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Radius, Spacing, Typography } from './theme';
import { DriverStats } from './types';

interface StatsCardProps {
  stats: DriverStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={Typography.label}>TODAY'S EARNINGS</Text>
        <View style={styles.trendBadge}>
          <Icon name="trending-up" size={12} color={Colors.success} />
          <Text style={styles.trendText}>+12%</Text>
        </View>
      </View>

      <View style={styles.earningsRow}>
        <Text style={styles.currency}>AED</Text>
        <Text style={styles.amount}>{stats.todayEarnings.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.todayTrips}</Text>
          <Text style={Typography.caption}>Trips</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.todayHours.toFixed(1)}h</Text>
          <Text style={Typography.caption}>Online</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statItem}>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color={Colors.warning} />
            <Text style={styles.statValue}>{stats.rating.toFixed(2)}</Text>
          </View>
          <Text style={Typography.caption}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    height: 14,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successSoft,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  trendText: {
    ...Typography.captionBold,
    color: Colors.success,
    marginLeft: 4,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.lg,
    height: 36,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 36,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xxs,
  },
  separator: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
