import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors, Radius, Spacing, Typography } from './theme';
import { RootStackParamList } from './NavigationTypes';
import { mockAvailableJobs } from './mockData';
import { Shipment } from './types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'JobDetail'>;
  route: RouteProp<RootStackParamList, 'JobDetail'>;
};

export const JobDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { jobId } = route.params;
  const job: Shipment | undefined = mockAvailableJobs.find(j => j.id === jobId);

  const [counterOffer, setCounterOffer] = useState('');
  const [mode, setMode] = useState<'view' | 'counter'>('view');

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={Typography.body}>Job not found.</Text>
      </View>
    );
  }

  const handleAccept = () => {
    navigation.goBack();
  };

  const handleDecline = () => {
    navigation.goBack();
  };

  const handleSendCounter = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.navBar, { paddingTop: insets.top + Spacing.xs }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.navTitle}>Job Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Price hero */}
        <View style={styles.priceHero}>
          <Text style={styles.priceLabel}>Offered Price</Text>
          <Text style={styles.priceValue}>AED {job.offeredPrice}</Text>
          <Text style={styles.priceRange}>
            Suggested: AED {job.suggestedPriceMin} – {job.suggestedPriceMax}
          </Text>
        </View>

        {/* Sender */}
        <View style={styles.card}>
          <SectionTitle icon="user" label="Sender" />
          <View style={styles.senderRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{job.senderName.charAt(0)}</Text>
            </View>
            <View style={styles.senderInfo}>
              <Text style={styles.senderName}>{job.senderName}</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={13} color={Colors.warning} />
                <Text style={styles.ratingText}>
                  {job.senderRating.toFixed(1)} rating
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Route */}
        <View style={styles.card}>
          <SectionTitle icon="map-pin" label="Route" />
          <View style={styles.routeBlock}>
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: Colors.success }]} />
              <View style={styles.routeText}>
                <Text style={Typography.caption}>PICKUP</Text>
                <Text style={styles.address}>{job.pickup.address}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: Colors.danger }]} />
              <View style={styles.routeText}>
                <Text style={Typography.caption}>DELIVERY</Text>
                <Text style={styles.address}>{job.delivery.address}</Text>
              </View>
            </View>
          </View>

          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <Icon name="map" size={28} color={Colors.textTertiary} />
            <Text style={styles.mapPlaceholderText}>Map preview</Text>
            <Text style={styles.mapDistance}>{job.distanceKm.toFixed(1)} km</Text>
          </View>
        </View>

        {/* Shipment details */}
        <View style={styles.card}>
          <SectionTitle icon="package" label="Shipment Details" />
          <InfoRow label="Description" value={job.description} />
          {job.weight ? (
            <InfoRow label="Weight" value={`${job.weight} kg`} />
          ) : null}
          <InfoRow
            label="Vehicle"
            value={job.vehicleType.replace('_', ' ')}
          />
          {job.specialRequirements ? (
            <View style={styles.requirementPill}>
              <Icon name="alert-circle" size={14} color={Colors.warning} />
              <Text style={styles.requirementText}>
                {job.specialRequirements}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Counter offer */}
        {mode === 'counter' ? (
          <View style={styles.card}>
            <SectionTitle icon="edit-2" label="Counter Offer" />
            <Text style={styles.counterHint}>
              Suggest your price (AED {job.suggestedPriceMin}–{job.suggestedPriceMax} recommended)
            </Text>
            <View style={styles.counterInputRow}>
              <Text style={styles.counterCurrency}>AED</Text>
              <TextInput
                style={styles.counterInput}
                placeholder={String(job.offeredPrice)}
                placeholderTextColor={Colors.textTertiary}
                keyboardType="number-pad"
                value={counterOffer}
                onChangeText={setCounterOffer}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>

      {/* Sticky action bar */}
      <View
        style={[
          styles.actionBar,
          { paddingBottom: insets.bottom + Spacing.md },
        ]}
      >
        {mode === 'counter' ? (
          <>
            <Pressable
              style={styles.actionSecondary}
              onPress={() => setMode('view')}
            >
              <Text style={styles.actionSecondaryText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.actionPrimary, { flex: 1.5 }]}
              onPress={handleSendCounter}
            >
              <Icon name="send" size={16} color="#FFFFFF" />
              <Text style={styles.actionPrimaryText}>Send Offer</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.actionSecondary} onPress={handleDecline}>
              <Text style={styles.actionSecondaryText}>Decline</Text>
            </Pressable>
            <Pressable
              style={styles.actionCounter}
              onPress={() => setMode('counter')}
            >
              <Icon name="edit-2" size={15} color={Colors.info} />
              <Text style={styles.actionCounterText}>Counter</Text>
            </Pressable>
            <Pressable style={styles.actionPrimary} onPress={handleAccept}>
              <Icon name="check" size={16} color="#FFFFFF" />
              <Text style={styles.actionPrimaryText}>Accept</Text>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const SectionTitle: React.FC<{ icon: string; label: string }> = ({
  icon,
  label,
}) => (
  <View style={styles.sectionTitle}>
    <Icon name={icon} size={15} color={Colors.textSecondary} />
    <Text style={styles.sectionTitleText}>{label}</Text>
  </View>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.xl,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
  },
  priceHero: {
    backgroundColor: Colors.success,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.5,
    marginBottom: Spacing.xxs,
  },
  priceValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 44,
  },
  priceRange: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xxs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  sectionTitleText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  senderRow: {
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  routeBlock: {
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    marginTop: 4,
  },
  routeLine: {
    width: 1,
    height: 16,
    backgroundColor: Colors.border,
    marginLeft: 4,
    marginVertical: 4,
  },
  routeText: {
    flex: 1,
  },
  address: {
    ...Typography.body,
    fontWeight: '500',
    marginTop: 2,
  },
  mapPlaceholder: {
    height: 140,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  mapPlaceholderText: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  mapDistance: {
    ...Typography.captionBold,
    color: Colors.success,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  infoValue: {
    ...Typography.bodyBold,
    textTransform: 'capitalize',
  },
  requirementPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.warningSoft,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  requirementText: {
    ...Typography.caption,
    color: Colors.warning,
  },
  counterHint: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  counterInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.success,
    height: 52,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  counterCurrency: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  counterInput: {
    flex: 1,
    ...Typography.h3,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  actionBar: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionSecondary: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSecondaryText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  actionCounter: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.info,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs,
    backgroundColor: Colors.infoSoft,
  },
  actionCounterText: {
    ...Typography.bodyBold,
    color: Colors.info,
  },
  actionPrimary: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs,
  },
  actionPrimaryText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
  },
});
