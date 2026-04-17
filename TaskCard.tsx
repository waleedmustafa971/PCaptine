import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Radius, Spacing, Typography } from './theme';
import { Shipment } from './types';
import { DriverActionButton } from './DriverActionButton';

interface TaskCardProps {
  shipment: Shipment;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onPress?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  shipment,
  onAccept,
  onDecline,
  onPress,
}) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(shipment.id)}>
      <View style={styles.header}>
        <View style={styles.senderRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {shipment.senderName.charAt(0)}
            </Text>
          </View>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName} numberOfLines={1}>
              {shipment.senderName}
            </Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={12} color={Colors.warning} />
              <Text style={styles.ratingText}>
                {shipment.senderRating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.priceBadge}>
          <Text style={styles.priceCurrency}>AED</Text>
          <Text style={styles.priceAmount}>{shipment.offeredPrice}</Text>
        </View>
      </View>

      <View style={styles.routeBlock}>
        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: Colors.success }]} />
          <View style={styles.routeTextGroup}>
            <Text style={Typography.caption}>PICKUP</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {shipment.pickup.address}
            </Text>
          </View>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <View style={[styles.dot, { backgroundColor: Colors.danger }]} />
          <View style={styles.routeTextGroup}>
            <Text style={Typography.caption}>DELIVERY</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {shipment.delivery.address}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="map-pin" size={14} color={Colors.textSecondary} />
          <Text style={styles.metaText}>
            {shipment.distanceKm.toFixed(1)} km
          </Text>
        </View>
        <View style={styles.metaDot} />
        <View style={styles.metaItem}>
          <Icon name="package" size={14} color={Colors.textSecondary} />
          <Text style={styles.metaText} numberOfLines={1}>
            {shipment.description}
          </Text>
        </View>
      </View>

      {onAccept && onDecline ? (
        <View style={styles.actions}>
          <DriverActionButton
            label="Decline"
            variant="secondary"
            size="md"
            onPress={() => onDecline(shipment.id)}
            style={styles.actionBtn}
            fullWidth={false}
          />
          <DriverActionButton
            label="Accept Job"
            variant="primary"
            size="md"
            onPress={() => onAccept(shipment.id)}
            style={[styles.actionBtn, styles.primaryAction]}
            fullWidth={false}
          />
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    ...Typography.bodyBold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: Colors.successSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  priceCurrency: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
    marginRight: 2,
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.success,
  },
  routeBlock: {
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
  },
  routeLine: {
    width: 1,
    height: 16,
    backgroundColor: Colors.border,
    marginLeft: 4,
    marginVertical: 4,
  },
  routeTextGroup: {
    flex: 1,
  },
  addressText: {
    ...Typography.body,
    fontWeight: '500',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.borderStrong,
    marginHorizontal: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
  },
  primaryAction: {
    flex: 1.4,
  },
});
