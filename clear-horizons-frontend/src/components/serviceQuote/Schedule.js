import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/Schedule.module.css';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL;

const Schedule = ({ selectedServices, onNext }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthAvailability, setMonthAvailability] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the job type ID from the first selected service
  const jobTypeId = selectedServices && selectedServices.length > 0 ? selectedServices[0].id : null;

  // Fetch month availability when month or job type changes
  useEffect(() => {
    if (!jobTypeId) return;
    
    const fetchMonthAvailability = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}price_configurations/month_availability/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1, // JavaScript months are 0-indexed
            job_type_id: jobTypeId,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch availability');
        }
        
        const data = await response.json();
        setMonthAvailability(data.availability);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMonthAvailability();
  }, [currentMonth, jobTypeId]);

  // Fetch time slots when a date is selected
  useEffect(() => {
    if (!selectedDate || !jobTypeId) return;
    
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`${API_URL}price_configurations/check_availability/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
            job_type_id: jobTypeId,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch time slots');
        }
        
        const data = await response.json();
        setAvailableTimeSlots(data.available_time_slots || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching time slots:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeSlots();
  }, [selectedDate, jobTypeId]);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDateClick = (day) => {
    // Find if this day has availability
    const dayAvailability = monthAvailability.find(
      item => format(parseISO(item.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    
    if (dayAvailability && dayAvailability.has_availability) {
      setSelectedDate(day);
      setSelectedTimeSlot(null);
      setSelectedEmployee(null);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedEmployee(null);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTimeSlot && selectedEmployee) {
      onNext({
        scheduled_date: format(selectedDate, 'yyyy-MM-dd'),
        scheduled_time: selectedTimeSlot.time,
        employee_id: selectedEmployee.id,
        employee_name: selectedEmployee.name
      });
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button onClick={prevMonth}>&lt;</button>
          <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        
        <div className={styles.weekdays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={styles.weekday}>{day}</div>
          ))}
        </div>
        
        <div className={styles.days}>
          {/* Add empty cells for days of the week before the first of the month */}
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.emptyDay}></div>
          ))}
          
          {dateRange.map(day => {
            // Find if this day has availability
            const dayAvailability = monthAvailability.find(
              item => format(parseISO(item.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );
            
            const isAvailable = dayAvailability && dayAvailability.has_availability;
            const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            
            return (
              <div
                key={day.toString()}
                className={`
                  ${styles.day}
                  ${!isSameMonth(day, monthStart) ? styles.disabled : ''}
                  ${isToday(day) ? styles.today : ''}
                  ${isAvailable ? styles.available : styles.unavailable}
                  ${isSelected ? styles.selected : ''}
                `}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;
    
    if (availableTimeSlots.length === 0) {
      return <p>No available time slots for this date.</p>;
    }
    
    return (
      <div className={styles.timeSlots}>
        <h3>Available Times</h3>
        <div className={styles.timeSlotList}>
          {availableTimeSlots.map((slot, index) => (
            <div
              key={index}
              className={`${styles.timeSlot} ${selectedTimeSlot === slot ? styles.selected : ''}`}
              onClick={() => handleTimeSlotSelect(slot)}
            >
              {format(parseISO(`2000-01-01T${slot.time}`), 'h:mm a')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmployees = () => {
    if (!selectedTimeSlot) return null;
    
    return (
      <div className={styles.employees}>
        <h3>Available Employees</h3>
        <div className={styles.employeeList}>
          {selectedTimeSlot.available_employees.map(employee => (
            <div
              key={employee.id}
              className={`${styles.employee} ${selectedEmployee && selectedEmployee.id === employee.id ? styles.selected : ''}`}
              onClick={() => handleEmployeeSelect(employee)}
            >
              {employee.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading && !monthAvailability.length) {
    return <div className={styles.loading}>Loading calendar...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Schedule Service</h2>
      <div className={styles.scheduleContainer}>
        {renderCalendar()}
        <div className={styles.selectionContainer}>
          {renderTimeSlots()}
          {renderEmployees()}
        </div>
      </div>
      
      <button 
        onClick={handleSubmit} 
        className={!selectedDate || !selectedTimeSlot || !selectedEmployee ? styles.disabled : ''}
        disabled={!selectedDate || !selectedTimeSlot || !selectedEmployee}
      >
        NEXT
      </button>
    </div>
  );
};

export default Schedule; 