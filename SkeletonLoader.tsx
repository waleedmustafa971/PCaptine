import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius } from './theme';

interface SkeletonBlockProps {
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 16,
  radius = Radius.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: radius,
          backgroundColor: Colors.shimmer,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const StatsCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <SkeletonBlock width={120} height={14} />
        <SkeletonBlock width={60} height={14} />
      </View>

      <View style={styles.earningsRow}>
        <SkeletonBlock width={180} height={36} radius={Radius.sm} />
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <SkeletonBlock width={40} height={22} />
          <View style={styles.gap} />
          <SkeletonBlock width={50} height={12} />
        </View>
        <View style={styles.statItem}>
          <SkeletonBlock width={40} height={22} />
          <View style={styles.gap} />
          <SkeletonBlock width={50} height={12} />
        </View>
        <View style={styles.statItem}>
          <SkeletonBlock width={40} height={22} />
          <View style={styles.gap} />
          <SkeletonBlock width={50} height={12} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsRow: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  gap: {
    height: 8,
  },
});
