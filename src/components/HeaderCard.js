import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function HeaderCard({ r, actieveTab, setActieveTab }) {
  // Haal de bedragen veilig op, ongeacht hoe de calculator ze precies teruggeeft
  const koopBedrag = r?.koopTot || r?.koop?.totaal || 0;
  const leaseBedrag = r?.leaseTot || r?.lease?.totaal || 0;

  const koopIsGoedkoper = koopBedrag <= leaseBedrag;
  const verschil = Math.abs(Math.round(koopBedrag - leaseBedrag));

  return (
    <View style={styles.stickyResultCard}>
      {/* Cijfers bovenin */}
      <View style={styles.stickyRow}>
        <View style={styles.stickyColumn}>
          <Text style={styles.stickyTitle}>🛒 MAANDLASTEN KOOP</Text>
          <Text style={[styles.stickyAmount, { color: "#b45309" }]}>
            €{Math.round(koopBedrag)}
          </Text>
        </View>
        <View style={styles.stickyDivider} />
        <View style={styles.stickyColumn}>
          <Text style={styles.stickyTitle}>📄 MAANDLASTEN LEASE</Text>
          <Text style={[styles.stickyAmount, { color: "#1d4ed8" }]}>
            €{Math.round(leaseBedrag)}
          </Text>
        </View>
      </View>

      {/* Gekleurde conclusie banner */}
      <View
        style={[
          styles.conclusieBanner,
          koopIsGoedkoper ? styles.conclusieKoop : styles.conclusieLease,
        ]}
      >
        <Text
          style={[
            styles.conclusieText,
            koopIsGoedkoper ? { color: "#92400e" } : { color: "#1e40af" },
          ]}
        >
          💡{" "}
          <Text style={{ fontWeight: "bold" }}>
            {koopIsGoedkoper ? "Koop" : "Lease"}
          </Text>{" "}
          is{" "}
          <Text style={{ fontWeight: "800" }}>€{verschil} p/m goedkoper</Text>.
        </Text>
      </View>

      {/* De twee tab-knoppen: Cockpit en Info */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[
            styles.navButton,
            actieveTab === "cockpit" && styles.navButtonActief,
          ]}
          onPress={() => setActieveTab("cockpit")}
        >
          <Text
            style={[
              styles.navButtonText,
              actieveTab === "cockpit" && styles.navButtonTextActief,
            ]}
          >
            🎮 Cockpit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            actieveTab === "info" && styles.navButtonActief,
          ]}
          onPress={() => setActieveTab("info")}
        >
          <Text
            style={[
              styles.navButtonText,
              actieveTab === "info" && styles.navButtonTextActief,
            ]}
          >
            📚 Info & Disclaimers
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyResultCard: {
    position: "absolute",
    top: Platform.OS === "ios" ? 44 : 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
  stickyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stickyColumn: {
    flex: 1,
    alignItems: "center",
  },
  stickyDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#e4e4e7",
  },
  stickyTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#71717a",
    marginBottom: 2,
  },
  stickyAmount: {
    fontSize: 22,
    fontWeight: "800",
  },
  conclusieBanner: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  conclusieKoop: {
    backgroundColor: "#fef3c7",
  },
  conclusieLease: {
    backgroundColor: "#dbeafe",
  },
  conclusieText: {
    fontSize: 13,
  },
  navBar: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f4f4f5",
    paddingTop: 6,
  },
  navButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  navButtonActief: {
    backgroundColor: "#f4f4f5",
  },
  navButtonText: {
    fontSize: 13,
    color: "#71717a",
    fontWeight: "600",
  },
  navButtonTextActief: {
    color: "#18181b",
  },
});
