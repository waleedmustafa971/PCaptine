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
import { VehicleType } from './types';
import { useApp } from './AppContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
  route: RouteProp<RootStackParamList, 'Register'>;
};

interface VehicleOption {
  type: VehicleType;
  label: string;
  icon: string;
}

const vehicleOptions: VehicleOption[] = [
  { type: 'motorbike', label: 'Motorbike', icon: 'zap' },
  { type: 'small_car', label: 'Small Car', icon: 'smartphone' },
  { type: 'pickup', label: 'Pickup Truck', icon: 'truck' },
  { type: 'large_truck', label: 'Large Truck', icon: 'package' },
];

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { completeRegistration } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [plate, setPlate] = useState('');

  const isValid =
    fullName.trim().length >= 3 && vehicle !== null && plate.trim().length >= 4;

  const handleContinue = () => {
    if (!isValid) return;
    completeRegistration();
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + Spacing.md },
        ]}
      >
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Field label="Full Name">
          <TextInput
            style={styles.input}
            placeholder="e.g. Waleed Ibrahim"
            placeholderTextColor={Colors.textTertiary}
            value={fullName}
            onChangeText={setFullName}
          />
        </Field>

        <Field label="Email (optional)">
          <TextInput
            style={styles.input}
            placeholder="waleed@email.com"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Field>

        <Text style={styles.fieldLabel}>Vehicle Type</Text>
        <View style={styles.vehicleGrid}>
          {vehicleOptions.map(opt => (
            <Pressable
              key={opt.type}
              style={[
                styles.vehicleCard,
                vehicle === opt.type && styles.vehicleCardSelected,
              ]}
              onPress={() => setVehicle(opt.type)}
            >
              <View
                style={[
                  styles.vehicleIcon,
                  vehicle === opt.type && styles.vehicleIconSelected,
                ]}
              >
                <Icon
                  name={opt.icon}
                  size={20}
                  color={vehicle === opt.type ? '#FFFFFF' : Colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.vehicleLabel,
                  vehicle === opt.type && styles.vehicleLabelSelected,
                ]}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Field label="License Plate Number">
          <TextInput
            style={styles.input}
            placeholder="DXB A 45821"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="characters"
            value={plate}
            onChangeText={setPlate}
          />
        </Field>

        <View style={styles.kycNote}>
          <Icon name="info" size={16} color={Colors.info} />
          <Text style={styles.kycNoteText}>
            After registration you will need to upload your driving licence,
            vehicle registration, and a selfie for KYC verification.
          </Text>
        </View>

        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Continue to KYC</Text>
          <Icon name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputWrapper}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  root: {
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
  headerTitle: {
    ...Typography.h3,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    ...Typography.label,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  input: {
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  vehicleCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  vehicleCardSelected: {
    borderColor: Colors.success,
    backgroundColor: Colors.successSoft,
  },
  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleIconSelected: {
    backgroundColor: Colors.success,
  },
  vehicleLabel: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  vehicleLabelSelected: {
    color: Colors.success,
  },
  kycNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.infoSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  kycNoteText: {
    ...Typography.caption,
    color: Colors.info,
    flex: 1,
    lineHeight: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    height: 52,
    gap: Spacing.xs,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});
