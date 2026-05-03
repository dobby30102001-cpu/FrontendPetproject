# FrontendPetproject

Dự án frontend được xây dựng với React + Vite, sử dụng các thư viện hiện đại như Ant Design, Bootstrap, Axios và React Router.

## Công nghệ sử dụng

- **React 19** – Thư viện UI chính
- **Vite** – Build tool nhanh cho frontend
- **Ant Design (antd)** – Bộ component UI đa dạng
- **Bootstrap + React Bootstrap** – Framework CSS responsive
- **React Router DOM v7** – Điều hướng trang
- **Axios** – Gọi HTTP API
- **React Toastify** – Thông báo toast
- **Font Awesome** – Bộ icon phong phú

## Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy bạn đã cài đặt:

- [Node.js](https://nodejs.org/) **v18** trở lên (khuyến nghị v20 LTS)
- **npm** v9+ (đi kèm với Node.js) hoặc **yarn**

Kiểm tra phiên bản hiện tại:

```bash
node -v
npm -v
```

## Hướng dẫn cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/dobby30102001-cpu/FrontendPetproject.git
cd FrontendPetproject
```

### 2. Di chuyển vào thư mục frontend

```bash
cd exam-prep-frontend
```

### 3. Cài đặt các dependencies

```bash
npm install
```

> Lệnh này sẽ tải toàn bộ các thư viện cần thiết được khai báo trong `package.json`.

### 4. Chạy dự án ở chế độ development

```bash
npm run dev
```

Sau khi chạy thành công, mở trình duyệt và truy cập:

```
http://localhost:5173
```

## Các lệnh thường dùng

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động server development với hot-reload |
| `npm run build` | Build dự án cho môi trường production |
| `npm run preview` | Xem trước bản build production trên local |
| `npm run lint` | Kiểm tra lỗi code với ESLint |

## Cấu trúc thư mục

```
exam-prep-frontend/
├── public/             # File tĩnh (favicon, ảnh public)
├── src/
│   ├── assets/         # Hình ảnh, font, icon
│   ├── components/     # Các component tái sử dụng
│   ├── context/        # React Context (quản lý state toàn cục)
│   ├── hooks/          # Custom hooks
│   ├── layouts/        # Layout chung (header, sidebar, footer)
│   ├── pages/          # Các trang của ứng dụng
│   ├── route/          # Cấu hình routing
│   ├── services/       # Các hàm gọi API (Axios)
│   ├── App.jsx         # Component gốc
│   ├── main.jsx        # Điểm khởi đầu ứng dụng
│   └── index.css       # CSS toàn cục
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Gặp sự cố?

- **Lỗi `node_modules` không tìm thấy**: Chạy lại `npm install`
- **Cổng 5173 đã được sử dụng**: Vite tự động chuyển sang cổng khác, hoặc bạn có thể thêm `--port <số_cổng>` vào lệnh dev
- **Lỗi phiên bản Node.js**: Hãy nâng cấp Node.js lên v18 trở lên

## Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo một **Issue** hoặc **Pull Request** nếu bạn muốn cải thiện dự án.
