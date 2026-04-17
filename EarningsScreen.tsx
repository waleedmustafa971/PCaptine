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
import { Colors, Radius, Spacing, Typography } from './theme';
import { ScreenHeader } from './ScreenHeader';
import { DriverActionButton } from './DriverActionButton';
import { mockEarnings, mockTransactions } from './mockData';

type Period = 'today' | 'week' | 'month';

const PERIOD_LABELS: Record<Period, string> = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
};

export const EarningsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<Period>('today');
  const earnings = mockEarnings[period];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Earnings"
        subtitle="Track your income and payouts"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodTabs}>
          {(Object.keys(PERIOD_LABELS) as Period[]).map(key => (
            <Pressable
              key={key}
              style={[
                styles.periodTab,
                period === key && styles.periodTabActive,
              ]}
              onPress={() => setPeriod(key)}
            >
              <Text
                style={[
                  styles.periodText,
                  period === key && styles.periodTextActive,
                ]}
              >
                {PERIOD_LABELS[key]}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>
            {PERIOD_LABELS[period].toUpperCase()} EARNINGS
          </Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalCurrency}>AED</Text>
            <Text style={styles.totalAmount}>
              {earnings.total.toFixed(2)}
            </Text>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownValue}>
                {earnings.tripsCount}
              </Text>
              <Text style={Typography.caption}>Trips</Text>
            </View>
            <View style={styles.breakdownSeparator} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownValue}>
                {earnings.onlineHours.toFixed(1)}h
              </Text>
              <Text style={Typography.caption}>Online</Text>
            </View>
            <View style={styles.breakdownSeparator} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownValue}>
                {earnings.averagePerTrip.toFixed(2)}
              </Text>
              <Text style={Typography.caption}>Avg / Trip</Text>
            </View>
          </View>
        </View>

        <DriverActionButton
          label="Cash Out"
          variant="primary"
          leftIcon={<Icon name="download" size={18} color="#FFFFFF" />}
          onPress={() => {}}
          style={styles.cashOutBtn}
        />

        <View style={styles.section}>
          <Text style={[Typography.h3, styles.sectionTitle]}>
            Recent Transactions
          </Text>

          {mockTransactions.map(txn => (
            <View key={txn.id} style={styles.txnCard}>
              <View style={styles.txnIcon}>
                <Icon name="arrow-down-left" size={18} color={Colors.success} />
              </View>
              <View style={styles.txnInfo}>
                <Text style={Typography.bodyBold} numberOfLines={1}>
                  {txn.senderName}
                </Text>
                <Text style={Typography.caption}>
                  {new Date(txn.date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <View style={styles.txnRight}>
                <Text style={styles.txnAmount}>+{txn.amount}</Text>
                <Text style={styles.txnStatus}>Released</Text>
              </View>
            </View>
          ))}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: 4,
    marginBottom: Spacing.md,
  },
  periodTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.sm,
  },
  periodTabActive: {
    backgroundColor: Colors.surface,
  },
  periodText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  periodTextActive: {
    color: Colors.textPrimary,
  },
  totalCard: {
    backgroundColor: Colors.textPrimary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.lg,
  },
  totalCurrency: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginRight: Spacing.xs,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
  },
  breakdownValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  breakdownSeparator: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cashOutBtn: {
    marginBottom: Spacing.xl,
  },
  section: {
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  txnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  txnIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  txnInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  txnRight: {
    alignItems: 'flex-end',
  },
  txnAmount: {
    ...Typography.bodyBold,
    color: Colors.success,
    fontSize: 15,
  },
  txnStatus: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});
