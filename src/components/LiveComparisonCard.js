// src/components/LiveComparisonCard.js
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function LiveComparisonCard({
  r,
  metLening,
  isZzpZakelijk,
  isUitgeklapt: isUitgeklaptExtern,
  setIsUitgeklapt: setIsUitgeklaptExtern,
}) {
  // Standaard staat de uitgebreide breakdown ingeklapt (false)
  const [interneIsUitgeklapt, setInterneIsUitgeklapt] = useState(false);
  const isUitgeklapt = isUitgeklaptExtern ?? interneIsUitgeklapt;
  const setIsUitgeklapt =
    setIsUitgeklaptExtern ?? setInterneIsUitgeklapt;

  // GECORRIGEERDE VEILIGHEIDSKLEP: We checken of de juiste sub-objecten bestaan
  if (!r || !r.koop || !r.lease) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* STRAKKE, PROFESSIONELE INKLAPBARE HEADER */}
      <TouchableOpacity
        style={styles.headerToggle}
        onPress={() => setIsUitgeklapt(!isUitgeklapt)}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>
          {isUitgeklapt
            ? "🔽 Verberg specificatie per maand"
            : "▶️ Toon specificatie per maand"}
        </Text>
      </TouchableOpacity>

      {/* INKLAPBARE CONTENT */}
      {isUitgeklapt && (
        <View style={styles.content}>
          <View style={styles.rowComparison}>
            {/* KOOP KOLOM */}
            <View style={styles.column}>
              <Text style={[styles.specColumnTitle, { color: "#b45309" }]}>
                🚗 Koopkosten
              </Text>
              <Text style={styles.breakdownText}>
                Afschrijving:{" "}
                <Text style={styles.boldText}>€{r.koop.afschrijving || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Verzekering:{" "}
                <Text style={styles.boldText}>€{r.koop.verzekering || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Wegenbelasting:{" "}
                <Text style={styles.boldText}>
                  €{r.koop.wegenbelasting || 0}
                </Text>
              </Text>
              <Text style={styles.breakdownText}>
                Onderhoud:{" "}
                <Text style={styles.boldText}>€{r.koop.onderhoud || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Brandstof:{" "}
                <Text style={styles.boldText}>€{r.koop.brandstof || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Pechhulp:{" "}
                <Text style={styles.boldText}>€{r.koop.pechhulp || 0}</Text>
              </Text>
              {metLening && (
                <Text style={styles.breakdownText}>
                  Rente lening:{" "}
                  <Text style={styles.boldText}>€{r.koop.rente || 0}</Text>
                </Text>
              )}
            </View>

            {/* VERTICALE SCHEIDINGSLIJN */}
            <View style={styles.columnDivider} />

            {/* LEASE KOLOM */}
            <View style={styles.column}>
              <Text style={[styles.specColumnTitle, { color: "#1d4ed8" }]}>
                📄 Leasekosten
              </Text>
              <Text style={styles.breakdownText}>
                Leaseprijs:{" "}
                <Text style={styles.boldText}>€{r.lease.leaseprijs || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Brandstof:{" "}
                <Text style={styles.boldText}>€{r.lease.brandstof || 0}</Text>
              </Text>
              <Text style={styles.breakdownText}>
                Onvoorzien:{" "}
                <Text style={styles.boldText}>€{r.lease.onvoorzien || 0}</Text>
              </Text>
              {r.lease.extraKmKosten > 0 && (
                <Text style={[styles.breakdownText, { color: "#dc2626" }]}>
                  Extra km's:{" "}
                  <Text style={styles.boldText}>
                    €{r.lease.extraKmKosten || 0}
                  </Text>
                </Text>
              )}
              {isZzpZakelijk && (
                <Text style={styles.breakdownText}>
                  Netto bijtelling:{" "}
                  <Text style={styles.boldText}>
                    €{r.lease.bijtelling || 0}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderLeftWidth: 4,
    borderLeftColor: "#b45309",
  },
  headerToggle: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    backgroundColor: "#ffffff",
    marginTop: 8,
  },
  rowComparison: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  columnDivider: {
    width: 1,
    backgroundColor: "#e4e4e7",
    marginHorizontal: 12,
  },
  specColumnTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  breakdownText: {
    fontSize: 12,
    color: "#3f3f46",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "600",
  },
});
