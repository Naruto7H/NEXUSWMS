import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingBottom: 20, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4f46e5' },
  metaText: { fontSize: 10, color: '#64748b', marginTop: 4 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 8, fontSize: 10, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: 8, fontSize: 10 },
  col1: { width: '40%' },
  col2: { width: '20%' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  totalSection: { marginTop: 20, alignItems: 'flex-end' },
  totalText: { fontSize: 14, fontWeight: 'bold' }
});

const PODocument = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PURCHASE ORDER</Text>
          <Text style={styles.metaText}>PO Number: {order.id}</Text>
          <Text style={styles.metaText}>Date: {order.date}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>NexaRetail WMS</Text>
          <Text style={styles.metaText}>Central Procurement Division</Text>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Vendor Details:</Text>
        <Text style={styles.metaText}>{order.supplier}</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.col1}>Description</Text>
        <Text style={styles.col2}>Qty</Text>
        <Text style={styles.col3}>Unit Price</Text>
        <Text style={styles.col4}>Total</Text>
      </View>
      {/* Mock Items */}
      <View style={styles.tableRow}>
        <Text style={styles.col1}>Fresh Norwegian Salmon</Text>
        <Text style={styles.col2}>500 kg</Text>
        <Text style={styles.col3}>$12.00</Text>
        <Text style={styles.col4}>$6,000.00</Text>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total Amount: {order.amount}</Text>
      </View>
    </Page>
  </Document>
);

// This is the button component you place in your UI
export const DownloadPOButton = ({ order }) => (
  <PDFDownloadLink 
    document={<PODocument order={order} />} 
    fileName={`${order.id}_Purchase_Order.pdf`}
    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-md text-sm font-medium transition-colors"
  >
    {({ loading }) => (
      <>
        <Download className="w-4 h-4" />
        {loading ? 'Generating PDF...' : 'Download PDF'}
      </>
    )}
  </PDFDownloadLink>
);