import React from "react";
import {
  Typography,
  Input,
  Select,
  Tabs,
  Card,
  Avatar,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Meta } = Card;

export const NetworkingHome: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Networking Hub
      </Title>

      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        style={{
          marginBottom: 24,
          width: "100%",
          justifyContent: isMobile ? "center" : "space-between",
        }}
      >
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search alumni..."
          style={{ width: isMobile ? "100%" : 240 }}
        />
        <Select
          mode="multiple"
          maxTagCount={"responsive"}
          size="large"
          style={{ width: isMobile ? "100%" : 240 }}
          placeholder="Filter by industry"
        >
          <Select.Option value="tech">Technology</Select.Option>
          <Select.Option value="finance">Finance</Select.Option>
          <Select.Option value="healthcare">Healthcare</Select.Option>
          <Select.Option value="education">Education</Select.Option>
        </Select>
      </Space>

      <Tabs defaultActiveKey="connections">
        <TabPane tab="Connections" key="connections">
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card
                  style={{
                    padding: 0,
                  }}
                  actions={[
                    <Button
                      key="connect"
                      type="primary"
                      style={{ width: "80%" }}
                    >
                      Connect
                    </Button>,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src={`/placeholder.svg?height=40&width=40`} />
                    }
                    title={`Alumni Name ${i}`}
                    description={
                      <>
                        <Text type="secondary">Class of 201{i}</Text>
                        <br />
                        <Text>Software Engineer at Tech Company {i}</Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Job Postings" key="jobs">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Meta
                  title={`Senior Developer at Tech Corp ${i}`}
                  description="San Francisco, CA (Remote Optional)"
                />
                <Text style={{ margin: "16px 0", display: "block" }}>
                  We're looking for an experienced developer to join our team...
                </Text>
                <Button type="primary">Apply Now</Button>
              </Card>
            ))}
          </Space>
        </TabPane>

        <TabPane tab="Mentorship" key="mentorship">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Meta
                  avatar={
                    <Avatar
                      src={`/placeholder.svg?height=40&width=40`}
                      icon={<UserOutlined />}
                    />
                  }
                  title={`Mentor Name ${i}`}
                  description="20+ years in Finance"
                />
                <Text style={{ margin: "16px 0", display: "block" }}>
                  Offering career guidance and industry insights for finance
                  graduates.
                </Text>
                <Button type="primary">Request Mentorship</Button>
              </Card>
            ))}
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
};
