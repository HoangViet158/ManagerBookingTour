import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Tabs,
  Tab,
  Pagination,
} from "react-bootstrap";
import tourApi from "../../services/adminApi";
import tourItineraryApi from "../../services/tourItineraryApi";
import dayjs from "dayjs";

export default function TourScheduleModal({ show, onClose, tour }) {
  const [departures, setDepartures] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [locations, setLocations] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [seatTotal, setSeatTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const [dayNumber, setDayNumber] = useState(1);
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState("");
  const [locationId, setLocationId] = useState("");

  // Pagination state
  const [departurePage, setDeparturePage] = useState(1);
  const [itineraryPage, setItineraryPage] = useState(1);
  const itemsPerPage = 5;

  // Load data from API
  const loadData = async () => {
    if (!tour) return;
    try {
      const depRes = await tourApi.getTourScheduleByTourId(tour.id);
      const itinRes = await tourItineraryApi.getByTourId(tour.id);
      const locRes = await tourApi.getLocations(); // API trả về tất cả địa điểm
      setDepartures(depRes);
      setItineraries(itinRes);
      setLocations(locRes);
    } catch (err) {
      console.error("❌ Lỗi load data:", err);
    }
  };

  useEffect(() => {
    if (show) loadData();
  }, [show, tour]);

  // Add departure
  const addDeparture = async () => {
    if (!startDate || !seatTotal) return alert("Nhập ngày và số chỗ");
    try {
      await tourApi.addSchedule({
        tour_id: tour.id,
        start_date: dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss"),
        end_date: dayjs(startDate)
          .add(tour.duration_days - 1, "day")
          .format("YYYY-MM-DDTHH:mm:ss"),
        seats_total: seatTotal,
        seats_booked: 0,
        price_per_person: price,
        status: "open",
      });
      // reset form
      setStartDate("");
      setSeatTotal(0);
      setPrice(0);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete departure
  const deleteDeparture = async (id) => {
    if (!window.confirm("Xác nhận xóa?")) return;
    try {
      await tourApi.deleteSchedule(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add itinerary
  const addItinerary = async () => {
    if (!dayNumber || !title || !locationId)
      return alert("Nhập đầy đủ thông tin");
    try {
      await tourItineraryApi.add({
        tour_id: tour.id,
        day_number: dayNumber,
        title,
        description: activity,
        location_id: locationId,
      });
      setDayNumber(1);
      setTitle("");
      setActivity("");
      setLocationId("");
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete itinerary
  const deleteItinerary = async (id) => {
    if (!window.confirm("Xác nhận xóa?")) return;
    try {
      await tourItineraryApi.delete(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination helper
  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Quản lý lịch trình tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="depart">
          {/* TAB 1: Chuyến khởi hành */}
          <Tab eventKey="depart" title="Chuyến khởi hành">
            <Form className="row g-2 mt-3">
              <Form.Group className="col-md-4">
                <Form.Label>Ngày khởi hành</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={startDate}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Số chỗ</Form.Label>
                <Form.Control
                  type="number"
                  value={seatTotal}
                  min={tour ? tour.min_participants : 1}
                  max={tour ? tour.max_participants : 1}
                  onChange={(e) => setSeatTotal(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-2" onClick={addDeparture}>
                Thêm
              </Button>
            </Form>

            <hr />
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Ngày đi</th>
                  <th>Ngày về</th>
                  <th>Tổng chỗ</th>
                  <th>Chỗ đã đặt</th>
                  <th>Giá</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(departures, departurePage).map((d) => (
                  <tr key={d.id}>
                    <td>{dayjs(d.start_date).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{dayjs(d.end_date).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{d.seats_total}</td>
                    <td>{d.seats_booked}</td>
                    <td>{d.price_per_person}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteDeparture(d.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              {Array.from(
                { length: Math.ceil(departures.length / itemsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === departurePage}
                    onClick={() => setDeparturePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </Tab>

          {/* TAB 2: Lịch trình chi tiết */}
          <Tab eventKey="detail" title="Lịch trình chi tiết">
            <Form className="row g-2 mt-3">
              <Form.Group className="col-md-2">
                <Form.Label>Ngày thứ</Form.Label>
                <Form.Control
                  type="number"
                  value={dayNumber}
                  min={1}
                  max={tour ? tour.duration_days : 1}
                  onChange={(e) => setDayNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Hoạt động</Form.Label>
                <Form.Control
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-2">
                <Form.Label>Địa điểm</Form.Label>
                <Form.Select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                >
                  <option value="">Chọn địa điểm</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button className="mt-2" onClick={addItinerary}>
                Thêm
              </Button>
            </Form>

            <hr />
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Ngày thứ</th>
                  <th>Tiêu đề</th>
                  <th>Hoạt động</th>
                  <th>Địa điểm</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(itineraries, itineraryPage).map((d) => (
                  <tr key={d.id}>
                    <td>{d.day_number}</td>
                    <td>{d.title}</td>
                    <td>{d.description}</td>
                    <td>
                      {locations.find((l) => l.id === d.location_id)?.name}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteItinerary(d.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              {Array.from(
                { length: Math.ceil(itineraries.length / itemsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === itineraryPage}
                    onClick={() => setItineraryPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
