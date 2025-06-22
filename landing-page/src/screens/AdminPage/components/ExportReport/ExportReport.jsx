import React, { useState } from 'react';
import { MdDownload } from 'react-icons/md';
import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import { saveAs } from 'file-saver';

// Hàm loại bỏ ký tự không hợp lệ cho tên sheet Excel
function sanitizeSheetName(name) {
    return name.replace(/[\\/*\[\]:?]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31);
}

const ExportReport = ({ overviewData, sheetsData, chartImages, fileName, buttonProps }) => {
    const [showModal, setShowModal] = useState(false);

    const exportToExcel = async () => {
        const workbook = await XlsxPopulate.fromBlankAsync();
        const overviewSheet = workbook.sheet(0);
        overviewSheet.name("Tổng Quan");

        // Trang Tổng Quan lịch sự hơn
        if (overviewData && typeof overviewData === 'object') {
            const keys = Object.keys(overviewData);
            const values = Object.values(overviewData);
            overviewSheet.cell("A1").value("BÁO CÁO TỔNG QUAN");
            overviewSheet.row(1).style({ bold: true, fontSize: 16, horizontalAlignment: 'center' });
            overviewSheet.range("A1:B1").merged(true);
            overviewSheet.cell("A3").value([keys, values]);
            overviewSheet.row(3).style({ bold: true, fill: 'D9E1F2', horizontalAlignment: 'center' });
            overviewSheet.column(1).width(25);
            overviewSheet.column(2).width(25);
            // Format số cho cột B nếu là số
            values.forEach((v, i) => {
                if (typeof v === 'number') {
                    overviewSheet.cell(4 + i, 2).style({ numberFormat: '#,##0' });
                }
            });
        }

        // Các sheet data chi tiết
        if (sheetsData && sheetsData.length > 0) {
            sheetsData.forEach((sheetInfo) => {
                const sheet = workbook.addSheet(sanitizeSheetName(sheetInfo.sheetName));
                if (sheetInfo.data && sheetInfo.data.length > 0) {
                    sheet.cell("A1").value([
                        Object.keys(sheetInfo.data[0]),
                        ...sheetInfo.data.map(obj => Object.values(obj))
                    ]);
                    sheet.row(1).style({ bold: true, fill: 'D9E1F2', horizontalAlignment: 'center' });
                }
            });
        }

        if (workbook.sheets().length > 1 && overviewSheet.usedRange().value() === null) {
            workbook.deleteSheet(overviewSheet);
        }

        const blob = await workbook.outputAsync();
        saveAs(blob, fileName + ".xlsx");
        if (chartImages && chartImages.length > 0) setShowModal(true);
    };

    // Modal tải ảnh chart
    const ChartDownloadModal = () => (
        <div style={{
            position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320, maxWidth: 480, boxShadow: '0 2px 16px #0002', position: 'relative' }}>
                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: 12, top: 8, border: 'none', background: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
                <h3 style={{ margin: 0, marginBottom: 12 }}>Tải ảnh biểu đồ</h3>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {chartImages && chartImages.map((img, idx) => (
                        <div key={idx} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                            <a
                                href={img.image}
                                download={sanitizeSheetName(img.sheetName || `chart${idx+1}`) + '.png'}
                                style={{ color: '#007bff', textDecoration: 'underline', marginRight: 8, fontWeight: 500 }}
                            >
                                <MdDownload style={{ verticalAlign: 'middle' }} />
                                <span style={{ marginLeft: 4 }}>{img.title || img.sheetName || `Biểu đồ ${idx+1}`}</span>
                            </a>
                            <img src={img.image} alt={img.title || img.sheetName} style={{ maxWidth: 80, maxHeight: 40, marginLeft: 12, border: '1px solid #eee' }} />
                        </div>
                    ))}
                </div>
                <button
                    style={{ marginTop: 16, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 500, cursor: 'pointer' }}
                    onClick={() => {
                        chartImages.forEach((img, idx) => {
                            const a = document.createElement('a');
                            a.href = img.image;
                            a.download = sanitizeSheetName(img.sheetName || `chart${idx+1}`) + '.png';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        });
                    }}
                >Tải tất cả ảnh</button>
            </div>
        </div>
    );

    return (
        <>
            <button
                className="table-btn export-btn hehe"
                onClick={exportToExcel}
                {...(buttonProps || {})}
            >
            <span className="btn-icon"><MdDownload /></span>
            <span className="btn-text">Xuất dữ liệu</span>
        </button>
            {showModal && <ChartDownloadModal />}
        </>
    );
};

export default ExportReport; 