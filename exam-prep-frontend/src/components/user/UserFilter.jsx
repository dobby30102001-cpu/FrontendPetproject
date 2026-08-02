import React from "react"
import { Row, Col, Input, Select, Space, Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons"

const UserFilter = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter
}) => {

  const handleClear = () => {
    setSearchTerm("")
    setRoleFilter("")
  }

  return (
    <Row gutter={[12, 12]} align="middle" justify="space-between">

      {/* SEARCH */}
      <Col xs={24} sm={24} md={8}>
        <Input
          className="search-input"
          prefix={<FontAwesomeIcon icon={faSearch} />}
          placeholder="ユーザー名、氏名、またはメールアドレスで検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </Col>

      {/* FILTER */}
      <Col>
        <Space>
          <Select
            placeholder="役割"
            value={roleFilter}
            onChange={setRoleFilter}
            allowClear
            style={{ width: 150 }}
          >
            <Select.Option value="admin">管理者</Select.Option>
            <Select.Option value="teacher">教員</Select.Option>
            <Select.Option value="student">学生</Select.Option>
          </Select>

          <Button onClick={handleClear}>
            <FontAwesomeIcon icon={faArrowRotateLeft} /> フィルターをクリア
          </Button>
        </Space>
      </Col>

    </Row>
  )
}

export default UserFilter