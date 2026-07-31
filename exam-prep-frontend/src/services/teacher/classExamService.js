import api from "../apiClient";

const classExamService = {

    updateExam: (id, data) => api.put(`/v1/admin/classes/${id}/exams`, data),

};

export default classExamService;

