import React, { useState } from "react";
import {
  Typography,
  Calendar,
  Card,
  Select,
  Button,
  Space,
  Row,
  Col,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

const { Title, Text } = Typography;

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
}

export const EventsList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const events: Event[] = [
    { id: 1, title: "Alumni Homecoming", date: "2023-06-15", type: "Social" },
    { id: 2, title: "Career Fair", date: "2023-07-02", type: "Career" },
    {
      id: 3,
      title: "Fundraising Gala",
      date: "2023-08-10",
      type: "Fundraising",
    },
  ];

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Events Calendar
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Calendar
              fullscreen={false}
              onSelect={onDateSelect}
              style={{ maxWidth: "100%", overflow: "auto" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Browse and RSVP to upcoming alumni events">
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Filter by event type"
            >
              <Select.Option value="all">All Events</Select.Option>
              <Select.Option value="social">Social</Select.Option>
              <Select.Option value="career">Career</Select.Option>
              <Select.Option value="fundraising">Fundraising</Select.Option>
            </Select>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex", maxHeight: "400px", overflowY: "auto" }}
            >
              {events.map((event) => (
                <Card key={event.id} size="small" style={{ width: "100%" }}>
                  <Card.Meta title={event.title} description={event.type} />
                  <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <Space>
                      <CalendarOutlined />
                      <Text>{event.date}</Text>
                    </Space>
                  </div>
                  <Button type="primary" ghost block>
                    RSVP
                  </Button>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
      {selectedDate && (
        <Card style={{ marginTop: 16 }}>
          <Title level={4}>
            Selected Date: {selectedDate.format("DD MMM YYYY")}
          </Title>
        </Card>
      )}
    </div>
  );
};
