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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Radius, Spacing, Typography } from './theme';
import { RootStackParamList } from './NavigationTypes';
import { mockNotifications } from './mockData';
import { AppNotification, NotificationType } from './types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notifications'>;
};

const typeConfig: Record<
  NotificationType,
  { icon: string; iconBg: string; iconColor: string }
> = {
  new_job: { icon: 'briefcase', iconBg: Colors.successSoft, iconColor: Colors.success },
  offer_accepted: { icon: 'check-circle', iconBg: Colors.successSoft, iconColor: Colors.success },
  offer_declined: { icon: 'x-circle', iconBg: Colors.dangerSoft, iconColor: Colors.danger },
  payment: { icon: 'dollar-sign', iconBg: Colors.infoSoft, iconColor: Colors.info },
  system: { icon: 'bell', iconBg: Colors.surfaceAlt, iconColor: Colors.textSecondary },
};

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [notifs, setNotifs] = useState<AppNotification[]>(mockNotifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifs(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <Pressable onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {notifs.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="bell-off" size={32} color={Colors.textTertiary} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up. New activity will appear here.
            </Text>
          </View>
        ) : (
          notifs.map(notif => {
            const cfg = typeConfig[notif.type];
            return (
              <Pressable
                key={notif.id}
                style={[styles.notifCard, !notif.read && styles.notifCardUnread]}
                onPress={() => markRead(notif.id)}
              >
                <View
                  style={[styles.iconBox, { backgroundColor: cfg.iconBg }]}
                >
                  <Icon name={cfg.icon} size={18} color={cfg.iconColor} />
                </View>
                <View style={styles.notifBody}>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifText} numberOfLines={2}>
                    {notif.body}
                  </Text>
                  <Text style={styles.notifTime}>
                    {formatRelative(notif.timestamp)}
                  </Text>
                </View>
                {!notif.read && <View style={styles.unreadDot} />}
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    ...Typography.h3,
  },
  badge: {
    backgroundColor: Colors.danger,
    minWidth: 20,
    height: 20,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  markAllText: {
    ...Typography.captionBold,
    color: Colors.success,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  notifCardUnread: {
    borderColor: Colors.success,
    backgroundColor: '#FAFFFE',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: {
    flex: 1,
  },
  notifTitle: {
    ...Typography.bodyBold,
    marginBottom: 2,
  },
  notifText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.xxs,
  },
  notifTime: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.success,
    marginTop: 6,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl + Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.h3,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
});
