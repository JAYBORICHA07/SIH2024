import { trpcFetch } from "@/trpc/trpcFetch";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { 
    Avatar, 
    Button, 
    Card, 
    Col, 
    Input, 
    Row, 
    Select, 
    Space, 
    Tabs, 
    Typography 
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Meta from "antd/es/card/Meta";
import { User } from "../Job/JobApplicationPage";
const { Title, Text } = Typography;

export interface ConnectionUser extends User{
    send: boolean;
}

export const SearchConnection: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [users, setUsers] = useState<ConnectionUser[]>();

    useEffect(() => {
        trpcFetch.getAllProfiles.query().then((data) => {
            const useData = data.map((user: User) => {
                return {
                    ...user,
                    send: false,
                }
            });
            setUsers(useData);
        });
    }, []);

    const connectPerson = (alumniId: string) => {
        trpcFetch.networking.createNetworkingHub
            .query({ alumniId }).then(() => {
                const updatedUsers = users?.map((user) => {
                    if (user.id === alumniId) {
                        return {
                            ...user,
                            send: true,
                        };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            }).catch((err) => {
                console.error(err);
            });
    }

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
            <Title level={2} style={{ marginBottom: 24 }}>
                Search Connection
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
                <TabPane tab="Connections" key="connections" >
                    <Row gutter={[16, 16]}>
                        {users?.map((user) => (
                            <Col xs={24} sm={12} lg={8} key={user.id} >
                                <Card
                                    style={
                                        {
                                            padding: 0,
                                        }
                                    }
                                    actions={
                                        [
                                            <Button
                                                key="connect"
                                                type="primary"
                                                style={{ width: "80%" }}
                                                onClick={() => connectPerson(user.id)}
                                            >
                                                {user.send ? "Sent" : "Connect"}
                                            </Button>,
                                        ]
                                    }
                                >
                                    <Meta
                                        avatar={<Avatar src={user?.profilePicture ?? ""} />}
                                        title={`${user.name}`}
                                        description={
                                            <>
                                                <Text type="secondary" >
                                                    Class of {user?.graduationYear}
                                                </Text>
                                                < br />
                                                <Text>
                                                    {user.currRole} at {user.currCompany}
                                                </Text>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </TabPane>

            </Tabs>
        </div>
    )
}
