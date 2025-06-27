import React from "react";
import DatePicker from "react-datepicker";
import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const DatePickerModal = ({ show, onClose, onConfirm, selectedDate, setSelectedDate, savedTour }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">{savedTour?.tour?.title}</h3>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Nhấn để chọn ngày"
            className="date-input"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="custom-header">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="nav-arrow"
                >
                  <FaArrowLeft />
                </button>
                <span className="month-title">
                  {monthDate.toLocaleString("vi-VN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="nav-arrow"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>
        {selectedDate && (
          <div className="selected-date-info">
            <span>Ngày đã chọn: <b>{selectedDate.toLocaleDateString('vi-VN')}</b></span>
          </div>
        )}
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Xác nhận
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Hủy
          </button>
          {selectedDate && (
            <button className="clear-btn" onClick={() => setSelectedDate(null)}>
              Xóa ngày
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;