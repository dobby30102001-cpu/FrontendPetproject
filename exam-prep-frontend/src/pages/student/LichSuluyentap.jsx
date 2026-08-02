import React, { useState, useMemo, useEffect } from "react";
import { Card, Tag, Input, Typography, Row, Col, Progress, Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
// import View from "../../components/student/LichSuThi/View";
import { getAttemptsByExamType } from "../../services/student/studentServices";

const LichSuluyentap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [openModal, setOpenModal] = useState(false);
  // const [selectedExam, setSelectedExam] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // 🔥 load 4 card

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAttemptsByExamType("PRACTICE", {
          page: 0,
          size: 50,
          sort: ["id,desc"],
        });

        const raw = res?.data?.data?.content || res?.data?.content || [];

        const mapped = raw.map((item) => {
  const total =
    (item.correctCount ?? 0) +
    (item.wrongCount ?? 0) +
    (item.blankCount ?? 0);

  const isPass = (item.score ?? 0) >= 5;

  return {
    id: item.id,
    title: item.exam?.title || "タイトルなし",
    date: item.startTime
      ? new Date(item.startTime).toLocaleDateString("ja-JP")
      : "N/A",

    // ✅ thêm dòng này
    endTime: item.endTime
      ? new Date(item.endTime).toLocaleTimeString("ja-JP")
      : "未完了",

    duration: item.exam?.duration || "0",
    type: item.exam?.examType === "OFFICIAL" ? "本試験" : "練習",
    score: item.score ?? 0,
    correct: item.correctCount ?? 0,
    wrong: item.wrongCount ?? 0,
    total,
    timeDone: `${item.timeSpentSeconds ?? 0}s`,
    status: isPass ? "合格" : "不合格",
    isPass,
    rawData: item,
  };
});

        setHistoryData(mapped);
      } catch (err) {
        console.error("Lỗi API:", err);
        setHistoryData([]);
      }
    };

    fetchData();
  }, []);

  const filteredHistory = useMemo(() => {
    return historyData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, historyData]);

  return (
    <div style={{ padding: "24px" }}>
      <h1>練習履歴</h1>
      <p style={{ marginBottom: "32px", color: "#666" }}>
        練習の履歴を確認できます
      </p>

      {/* SEARCH */}
    <div style={{ marginBottom: "24px" }}>
            <Input
              className="search-input"
              prefix={<FontAwesomeIcon icon={faSearch} />}
              placeholder="タイトル、科目で試験を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: 400 }}
            />
          </div>

      {/* LIST */}
      <Row gutter={[16, 24]}>
        {filteredHistory.slice(0, visibleCount).map((exam) => (
          <Col span={6} key={exam.id}>
            <Card
              hoverable
              style={{
                borderRadius: 16,
                height: "100%",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: `2px solid ${
                    exam.isPass ? "#52c41a" : "#f5222d"
                  }`,
                  paddingBottom: 6,
                  marginBottom: 10,
                }}
              >
                <Typography.Text strong>{exam.title}</Typography.Text>
                <Tag color={exam.isPass ? "green" : "red"}>
                  {exam.status}
                </Tag>
              </div>

              {/* INFO */}
              <div style={{ fontSize: 13, color: "#666" }}>
                <div>
                  <FontAwesomeIcon icon={faCalendar} /> {exam.date} - {exam.endTime}
                  
                </div>
              
                <div>
                  <FontAwesomeIcon icon={faClock} /> {exam.duration} -{" "}
                  {exam.type}
                </div>
              </div>

              {/* SCORE */}
              <div style={{ marginTop: 10 }}>
                <Progress
                  percent={exam.score} // ✅ FIX
                  size="small"
                />
                <b>得点: {exam.score}/100</b>
              </div>

              {/* STATS */}
              <div style={{ marginTop: 10, fontSize: 13 }}>
                <div>
                  <Badge status="success" /> 正解: {exam.correct}/{exam.total}
                </div>
                <div style={{ color: "red" }}>
                  <Badge status="error" /> 不正解: {exam.wrong}
                </div>
                <div>
                  <Badge status="processing" /> {exam.timeDone}
                </div>
              </div>

              {/* BUTTON */}
              {/* <button
                onClick={() => {
                  setSelectedExam(exam);
                  setOpenModal(true);
                }}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: 10,
                  borderRadius: 20,
                  border: "none",
                  background: "#1677ff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Xem chi tiết →
              </button> */}
            </Card>
          </Col>
        ))}
      </Row>

      {/* LOAD MORE */}
      {visibleCount < filteredHistory.length && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "2px solid #1677ff",
              background: "white",
              color: "#1677ff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            さらに読み込む
          </button>
        </div>
      )}

      {/* MODAL */}
      {/* <View
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedExam}
      /> */}
    </div>
  );
};

export default LichSuluyentap;