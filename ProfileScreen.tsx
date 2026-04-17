import React from 'react';
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
import { mockDriverProfile, mockRatings } from './mockData';
import { useApp } from './AppContext';

interface MenuRow {
  icon: string;
  label: string;
  value?: string;
  danger?: boolean;
}

const accountRows: MenuRow[] = [
  { icon: 'user', label: 'Personal Information' },
  { icon: 'truck', label: 'Vehicle Details', value: 'DXB A 45821' },
  { icon: 'file-text', label: 'Documents & KYC', value: 'Verified' },
  { icon: 'credit-card', label: 'Payout Method', value: 'Bank Transfer' },
];

const preferenceRows: MenuRow[] = [
  { icon: 'bell', label: 'Notifications' },
  { icon: 'globe', label: 'Language', value: 'English' },
  { icon: 'map', label: 'Preferred Zone', value: 'Dubai' },
];

const supportRows: MenuRow[] = [
  { icon: 'help-circle', label: 'Help Center' },
  { icon: 'message-circle', label: 'Contact Support' },
  { icon: 'shield', label: 'Privacy & Security' },
  { icon: 'log-out', label: 'Sign Out', danger: true },
];

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { logout } = useApp();
  const profile = mockDriverProfile;

  const handleMenuPress = (label: string) => {
    if (label === 'Sign Out') {
      logout();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Profile" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.fullName.charAt(0)}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.fullName}</Text>
            <Text style={Typography.caption}>{profile.phone}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statChip}>
                <Icon name="star" size={12} color={Colors.warning} />
                <Text style={styles.statChipText}>
                  {profile.rating.toFixed(2)}
                </Text>
              </View>
              <View style={styles.statChip}>
                <Icon name="package" size={12} color={Colors.info} />
                <Text style={styles.statChipText}>
                  {profile.totalTrips} trips
                </Text>
              </View>
              <View
                style={[
                  styles.statChip,
                  { backgroundColor: Colors.successSoft },
                ]}
              >
                <Icon
                  name="check-circle"
                  size={12}
                  color={Colors.success}
                />
                <Text
                  style={[styles.statChipText, { color: Colors.success }]}
                >
                  Verified
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent ratings */}
        <View style={styles.ratingsSection}>
          <Text style={styles.sectionTitle}>RECENT RATINGS</Text>
          <View style={styles.menuGroup}>
            {mockRatings.map((r, index) => (
              <View
                key={r.id}
                style={[
                  styles.ratingRow,
                  index !== mockRatings.length - 1 && styles.menuRowBorder,
                ]}
              >
                <View style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Icon
                      key={i}
                      name="star"
                      size={12}
                      color={i <= r.stars ? Colors.warning : Colors.border}
                    />
                  ))}
                </View>
                <View style={styles.ratingInfo}>
                  <Text style={styles.ratingName}>{r.senderName}</Text>
                  {r.comment ? (
                    <Text style={styles.ratingComment} numberOfLines={1}>
                      "{r.comment}"
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>

        <MenuSection title="Account" rows={accountRows} onPress={handleMenuPress} />
        <MenuSection title="Preferences" rows={preferenceRows} onPress={handleMenuPress} />
        <MenuSection title="Support" rows={supportRows} onPress={handleMenuPress} />

        <View style={styles.footer}>
          <Text style={styles.versionText}>PCaptine v1.0.0</Text>
          <Text style={styles.memberText}>
            Member since {profile.memberSince}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuSection: React.FC<{
  title: string;
  rows: MenuRow[];
  onPress?: (label: string) => void;
}> = ({ title, rows, onPress }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    <View style={styles.menuGroup}>
      {rows.map((row, index) => (
        <Pressable
          key={row.label}
          style={[
            styles.menuRow,
            index !== rows.length - 1 && styles.menuRowBorder,
          ]}
          onPress={() => onPress?.(row.label)}
        >
          <View
            style={[
              styles.menuIcon,
              row.danger && { backgroundColor: Colors.dangerSoft },
            ]}
          >
            <Icon
              name={row.icon}
              size={18}
              color={row.danger ? Colors.danger : Colors.textPrimary}
            />
          </View>
          <Text
            style={[
              styles.menuLabel,
              row.danger && { color: Colors.danger },
            ]}
          >
            {row.label}
          </Text>
          {row.value ? (
            <Text style={styles.menuValue}>{row.value}</Text>
          ) : null}
          <Icon
            name="chevron-right"
            size={18}
            color={Colors.textTertiary}
          />
        </Pressable>
      ))}
    </View>
  </View>
);

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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.h3,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    gap: 4,
  },
  statChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.captionBold,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.xxs,
  },
  menuGroup: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  menuLabel: {
    ...Typography.body,
    fontWeight: '500',
    flex: 1,
  },
  menuValue: {
    ...Typography.caption,
    marginRight: Spacing.xs,
  },
  ratingsSection: {
    marginBottom: Spacing.lg,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingName: {
    ...Typography.bodyBold,
    fontSize: 13,
  },
  ratingComment: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  versionText: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  memberText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});
