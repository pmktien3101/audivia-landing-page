import React, { useState } from "react";
import "./style.css";
import { MdAdd, MdDownload, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

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
              <span className="btn-icon"><MdAdd size={20}/></span>
            </button>
          )}
          {onExport && (
            <button className="table-btn export-btn" onClick={onExport}>
              <span className="btn-icon"><MdDownload/></span>
              <span className="btn-text">Xuất dữ liệu</span>
            </button>
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
