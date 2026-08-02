import { Drawer, Tag, Typography, Divider, List, Card, Space } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function ViewClassDrawer({ data, onClose }) {
  return (
    <Drawer
      title="クラス詳細"
      open={!!data}
      onClose={onClose}
      style={{ width: 500 }}
    >
      {data && (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <Card style={{ marginBottom: 16 }}>
            <Title level={5}>{data.name}</Title>

            <Space>
              <Tag color="blue">{data.studentCount} 名の学生</Tag>
              <Tag color="purple">{data.exams.length} 件の試験</Tag>
            </Space>
          </Card>

          <Divider>試験一覧</Divider>

          <div>
            <List
              dataSource={data.exams}
              renderItem={(e) => (
                <Card
                  size="small"
                  style={{
                    marginBottom: 12,
                    borderRadius: 12,
                  }}
                >
                  <Space
                    orientation="vertical"
                    style={{ width: "100%" }}
                    size={4}
                  >
                    {/* Title */}
                    <Text strong style={{ fontSize: 15 }}>
                      {e.title}
                    </Text>

                    {/* Row info */}
                    <Space wrap size="small">
                      <Tag color="blue">コード: {e.code}</Tag>
                      <Tag color="green">カテゴリ: {e.category?.name}</Tag>
                      <Tag>時間: {e.duration}</Tag>
                    </Space>

                    {/* Date */}
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {dayjs(e.createDate).format("YYYY/MM/DD HH:mm")}
                    </Text>
                  </Space>
                </Card>
              )}
            />
          </div>
        </div>
      )}
    </Drawer>
  );
}
