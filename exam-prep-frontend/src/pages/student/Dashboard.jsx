import React from 'react'
import { Card, Row, Col, Statistic } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faHeart } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>学生ダッシュボード</h1>
      <p style={{ marginBottom: '32px', color: '#666' }}>学習ダッシュボードへようこそ</p>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title="受験した試験数"
              value={12}
              prefix={<FontAwesomeIcon icon={faClipboardList} />}
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title="お気に入りの試験"
              value={5}
              prefix={<FontAwesomeIcon icon={faHeart} />}
              styles={{ content: { color: '#ff4d4f' } }}
            />
          </Card>
        </Col>
        
      </Row>
    </div>
  )
}

export default Dashboard

