import { Drawer, Tag, Typography, Divider, Card } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function ViewStudentDrawer({ student, onClose }) {
  return (
    <Drawer
      title="試験詳細"
      open={!!student}
      onClose={onClose}
      style={{ width: 850 }}
    >
      {student && (
        <Card style={{ borderRadius: 10 }}>
          <Title level={5}>{student.exam?.title}</Title>

          <Divider />

          <Text>
            <b>試験コード:</b> {student.exam?.code}
          </Text>
          <br />

          <Text>
            <b>学生:</b>{" "}
            {student.student?.firstName} {student.student?.lastName}
          </Text>
          <br />

          <Text>
            <b>開始時刻:</b> {dayjs(student.startTime).format("YYYY/MM/DD HH:mm")}
          </Text>
          <br />

          <Text>
            <b>終了時刻:</b> {dayjs(student.endTime).format("YYYY/MM/DD HH:mm")}
          </Text>
          <br />

          <Divider />

          <Text>
            <b>得点:</b>{" "}
            <Tag
              color={
                student.score >= 8
                  ? "green"
                  : student.score >= 6
                  ? "orange"
                  : "red"
              }
            >
              {student.score?.toFixed(1)}
            </Tag>
          </Text>
        </Card>
      )}
    </Drawer>
  );
}