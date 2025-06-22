import React, { useState } from "react";
import "./style.css";
import { MdAdd, MdDownload, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import ExportReport from '../ExportReport/ExportReport';

const FilterSelect = ({ value, onChange, options }) => {
  return (
    <select className="table-filter" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const SearchInput = ({ value, onChange, placeholder = "Tìm kiếm" }) => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        className="table-search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

// Custom Export Button component to handle async exportProps
const AsyncExportButton = ({ exportProps, onDefaultExport }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentExportProps, setCurrentExportProps] = useState(null);

  const handleExportClick = async () => {
    if (typeof exportProps === 'function') {
      setIsLoading(true);
      try {
        const resolvedProps = await exportProps();
        setCurrentExportProps(resolvedProps);
        // Trigger export immediately after resolving props
        setTimeout(() => {
          const exportButton = document.querySelector('.async-export-button');
          if (exportButton) {
            exportButton.click();
          }
        }, 100);
      } catch (error) {
        console.error('Error resolving export props:', error);
        if (onDefaultExport) {
          onDefaultExport();
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (typeof exportProps === 'function') {
    return (
      <>
        <button
          className="table-btn export-btn"
          onClick={handleExportClick}
          disabled={isLoading}
        >
          <span className="btn-icon">
            {isLoading ? (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #fff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            ) : (
              <MdDownload />
            )}
          </span>
          <span className="btn-text">{isLoading ? 'Đang tải...' : 'Xuất dữ liệu'}</span>
        </button>
        {currentExportProps && (
          <div style={{ display: 'none' }}>
            <ExportReport
              {...currentExportProps}
              buttonProps={{ className: 'async-export-button' }}
            />
          </div>
        )}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  return <ExportReport {...exportProps} />;
};

export default function Table({
  title = "Bảng dữ liệu",
  data = [],
  columns = [],
  onExport,
  onAdd,
  filterOptions = [],
  searchField = "name",
  renderCell = (row, column) => row[column.key],
  filterKey = "status",
  // Export Report props
  exportProps = null, // { overviewData, sheetsData, fileName, chartImages } or async function
  enableExport = true,
}) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter((row) => {
    const searchMatch = (row[searchField] || '').toLowerCase().includes(search.toLowerCase());
    const filterMatch = !filter || row[filterKey] === filter;
    return searchMatch && filterMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Default export handler if no exportProps provided
  const handleDefaultExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log("Xuất dữ liệu mặc định");
    }
  };

  // Prepare default export data if no exportProps provided
  const getDefaultExportProps = () => {
    if (exportProps) {
      return exportProps;
    }

    // Auto-generate export data from current table data
    const exportData = filteredData.map(row => {
      const exportRow = {};
      columns.forEach(column => {
        exportRow[column.label] = row[column.key] || '';
      });
      return exportRow;
    });

    return {
      overviewData: {
        'Tổng số bản ghi': filteredData.length,
        'Ngày xuất báo cáo': new Date().toLocaleDateString('vi-VN')
      },
      sheetsData: [
        {
          sheetName: title,
          data: exportData
        }
      ],
      fileName: `${title}_${new Date().toISOString().split('T')[0]}`,
      chartImages: []
    };
  };

  return (
    <div>
      <div className="table-header">
        <h2 className="table-title">{title}</h2>
      </div>
      <div className="table-toolbar">
        <div className="toolbar-left">
          {filterOptions.length > 0 && (
            <FilterSelect
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={filterOptions}
            />
          )}
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Tìm kiếm theo ${searchField === 'name' ? 'tên' : searchField}`}
          />
        </div>
        <div className="toolbar-right">
          {onAdd && (
            <button className="table-btn add-btn" onClick={onAdd}>
              <span className="btn-icon"><MdAdd size={20} /></span>
            </button>
          )}
          {enableExport && (
            <>
              {exportProps ? (
                // Use AsyncExportButton to handle both sync and async exportProps
                <AsyncExportButton
                  exportProps={exportProps}
                  onDefaultExport={handleDefaultExport}
                />
              ) : (
                // Use default export button if no exportProps
                <button className="table-btn export-btn" onClick={handleDefaultExport}>
                  <span className="btn-icon"><MdDownload /></span>
                  <span className="btn-text">Xuất dữ liệu</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="table-wrapper">
        <table className="table-styled">
          <thead>
            <tr>
              <th className="table-th"></th>
              {columns.map((col) => (
                <th className="table-th" key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className={`table-tr${selected.includes(row.id) ? " selected" : ""}`}
              >
                <td className="table-td">
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td className="table-td" key={column.key}>
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <MdChevronLeft size={20} />
            </button>
            <span className="pagination-info">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}