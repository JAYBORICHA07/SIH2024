import React from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  message,
  Flex,
  Typography,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useRouter } from "@/router/hooks";

type EventData = {
  title: string;
  description: string;
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  location: string;
  type: string;
  capacity: string;
};

const { Option } = Select;
const { TextArea } = Input;

export const EventCreation: React.FC = () => {
  const [form] = Form.useForm<EventData>();
  const router = useRouter();

  const onFinish = async (values: EventData) => {
    try {
      const event = await trpcFetch.addEvent.mutate({
        title: values.title,
        description: values.description,
        date: values.date?.format("MMMM D, YYYY") || "",
        time: `${values.startTime?.format("HH:mm")} - ${values.endTime?.format("HH:mm")}`,
        location: values.location,
        type: values.type,
        capacity: values.capacity,
      });
      console.info(event);
      message.success("Event created successfully");
      router.push("/event/list");
    } catch (error) {
      console.error(error);
      message.error("Failed to create event");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card className="shadow-lg">
        <Typography.Title level={2}>Create New Event</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Flex vertical gap={"small"} className="px-4 py-4">
            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Please input the event title!" },
                ]}
              >
                <Input size="large" placeholder="Event Title" />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="date"
                rules={[
                  { required: true, message: "Please select the event date!" },
                ]}
                style={{ flex: 1, minWidth: "200px" }}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Event Date"
                />
              </Form.Item>
            </Flex>
            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="type"
                rules={[
                  { required: true, message: "Please select the event type!" },
                ]}
                style={{ flex: 1, minWidth: "200px" }}
              >
                <Select size="large" placeholder="Select event type">
                  <Option value="Social Gathering">Social Gathering</Option>
                  <Option value="Career Fair">Career Fair</Option>
                  <Option value="Workshop">Workshop</Option>
                  <Option value="Fundraiser">Fundraiser</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Flex>

            <Flex gap={4} wrap="wrap" vertical>
              <Flex gap={4} wrap="wrap">
                <Form.Item
                  name="startTime"
                  rules={[
                    { required: true, message: "Please input the start time!" },
                  ]}
                  style={{ flex: 1, minWidth: "200px" }}
                >
                  <TimePicker
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Start Time"
                  />
                </Form.Item>
                <Form.Item
                  name="endTime"
                  rules={[
                    { required: true, message: "Please input the end time!" },
                  ]}
                  style={{ flex: 1, minWidth: "200px" }}
                >
                  <TimePicker
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="End Time"
                  />
                </Form.Item>
              </Flex>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please input the event location!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<EnvironmentOutlined />}
                  placeholder="Location"
                />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="capacity"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input a valid capacity!",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="number"
                  placeholder="Enter maximum number of attendees"
                />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item name="description" rules={[{ required: true }]}>
                <TextArea
                  size="large"
                  rows={4}
                  placeholder="Provide a detailed description of the event"
                />
              </Form.Item>
            </Flex>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Create Event
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};
