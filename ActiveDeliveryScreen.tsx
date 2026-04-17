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
import { RouteProp } from '@react-navigation/native';
import { Colors, Radius, Spacing, Typography } from './theme';
import { RootStackParamList } from './NavigationTypes';
import { mockActiveDeliveries } from './mockData';
import { DeliveryStatus, Delivery } from './types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveDelivery'>;
  route: RouteProp<RootStackParamList, 'ActiveDelivery'>;
};

interface Step {
  status: DeliveryStatus;
  label: string;
  icon: string;
  actionLabel: string;
}

const STEPS: Step[] = [
  {
    status: 'accepted',
    label: 'Job Accepted',
    icon: 'check-circle',
    actionLabel: 'I have arrived at pickup',
  },
  {
    status: 'arrived',
    label: 'Arrived at Pickup',
    icon: 'map-pin',
    actionLabel: 'Confirm pickup',
  },
  {
    status: 'picked_up',
    label: 'Items Picked Up',
    icon: 'package',
    actionLabel: 'I have delivered the items',
  },
  {
    status: 'in_progress',
    label: 'En Route to Delivery',
    icon: 'navigation',
    actionLabel: 'Confirm delivery',
  },
  {
    status: 'delivered',
    label: 'Delivered',
    icon: 'flag',
    actionLabel: '',
  },
];

const statusIndex = (s: DeliveryStatus) =>
  STEPS.findIndex(step => step.status === s);

export const ActiveDeliveryScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { deliveryId } = route.params;
  const found = mockActiveDeliveries.find(d => d.id === deliveryId);
  const [delivery, setDelivery] = useState<Delivery | undefined>(found);

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text style={Typography.body}>Delivery not found.</Text>
      </View>
    );
  }

  const currentIndex = statusIndex(delivery.status);
  const nextStep = STEPS[currentIndex + 1];

  const handleAdvance = () => {
    if (!nextStep) return;
    if (nextStep.status === 'delivered') {
      navigation.replace('Rating', {
        deliveryId: delivery.id,
        senderName: delivery.senderName,
        price: delivery.price,
      });
      return;
    }
    setDelivery(prev =>
      prev ? { ...prev, status: nextStep.status } : prev,
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.navTitle}>Active Delivery</Text>
        <Pressable
          style={styles.chatBtn}
          onPress={() =>
            navigation.navigate('Chat', {
              deliveryId: delivery.id,
              senderName: delivery.senderName,
            })
          }
        >
          <Icon name="message-circle" size={20} color={Colors.info} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Map placeholder */}
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={32} color={Colors.textTertiary} />
          <Text style={styles.mapText}>Live map</Text>
        </View>

        {/* Sender + price */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {delivery.senderName.charAt(0)}
              </Text>
            </View>
            <View style={styles.senderInfo}>
              <Text style={styles.senderName}>{delivery.senderName}</Text>
              <Text style={Typography.caption}>{delivery.delivery.address}</Text>
            </View>
            <Text style={styles.priceText}>AED {delivery.price}</Text>
          </View>
        </View>

        {/* Step tracker */}
        <View style={styles.card}>
          <Text style={styles.trackerTitle}>Delivery Progress</Text>
          {STEPS.map((step, i) => {
            const done = i <= currentIndex;
            const active = i === currentIndex;
            const last = i === STEPS.length - 1;
            return (
              <View key={step.status} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      done && styles.stepCircleDone,
                      active && styles.stepCircleActive,
                    ]}
                  >
                    <Icon
                      name={step.icon}
                      size={14}
                      color={done ? '#FFFFFF' : Colors.textTertiary}
                    />
                  </View>
                  {!last && (
                    <View
                      style={[styles.stepLine, done && styles.stepLineDone]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    done && styles.stepLabelDone,
                    active && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Quick contacts */}
        <View style={styles.contactRow}>
          <Pressable
            style={styles.contactBtn}
            onPress={() =>
              navigation.navigate('Chat', {
                deliveryId: delivery.id,
                senderName: delivery.senderName,
              })
            }
          >
            <Icon name="message-circle" size={18} color={Colors.info} />
            <Text style={styles.contactBtnText}>Message</Text>
          </Pressable>
          <Pressable style={styles.contactBtn}>
            <Icon name="phone" size={18} color={Colors.success} />
            <Text style={styles.contactBtnText}>Call</Text>
          </Pressable>
          <Pressable style={styles.contactBtn}>
            <Icon name="navigation" size={18} color={Colors.warning} />
            <Text style={styles.contactBtnText}>Navigate</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom action */}
      {delivery.status !== 'delivered' && nextStep ? (
        <View
          style={[
            styles.actionBar,
            { paddingBottom: insets.bottom + Spacing.md },
          ]}
        >
          <Pressable style={styles.advanceBtn} onPress={handleAdvance}>
            <Icon name="check-circle" size={18} color="#FFFFFF" />
            <Text style={styles.advanceBtnText}>{nextStep.actionLabel}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navTitle: {
    ...Typography.h3,
  },
  chatBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  mapText: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    ...Typography.bodyLarge,
    marginBottom: 2,
  },
  priceText: {
    ...Typography.h3,
    color: Colors.success,
  },
  trackerTitle: {
    ...Typography.bodyBold,
    marginBottom: Spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  stepLeft: {
    alignItems: 'center',
    width: 28,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  stepCircleActive: {
    borderColor: Colors.success,
    backgroundColor: Colors.successSoft,
  },
  stepLine: {
    width: 2,
    height: 24,
    backgroundColor: Colors.border,
    marginTop: 2,
  },
  stepLineDone: {
    backgroundColor: Colors.success,
  },
  stepLabel: {
    ...Typography.body,
    color: Colors.textTertiary,
    paddingTop: 4,
    flex: 1,
    marginBottom: 16,
  },
  stepLabelDone: {
    color: Colors.textSecondary,
  },
  stepLabelActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  contactBtnText: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  actionBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  advanceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    height: 52,
    gap: Spacing.xs,
  },
  advanceBtnText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});
