import React, { useEffect, useState, useMemo } from "react";
import { Card, Row, Col, Tag, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBook, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";

const mockData = [
  {
    id: "BT001",
    title: "数学（高校3年）- 第1章",
    subject: "数学",
    duration: "60分",
    questions: 30,
  },
  {
    id: "BT002",
    title: "国語（高校3年）- 論説文",
    subject: "国語",
    duration: "90分",
    questions: 40,
  },
  {
    id: "BT003",
    title: "物理（高校2年）- 力学振動",
    subject: "物理",
    duration: "45分",
    questions: 25,
  },
];

const DeThiYeuThich = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadFavorites = () => {
      const liked = JSON.parse(localStorage.getItem("favoriteExams")) || {};
      const favList = mockData.filter((exam) => liked[exam.id]);
      setFavorites(favList);
    };

    loadFavorites();

    // nghe thay đổi từ BaiThi
    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((exam) =>
      !searchTerm ||
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const handleRemove = (id) => {
    const liked = JSON.parse(localStorage.getItem("favoriteExams")) || {};

    delete liked[id];

    localStorage.setItem("favoriteExams", JSON.stringify(liked));

    setFavorites((prev) => prev.filter((item) => item.id !== id));

    // báo cho BaiThi update lại icon
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>お気に入りの試験</h1>
      <p>保存した試験の一覧です。</p>

   <div style={{ marginBottom: '24px' }}>
           <Input
             className="search-input"
             prefix={<FontAwesomeIcon icon={faSearch} />}
             placeholder="タイトル、科目で試験を検索..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             style={{ maxWidth: 400 }}
           />
         </div>
      {filteredFavorites.length === 0 ? (
        <div
          style={{
            marginTop: 24,
            padding: 24,
            background: "white",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <h3>お気に入りの試験がまだありません ❤️{searchTerm && ' または検索条件に一致しません'}</h3>
        </div>
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {filteredFavorites.map((exam) => (
            <Col xs={24} sm={12} md={8} lg={6} key={exam.id}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {/* ❤️ Xoá */}
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleRemove(exam.id)}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 20,
                    color: "hotpink",
                    cursor: "pointer",
                  }}
                />

                <h3>{exam.title}</h3>

                <p style={{ color: "#888" }}>
                  <FontAwesomeIcon icon={faBook} /> {exam.questions} 問
                </p>

                <Tag color="blue">{exam.subject}</Tag>

                <p>
                  <FontAwesomeIcon icon={faClock} /> {exam.duration}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default DeThiYeuThich;
