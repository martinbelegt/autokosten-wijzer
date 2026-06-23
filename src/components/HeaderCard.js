// src/components/HeaderCard.js
import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

export default function HeaderCard({ r }) {
  // Haal de bedragen veilig op uit het resultaat
  const koopBedrag = r?.koop?.totaal || 0;
  const leaseBedrag = r?.lease?.totaal || 0;

  const koopIsGoedkoper = koopBedrag <= leaseBedrag;
  const verschil = Math.abs(Math.round(koopBedrag - leaseBedrag));

  return (
    <View style={styles.stickyResultCard}>
      {/* 1. DE ZUIVERE CIJFERS */}
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

      {/* 2. DE CONCLUSIE BANNER */}
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
          {koopIsGoedkoper
            ? `🎉 Koop is €${verschil} p/m goedkoper`
            : `🎉 Lease is €${verschil} p/m goedkoper`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyResultCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    // HIERMEE HALEN WE HEM FLINK OMHOOG (Minder loze ruimte bovenin)
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
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
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  conclusieKoop: {
    backgroundColor: "#fef3c7",
  },
  conclusieLease: {
    backgroundColor: "#eff6ff",
  },
  conclusieText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
