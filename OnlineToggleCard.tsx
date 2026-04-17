import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Radius, Spacing, Typography } from './theme';

interface OnlineToggleCardProps {
  isOnline: boolean;
  onToggle: (value: boolean) => void;
}

export const OnlineToggleCard: React.FC<OnlineToggleCardProps> = ({
  isOnline,
  onToggle,
}) => {
  return (
    <Pressable
      onPress={() => onToggle(!isOnline)}
      style={[
        styles.card,
        { borderColor: isOnline ? Colors.success : Colors.border },
      ]}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isOnline
                ? Colors.successSoft
                : Colors.dangerSoft,
            },
          ]}
        >
          <Icon
            name={isOnline ? 'radio' : 'power'}
            size={20}
            color={isOnline ? Colors.success : Colors.danger}
          />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>
            {isOnline ? 'You are Online' : 'You are Offline'}
          </Text>
          <Text style={Typography.caption}>
            {isOnline
              ? 'Receiving job requests nearby'
              : 'Go online to start receiving jobs'}
          </Text>
        </View>
      </View>

      <Switch
        value={isOnline}
        onValueChange={onToggle}
        trackColor={{ false: Colors.borderStrong, true: Colors.success }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={Colors.borderStrong}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    ...Typography.bodyLarge,
    marginBottom: 2,
  },
});
