import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { getClassCount, getStudentCount, getTeacherCount } from '../../services/userService'

const Dashboard = () => {

  const [totalClasses, setTotalClasses] = useState(0)
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalTeachers, setTotalTeachers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classes, students, teachers] = await Promise.all([
          getClassCount(),
          getStudentCount(),
          getTeacherCount(),
        ])

        // ⚠️ backend bạn trả về là số → .data
        setTotalClasses(classes.data)
        setTotalStudents(students.data)
        setTotalTeachers(teachers.data)

      } catch (error) {
        console.error("Failed to load dashboard:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>管理者ダッシュボード</h1>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        管理画面へようこそ
      </p>

      <Row gutter={[16, 16]}>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="クラス数"
              value={totalClasses}
              prefix={<FontAwesomeIcon icon={faUsers} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="学生数"
              value={totalStudents}
              prefix={<FontAwesomeIcon icon={faUserGraduate} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="教員数"
              value={totalTeachers}
              prefix={<FontAwesomeIcon icon={faChalkboardTeacher} />}
            />
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default Dashboard