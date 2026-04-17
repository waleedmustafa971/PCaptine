import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Radius, Spacing, Typography } from './theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface DriverActionButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: Colors.success,
  secondary: Colors.surfaceAlt,
  danger: Colors.danger,
  ghost: 'transparent',
};

const VARIANT_TEXT: Record<Variant, string> = {
  primary: '#FFFFFF',
  secondary: Colors.textPrimary,
  danger: '#FFFFFF',
  ghost: Colors.textPrimary,
};

const SIZE_HEIGHT: Record<Size, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

const SIZE_PADDING: Record<Size, number> = {
  sm: Spacing.md,
  md: Spacing.lg,
  lg: Spacing.xl,
};

export const DriverActionButton: React.FC<DriverActionButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
}) => {
  const isInactive = disabled || loading;

  const containerStyle: ViewStyle = {
    backgroundColor: VARIANT_BG[variant],
    height: SIZE_HEIGHT[size],
    paddingHorizontal: SIZE_PADDING[size],
    opacity: disabled ? 0.5 : 1,
    borderWidth: variant === 'ghost' ? 1 : 0,
    borderColor: Colors.border,
    width: fullWidth ? '100%' : undefined,
  };

  const textStyle: TextStyle = {
    color: VARIANT_TEXT[variant],
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isInactive}
      style={({ pressed }) => [
        styles.base,
        containerStyle,
        pressed && !isInactive && styles.pressed,
        style,
      ]}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={VARIANT_TEXT[variant]}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
          <Text style={[Typography.button, textStyle]} numberOfLines={1}>
            {label}
          </Text>
          {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Spacing.xs,
  },
  iconRight: {
    marginLeft: Spacing.xs,
  },
});
