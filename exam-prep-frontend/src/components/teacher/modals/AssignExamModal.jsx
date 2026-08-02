import { useState, useEffect } from "react";
import { Modal, Select, InputNumber, message } from "antd";

export default function AssignExamModal({
  open,
  onClose,
  onSubmit,
  exams = [],
}) {
  const [examId, setExamId] = useState();
  const [duration, setDuration] = useState(60);

  // reset khi mở modal
  useEffect(() => {
    if (open) {
      setExamId(undefined);
      setDuration(60);
    }
  }, [open]);

  const handleOk = () => {
    if (!examId) {
      message.warning("試験を選択してください！");
      return;
    }

    onSubmit({ examId, duration });
  };

  return (
    <Modal
      title="クラスに試験を割り当て"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okButtonProps={{ disabled: !examId }}
    >
      {/* Chọn đề */}
      <div style={{ marginBottom: 16 }}>
        <label>試験を選択</label>
        <Select
          value={examId}
          style={{ width: "100%" }}
          placeholder="試験を選択"
          onChange={setExamId}
        >
          {exams.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.title}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Thời gian */}
      <div>
        <label>時間（分）</label>
        <InputNumber
          min={10}
          max={180}
          value={duration}
          onChange={setDuration}
          style={{ width: "100%" }}
        />
      </div>
    </Modal>
  );
}
