import React, { useState } from 'react';
import {
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

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Rating'>;
  route: RouteProp<RootStackParamList, 'Rating'>;
};

const QUICK_COMMENTS = [
  'Friendly sender',
  'Ready on time',
  'Easy pickup',
  'Clear instructions',
  'Smooth delivery',
];

export const RatingScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { senderName, price, deliveryId } = route.params;
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleDone = () => {
    navigation.navigate('MainTabs');
  };

  if (submitted) {
    return (
      <View
        style={[
          styles.successContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.xl },
        ]}
      >
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={36} color={Colors.success} />
        </View>
        <Text style={styles.successTitle}>Delivery Complete!</Text>
        <Text style={styles.successBody}>
          AED {price} has been added to your wallet.
        </Text>
        <View style={styles.ratingPreview}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(i => (
              <Icon
                key={i}
                name="star"
                size={22}
                color={i <= stars ? Colors.warning : Colors.border}
              />
            ))}
          </View>
          <Text style={styles.ratingPreviewText}>
            Your rating for {senderName}
          </Text>
        </View>
        <Pressable style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.xl },
      ]}
    >
      <View style={styles.earningsStrip}>
        <Icon name="dollar-sign" size={20} color={Colors.success} />
        <Text style={styles.earningsAmount}>AED {price}</Text>
        <Text style={styles.earningsLabel}>earned</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{senderName.charAt(0)}</Text>
          </View>
        </View>

        <Text style={styles.heading}>Rate {senderName}</Text>
        <Text style={styles.subheading}>
          How was your experience with this sender?
        </Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <Pressable key={i} onPress={() => setStars(i)}>
              <Icon
                name="star"
                size={40}
                color={i <= stars ? Colors.warning : Colors.border}
              />
            </Pressable>
          ))}
        </View>

        {stars > 0 && (
          <Text style={styles.starsLabel}>
            {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][stars]}
          </Text>
        )}

        <View style={styles.quickRow}>
          {QUICK_COMMENTS.map(tag => (
            <Pressable
              key={tag}
              style={[
                styles.quickTag,
                comment === tag && styles.quickTagSelected,
              ]}
              onPress={() => setComment(prev => (prev === tag ? '' : tag))}
            >
              <Text
                style={[
                  styles.quickTagText,
                  comment === tag && styles.quickTagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment (optional)…"
          placeholderTextColor={Colors.textTertiary}
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={200}
        />

        <Pressable
          style={[styles.button, stars === 0 && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={stars === 0}
        >
          <Text style={styles.buttonText}>Submit Rating</Text>
        </Pressable>

        <Pressable style={styles.skipBtn} onPress={handleDone}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  successContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  earningsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.successSoft,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.success,
  },
  earningsLabel: {
    ...Typography.body,
    color: Colors.success,
  },
  body: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    alignItems: 'center',
  },
  avatarRow: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  heading: {
    ...Typography.h3,
    marginBottom: Spacing.xxs,
    textAlign: 'center',
  },
  subheading: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  starsLabel: {
    ...Typography.bodyBold,
    color: Colors.warning,
    marginBottom: Spacing.lg,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  quickTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  quickTagSelected: {
    borderColor: Colors.success,
    backgroundColor: Colors.successSoft,
  },
  quickTagText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  quickTagTextSelected: {
    color: Colors.success,
    fontWeight: '600',
  },
  commentInput: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Colors.textPrimary,
    minHeight: 72,
    textAlignVertical: 'top',
    marginBottom: Spacing.xl,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    height: 52,
    marginBottom: Spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  skipBtn: {
    padding: Spacing.sm,
  },
  skipText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  successTitle: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  successBody: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  ratingPreview: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    gap: Spacing.xs,
  },
  ratingPreviewText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
