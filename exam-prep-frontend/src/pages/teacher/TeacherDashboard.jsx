import { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserHeader from "../../components/common/UserHeader";
import StatsCards from "../../components/common/StatsCards";
import CreateQuestionModal from "../../components/teacher/modals/Createquestionmodal";
import ExamFormModal from "../../components/teacher/modals/ExamFormModal";
import ScoreChart from "../../components/teacher/dashboard/ScoreChart";
import QuickActions from "../../components/teacher/dashboard/QuickActions";
import questionService from "../../services/teacher/questionService";
import dashBoardService from "../../services/teacher/dashboardService";
export default function TeacherDashboard() {
  const [stats, setStats] = useState([]);
  const [scoreDist, setScoreDist] = useState([]);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openExam, setOpenExam] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashBoardService.stats();

        const data = res.data.data;

        setStats([
          { title: "試験の総数", value: data.totalExams },
          { title: "問題の総数", value: data.totalQuestions },
          { title: "学生の総数", value: data.totalStudents },
        ]);
      } catch (err) {
        console.error("Lỗi load stats:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await questionService.getQuestionsByTeacher({
          page: 0,
          size: 1000,
        });
        setAllQuestions(res?.data?.data?.content ?? []);
      } catch (err) {
        console.error("Lỗi load questions:", err);
      }
    };

    fetchQuestions();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await questionService.getAllCategory();
        setCategories(res?.data?.data?.content ?? []);
      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="teacher-question-page">
      {/* HEADER */}
      <UserHeader
        title="教員ダッシュボード"
        description="試験システムの概要と最近のアクティビティ"
        extra={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenQuestion(true)}
            >
              問題を作成
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenExam(true)}
            >
              試験を作成
            </Button>
          </>
        }
      />

      {/* STATS */}
      <StatsCards items={stats} />

      {/* ROW 1 */}
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <ScoreChart data={scoreDist} />
        <QuickActions />
      </div>
      {/* CREATE QUESTION */}
      <CreateQuestionModal
        open={openQuestion}
        onCancel={() => setOpenQuestion(false)}
        onSave={() => {
          setOpenQuestion(false);
        }}
        categories={categories}
      />

      {/* CREATE EXAM */}

      {openExam && (
        <ExamFormModal
          exam={null}
          questions={allQuestions}
          categories={categories}
          onClose={() => setOpenExam(false)}
          onSave={() => {
            setOpenExam(false);
          }}
        />
      )}
    </div>
  );
}
