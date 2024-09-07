import React from "react";
import { Card, Typography, Button, Space, Avatar, Tooltip } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// In a real application, you would fetch this data based on the event ID from the URL
const eventData = {
  id: "evt123456",
  title: "Annual Alumni Gala",
  date: "September 15, 2023",
  time: "7:00 PM - 11:00 PM",
  location: "Grand Ballroom, University Center",
  type: "Social Gathering",
  description:
    "Join us for an evening of celebration, networking, and reminiscing about our alma mater. This year's gala will feature distinguished alumni speakers, a silent auction to support student scholarships, and live entertainment. Don't miss this opportunity to reconnect with old friends and make new connections within our vibrant alumni community.",
  capacity: 250,
  attendees: [
    { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  ],
};

export const EventDetails: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: `Check out this event: ${eventData.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Share this link: ${window.location.href}`);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Title level={2}>{eventData.title}</Title>
              <Text type="secondary">{eventData.type}</Text>
            </div>
            <Button icon={<ShareAltOutlined />} onClick={handleShare} />
          </div>

          <Space direction="vertical">
            <Space>
              <CalendarOutlined />
              <Text>{eventData.date}</Text>
            </Space>
            <Space>
              <ClockCircleOutlined />
              <Text>{eventData.time}</Text>
            </Space>
            <Space>
              <EnvironmentOutlined />
              <Text>{eventData.location}</Text>
            </Space>
            <Space>
              <UsergroupAddOutlined />
              <Text>Capacity: {eventData.capacity}</Text>
            </Space>
          </Space>

          <div>
            <Title level={4}>Event Description</Title>
            <Paragraph>{eventData.description}</Paragraph>
          </div>

          <div>
            <Title level={4}>Attendees</Title>
            <Avatar.Group maxCount={4}>
              {eventData.attendees.map((attendee, index) => (
                <Tooltip key={index} title={attendee.name}>
                  <Avatar src={attendee.avatar} alt={attendee.name}>
                    {attendee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                </Tooltip>
              ))}
              <Avatar style={{ backgroundColor: "#f56a00" }}>
                +{eventData.capacity - eventData.attendees.length}
              </Avatar>
            </Avatar.Group>
          </div>

          <Button type="primary" block>
            Register for Event
          </Button>
        </Space>
      </Card>
    </div>
  );
};
