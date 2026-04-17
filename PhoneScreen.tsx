import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Radius, Spacing, Typography } from './theme';
import { RootStackParamList } from './NavigationTypes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Phone'>;
};

export const PhoneScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [number, setNumber] = useState('');
  const isValid = number.replace(/\s/g, '').length >= 9;

  const handleContinue = () => {
    if (!isValid) return;
    const cleaned = number.replace(/\s/g, '');
    navigation.navigate('OTP', { phone: `+971${cleaned}` });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.xxl, paddingBottom: insets.bottom + Spacing.xl },
        ]}
      >
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Icon name="truck" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>PCaptine</Text>
        </View>

        <Text style={styles.heading}>Enter your mobile number</Text>
        <Text style={styles.subheading}>
          We will send a one-time verification code to this number.
        </Text>

        <View style={styles.inputWrapper}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>🇦🇪</Text>
            <Text style={styles.countryText}>+971</Text>
          </View>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="50 123 4567"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="phone-pad"
            value={number}
            onChangeText={setNumber}
            maxLength={13}
          />
        </View>

        <Text style={styles.hint}>UAE numbers only</Text>

        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Send Code</Text>
          <Icon name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.terms}>
          By continuing you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
    gap: Spacing.sm,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  heading: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  subheading: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 56,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingRight: Spacing.sm,
  },
  flag: {
    fontSize: 20,
  },
  countryText: {
    ...Typography.bodyBold,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  hint: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginBottom: Spacing.xxl,
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
  terms: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xl,
    lineHeight: 18,
  },
});
