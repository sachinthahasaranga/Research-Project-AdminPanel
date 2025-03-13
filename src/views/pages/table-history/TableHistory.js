import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CFormSelect,
} from '@coreui/react'
import apiClient from '../../../api'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'

const TableHistory = () => {
  const [history, setHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedTableType, setSelectedTableType] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  const tableTypes = ['RawMaterial', 'PEInventory', 'OuterCover', 'OtherInventory', 'InnerCover', 'FinishedProduct', 'CartonInventory']
  const months = [
    { value: '', label: 'All' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  useEffect(() => {
    fetchInventoryHistory()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [selectedTableType, selectedMonth, history])

  const fetchInventoryHistory = async () => {
    try {
      const response = await apiClient.get('/api/inventory/inventory-history', { withCredentials: true })
      setHistory(response.data)
      setFilteredHistory(response.data)
    } catch (error) {
      console.error('Error fetching inventory history:', error)
      Swal.fire('Error!', 'Failed to fetch inventory history.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Apply filters
  const applyFilters = () => {
    let filteredData = history

    if (selectedTableType) {
      filteredData = filteredData.filter(item => item.tabletype === selectedTableType)
    }

    if (selectedMonth) {
      filteredData = filteredData.filter(item => {
        const itemMonth = new Date(item.date).getMonth() + 1
        return itemMonth.toString().padStart(2, '0') === selectedMonth
      })
    }

    setFilteredHistory(filteredData)
  }

  const calculateTotals = () => {
    const totalInbound = filteredHistory.reduce((sum, item) => sum + item.inbound, 0)
    const totalOutbound = filteredHistory.reduce((sum, item) => sum + item.outbound, 0)
    const netTotal = totalInbound - totalOutbound

    Swal.fire({
      title: 'Inventory Totals',
      html: `
        <p><strong>Total Inbound:</strong> ${totalInbound}</p>
        <p><strong>Total Outbound:</strong> ${totalOutbound}</p>
        <p><strong>Net Total     :</strong> ${netTotal}</p>
      `,
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

  // Export to Excel
  const exportToExcel = () => {
    if (filteredHistory.length === 0) {
      Swal.fire('No data!', 'There is no data to export.', 'warning')
      return
    }

    const dataToExport = filteredHistory.map(record => ({
      'Table Type': record.tabletype,
      'Model': record.productId?.model || 'N/A',
      'Specifications': record.productId?.specifications || 'N/A',
      'Unit': record.productId?.unit || 'N/A',
      'Inventory Balance': record.productId?.inventory_balance ?? 'N/A',
      'Current Stock': record.productId?.current_stock ?? 'N/A',
      'Inbound': record.inbound,
      'Outbound': record.outbound,
      'Date': new Date(record.date).toLocaleDateString()
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory History')

    XLSX.writeFile(workbook, 'Inventory_History.xlsx')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Inventory History</strong> <small>Tracking inbound and outbound inventory</small>
          </CCardHeader>
          <CCardBody>
            {/* Filters, Calculate Totals, and Export Buttons */}
            <CRow className="mb-3">
              <CCol md={4}>
                <CFormSelect value={selectedTableType} onChange={(e) => setSelectedTableType(e.target.value)}>
                  <option value="">All Table Types</option>
                  {tableTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={2} className="d-flex justify-content-end">
                <CButton color="primary" onClick={calculateTotals}>Calculate Totals</CButton>
              </CCol>
              <CCol md={2} className="d-flex justify-content-end">
                <CButton color="success" onClick={exportToExcel}>Download Excel</CButton>
              </CCol>
            </CRow>

            {/* Table */}
            {loading ? (
              <p>Loading inventory history...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Table Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Specifications</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Inventory Balance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Current Stock</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Inbound</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Outbound</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredHistory.map((record, index) => (
                    <CTableRow key={record._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{record.tabletype}</CTableDataCell>
                      <CTableDataCell>{record.productId?.model || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.productId?.specifications || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.productId?.unit || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.productId?.inventory_balance ?? 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.productId?.current_stock ?? 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.inbound}</CTableDataCell>
                      <CTableDataCell>{record.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(record.date).toLocaleDateString()}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TableHistory
