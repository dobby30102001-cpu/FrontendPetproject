import { Modal, Form, Input, Select, Row, Col, Checkbox, Space } from "antd";
import { message } from "antd";
const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

const ANSWER_LABELS = ["A", "B", "C", "D"];

export default function CreateQuestionModal({
  open,
  onCancel,
  onSave,
  categories,
}) {
  const [form] = Form.useForm();

  const handleOk = () => form.submit();

  const handleFinish = (values) => {
    const answers = ANSWER_LABELS.map((label) => ({
      content: values[`answer_${label}`],
      isCorrect: values[`correct_${label}`] || false,
    }));

    // kiểm tra ít nhất 1 đáp án đúng
    if (!answers.some((a) => a.isCorrect)) {
      message.error("正解を少なくとも1つ選択してください");
      return;
    }

    const payload = {
      content: values.content,
      difficulty: values.difficulty,
      categoryId: values.categoryId,
      answers: answers,
    };

    onSave(payload);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="問題を作成"
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="作成"
      destroyOnHidden
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Nội dung câu hỏi */}
        <Form.Item
          label="問題"
          name="content"
          rules={[{ required: true, message: "問題の内容を入力してください" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Difficulty & Category */}
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="難易度"
              name="difficulty"
              rules={[{ required: true, message: "難易度を選択してください" }]}
            >
              <Select>
                {DIFFICULTIES.map((d) => (
                  <Select.Option key={d} value={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="カテゴリ"
              name="categoryId"
              rules={[{ required: true, message: "カテゴリを選択してください" }]}
            >
              <Select>
                {categories.map((c) => (
                  <Select.Option key={c.id} value={c.id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* 4 đáp án */}
        <Form.Item label="解答">
          <Space orientation="vertical" style={{ width: "100%" }}>
            {ANSWER_LABELS.map((label) => (
              <Row key={label} gutter={8} align="middle">
                {/* Checkbox đáp án đúng */}
                <Col flex="none">
                  <Form.Item
                    name={`correct_${label}`}
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>

                {/* Label A / B / C / D */}
                <Col flex="none">
                  <span style={{ fontWeight: 600, minWidth: 20 }}>
                    {label}.
                  </span>
                </Col>

                {/* Ô nhập nội dung đáp án */}
                <Col flex="auto">
                  <Form.Item
                    name={`answer_${label}`}
                    rules={[
                      {
                        required: true,
                        message: `解答${label}を入力してください`,
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder={`解答 ${label}`} />
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </Space>
        </Form.Item>
        {/* Nội dung chu thich */}
        <Form.Item label="解説" name="explanation">
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
