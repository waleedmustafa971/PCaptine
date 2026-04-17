import React, { useEffect, useRef, useState } from 'react';
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
import { RouteProp } from '@react-navigation/native';
import { Colors, Radius, Spacing, Typography } from './theme';
import { RootStackParamList } from './NavigationTypes';
import { useApp } from './AppContext';
import { mockDriverProfile } from './mockData';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OTP'>;
  route: RouteProp<RootStackParamList, 'OTP'>;
};

const DEMO_OTP = '123456';
const RESEND_SECONDS = 30;

// Normalise a phone string to digits only for comparison.
const digitsOnly = (s: string) => s.replace(/\D/g, '');

export const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { phone } = route.params;
  const { loginExisting, loginNew } = useApp();

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputs = useRef<(TextInput | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown tick.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setSeconds(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleDigit = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    setError('');
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    if (code !== DEMO_OTP) {
      setError('Incorrect code. Use 123456 for demo.');
      return;
    }

    // Check whether this phone belongs to the known mock driver.
    const isExistingDriver =
      digitsOnly(phone) === digitsOnly(mockDriverProfile.phone);

    if (isExistingDriver) {
      loginExisting(phone);
      // AppContext sets appState → 'main'; RootNavigator re-renders automatically.
    } else {
      loginNew(phone);
      navigation.navigate('Register', { phone });
    }
  };

  const maskedPhone = phone.replace(/(\+\d{3})\d{4}(\d{4})/, '$1 **** $2');

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
      >
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
        </Pressable>

        <Text style={styles.heading}>Verify your number</Text>
        <Text style={styles.subheading}>
          Enter the 6-digit code sent to{' '}
          <Text style={styles.phoneHighlight}>{maskedPhone}</Text>
        </Text>

        <View style={styles.otpRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={el => {
                inputs.current[i] = el;
              }}
              style={[styles.otpBox, d !== '' && styles.otpBoxFilled]}
              value={d}
              onChangeText={val => handleDigit(val, i)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, i)
              }
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.hintBox}>
          <Icon name="info" size={13} color={Colors.textTertiary} />
          <Text style={styles.demoHint}>Demo OTP: 123456</Text>
        </View>

        <Pressable style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code?</Text>
          {seconds > 0 ? (
            <Text style={styles.resendTimer}> Resend in {seconds}s</Text>
          ) : (
            <Pressable onPress={resetTimer}>
              <Text style={styles.resendLink}> Resend</Text>
            </Pressable>
          )}
        </View>
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xxl,
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
  phoneHighlight: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  otpBoxFilled: {
    borderColor: Colors.success,
  },
  error: {
    ...Typography.caption,
    color: Colors.danger,
    marginBottom: Spacing.xs,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: Spacing.xxl,
  },
  demoHint: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    height: 52,
    marginBottom: Spacing.lg,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  resendTimer: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  resendLink: {
    ...Typography.bodyBold,
    color: Colors.success,
  },
});
