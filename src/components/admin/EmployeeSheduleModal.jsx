import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import tourApi from "../../services/adminApi";
import dayjs from "dayjs";

export default function EmployeeScheduleModal({ show, onClose, employee }) {
  const [schedules, setSchedules] = useState([]);
  const [tours, setTours] = useState([]);

  const [tourId, setTourId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shift, setShift] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [note, setNote] = useState("");

  const loadData = async () => {
    if (!employee) return;
    try {
      const sch = await tourApi.getScheduleByEmployeeId(employee.id);
      const t = await tourApi.getAllTourSchedule();
      console.log(sch, t);
      setSchedules(sch);
      setTours(t);
    } catch (err) {
      console.error("❌ Lỗi load data:", err);
    }
  };

  useEffect(() => {
    if (show) loadData();
  }, [show, employee]);

  const addSchedule = async () => {
    if (!tourId || !date || !startTime || !endTime)
      return alert("Nhập đầy đủ thông tin");

    try {
      await tourApi.addEmployeeSchedule({
        employee_id: employee.id,
        tour_id: tourId,
        schedule_date: date,
        start_time: startTime,
        end_time: endTime,
        shift: shift || "full-day",
        status: status || "scheduled",
        note,
      });

      // Reset form
      setTourId("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setShift("");
      setStatus("scheduled");
      setNote("");

      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSchedule = async (id) => {
    if (!window.confirm("Xác nhận xóa?")) return;
    try {
      await tourApi.deleteEmployeeSchedule(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Lịch trình nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row g-2 mb-3">
          <Form.Group className="col-md-3">
            <Form.Label>Tour</Form.Label>
            <Form.Select
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
            >
              <option value="">Chọn tour</option>
              {tours.map((t) => (
                <option key={t.id} value={t.id}>
                  {`${t.tour_title} - ${dayjs(t.start_date).format(
                    "DD/MM/YYYY"
                  )}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Label>Ngày</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Label>Bắt đầu</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Label>Kết thúc</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-1">
            <Form.Label>Ca</Form.Label>
            <Form.Control
              type="text"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-1">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-2" onClick={addSchedule}>
            Thêm
          </Button>
        </Form>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Tour</th>
              <th>Ngày</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Ca</th>
              <th>Status</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td>{s.tour_name}</td>
                <td>{dayjs(s.schedule_date).format("DD/MM/YYYY")}</td>
                <td>{s.start_time}</td>
                <td>{s.end_time}</td>
                <td>{s.shift}</td>
                <td>{s.status}</td>
                <td>{s.note}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteSchedule(s.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
