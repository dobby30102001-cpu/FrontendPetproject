import { useState, useMemo, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Checkbox,
  Button,
  Tooltip,
  Switch,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CreateQuestionModal from "./Createquestionmodal";

const { Text } = Typography;
const { Option } = Select;

const DIFF_MAP = {
  EASY: { color: "success", label: "易しい" },
  MEDIUM: { color: "warning", label: "普通" },
  HARD: { color: "error", label: "難しい" },
};

export default function ExamFormModal({
  exam,
  questions: initialQuestions,
  categories,
  onClose,
  onSave,
  onCreateQuestion,
}) {
  const [form] = Form.useForm();
  const [selectedIds, setSelectedIds] = useState([]);
  const [qSearch, setQSearch] = useState("");
  const [qCat, setQCat] = useState("");
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [createQOpen, setCreateQOpen] = useState(false);

  useEffect(() => {
    setQuestions(initialQuestions || []);
  }, [initialQuestions]);

  useEffect(() => {
    if (exam) {
      form.setFieldsValue({
        code: exam.code,
        title: exam.title,
        duration: exam.duration ? convertToMinutes(exam.duration) : undefined,
        category: exam.category,
        examType: exam.examType,
        reviewAllowed: exam.reviewAllowed,
        passScore: exam.passScore,
      });
      if (exam.questionIds) setSelectedIds(exam.questionIds);
    } else {
      form.resetFields();
      setSelectedIds([]);
    }
  }, [exam]);

  function convertToMinutes(time) {
    if (!time) return undefined;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function convertToTime(minutes) {
    if (minutes === undefined) return undefined;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
  }

  const filteredQ = useMemo(() => {
    let d = questions;

    if (qSearch) {
      d = d.filter((q) =>
        q.content.toLowerCase().includes(qSearch.toLowerCase()),
      );
    }

    if (qCat) {
      d = d.filter((q) => q.category === qCat);
    }

    return d;
  }, [questions, qSearch, qCat]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({
        ...values,
        duration: convertToTime(values.duration),
        questionIds: selectedIds,
      });
    } catch (error) {
      console.error("Validate failed:", error);
    }
  };

  const toggleQuestion = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleCreateQuestion = async (payload) => {
    try {
      let newQuestion;
      if (onCreateQuestion) {
        newQuestion = await onCreateQuestion(payload);
      } else {
        newQuestion = { id: Date.now(), ...payload };
      }
      if (newQuestion?.id) {
        setQuestions((prev) => [...prev, newQuestion]);
        setSelectedIds((prev) => [...prev, newQuestion.id]);
      }
      setCreateQOpen(false);
    } catch (err) {
      console.error("Tạo câu hỏi thất bại:", err);
    }
  };

  return (
    <>
      <Modal
        title={exam ? "試験を編集" : "試験を作成"}
        open
        onCancel={onClose}
        onOk={handleOk}
        okText={exam ? "保存" : "試験を作成"}
        cancelText="キャンセル"
        width={680}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            code: exam?.code,
            title: exam?.title,
            duration: convertToMinutes(exam?.duration),
            category: exam?.category,
          }}
          onValuesChange={(changedValues) => {
            if (changedValues.examType) {
              if (changedValues.examType === "PRACTICE") {
                form.setFieldsValue({ reviewAllowed: true });
              } else if (changedValues.examType === "OFFICIAL") {
                form.setFieldsValue({ reviewAllowed: false });
              }
            }
          }}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="試験コード"
                rules={[{ required: true, message: "必須項目です" }]}
              >
                <Input placeholder="例：EX006" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="時間（分）"
                rules={[{ required: true, message: "必須項目です" }]}
              >
                <InputNumber
                  min={1}
                  placeholder="30"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="title"
            label="試験名"
            rules={[{ required: true, message: "必須項目です" }]}
          >
            <Input placeholder="例：Java Advanced Test" />
          </Form.Item>

          <Form.Item
            name="category"
            label="カテゴリ"
            rules={[{ required: true, message: "必須項目です" }]}
          >
            <Select placeholder="カテゴリを選択">
              {(categories || []).map((c) => (
                <Option key={c.id} value={c.name}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
            {/* Label Cài đặt */}
            <Text strong style={{ fontSize: 16 }}>
              ⚙️ 試験設定
            </Text>

            <Row gutter={12} style={{ marginTop: 12, alignItems: "center" }}>
              {/* Loại đề thi */}
              <Col span={8}>
                <Form.Item
                  name="examType"
                  label="試験種別"
                  rules={[{ required: true, message: "必須項目です" }]}
                >
                  <Select placeholder="種別を選択">
                    <Option value="PRACTICE">練習</Option>
                    <Option value="OFFICIAL">本試験</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Allow review - căn giữa + spacing */}
              <Col span={7} style={{ textAlign: "center", marginLeft: 20 }}>
                <Form.Item
                  name="reviewAllowed"
                  label="復習を許可"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch
                    style={{ marginTop: 1 }}
                    disabled={form.getFieldValue("examType") === "OFFICIAL"}
                  />
                </Form.Item>
              </Col>

              {/* Pass score */}
              <Col span={8}>
                <Form.Item
                  name="passScore"
                  label="合格点"
                  rules={[{ required: true, message: "必須項目です" }]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ width: "100%" }}
                    placeholder="例：50"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>

        {/* ── Phần chọn câu hỏi ── */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text strong>問題バンクから問題を選択</Text>
            <Space>
              <Text type="secondary">
                選択済み: <b>{selectedIds.length}</b>
              </Text>
              <Tooltip title="新しい問題を作成して試験に追加">
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateQOpen(true)}
                >
                  問題を作成
                </Button>
              </Tooltip>
            </Space>
          </div>

          {/* Thanh tìm kiếm */}
          <Row gutter={8} style={{ marginBottom: 10 }}>
            <Col flex={1}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="問題を検索..."
                value={qSearch}
                onChange={(e) => setQSearch(e.target.value)}
              />
            </Col>
            <Col>
              <Select
                value={qCat}
                onChange={setQCat}
                style={{ width: 150 }}
                placeholder="すべて"
              >
                <Option value="">すべて</Option>
                {categories.map((c) => (
                  <Option key={c.id} value={c.name}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          {/* Danh sách câu hỏi */}
          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {filteredQ.length === 0 && (
              <Text
                type="secondary"
                style={{
                  textAlign: "center",
                  padding: "16px 0",
                  display: "block",
                }}
              >
                問題がありません。新しい問題を作成してください！
              </Text>
            )}
            {filteredQ.map((q) => {
              const sel = selectedIds.includes(q.id);
              const diff = DIFF_MAP[q.difficulty];
              return (
                <div
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${sel ? "#b7eb8f" : "#f0f0f0"}`,
                    background: sel ? "#f6ffed" : "#fafafa",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <Checkbox checked={sel} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text ellipsis style={{ display: "block" }}>
                      {q.content}
                    </Text>
                    <Space size={4} style={{ marginTop: 3 }}>
                      {diff && <Tag color={diff.color}>{diff.label}</Tag>}
                      {q.category && <Tag>{q.category}</Tag>}
                    </Space>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Modal tạo câu hỏi — hiển thị phía trên */}
      <CreateQuestionModal
        open={createQOpen}
        onCancel={() => setCreateQOpen(false)}
        onSave={handleCreateQuestion}
        categories={categories}
      />
    </>
  );
}
