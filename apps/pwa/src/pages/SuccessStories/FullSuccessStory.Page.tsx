import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography, Space, Spin } from "antd";
import { useRouter } from "@/router/hooks";
import Card from "@/components/card";

const { Title, Text, Paragraph } = Typography;

type SuccessStory = {
  storyId: string;
  alumniId: string;
  storyTitle: string;
  storyContent: string;
  postedAt: string;
};

export const FullSuccessStory: React.FC = () => {
  const [story, setStory] = useState<SuccessStory | null>(null);
  const router = useRouter();
  const storyId = "1";
  useEffect(() => {
    const mockStory: SuccessStory = {
      storyId: storyId,
      alumniId: "A001",
      storyTitle: "From Classroom to CEO",
      storyContent:
        "After graduating from our esteemed university, I embarked on an entrepreneurial journey that led me to found a groundbreaking tech startup. The skills and knowledge I gained during my time at the university were instrumental in navigating the challenges of the business world. Our company has now grown to employ over 500 people and has made significant contributions to the field of artificial intelligence. I am grateful for the foundation that my alma mater provided, which has been crucial to my success.",
      postedAt: "2023-06-15T10:30:00Z",
    };
    setStory(mockStory);
  }, [storyId]);

  if (!story) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space align="center">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={`/placeholder.svg?height=64&width=64`}
            />
            <Space direction="vertical">
              <Title level={2} style={{ margin: 0 }}>
                {story.storyTitle}
              </Title>
              <Text type="secondary">
                Posted by Alumni {story.alumniId} on{" "}
                {new Date(story.postedAt).toLocaleDateString()}
              </Text>
            </Space>
          </Space>
          <Paragraph style={{ textAlign: "justify" }}>
            {story.storyContent}
          </Paragraph>
          <Button block type="primary" onClick={() => router.back()}>
            Back to All Stories
          </Button>
        </Space>
      </Card>
    </div>
  );
};
