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
import { Colors, Radius, Spacing, Typography } from './theme';
import { KYCDocumentStatus } from './types';
import { useApp } from './AppContext';

type DocKey = 'license' | 'vehicle' | 'selfie';

interface DocItem {
  key: DocKey;
  title: string;
  subtitle: string;
  icon: string;
}

const DOCS: DocItem[] = [
  {
    key: 'license',
    title: "Driver's Licence",
    subtitle: 'Front and back of your UAE driving licence',
    icon: 'credit-card',
  },
  {
    key: 'vehicle',
    title: 'Vehicle Registration',
    subtitle: 'Your Mulkiya (vehicle registration card)',
    icon: 'file-text',
  },
  {
    key: 'selfie',
    title: 'Selfie with ID',
    subtitle: 'A photo of you holding your Emirates ID',
    icon: 'camera',
  },
];

export const KYCScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { completeKYC } = useApp();
  const [uploaded, setUploaded] = useState<Record<DocKey, KYCDocumentStatus>>({
    license: 'missing',
    vehicle: 'missing',
    selfie: 'missing',
  });
  const [submitted, setSubmitted] = useState(false);

  const allUploaded = Object.values(uploaded).every(s => s !== 'missing');

  const handleUpload = (key: DocKey) => {
    setUploaded(prev => ({ ...prev, [key]: 'pending' }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.successIcon}>
          <Icon name="clock" size={32} color={Colors.warning} />
        </View>
        <Text style={styles.successTitle}>Documents Submitted</Text>
        <Text style={styles.successBody}>
          Our team is reviewing your documents. This usually takes up to 24
          hours. You will receive a notification once approved.
        </Text>
        <Pressable style={styles.button} onPress={completeKYC}>
          <Text style={styles.buttonText}>Continue to App</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <View style={styles.topHeader}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Icon name="shield" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Identity Verification</Text>
        </View>
        <Text style={styles.headerSub}>
          Upload the documents below to start accepting deliveries.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {DOCS.map((doc, index) => {
          const status = uploaded[doc.key];
          return (
            <View key={doc.key} style={styles.docCard}>
              <View style={styles.docStep}>
                <Text style={styles.docStepNum}>{index + 1}</Text>
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.docSubtitle}>{doc.subtitle}</Text>
                {status === 'pending' && (
                  <View style={styles.statusPill}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Uploaded — awaiting review</Text>
                  </View>
                )}
              </View>
              <Pressable
                style={[
                  styles.uploadBtn,
                  status === 'pending' && styles.uploadBtnDone,
                ]}
                onPress={() => handleUpload(doc.key)}
                disabled={status === 'pending'}
              >
                <Icon
                  name={status === 'pending' ? 'check' : 'upload'}
                  size={16}
                  color={status === 'pending' ? Colors.success : Colors.textSecondary}
                />
              </Pressable>
            </View>
          );
        })}

        <View style={styles.noteCard}>
          <Icon name="lock" size={16} color={Colors.textTertiary} />
          <Text style={styles.noteText}>
            Your documents are encrypted and only used for driver verification.
            They are never shared with senders.
          </Text>
        </View>

        <Pressable
          style={[styles.button, !allUploaded && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!allUploaded}
        >
          <Text style={styles.buttonText}>Submit for Review</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  topHeader: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.h3,
  },
  headerSub: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  docStep: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docStepNum: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    ...Typography.bodyBold,
    marginBottom: 2,
  },
  docSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.warning,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.warning,
  },
  uploadBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnDone: {
    backgroundColor: Colors.successSoft,
    borderColor: Colors.success,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  noteText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    flex: 1,
    lineHeight: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    height: 52,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.warningSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  successTitle: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  successBody: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 22,
  },
});
