// src/components/HeaderCard.js
import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

export default function HeaderCard({ r }) {
  const koopBedrag = r?.koop?.totaal || 0;
  const leaseBedrag = r?.lease?.totaal || 0;

  const koopIsGoedkoper = koopBedrag <= leaseBedrag;
  const verschil = Math.abs(Math.round(koopBedrag - leaseBedrag));

  return (
    <View style={styles.stickyResultCard}>
      {/* DE GEKLEURDE EN IETS GROTERE HOOFDTITEL HELEMAAL BOVENIN */}
      <Text style={styles.mainAppTitle}>
        <Text style={{ color: "#b45309" }}>Kopen</Text>
        <Text style={{ color: "#475569", fontWeight: "600" }}> of </Text>
        <Text style={{ color: "#1d4ed8" }}>Leasen</Text>
        <Text style={{ color: "#475569", fontWeight: "600" }}>?</Text>
      </Text>

      {/* 1. DE ZUIVERE CIJFERS IN EEN WIT COMPACT MATRIX-BLOKJE */}
      <View style={styles.statsContainer}>
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
      </View>

      {/* 2. DE CONCLUSIE BANNER (Nog iets krachtiger door een schaduwtje) */}
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
    // VROLIJKE, FRISSE LICHT-BLAUW/GRIJZE SFEER DIE ECHT ERUIT SPRINGT
    backgroundColor: "#f0fdf4", // Heel fris zacht mintgroen/energieke sfeer
    paddingTop: Platform.OS === "ios" ? 15 : 5,
    paddingBottom: 14,
    paddingHorizontal: 16,
    zIndex: 1000,
    borderBottomWidth: 2,
    borderBottomColor: "#bbf7d0", // Iets donkerdere frisse groene rand onderaan
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  mainAppTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: Platform.OS === "ios" ? -5 : 0,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  // EXTRA CONTAINER VOOR DE STATS ZODAT DE STRUKTUUR EEN MOOI EIGEN BLOKJE IS
  statsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e4e4e7",
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
    height: 34,
    backgroundColor: "#e4e4e7",
  },
  stickyTitle: {
    fontSize: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  conclusieKoop: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  conclusieLease: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  conclusieText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
