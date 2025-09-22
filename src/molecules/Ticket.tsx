import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

interface TicketProps {
  header: ReactNode;
  footer: ReactNode;
  containerStyle?: ViewStyle; // allow overriding card style
  bgColor?: string; // main background color
  dotColor?: string; // left & right dots color
  dividerColor?: string; // dashed line color
}

const Ticket = ({
  header,
  footer,
  containerStyle,
  bgColor = 'white',
  dotColor = 'blue',
  dividerColor = '#919EAB',
}: TicketProps) => {
  const dotBg = dotColor || bgColor;

  return (
    <View style={[styles.card, { backgroundColor: bgColor }, containerStyle]}>
      {/* Header */}
      {header}

      {/* Divider with dots */}
      <View style={styles.dividerRow}>
        <View
          style={[styles.dot, { backgroundColor: dotBg, marginLeft: -10 }]}
        />
        <View
          style={[{ flex: 1 }, styles.divider, { borderColor: dividerColor }]}
        />
        <View
          style={[styles.dot, { backgroundColor: dotBg, marginRight: -10 }]}
        />
      </View>

      {/* Footer */}
      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginVertical: 12,
  },
});

export default Ticket;
