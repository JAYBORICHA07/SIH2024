import React from "react";
import { Card, Typography, Form, Input, Radio, Button, message } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

// In a real application, you would fetch this data based on the event ID from the URL
const eventData = {
    id: "evt123456",
    title: "Annual Alumni Gala",
    date: "September 15, 2023",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Ballroom, University Center",
};

interface FormData {
    name: string;
    email: string;
    phone: string;
    graduationYear: string;
    dietaryRestrictions: string;
    attendeeType: string;
}

export const JobApplicationPage: React.FC = () => {
    const [form] = Form.useForm<FormData>();

    const handleSubmit = async (values: FormData) => {
        console.info("Submitting registration:", values);
        message.success("Registration submitted successfully!");
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <Card>
                <Title level={3}>Apply For Job</Title>
                <Paragraph>
                    Please fill out the form below to apply for this position {eventData.title}
                </Paragraph>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "Please input your full name!" },
                        ]}
                    >
                        <Input placeholder="Full Name" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email address!" },
                        ]}
                    >
                        <Input placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                    >
                        <Input placeholder="Phone Number" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="resume"
                        rules={[
                            { required: true, message: "Please input your resume url!" },
                        ]}
                    >
                        <Input placeholder="Resume URL" size="large" />
                    </Form.Item>

                    <Form.Item name="coverletter" rules={[{ required: true }]}>
                        <TextArea
                            size="large"
                            rows={4}
                            placeholder="Cover Letter (Tell us why you are interested in this position and what makes you a great candidate...)"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit Application
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
