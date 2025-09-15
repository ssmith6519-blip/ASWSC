import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

/**
 * PDF Export Utilities for ASWSC Tournament System
 * Generates professional PDF documents for scoring matrices and tournament data
 */

/**
 * Export nearshore scoring matrix to PDF
 * @param {Object} nearshoreMatrix - Nearshore scoring matrix
 * @param {string} filename - Optional filename (defaults to auto-generated)
 */
export const exportNearshoreScoringMatrixToPDF = (nearshoreMatrix, filename = null) => {
  const doc = new jsPDF()
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // PDF Configuration
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = margin

  // Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('ASWSC Nearshore Tournament Scoring Matrix', pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 15
  doc.text('Length-Based Scoring (inches)', pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 20

  // Prepare nearshore table data
  const nearshoreTableData = []
  Object.entries(nearshoreMatrix).forEach(([categoryId, categoryData]) => {
    const { species, pointRanges, scoringType } = categoryData
    
    if (scoringType === 'release_only') {
      nearshoreTableData.push([
        `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} (${species.join(', ')})`,
        `${pointRanges[0]?.points || 0} pts`,
        'Any size',
        'Catch & Release Only'
      ])
    } else {
      pointRanges.forEach((range, index) => {
        const categoryName = index === 0 ? 
          `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} (${species.join(', ')})` : ''
        
        let lengthRange = ''
        if (range.maxLength === null) {
          lengthRange = `>${range.minLength}"`
        } else if (range.minLength === 0) {
          lengthRange = `≤${range.maxLength}"`
        } else {
          lengthRange = `${range.minLength.toFixed(2)}-${range.maxLength}"`
        }
        
        nearshoreTableData.push([
          categoryName,
          `${range.points} pts`,
          lengthRange,
          'Keep or Release'
        ])
      })
    }
  })

  // Nearshore table
  autoTable(doc, {
    startY: yPosition,
    head: [['Species/Category', 'Points', 'Length Range', 'Notes']],
    body: nearshoreTableData,
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94], textColor: 255 },
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 }
  })

  // Footer
  const finalY = doc.lastAutoTable.finalY + 20
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Atlanta Saltwater Sportsman\'s Club', pageWidth / 2, finalY, { align: 'center' })
  doc.text('Official Nearshore Tournament Scoring Matrix', pageWidth / 2, finalY + 10, { align: 'center' })

  // Save the PDF
  const defaultFilename = `ASWSC_Nearshore_Scoring_Matrix_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename || defaultFilename)
}

/**
 * Export offshore scoring matrix to PDF
 * @param {Object} offshoreMatrix - Offshore scoring matrix
 * @param {string} filename - Optional filename (defaults to auto-generated)
 */
export const exportOffshoreScoringMatrixToPDF = (offshoreMatrix, filename = null) => {
  const doc = new jsPDF()
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // PDF Configuration
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = margin

  // Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('ASWSC Offshore Tournament Scoring Matrix', pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 15
  doc.text('Weight-Based Scoring (pounds)', pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 20

  // Prepare offshore table data
  const offshoreTableData = []
  Object.entries(offshoreMatrix).forEach(([categoryId, categoryData]) => {
    const { species, pointRanges, scoringType } = categoryData
    
    let notes = 'Keep for Weigh-In'
    if (scoringType === 'release_only') {
      notes = 'Catch & Release Only'
    } else if (scoringType === 'catch_or_release') {
      notes = 'Catch or Release'
    }
    
    if (scoringType === 'release_only' || scoringType === 'catch_or_release') {
      offshoreTableData.push([
        `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} (${species.join(', ')})`,
        `${pointRanges[0]?.points || 0} pts`,
        'Any size',
        notes
      ])
    } else {
      pointRanges.forEach((range, index) => {
        const categoryName = index === 0 ? 
          `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} (${species.join(', ')})` : ''
        
        let weightRange = ''
        if (range.maxWeight === null) {
          weightRange = `${range.minWeight}+ lbs`
        } else if (range.minWeight === 0) {
          weightRange = `<${range.maxWeight} lbs`
        } else {
          weightRange = `${range.minWeight}-${range.maxWeight} lbs`
        }
        
        offshoreTableData.push([
          categoryName,
          `${range.points} pts`,
          weightRange,
          notes
        ])
      })
    }
  })

  // Offshore table
  autoTable(doc, {
    startY: yPosition,
    head: [['Species/Category', 'Points', 'Weight Range', 'Notes']],
    body: offshoreTableData,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246], textColor: 255 },
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 }
  })

  // Footer
  const finalY = doc.lastAutoTable.finalY + 20
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Atlanta Saltwater Sportsman\'s Club', pageWidth / 2, finalY, { align: 'center' })
  doc.text('Official Offshore Tournament Scoring Matrix', pageWidth / 2, finalY + 10, { align: 'center' })

  // Save the PDF
  const defaultFilename = `ASWSC_Offshore_Scoring_Matrix_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename || defaultFilename)
}

/**
 * Export both scoring matrices to separate PDFs
 * @param {Object} nearshoreMatrix - Nearshore scoring matrix
 * @param {Object} offshoreMatrix - Offshore scoring matrix
 */
export const exportScoringMatricesToPDF = (nearshoreMatrix, offshoreMatrix) => {
  // Export both matrices as separate PDFs
  exportNearshoreScoringMatrixToPDF(nearshoreMatrix)
  exportOffshoreScoringMatrixToPDF(offshoreMatrix)
}

/**
 * Export annual standings to PDF
 * @param {Object} standingsData - Annual standings data
 * @param {string} filename - Optional filename (defaults to auto-generated)
 */
export const exportAnnualStandingsToPDF = (standingsData, filename = null) => {
  const doc = new jsPDF()
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // PDF Configuration
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = margin

  // Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('ASWSC Annual Tournament Standings', pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 20

  // Boat Standings Section
  if (standingsData.boatStandings && standingsData.boatStandings.length > 0) {
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Boat of the Year Standings', margin, yPosition)
    yPosition += 10

    const boatTableData = standingsData.boatStandings.map((boat, index) => [
      `${index + 1}`,
      boat.boatName,
      boat.captain,
      `${boat.totalPoints}`,
      `${boat.tournamentsParticipated}`
    ])

    autoTable(doc, {
      startY: yPosition,
      head: [['Rank', 'Boat Name', 'Captain', 'Total Points', 'Tournaments']],
      body: boatTableData,
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 10 }
    })

    yPosition = doc.lastAutoTable.finalY + 20
  }

  // Angler Standings Section
  if (standingsData.anglerStandings && standingsData.anglerStandings.length > 0) {
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.height - 100) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Angler of the Year Standings', margin, yPosition)
    yPosition += 10

    const anglerTableData = standingsData.anglerStandings.map((angler, index) => [
      `${index + 1}`,
      angler.anglerName,
      angler.division || 'Mixed',
      `${angler.totalPoints}`,
      `${angler.tournamentsParticipated}`
    ])

    autoTable(doc, {
      startY: yPosition,
      head: [['Rank', 'Angler Name', 'Division', 'Total Points', 'Tournaments']],
      body: anglerTableData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 10 }
    })
  }

  // Footer
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : yPosition + 20
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Atlanta Saltwater Sportsman\'s Club', pageWidth / 2, finalY, { align: 'center' })
  doc.text('Annual Tournament Standings Report', pageWidth / 2, finalY + 10, { align: 'center' })

  // Save the PDF
  const defaultFilename = `ASWSC_Annual_Standings_${new Date().getFullYear()}.pdf`
  doc.save(filename || defaultFilename)
}
