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
import { toast } from "react-toastify";

export default function TourScheduleModal({ show, onClose, tour }) {
  // ==== State ====
  const [departures, setDepartures] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]); // tất cả dịch vụ
  const [tourServices, setTourServices] = useState([]); // dịch vụ tour

  const [startDate, setStartDate] = useState("");
  const [seatTotal, setSeatTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [dayNumber, setDayNumber] = useState(1);
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState("");
  const [locationId, setLocationId] = useState("");

  const [departurePage, setDeparturePage] = useState(1);
  const [itineraryPage, setItineraryPage] = useState(1);
  const [servicePage, setServicePage] = useState(1);
  const itemsPerPage = 5;

  // ==== Load data từ API ====
  const loadData = async () => {
    if (!tour) return;
    try {
      const depRes = await tourApi.getTourScheduleByTourId(tour.id);
      const itinRes = await tourItineraryApi.getByTourId(tour.id);
      const locRes = await tourApi.getLocations();
      const servRes = await tourApi.getServices();
      const tourServRes = await tourApi.getServiceByTourId(tour.id);

      setDepartures(depRes);
      setItineraries(itinRes);
      setLocations(locRes);
      setServices(servRes);
      setTourServices(tourServRes);
    } catch (err) {
      console.error("❌ Lỗi load data:", err);
    }
  };

  useEffect(() => {
    if (show) loadData();
  }, [show, tour]);

  // ==== Departures ====
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
      setStartDate("");
      setSeatTotal(0);
      setPrice(0);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDeparture = async (id) => {
    if (!window.confirm("Xác nhận xóa?")) return;
    try {
      await tourApi.deleteSchedule(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==== Itineraries ====
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

  const deleteItinerary = async (id) => {
    if (!window.confirm("Xác nhận xóa?")) return;
    try {
      await tourItineraryApi.delete(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==== Services ====
  const addServiceToTour = async (serviceId) => {
    // Lấy service muốn thêm
    const serviceToAdd = services.find((s) => s.id === serviceId);
    if (!serviceToAdd) return;

    // Kiểm tra điều kiện
    if (
      serviceToAdd.type === "transport" &&
      tourServices.some((ts) => ts.type === "transport")
    ) {
      return toast.error(
        "Chỉ được thêm 1 dịch vụ loại transport cho mỗi tour!"
      );
    }
    try {
      await tourApi.addToTour({
        tour_id: tour.id,
        service_id: serviceId,
      });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const removeServiceFromTour = async (id) => {
    if (!window.confirm("Xác nhận xóa dịch vụ khỏi tour?")) return;
    try {
      await tourApi.deleleServiceFromTour(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==== Pagination helper ====
  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  // ==== Render ====
  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Quản lý lịch trình tour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="depart">
          {/* Tab 1: Chuyến khởi hành */}
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

          {/* Tab 2: Lịch trình chi tiết */}
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

          {/* Tab 3: Dịch vụ tour */}
          <Tab eventKey="services" title="Dịch vụ tour">
            <Table striped bordered className="mt-3">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Mô tả</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(services, servicePage).map((s) => {
                  const attachedService = tourServices.find(
                    (ts) => ts.service_id === s.id
                  );
                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.details}</td>
                      <td>
                        {attachedService ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              removeServiceFromTour(attachedService.id)
                            }
                          >
                            Xóa
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => addServiceToTour(s.id)}
                          >
                            Thêm
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Pagination>
              {Array.from(
                { length: Math.ceil(services.length / itemsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === servicePage}
                    onClick={() => setServicePage(i + 1)}
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
