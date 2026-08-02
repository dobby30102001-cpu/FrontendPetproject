// file
import QuestionTable from "../../components/teacher/QuestionTable";
import UserHeader from "../../components/common/UserHeader";
import AppPagination from "../../components/common/AppPagination";
import StatsCards from "../../components/common/StatsCards";
import CreateQuestionModal from "../../components/teacher/modals/Createquestionmodal";
import EditQuestionModal from "../../components/teacher/modals/Editquestionmodal";
import ViewQuestionDrawer from "../../components/teacher/modals/Viewquestiondrawer";
import questionService from "../../services/teacher/questionService";
// thuvien
import { useState, useEffect } from "react";
import { Button, Input, Select, Upload, message } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// css
import "../../assets/styles/teacher/Question.css";
import "../../assets/styles/User.css";
export default function TeacherQuestion() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  // Filter state
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState();
  const [catFilter, setCatFilter] = useState();
  const [searchInput, setSearchInput] = useState("");
  // Modal / Drawer state
  const [createOpen, setCreateOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [viewingQuestion, setViewingQuestion] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState("");
  //star
  const [stats, setStats] = useState({
    countTotal: 0,
    countEasy: 0,
    countMedium: 0,
    countHard: 0,
    loading: true,
  });

  const fetchQuestions = async () => {
    try {
      const res = await questionService.getQuestionsByTeacher({
        content: search,
        difficulty: diffFilter,
        categoryId: catFilter,
        page: page,
        size: size,
        ...(sortOrder && { sort: `id,${sortOrder}` }),
      });
      setQuestions(res.data.data.content);
      setTotal(res.data.data.totalElements);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("問題の読み込みに失敗しました");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await questionService.getAllCategory();

      setCategories(res.data.data.content);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("カテゴリの読み込みに失敗しました");
    }
  };

  //STATS
  const fetchStats = async () => {
    try {
      const res = await questionService.countQuestion();
      setStats({
        ...res.data.data,
        loading: false,
      });
    } catch (err) {
      message.error("統計の読み込みに失敗しました");
      setStats((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const handleView = async (id) => {
    try {
      const res = await questionService.getDetailQuestion(id);

      setViewingQuestion(res.data.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("問題詳細の読み込みに失敗しました");
    }
  };

  //  CRUD

  const handleCreate = async (values) => {
    try {
      await questionService.createQuestion(values);

      message.success("問題を作成しました");

      fetchQuestions();
      fetchStats();
      setCreateOpen(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("作成に失敗しました");
    }
  };

  const handleEdit = async (values) => {
    try {
      await questionService.updateQuestion(editingQuestion.id, values);

      message.success("問題を更新しました");

      fetchQuestions();
      fetchStats();

      setEditingQuestion(null);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error("更新に失敗しました");
    }
  };
  const handleDelete = async (id) => {
    try {
      await questionService.deleteQuestion(id);

      message.success("問題を削除しました");

      fetchQuestions();
      fetchStats();
    } catch (err) {
      message.error("削除に失敗しました");
    }
  };

  // EXPORT/import

  const handleExport = async () => {
    try {
      const res = await questionService.exportQuestion();

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "questions.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      message.success("エクスポートしました");
    } catch (err) {
      console.error(err);
      message.error("エクスポートに失敗しました");
    }
  };

  const handleImport = async (file) => {
    try {
      await questionService.importQuestion(file);

      message.success("インポートしました");

      fetchQuestions();
      fetchStats();
    } catch (err) {
      message.error("インポートに失敗しました");
    }
  };

  //EFFECT
  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(0); // reset page
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // fetch main data
  useEffect(() => {
    fetchQuestions();
  }, [search, diffFilter, catFilter, page, size, sortOrder]);

  // fetch static data
  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);
  return (
    <div className="teacher-question-page">
      {/* HEADER */}
      <UserHeader
        title="問題管理"
        description="問題を作成、編集、削除、管理"
        buttonText="問題を追加"
        handleAdd={() => setCreateOpen(true)}
        extra={
          <>
            <Button icon={<UploadOutlined />} onClick={handleExport}>
              エクスポート
            </Button>

            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                handleImport(file);
                return false;
              }}
            >
              <Button icon={<DownloadOutlined />}>インポート</Button>
            </Upload>
          </>
        }
      />

      {/* STATS */}
      <StatsCards
        loading={stats.loading}
        items={[
          { title: "問題の総数", value: stats.countTotal },
          { title: "易しい問題数", value: stats.countEasy },
          { title: "普通の問題数", value: stats.countMedium },
          { title: "難しい問題数", value: stats.countHard },
        ]}
      />

      {/* FILTER */}
      <div className="filter-bar">
        <div style={{ flex: 1, minWidth: 220 }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="問題を検索..."
            allowClear
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Divider dọc */}
        <div className="filter-divider" />

        {/* Difficulty */}
        <Select
          placeholder="難易度"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setDiffFilter(v)}
        >
          {["EASY", "MEDIUM", "HARD"].map((d) => (
            <Select.Option key={d} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="カテゴリ"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setCatFilter(v)}
        >
          {categories.map((c) => (
            <Select.Option key={c.id} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="並び替え"
          style={{ width: 160 }}
          allowClear
          onChange={(value) => {
            setSortOrder(value || "");
            setPage(0);
          }}
        >
          {" "}
          <Select.Option value="desc">新しい順</Select.Option>
          <Select.Option value="asc">古い順</Select.Option>
        </Select>
      </div>

      <div className="question-table-wrapper">
        <QuestionTable
          data={questions}
          onView={handleView}
          onEdit={(q) => setEditingQuestion(q)}
          onDelete={handleDelete}
        />
      </div>
      <AppPagination
        page={page}
        size={size}
        total={total}
        onChange={(p, s) => {
          setPage(p);
          setSize(s);
        }}
      />
      {/* CREATE MODAL */}
      <CreateQuestionModal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onSave={handleCreate}
        categories={categories}
      />

      {/* EDIT MODAL */}
      <EditQuestionModal
        open={!!editingQuestion}
        question={editingQuestion}
        categories={categories}
        onCancel={() => setEditingQuestion(null)}
        onSave={handleEdit}
      />

      {/* VIEW DRAWER */}
      <ViewQuestionDrawer
        question={viewingQuestion}
        onClose={() => setViewingQuestion(null)}
      />
    </div>
  );
}
